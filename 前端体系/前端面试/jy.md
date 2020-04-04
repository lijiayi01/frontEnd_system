js基础篇

1. js的闭包

    js闭包就是有权访问另外一个函数变量的函数。
    怎么理解呢？

    ```
    function fn1(){
        var i = 0;
        function fn2(){
            i++
        }

        return fn2;
    }
    ```
    这里fn2就是个闭包，因为fn2函数依赖于fn1的内部变量，所以i变量无法被释放，一直常驻内存。


2. es5 和 es6继承

    可能es6的继承，很多人都会认为es6的extends是es5的语法糖。其实不是的，二者在实现上还是有一些差别的。

    我们先说一下es5继承的最佳实践：(寄生组合式继承)

    ```
        function Person(name, age){
            this.name = name;
            this.age = age;
        }

        Person.prototype.getName = function(){
            console.log(this.name)
        }

        function Man(name, age){
            Person.call(this, name, age)
        }

        Man.prototype = Object.create(Person.prototype); // 这个方法的内部实现自行查阅
        Man.prototype.constructor = Man;

    ```
    
    在看下es6的继承：
    ```
        class Person{
            constructor(name, age){
                this.name = name;
                this.age = age;
            }
            getName(){
                console.log(this.name); 
            }

        }

        class Man extends Person{
           constructor(name, age){
                super(name,age)
            } 
        }

    ```

    那它们有啥区别呢：(以下是网上查阅得来，不保证正确)

    -  ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上
    -  ES6的继承机制完全不同，实质上是先创建父类的实例对象this（所以必须先调用父类的super()方法），然后再用子类的构造函数修改this。

    因为笔者没读过底层v8引擎的源码，所以无法告诉大家正确与否，但是大家可以近似这么认为，继承时要先调用super(和java一样)。

    补充： 虽然无法得知v8底层的代码，但我们可以看看babel将es6继承代码转化为是什么样？ (具体可查阅 /前端工程化/webpack/self_babel/code.js)

    babel转化后和我们上面提到的es5继承类似，不过它还加了一点 `子构造函数.__proto__ = 父构造函数`

    大家有兴趣的可以看一下转化代码。

3. 讲讲js的执行过程，重点希望提到事件循环

    首先说明一下，js并不是一门解释性语言，它其实也是有编译阶段的。

    - 代码交给j引擎起编译，编译过程我们暂且不提。
    - 代码开始执行
    - 代码执行时创建一个全局执行上下文，this指向window，浏览器中它就是window
    - 当遇见函数调用(注意：只有调用的时候才会创建)时会创建函数执行上下文，函数执行上下文先创建，创建阶段主要确定this指向 一些变量引用 作用域链 arguments，可以简单统称为变量对象(VO)等。
    - 当该函数的执行上下文创建以后，就会执行，执行的时候会将VO变量对象赋值。
    - 我们上面说到的执行上下文，js引擎有个专门的管理它们的东西：执行上下文栈，先进后出，所以会保证栈底永远会有一个全局执行上下文。
    - 我们上面说的都是同步函数，那么异步函数呢？ 这就需要引入另外一个改变：任务队列
    - 任务队列分为宏任务和微任务，说白了就是异步函数会移入Event Table注册，对异步任务被触发时会将回调函数移入任务队列，当主线程的执行栈已经执行完它栈内的所有的函数了，那么它将从任务队列中寻找，任务队列会将回调函数推入主线程的执行栈。
    - 那谁来管理主线程和任务队列呢？(也就是说会检查主线程执行栈执行完了吗？如果执行完了，就将任务队列中的回调函数推入)，这是事件循环(Event loop), 它会一直运行，当有主线程执行完毕以后就会向任务队列查询，如果有回调函数就将其推入主线程执行栈。
    - 我们可以认为： Event loop就是负责主线程与其他进程（主要是各种I/O操作）的通信线程。
    - 我们常见的异步任务分为 定时器  ajax， 定时器通常是由浏览器的时间线程管理，ajax由浏览器的网络线程管理，不要以为js是单线程，浏览器就是单线程，对于定时器 ajax都是js引擎和浏览器预定的线程的一些消息传递。

vue

1. v-for为啥要加key
   希望能说上虚拟dom以及dom diff的知识，因为加key的就是为了两颗虚拟dom树之间的比较优化，尤其是在diff算法移动过程中使用。具体代码见 前端框架/vdiff/部分，里面有实现过程
2. vue组件通信
   说出常见几种就行 

    - props emit
    - $attrs $listeners
    - event bus
    - vuex

    知道常见的几种就可以了。
3. vuex的作用，实现原理是什么
    vuex相关于全局变量。

4. vue双向绑定流程是什么

    Object.defineProtory   发布订阅模式  数据劫持  
    需要将清楚流程， 比如 观察者如何订阅到发布者， 要自己清楚流程。

   
webpack

1. webpack的常见的配置


2. webpack常见的构建优化
3. 对webpack中module chunk bundle基础概念的理解
4. webpack如何实现模块化的呢？ **
5. webpack loader plugin的实现原理，能不能大概讲讲？

上面答案都在 /前端工程化/内有

项目：

1. 节流防抖了解多少
2. 性能优化：能说上多少，如果谈到网络层面，能不能简要讲讲http的一些常见头信息，他们具体代表什么？ 强缓存 协商缓存等等 ，如果提到重绘回流，可以问问浏览器是如何做的？ 

    建议可以从域名解析开始， tcp连接 ，可以延伸出 keep-alive , http头信息 ，比如强缓存 协商缓存 ，也可以问协商缓存中的etag是如何实现的(etag实现在 /Node_project/提到了)，讲完网络层面，可以讲讲一个html在浏览器中的渲染， dom树 css树 渲染树， 如何重绘 回流，以及一些在代码层面js的常见优化方式。
3. es6了解多少，可以重点问一下promise，谈谈es6项目中使用的es6特性


node：

1. 了解node吗？ 能不能大概讲讲node
2. 对node框架koa或者express的了解
3. 对nginx了解吗？ 简单讲讲
4. 对linux的了解
   
管理项目：

1. 对git熟悉就说说git，对svn熟就讲讲svn
2. 如果一个项目线上出bug了，如何来调试，如何解决
3. 目前在学什么，未来的职业规划
4. 遇到自己的知识盲区，如何学习？ 什么方式？ 