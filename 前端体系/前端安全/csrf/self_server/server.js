const http = require('http');
const fs = require('fs');
const urlModule = require('url')
let app = http.createServer(function(req,res){
    let urlInfo = urlModule.parse(req.url);
    let pathname = urlInfo.pathname;
    // 默认访问 该页面
    if(pathname == '/'){
        let con = fs.readFileSync('./index.html','utf8');
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
        res.end(con)
    }else if( pathname == '/api/zhuang'){
        console.log(req.headers)
        res.end('succ');
    }
})

app.listen(3000, function(){
    console.log('本机服务正在运行在3000端口')
})