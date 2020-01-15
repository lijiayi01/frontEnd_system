const jwt = require('jsonwebtoken')

let payload = {
    name: 'ljy',
    exp: Date.now() +1000*3600
}

const secret = 'wjjriiriio3iio3iii'
const token = jwt.sign(payload, secret)  // 签发
console.log(token)

// 生成了如下的token值:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGp5IiwiZXhwIjoxNTc5MTA2ODc0OTk
// wLCJpYXQiOjE1NzkxMDMyNzR9.u0SBIAAU5th-vzJhS7d-zZ3KFXCpvpI-rf4crV4W2p8


// 仔细观察一下这个token值，发现它是由中间.隔开的，那我们试试将它拆开

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 base64解密得到：{"alg":"HS256","typ":"JWT"}

// eyJuYW1lIjoibGp5IiwiZXhwIjoxNTc5MTA2ODc0OTk
// wLCJpYXQiOjE1NzkxMDMyNzR9  base64解密得到 {"name":"ljy","exp":1579106874990,"iat":1579103274}

// u0SBIAAU5th-vzJhS7d-zZ3KFXCpvpI-rf4crV4W2p8  其实就是通过加密算法计算得到的，只要秘钥不泄露，这个东西就无法篡改

