function PromiseA(executor){
    this.status = 'pending'
    // 成功value
    this.value = undefined;
    // 失败reason
    this.reason = undefined;

    // 成功监听数组
    this.succArr = [];
    // 失败监听数组
    this.errArr = [];

    var that = this;

    function resolve(value){
        if(that.status === 'pending'){
            that.status = 'resolved';
            that.value = value;
            that.succArr.forEach(function (item) {
                item(that.value)
            })
        }
    }

    function reject(reason) {
        if(that.status === 'pending'){
            that.status = 'rejected';
            that.reason = reason;
            that.errArr.forEach(function (item) {
                item(that.reason)
            })
        }

    }

    try {
        executor(resolve,reject)
    }catch (e) {
        reject(e)
    }

}

PromiseA.prototype = {
    constructor:PromiseA,
    then:function (succFn,errFn) {
        var that = this;
        var Promise2;
        // catch函数的核心
        errFn = typeof errFn === 'function' ?  errFn : function(err){ throw err}
        Promise2 = new PromiseA(function(resolve,reject){
            if(that.status === 'pending'){
                that.succArr.push(function () {
                    // 解决异步问题,其实promise属于微任务，这里用宏任务模拟异步
                    setTimeout(function () {
                        try{
                            // then函数的返回值会包装成新的promise
                            var x = succFn(that.value);
                            that.resolvePromise(Promise2, x, resolve, reject);

                        }catch (e) {
                            reject(e);

                        }
                    },0)
                });
                that.errArr.push(function () {
                    setTimeout(function () {
                        try{
                            var x =  errFn(that.reason);
                            that.resolvePromise(Promise2, x, resolve, reject);

                        }catch (e) {
                            reject(e);
                        }
                    },0)


                })
            }
            /*
               * 为什么还要对status === 'resolved' 和 'rejected'做相关处理呢?
               * 原因：如果promise内部是异步函数，不做相关处理也是可以的，但是对于内部是同步代码时，当执行resolve时，sussArr还未push到then内部函数，导致无法执行then内部函数
               *
               * */
            if(that.status === 'resolved'){
                setTimeout(function () {
                    try{
                        // then函数的返回值会包装成新的promise
                        var x = succFn(that.value);
                        that.resolvePromise(Promise2, x, resolve, reject);


                    }catch (e) {
                        reject(e);

                    }

                },0)

            }
            if(that.status === 'rejected'){
                setTimeout(function () {
                    try{
                        var x =  errFn(that.reason);
                        that.resolvePromise(Promise2, x, resolve, reject);

                    }catch (e) {
                        reject(e);
                    }
                },0)


            }
        });


        return Promise2;
    },
    /*
    * @desc:resolvePromise主要解决 then内部  return { then：function(){}}  return function(){} ruturn new Promise情况
    * @这是Promise规范中的方法，了解流程即可
    * 其终极目的: resolve(data)
    *
    * 这个函数比较难理解
    * */
    resolvePromise: function(promise2, x, resolve, reject) {
        let self = this;
        let called = false;   // called 防止多次调用

        if (promise2 === x) {
            return reject(new TypeError('循环引用'));
        }

        if (x !== null && (Object.prototype.toString.call(x) === '[object Object]' || Object.prototype.toString.call(x) === '[object Function]')) {
            // x是对象或者函数
            try {
                let then = x.then;

                if (typeof then === 'function') {
                    /*
                    * 难点:当返回是个promise时，但是确保其resolve reject要传递到我们写的下一个then
                    * ****** then返回的promise的状态由内部的回调函数控制， 如果内部回调函数返回普通类型值，则直接resolve， 如果是promise，则其的状态会影响外层promise的状态
                    * 1.当第一次调用then时，其实已经生成了一个新的promiseX
                    * 2.then回调函数又返回一个promiseY,但是在调用下一个then时，我们使用的时promiseX，那如何保证promiseY的resolve值传递到promiseX呢?
                    * 3.除非我们可以用promiseX的resolve(promiseY的resolve的值)
                    * 4.解决方法，内部调用then方法，将promiseY的resolve的值传递下来
                    * 5.递归处理
                    * 6.牢记我们这个函数的目的: promiseX的resolve(data)
                    * */
                    then.call(x, (y) => {
                        // 别人的Promise的then方法可能设置了getter等，使用called防止多次调用then方法
                        if (called) return ;
                        called = true;
                        // 成功值y有可能还是promise或者是具有then方法等，再次resolvePromise，直到成功值为基本类型或者非thenable
                        self.resolvePromise(promise2, y, resolve, reject);
                    }, (reason) => {
                        if (called) return ;
                        called = true;
                        reject(reason);
                    });
                } else {
                    if (called) return ;
                    called = true;
                    resolve(x);
                }
            } catch (reason) {
                if (called) return ;
                called = true;
                reject(reason);
            }
        } else {
            // x是普通值，直接resolve
            resolve(x);
        }
    },

    //实现catch函数:promise链中所有错误都会捕获
    catch:function (errFn) {
        // 其实只要给then内部的errFn添加一个默认函数即可，因为每次then都会向下传递，所有catch写到后面即可捕获到错误
        return this.then(null,errFn)
    }

}

// 返回一个promise
PromiseA.resolve = function(value){
    return new PromiseA(function(resolve, reject){
        if(value instanceof PromiseA){
            value.then(function(val){
                resolve(val)
            }, function(err){
                reject(err)
            })
        }else{
            resolve(value)
        }
    })
   
}

// 返回一个rejected状态的promise
PromiseA.reject = function(reason){
    return new PromiseA(function(resolve, reject){
        reject(reason)
    })
}

// Promise.all: 传入一个数组，返回一个promise，且所有的promise都成功才成功
PromiseA.all = function(arr){
    var count = 0;
    var res = [];
    return new PromiseA(function(resolve, reject){
        arr.forEach(function(item, key){
            var promiseX = null;
            if(item instanceof PromiseA){
                promiseX = item;
            }else{
                promiseX = PromiseA.resolve(item)
            }
            promiseX.then(function(val){
                count++;
                res[key] = val;
                if(count == arr.length){
                    resolve(res);
                }
            }, function(err){
                reject(err)
            })
        })
    })
}

// Promise.race: 传入一个数组，返回一个promise， 只要一个promise成功就算成功
PromiseA.race = function(arr){
    return new PromiseA(function(resolve, reject){
        var promiseX = null;
        if(item instanceof PromiseA){
            promiseX = item;
        }else{
            promiseX = PromiseA.resolve(item)
        }
        promiseX.then(function(val){
            resolve(val)
        }, function(err){
            reject(err)
        })
    })
}
