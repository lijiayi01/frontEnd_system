const http = require('https');

http.createServer(function (req,res) {
    res.end('111')
}).listen('8090',function(){
    console.log('listen 8090')
})