const http = require('http');
const zlib = require('zlib');
const fs = require('fs');

const file = './html/index.html'
let server = http.createServer((req, res)=>{
    let acceptEncoding = req.headers['accept-encoding'];
    
    let gzip = zlib.createGzip();
    if(acceptEncoding.indexOf('gzip') != -1){

        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        })
        fs.createReadStream(file).pipe(gzip).pipe(res);
    }else{
        fs.createReadStream(file).pipe(res);
    }
})


server.listen(3000)