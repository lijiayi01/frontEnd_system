const path = require('path');
const config = {
    host: 'localhost',
    port: '9000',
    // 静态资源默认放置位置
    rootDir: path.resolve(__dirname, '..', 'public')
}

// 后缀名与对应的Content-Type,只列举常见的文件类型
const requestType = {
    'js': 'application/javascript; charset=UTF-8',
    'css': 'text/css',
    'htm': 'text/html',
    'html': 'text/html',
    'jpe': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'gif': 'image/gif',
    'mp3': 'audio/mpeg',
    'mp4': 'video/mp4',
    'png': 'image/png',
    'txt': 'text/plain',
}
module.exports = {
    requestType,
    config
}