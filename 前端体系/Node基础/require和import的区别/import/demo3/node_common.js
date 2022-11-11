// commonjs加载es6模块，es6所有的输出接口都成为common.js输入的属性
const o = require('./es6.js')
console.log(o)

// { add: [Function: add],
//     name: 'wangqiang',
//     default: { name: 'ljy', age: 18 } }
  