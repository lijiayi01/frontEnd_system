/**
 * net 模块也是node的核心模块，http.Server继承自net.Server
 * http客户端和http服务器之间的通信依赖于socket(net.Socket)
 * 
 * 
 */

 const net = require('net');

 const PORT = 3000;
 const HOST = '127.0.0.1'

 // tcp服务器
 let server = net.createServer((socket)=>{
    console.log('服务端：收到来自客户端的请求');
    console.log(socket);

    socket.on('data', (data)=>{
        console.log('服务端：收到客户端的数据:'+data);

        // 给客户端返回数据
        socket.write('您好，我是服务端')
    })

    socket.on('close', ()=>{
        console.log('服务端：客户端断开');
    })
 })

 server.listen(PORT,HOST,()=>{
    console.log('服务端：开始监听来自客户端的请求');
    console.log( server.address() );
 })



