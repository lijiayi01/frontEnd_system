const http = require('http');
const fs = require('fs');
const urlModule = require('url')
let app = http.createServer(function(req,res){
    let urlInfo = urlModule.parse(req.url);
    let pathname = urlInfo.pathname;
    // 默认访问 该页面
    if(pathname == '/getCookie'){
       let cookie =  decodeURIComponent(urlInfo.search.slice(3));
       console.log(cookie)
    }else if(pathname == '/img'){
        fs.readFile('./img/wx.jpg','binary', function(err,filedata){
            res.write(filedata,'binary');
			res.end()
        })
    }else if(pathname == '/js'){
        fs.readFile('./js/xss.js','utf8', function(err,filedata){
            res.write(filedata);
			res.end()
        })
    }else if(pathname == '/'){
        let con = fs.readFileSync('./index.html','utf8');
        res.end(con)
    }
})

app.listen(4000, function(){
    console.log('本机服务正在运行在4000端口')
})

