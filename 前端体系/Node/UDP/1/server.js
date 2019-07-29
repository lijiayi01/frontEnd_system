const dgram = require('dgram')
const HOST = '127.0.0.1'
const PORT = 3333
//udp 服务器
let server = dgram.createSocket('udp4');

server.on('listening',()=>{
    let address = server.address();
    console.log(address)
    console.log('udp服务器正在监听'+HOST+':'+PORT);
})

server.on('message', (msg,remote)=>{
    console.log(msg, remote)
})

server.bind(PORT, HOST);