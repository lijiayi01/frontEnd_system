const Req = {

    // post 请求参数
     get body(){
        return  this.promiseWrap()
        
    },

    
    set body(num){
        console.warn('req body not set');
    },

    promiseWrap(){
        return new Promise((resolve, reject)=>{
            let data = '';
            this.req.on('data', (chunk)=>{
                chunk += data;
            })
    
            this.req.on('end', (err)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    }
}


module.exports = Req;