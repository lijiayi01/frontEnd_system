const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const zlib = require("zlib");
// 模板处理： 使用Handlebars
const Handlebars = require('handlebars');
const CONFIG = require('./config.js');
// fs 公共方法
const fsUtil = require('./fsUtil.js');
// date 公共方法
const dateUtil = require('./dateUtil.js');
// etag算法
const qetag = require('./etag/qetag.js')

let compress = zlib.createGzip();
// 编译模板
function compileTemplate(template) {
    let currentFile = fs.readFileSync(template, 'utf8');
    return Handlebars.compile(currentFile)
}

// 默认模板
const basic_templateFile = path.resolve(__dirname, 'template', 'index.hbs');
// 目录结构下的模板
const dir_templateFile = path.resolve(__dirname, 'template', 'dir.hbs');

class Server {

    constructor(option) {
        this.basicTemplate = compileTemplate(basic_templateFile);
        this.dirTemplate = compileTemplate(dir_templateFile);

        // 是否访问目录下的index.html
        this.isVisitIndex = option.isVisitIndex || false;
        // 是否是生产环境
        this.isProduct = option.isProduct || true;
    }

    // 入口
    init() {
        this.start()
    }

    // 开启服务器
    start() {
        let server = http.createServer((req, res) => {

            this.request(req, res)
        })

        server.listen(CONFIG.config.port, CONFIG.config.host, () => {
            console.log(`${CONFIG.config.host}:${CONFIG.config.port}服务器正在运行`)
        })
    }

    /**
     * 请求函数：
     *
     * @param {*} req
     * @param {*} res
     * @returns
     * @memberof Server
     */
    async request(req, res) {
        // 获取请求pathname(比如: localhost:9000/haha/index.html, 其pathname为/haha/index.html)
        let { pathname } = url.parse(req.url);
        // 有个问题： 如何获取协议
        let fullUrl = 'http://' + req.headers.host + pathname;
        // 过滤请求,比如favicon.ico
        const filterRequest = ['/favicon.ico'];
        // 是否是无效请求
        let isBadRequest = filterRequest.some((request, key) => {
            return pathname.indexOf(request) >= 0
        })
        if (isBadRequest) {
            return false;
        }

        // 解决中文目录问题,对其进行解码处理
        pathname = decodeURIComponent(pathname)
        // path.resolve和path.join区别： / 的使用问题
        // 读取真正的文件路径
        let fullpath = path.join(CONFIG.config.rootDir, pathname);
        try {
            let statObj = await fsUtil.stat(fullpath);
            if (statObj.isDirectory()) {
                // 读该目录下的文件
                let files = await fsUtil.readDir(fullpath);
                // 解决如果访问www.baidu.com/a  如果a是目录结构，且没有后面带 / 问题
                fullpath = fullpath.substr(-1) == '/' ? fullpath : `${fullpath}/`;
                fullUrl = fullUrl.substr(-1) == '/' ? fullUrl : `${fullUrl}/`;
                // 如果访问www.baidu.com，是否默认访问它的index.html
                let isVisitIndex = this.isVisitIndex;
                // 判断是否有index.html
                let hasIndex = files.indexOf('index.html') >= 0;
                if (isVisitIndex && hasIndex) {
                    let html = fs.readFileSync(`${fullpath}index.html`, 'utf8');
                    // 设置请求头
                    res.setHeader('Content-Type', 'text/html');
                    res.end(html);
                    return false;
                }
                if (!files.length) {
                    let data = this.basicTemplate({
                        title: '该目录暂无文件',
                        body: '该目录暂无文件'
                    })
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data)
                    return false;
                }
                // 循环获取文件
                const fileInfoList = [];
                // 注意await在forEach下的问题，使用for循环做阻塞
                for (let i = 0; i < files.length; i++) {
                    let fileInfo = await fsUtil.stat(`${fullpath}${files[i]}`);
                    // 文件创建时间
                    let createTime = dateUtil.formatDate(fileInfo.birthtime);
                    fileInfoList.push({
                        item: files[i],
                        createTime,
                        url: `${fullUrl}${files[i]}`

                    })
                }
                let data = this.dirTemplate({
                    title: `${fullpath}文件结构`,
                    body: fileInfoList
                })
                res.setHeader('Content-Type', 'text/html');
                res.end(data)

            } else {
                // 请求为文件

                // 是否 缓存
                let result = await this.cacheHandle(req, res);
                if (!result) {
                    return false;
                }
                // 获取后缀,mime的设置
                let extname = path.extname(fullpath);
                res.setHeader('Content-Type', CONFIG.requestType[extname.slice(1)]);

                /**
                 * 放弃readFileSync方法的缘故，readFileSync会将文件内容写到内存中，如果是大文件，将导致内存占用过大，
                 * 故放弃v1版本
                 */
                // v1
                // 如果是流文件，需要对其做二进制编码
                // const streamFileList = [
                //     'png',
                //     'jpg',
                //     'gif',
                //     'jpeg',
                //     'mp3',
                //     'mp4'
                // ]
                // let isStream = streamFileList.some((stream) => {
                //     return stream.indexOf(extname.slice(1)) >= 0
                // })
                // let data;
                // if (isStream) {
                //     // 默认就是二进制
                //     data = fs.readFileSync(fullpath);
                // } else {
                //     data = fs.readFileSync(fullpath, 'utf8');
                // }
                // res.writeHead(200);

                // res.end(data);

                // v2
                let stream = this.getStream(req, res, fullpath, statObj);
                let encoding = req.headers["accept-encoding"];
                // 支持 gzip 使用 gzip 压缩，支持 deflate 使用 deflate 压缩
                if (encoding && encoding.match(/\bgzip\b/)) {
                    compress = zlib.createGzip();
                    var compressType = "gzip";
                } else if (encoding && encoding.match(/\bdeflate\b/)) {
                    compress = zlib.createDeflate();
                    var  compressType = "deflate";
                } else {
                    // 否则直接返回可读流
                    return stream.pipe(res);
                }

                res.setHeader("Content-Encoding", compressType);
                stream.pipe(compress).pipe(res);
            }

        } catch (e) {
            console.log(e)
            let data = this.basicTemplate({
                title: 'not found!',
                body: 'not found!'
            })
            res.writeHead(404);
            res.end(data)
        }
    }

    // 缓存处理: 细分到具体文件，目录结构无需缓存
    // 强缓存处理： 因为代码层面无法对具体文件做到颗粒化处理，所以我们设置一个目录 static 专门对该目录文件做强缓存
    // 协商缓存处理： 设置生产开发环境，开发环境不对任何文件做缓存处理，生产环境做出了html文件外的其他文件做协商缓存
    async cacheHandle(req, res) {
        let isProduct = this.isProduct;
        if (!isProduct) {
            return true;
        }
        // 强缓存
        let { pathname } = url.parse(req.url);
        // 如果请求目录是以 /static目录，则需强缓存
        let pattern = /^\/static/gi;
        pathname = decodeURIComponent(pathname)
        let fullpath = path.join(CONFIG.config.rootDir, pathname);

        if (pattern.test(pathname)) {
            res.setHeader('Cache-Control', 'private');
            // 一年后过期
            res.setHeader('Expires', new Date(Date.now() + 365 * 24 * 7200 * 1000).toGMTString());
            return true;
        } else {
            let statObj = await fsUtil.stat(fullpath);
            // 获取req.headers中的 If-Modified-Since 和 If-None-Match，如果两者都存在，以If-None-Match为主
            let modifiedHeader = req.headers['if-modified-since'];
            let matchHeader = req.headers['if-none-match'];
            // buffer
            let buf = await fsUtil.readFile(fullpath);
            // 七牛的etag获取方式
            let etag = await qetag.getEtag(buf);
            res.setHeader('ETag', etag);
            let lastModifiedTime = statObj.ctime.toGMTString();
            res.setHeader('Last-Modified', lastModifiedTime)
            // etag 判断
            if (matchHeader && matchHeader == etag) {
                res.writeHead(304);
                res.end();
                return false;
            }

            // If-Modified-Since 判断
            if (modifiedHeader && modifiedHeader == lastModifiedTime) {
                res.writeHead(304);
                res.end();
                return false;
            }
            return true;

        }
    }

    // 分段加载
    getStream(req, res, filepath, statObj) {
        // 设计思路： 分段加载数据只针对请求头有range文件，其他资源不做任何处理
        let totalSize = statObj.size;
        let start = 0;
        let end = totalSize;

        let range = req.headers['range'];
        if (range) {
            // 获取各个分段数据
            let pattern = /bytes=(\d*)-(\d*)/;
            let result = range.match(pattern);
            if (result) {
                start = start ? parseInt(start) : 0;
                end = end ? parseInt(end) : totalSize - 1;
                res.setHeader('Accept-Ranges', 'bytes')
                res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`)
                res.setHeader('Content-Length', end - start)
            }

        }
        return fs.createReadStream(filepath, {
            start, end
        });


    }

}

let server = new Server({
    isVisitIndex: false
}).init();