const dgram = require('dgram')
const HOST = '127.0.0.1'
const PORT = 3333
let str = Buffer.from('hello udp李佳毅')

let client = dgram.createSocket('udp4');

client.send(str, PORT, HOST, (err, bytes)=>{
    // bytes: 本次传输的字节长度
    if(!err){
        console.log(bytes)
        client.close();
    }
})