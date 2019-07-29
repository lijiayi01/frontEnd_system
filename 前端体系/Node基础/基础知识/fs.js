const fs = require('fs')

// fs.readFile fs.readFileSync默认返回都是buffer, 且都可以设置编码方式，比如 binary(二进制) base64等等

// fs.readFile('./img/company_vip_card.png','base64', function(err, res){
//     console.log(res)
// })
// const content = fs.readFileSync('./img/company_vip_card.png','base64')
// console.log(content)