const fs = require('fs')

const data = '追踪梦想，como on';

let wrireStream = fs.createWriteStream('output.txt');

wrireStream.write(data,'utf-8');
wrireStream.on('data',function (chunk) {
    console.log(chunk)
})

wrireStream.on('finish',function (datas) {
    console.log(datas)
})
wrireStream.on('error',function (err) {
    console.log(err)
})

wrireStream.end();

