const net = require('net');

let server = net.createServer( (socket)=> {
    socket.on('data', (data)=>{
        console.log('data',data.toString())
    })

    socket.on('end', (data)=>{
        console.log('end',data)
    })

    socket.write('hello world')
})

server.listen(8080, ()=>{
    console.log('8080端口')
})