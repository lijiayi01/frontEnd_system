class AsyncSeriesHook {
    constructor(arg) {
        this.arg = arg;
        this.task = [];
    }

    tapPromise(name, callback) {
        this.task.push(callback)
    }

    promise(...arg) {
        let callback = arg.pop();
        arg = arg.slice(0, this.arg.length);
        let [first, ...other] = this.task;
        return other.reduce((total, item) => {
            return total.then(()=>{
                return item(...arg)
            })
        },first(...arg))
    }
}

// 创建实例
let asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

// 注册事件
console.time("time");
asyncSeriesHook.tapPromise("1", (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("1", name, age, new Date());
            resolve("1");
        }, 1000);
    });
});

asyncSeriesHook.tapPromise("2", (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2", name, age, new Date());
            resolve("2");
        }, 2000);
    });
});

asyncSeriesHook.tapPromise("3", (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("3", name, age, new Date());
            resolve("3");
            console.timeEnd("time");
        }, 3000);
    });
});

// 触发事件，让监听函数执行
asyncSeriesHook.promise("panda", 18).then(ret => {
    console.log(ret);
});