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
        if(this.status === 'pending'){
            this.succArr.push(function () {
                succFn(that.value);
            });
            this.errArr.push(function () {
                errFn(that.reason);
            })
        }
        /*
        * 为什么还要对status === 'resolved' 和 'rejected'做相关处理呢?
        * 原因：如果promise内部是异步函数，不做相关处理也是可以的，但是对于内部是同步代码时，当执行resolve时，sussArr还未push到then内部函数，导致无法执行then内部函数
        *
        * */
        if(this.status === 'resolved'){
            succFn(that.value)
        }
        if(this.status === 'rejected'){
            errFn(that.reason)
        }
        return this;
    }
}

/*
* version:1.0
* 描述:1.0版本其实已经简单的说明了promise的工作流程，说白了promise就是将then内部函数push进 内部数组 ，当异步函数执行完毕时，对then内部函数一次执行
* 类似以下代码
*       var arr = [];
*       $.ajax({
*           type:'',
*           url:'',
*           success:function(res){
*               arr.forEach(function(item){
*                   item(res)
*               })
*
*           }
*
*       })
*       arr.push(then内部函数)
*
* 未解决的问题：
*   1.then的返回其实是一个新的promise，并非当前this
*   2.then内部函数均是异步调用
*   比如：以原生Promise做demo
*   console.log('start')
*   new Promise(function (reslove,reject) {
        console.log(1)
        reslove('2222')
    }).then(function (res) {
        console.log(res)
    },function (err) {
        console.log(err)
    })
    console.log('end')

    打印结果为:
        start
        1
        end
        2222

   如果以我们写的代码执行:
   打印结果为:
        start
        1
        2222
        end

    v2.0解决以上问题

* */