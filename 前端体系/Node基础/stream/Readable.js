const fs = require('fs');

let data = '';

let readStream = fs.createReadStream('./input.txt');
console.log(readStream)
readStream.setEncoding('utf-8');

readStream.on('data',(chunk)=>{
    // console.log('chunk'+chunk)
    data += chunk;
})

readStream.on('end',()=>{
    console.log(data)
})

readStream.on('error',(err)=>{
    console.log(err)
})

console.log('start ')