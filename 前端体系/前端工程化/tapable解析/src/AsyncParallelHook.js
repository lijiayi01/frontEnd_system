const { AsyncParallelHook } = require("tapable");

// 创建实例
let asyncParallelHook = new AsyncParallelHook(["name", "age"]);

// 注册事件
console.time("time");
asyncParallelHook.tapAsync("1", (name, age, done) => {
    setTimeout(() => {
        console.log("1", name, age, new Date());
        done();
    }, 1000);
});

asyncParallelHook.tapAsync("2", (name, age, done) => {
    setTimeout(() => {
        console.log("2", name, age, new Date());
        done();
    }, 400);
});

asyncParallelHook.tapAsync("3", (name, age, done) => {
    setTimeout(() => {
        console.log("3", name, age, new Date());
        done();
        console.timeEnd("time");
    }, 3000);
});

// 触发事件，让监听函数执行
asyncParallelHook.callAsync("panda", 18, () => {
    console.log("complete");
});