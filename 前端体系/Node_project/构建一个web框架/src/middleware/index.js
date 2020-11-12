class Middleware{
    constructor(){
        this.middlewareArr = {

        }
    }

    add(path, fn){
       if(!this.middlewareArr[path]){
        this.middlewareArr[path] = []
       } 
       this.middlewareArr[path].push(fn)
    }
    // 执行
    excute(req, res){
        const next = ()=>{
            let middleware = this.middlewareArr.shift();
            if(middleware){
                middleware(req, res, next)
            }
        }

        next();
    }


}

module.exports = Middleware;