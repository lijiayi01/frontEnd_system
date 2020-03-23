const fs = require('fs');

// fs.readFile('./input.txt',function (err,data) {
//     console.log(data)
// })
const http = require('http');
const writeStream = fs.createWriteStream('./test.png')
// http.get("http://m.meisheapp.com/share_test/img/1.jpg",function(res){
//     // console.log(data)
//     var str="";
//     res.setEncoding('utf8');
//     res.on("data",function(chunk){
//         str+=chunk;//监听数据响应，拼接数据片段
//     })
//     res.on("end",function(){
//         console.log(str)
//         console.log(str.toString())
//         var buffer = Buffer.from(str,'latin1')
//         console.log(buffer)
//         writeStream.write(buffer);
//     })
// })

fs.readFile('./input.txt', function(err, data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
    
})