const http = require('http');
const https = require('https');
const fs = require('fs');
const urlModule = require('url')
const options = {
	key: fs.readFileSync('../conf/privatekey.pem'), //密钥路径
	cert: fs.readFileSync('../conf/certificate.pem')
};
let app = https.createServer(options, function(req,res){
    let urlInfo = urlModule.parse(req.url);
    let pathname = urlInfo.pathname;
    // 默认访问 该页面
    if(pathname == '/js/sdk.js'){
        let con = fs.readFileSync('./sdk.js','utf8');
        res.setHeader('Set-Cookie', 'ad-uuid=1232222;SameSite=None;Secure')
        res.writeHead(200,{'Content-Type':'text/javascript;charset=utf-8'})
        res.end(con)
    }
})

app.listen(9002, function(){
    console.log('本机服务正在运行在9002端口')
})