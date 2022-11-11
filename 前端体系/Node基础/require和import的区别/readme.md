# common.js模块和esModule 详解
## 1. common.js中exports和module.exports的区别

默认情况下，exports = module.exports;

require()返回的是module.exports, 而不是exports

也就是说，如果` exports = { name : 'xxx' }`, 会导致断开对module.exports的指向。

此时如果通过require引入这个模块，得到的值是个`{}`

所以，如果common.js中，如果使用exports方式导出模块, 必须使用`exports.name = 'xxx'`类似这样的格式
## 2.require和import区别

require是作为common.js规范中的关键字，作用为： 导入模块

import为es6模块化规范的关键字，作用也为： 导入模块

两者的区别：

1. require是运行时导入，也就是说只有run code才会触发执行。
2. require是值的拷贝，怎么理解呢？

    其实我们应该还记得js的函数的参数传递，他们也是值传递。也就是说，对于普通类型数据，模块内部后续的变化，不会影响到导出结果。具体可以看require目录下的demo1

    我们只要记住： common.js规范中导出都是一个对象，如果对象属性值都是普通数据类型，则后续模块的变化不会影响导出结果，如果是引用数据数据类型，会影响。（可以联想深浅拷贝）

3. import 是编译时输出接口，输出的是值的一个引用。

    es6中遇到import就会生成一个只读引用，等到代码真正执行时，再根据这个只读引用，到被加载的模块中取值。

4. require时一定要注意赋值方式，不同的赋值方式会导致不同的结果(查看demo4代码)

5. require方式引入模块时，如果该模块在一定时间内重新赋值module.exports，则不会生效，因为common.js默认会缓存之前的引用。

## 3.common.js和esModule互相加载

注意， common.js和esModule混用，必须使用babel编译转换之后才可以。

### 入口文件是common.js，依赖包为esModule，转化规则为：

依赖的esModule会转换成如下，

`
// 依赖的esModule代码如下
var obj = {
    name: 'ljy',
    age: 18
}
export var name = 'wangqiang'

export function add(){
    console.log('add')
}

export default obj;
`

会转换成：

`
{ 
    add: [Function: add],
    name: 'wangqiang',
    default: { name: 'ljy', age: 18 } 
}
`
也就是: esModule的default导出，会转成一个default属性，其他的导出，会作为属性导出。


### 入口文件是common.js, 依赖也是common.js, 转化规则:

则直接会使用默认导出的对象使用。

### 入口文件是esModule，依赖包为common.js,转化规则:




