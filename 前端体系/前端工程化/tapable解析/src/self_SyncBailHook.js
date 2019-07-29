class SyncBailHook {

    constructor(arg) {
        this.arg = arg;
        this.task = [];
    }

    tap(name, callback) {
        this.task.push(callback)

    }

    call(...arg) {
        if (arg.length < this.arg.length) {
            console.warn('参数不足');
            return false;
        }
        arg = arg.slice(0, this.arg.length);

        let res, i = 0;

        do {
            res = this.task[i++](...arg);
        } while (res === undefined)

    }
}

let syncBailHook = new SyncBailHook(["name", "age"]);
 
// 注册事件
syncBailHook.tap("1", (name, age) => {console.log("1", name, age);return null});
 
syncBailHook.tap("2", (name, age) => {
  console.log("2", name, age);
  return "2";
});
 
syncBailHook.tap("3", (name, age) => console.log("3", name, age));
 
// 触发事件，让监听函数执行
syncBailHook.call("panda", 18);