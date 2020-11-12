const Res = {

    // post 请求参数
    get body(){

    },

    
    set body(str){
        if(typeof str === 'string'){
            this.res.writeHead(200, {
                'Content-Length': str.length,
                'Content-Type': 'text/html'
              });
              this.res.end(str)
        }else if(str instanceof Object){
            this.res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            this.res.end(JSON.stringify(str))
        }
       
    },

    
}


module.exports = Res;