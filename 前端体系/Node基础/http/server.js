const http = require('http');

http.createServer(function (req,res) {
    console.log(req.query)
    res.end('111')
}).listen('8090',function(){
    console.log('listen 8090')
})