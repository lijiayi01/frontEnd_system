const fs = require('fs')
var  d2 = [{"a":1,"n":'http://www.baodu.com?a=1&c={"x":123}'}]

var d1 = JSON.stringify(d2)


var d3  ='[{"a":1,"n":"http://www.baodu.com?a=1&c={\\"x\\":123}"}]'

console.log(d1)

console.log(d3)
console.log(JSON.parse(d3))