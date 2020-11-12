class Router{
    constructor(){
        this.router = {};
        this.init();
    }
    // 初始化
    init(){
        ['get', 'post'].forEach((method)=>{
            this.router[method] = [];
        })

    }
    // 正常需要传递3个参数
    /**
     * 
     * @param  {String}  - path : 请求路径
     * @param  {Function}  - fn : 对应的回调方法
     * @param  {Array}  - methods : 请求方法 ['get', 'post']
     */
    add(...args){
        if(args.length){
            // 这里逻辑判断不会做很多，只做简单的示意
            if(args.length > 1 && typeof args[0] === 'string' && typeof args[1] === 'function'){
                 // 请求方法
                 let [path, fn, methods] = args;
                 methods.forEach((method)=>{
                    if(!this.router[method][path]){
                        this.router[method][path] = [];
                    }
                    this.router[method][path].push(fn)
                 })
                
            }
        }
    }
    // 过滤
    filter(){

    }
}


module.exports = Router;