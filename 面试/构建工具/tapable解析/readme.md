## tapable解析： ##
    
webpack是一种事件流机制，它的工作流程就是将各个插件串联起来。而tapable就是它的核心。

## 那tapable是什么呢？ ##

如果我们之前对发布订阅模式了解的话，或者对Node的Event有所了解的话，那对于tapable的理解就不难。比如，我们说一下发布订阅的基础代码(src目录下1.发布订阅模式.js)：
```
    class Event {

    constructor() {
        this.task = []
    }

    on(name, callback) {
        if (!this.task[name]) {
            this.task[name] = [];
        }
        this.task[name].push(callback);
    }

    emit(name) {
        let list = this.task[name];
        list.forEach((item) => {
            item()
        })
    }

}

```
发布订阅模式很类似与tapable的SyncHook方法，其实tapable就是对于多个函数任务同步异步以及函数之间是否依赖的方法集合。

## tapable分类 ##
既然我们上面提到了同步异步函数，以及函数中间是否依赖的问题。所以tapable主要分为两大类： 同步钩子 和 异步钩子 <br>
<font color="#9f0000">（注：本文下面的代码会区别处理，比如SyncHook.js会以tapable提供的方法做一些验证，self_SyncHook.js我们会自行实现当前方法并提供验证）</font>

### 同步钩子函数： ###

#### SyncHook函数 ####
SyncHook 为串行同步执行，不关心事件处理函数的返回值，在触发事件之后，会按照事件注册的先后顺序执行所有的事件处理函数。

#### SyncBailHook函数 ####
SyncBailHook 同样为串行同步执行，如果事件处理函数执行时有一个返回值不为空（即返回值为 undefined ），则跳过剩下未执行的事件处理函数。

#### SyncWaterfallHook函数 ####
SyncWaterfallHook 为串行同步执行，上一个事件处理函数的返回值作为参数传递给下一个事件处理函数，依次类推，正因如此，只有第一个事件处理函数的参数可以通过 call 传递，而 call 的返回值为最后一个事件处理函数的返回值。

#### SyncLoopHook函数 ####
SyncLoopHook 为串行同步执行，事件处理函数返回 true 表示继续循环，即循环执行当前事件处理函数，返回 undefined 表示结束循环， SyncLoopHook 与 SyncBailHook 的循环不同， SyncBailHook 只决定是否继续向下执行后面的事件处理函数，而 SyncLoopHook 的循环是指循环执行每一个事件处理函数，直到返回 undefined 为止，才会继续向下执行其他事件处理函数，执行机制同理。

### 异步钩子 ###

Async 类型可以使用 tap 、 tapSync 和 tapPromise 注册不同类型的插件 “钩子”，分别通过 call 、 callAsync 和 promise 方法调用。

#### AsyncParallelHook函数 #### 
AsyncParallelHook 为异步并行执行，通过 tapAsync 注册的事件，通过 callAsync 触发，通过 tapPromise 注册的事件，通过 promise 触发（返回值可以调用 then 方法）。

#### AsyncSeriesHook函数 ####

AsyncSeriesHook 为异步串行执行，与 AsyncParallelHook 相同，通过 tapAsync 注册的事件，通过 callAsync 触发，通过 tapPromise 注册的事件，通过 promise 触发，可以调用 then 方法。

<b><font color="#9f0000">(注:和express中间件架构相同,重点看一下)</font></b>



