class SyncHook {
    constructor(arg) {
        this.arg = arg;
        this.task = [];
    }

    tap(name, callback) {
        this.task.push(callback)
    }

    call(...arg) {
        if(arg.length < this.arg.length){
            console.warn('参数不足');
            return false;
        }
        arg = arg.slice(0, this.arg.length)
        this.task.forEach((item) => {
            item(...arg)
        })
    }
}

let syncHook = new SyncHook(["name", "age"]);
 
// 注册事件
syncHook.tap("1", (name, age) => console.log("1", name, age));
syncHook.tap("2", (name, age) => console.log("2", name, age));
syncHook.tap("3", (name, age) => console.log("3", name, age));
 
// 触发事件，让监听函数执行
syncHook.call("panda", 18); 

// 1 panda 18
// 2 panda 18
// 3 panda 18