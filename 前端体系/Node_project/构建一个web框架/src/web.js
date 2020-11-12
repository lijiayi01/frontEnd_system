const http = require('http');
const Router = require('./router/router');
const Req = require('./req');
const Res = require('./res');
const middleware = require('./middleware/index')
const flatArray = require('./helper/helper').flatArray;
class Koa{
    constructor(){
        // 路由系统
        this.router = new Router();

        // 封装req res对象
        this.Request = Object.create(Req);
        this.Response = Object.create(Res);

        // 封装中间件
        this.middleware = new middleware();
        
    }

    run(){

    }

    // use封装
    // use: 中间件模块
    use(...args){
        if(args.length == 2){
            // 制定路径创建中间件
            this.
        }else if(args.length == 1 && typeof args[0] === 'function'){
            // 根路径创建中间件

        }
    }
    
    // 必须要有path，不做判断处理
    get(...args){
        const [path, fn] = args;
        this.router.add(path, fn, ['get'])
    }

    // 必须要有path，不做判断处理
    post(...args){
        const [path, fn] = args;
        this.router.add(path, fn, ['post'])
    }


    // 开启node服务
    listen(port, fn){
        let app = http.createServer( (req, res)=>{    
            // 这两行代码太精辟了，多回顾回顾
            // 将 node的req挂载到Req对象上面，那我们封装Req对象就可以用node原生req对象
            // 暂时先不做类似koa的context对象
            const Request = Object.create(this.Request)
            const Response = Object.create(this.Response)
            Request.req = req;
            Response.res = res;
            this.routerMatch(req.url, req.method.toLowerCase(), Request, Response);
            
        })

        app.listen(port, ()=>{
            fn.call();
        });
    }

    // 路由匹配
    routerMatch(path, method, req, res){
        const matchRouter = [];
        console.log(this.router.router)
        for(let key in this.router.router[method]){
            if(this.router.router[method][path] && this.router.router[method][path].length){
                matchRouter.push(this.router.router[method][path]) 
            }
        }
        // 扁平化处理
        if(matchRouter.length){
            const convertArr = flatArray(matchRouter);
            convertArr.forEach((fn)=>{
                fn.call(this, req, res)
            })
        }else{
            // 没有该路径的回调
            console.log('没有路径，，，，')
        }
    }




}


module.exports = Koa;