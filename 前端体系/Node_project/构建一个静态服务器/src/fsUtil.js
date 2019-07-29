const fs = require('fs');

// 读目录
function readDir(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files)=>{
            if(err){
                reject(err)
            }else {
                resolve(files)
            }
        })
    })
}

// 获取文件信息
function stat(dir){
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stat)=>{
            if(err){
                reject(err)
            }else {
                resolve(stat)
            }
        })
    })
}

// 读文件
function readFile(file){
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, stat)=>{
            if(err){
                reject(err)
            }else {
                resolve(stat)
            }
        })
    })
}

module.exports = {
    readDir,
    stat,
    readFile
}