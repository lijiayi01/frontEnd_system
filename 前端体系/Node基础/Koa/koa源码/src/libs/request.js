const URL_Module = require('url');
const request = {
    get url(){
        return this.req.url;
    },

    get method(){
        return this.req.method.toLowerCase();
    },

    get query(){
        const urlObj = URL_Module.parse(this.req.url ,true);
        return urlObj;
    }

}


module.exports = request;