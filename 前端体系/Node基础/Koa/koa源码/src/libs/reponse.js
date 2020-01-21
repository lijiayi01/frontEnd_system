const response = {
    get body(){
        return this.res.body
    },

    set body(val){
        console.log(val, 1111)
        this.res.end(val)
    },

    get status(){
        return this.res.statusCode;
    },

    set status(num){
        this.res.statusCode = num;
    }


}


module.exports = response;