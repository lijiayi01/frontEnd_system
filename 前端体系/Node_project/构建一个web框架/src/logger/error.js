class Error{
    constructor(){

    }

    createErrorHtml(path, req, res){
        let errorText =  `没有${path}的回调函数`
        res.body = errorText;
    }
}


module.exports = Error;