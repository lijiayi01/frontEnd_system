const http = require('http');
const context = require('./context').context;
const mount =  require('./context').mount;
const request = require('./request')
const response = require('./reponse')


class KOA {
    constructor() {
        this.middleware = [];
        
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }

    use(fn) {
        this.middleware.push(fn)
    }

    listen(...args) {
        const server = http.createServer((req, res) => {
            // 创建上下文
            const ctx = this.createContext(req, res)
          
            this.middleware.forEach((item)=>{
                item(ctx)
            })
        })

        server.listen(...args)
    }
    
    createContext(req, res){
        const request = Object.create(this.request);
        const response = Object.create(this.response);
        const context = Object.create(this.context);
        context.req = request.req = req;
        context.res = response.res = res;
        console.log(request.method,1111)
        context.request = request;
        context.response = response;
        mount(context)
        
        this.context = context;
        this.request = request;
        this.response = response;

        return context;

    }
}


module.exports = KOA