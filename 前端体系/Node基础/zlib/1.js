const fs = require('fs');

const zlib = require('zlib');

// 压缩
// let gzip = zlib.createGzip();

// let file = fs.createReadStream('./file/a.txt')

// let outputFile = fs.createWriteStream('./file/a.txt.gz');

// file.pipe(gzip).pipe(outputFile)

let gzip = zlib.createGzip();

let file = fs.createReadStream('./html/index.html')

let outputFile = fs.createWriteStream('./html/index.html.gz');

file.pipe(gzip).pipe(outputFile)

// 解压

// let gunzip = zlib.createGunzip();

// let mainFile = fs.createReadStream('./file/a.txt.gz')

// let outFile = fs.createWriteStream('./file/data.txt')

// mainFile.pipe(gunzip).pipe(outFile)