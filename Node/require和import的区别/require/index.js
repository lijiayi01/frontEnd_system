const x = require('./a.js')
console.log(x.a)

setTimeout(function () {
    console.log(x)
},2000)

x.b.x=2