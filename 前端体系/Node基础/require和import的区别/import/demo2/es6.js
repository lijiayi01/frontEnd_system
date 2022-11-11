// es6 import命令按照下面加载common.js模块，common.js模块中module.exports 会当作默认输出
import obj1 from './node_common' 
console.log(obj1)
// { a: 1, b: 2, c: [Function: c] }

// 如果采用整体输入的写法(import * as xxx from someModule), default 会取代module.exports作为输入的接口。
import * as obj from './node_common'   
// { a: 1,
//     b: 2,
//     c: [Function: c],
//     default: { a: 1, b: 2, c: [Function: c] } }


console.log(obj);
