const https = require('https');

https.get('https://www.baidu.com', (res)=>{
    console.log('res code:'+res.statusCode);

    console.log('res header'+JSON.stringify(res.headers))

    res.on('data', (data)=>{
        process.stdout.write(data);
    })
}).on('error', (err)=>{
    console.log(err)
})

openssl req -new \ -sha256 -key lijiayi_key.pem \ -out lijiayi_csr.pem \ -subj "/C=CN/ST=Beijing/L=Beijing/O=YH
Inc/CN=www.lijiayi.com"