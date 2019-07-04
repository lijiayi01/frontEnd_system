// TCP 客户端
const net = require('net');

const PORT = 3000;
const HOST = '127.0.0.1'

let client = net.createConnection(PORT, HOST)

client.on('connect',()=>{
    console.log('客户端：已经和服务端建立连接')
})

client.on('data', (data)=>{
    console.log('客户端：收到服务端的数据'+data)
})

client.on('close', ()=>{
    console.log('客户端:连接断开')
})

client.end('你好，我是客户端')