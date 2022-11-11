const {foo} =  require('./libs.js');
// foo指向{count: 0}内存地址引用
console.log(foo)   //{ count: 0 }
const obj = require('./libs')

// obj 拷贝了整个输出对象{foo: {count: 0}}的内存地址
console.log(obj)  //{ foo: { count: 0 } }
setTimeout(()=>{
     // 当里面的属性值发生变化，可以拿到最新的值，因为指向整个输出对象的内存地址
    console.log(obj ,'2s后')    //{ foo: '123' } 2s后
    // foo的指向并没有发生变化
    console.log(foo, '2s后') // { count: 0 } 2s后  
}, 2000)