const http = require('http');
const zlib = require('zlib');
const fs = require('fs');

const file = './html/index.html.gz'
let server = http.createServer((req, res)=>{
    let acceptEncoding = req.headers['accept-encoding'];
    
    let gzip = zlib.createGzip();
    if(acceptEncoding.indexOf('gzip') != -1){
        res.setHeader('Cache-Control', 'private');
        res.setHeader('Expires', new Date(Date.now() + 365 * 24 * 7200 * 1000).toGMTString());
        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        })
        fs.createReadStream(file).pipe(res);
    }else{
        fs.createReadStream(file).pipe(res);
    }
})


server.listen(3000)