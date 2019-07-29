const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const fbSer = '221.130.33.52';//默认DNS服务器
function forward(msg, rinfo) {
    const client = dgram.createSocket('udp4');
    client.on('error', (err) => {
        console.log(`client error:`+err.stack)
        client.close();
    })
    client.on('message', (fMsg, fbRinfo) => {
        console.log("result:",JSON.stringify(fMsg));//获取响应报文
        server.send(fMsg, rinfo.port, rinfo.address, (err) => {
            err && console.log(err);
        });
        client.close();
    })
    client.send(msg, 53, fbSer, (err) => {
        if (err) {
            console.log(err);
            client.close();
        }
    });
}

server.on('message', (msg, rinfo) => {
    console.log(JSON.stringify(msg));//获取接收查询 
    forward(msg, rinfo);//转发
})

server.on('error', (err) => {
    console.log('server error:' + err.stack)
    server.close()
})
server.on('listening', () => {
    const addr = server.address()
    console.log(`run ${addr.address}:${addr.port}`)
})
server.bind(53);


[
    142,226, //会话标识 ，标识那个请求
    1,0,
    0,1,0,0,0,0,0,0,

    
    3,119,119,119,
    5,98,97,105,100,117,
    3,99,111,109,
    0,0,1,0,1]