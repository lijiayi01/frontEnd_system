class SyncWaterfallHook {

    constructor(arg) {
        this.arg = arg;
        this.task = [];
    }

    tap(name, callback) {
        this.task.push(callback);
    }

    call(...arg) {
        if (arg.length < this.arg.length) {
            console.warn('参数不足');
            return false;
        }

        arg = arg.slice(0, this.arg.length);

        let [first,...other] = this.task;
        let res;
        res = other.reduce((total, item)=>{
            return item(total ? total : arg[0])
        },first(...arg))

        return res
        
    }
}

// 创建实例
let syncWaterfallHook = new SyncWaterfallHook(["name", "age"]);
 
// 注册事件
syncWaterfallHook.tap("1", (name, age) => {
  console.log("1", name, age);
//   return "1";
});
 
syncWaterfallHook.tap("2", data => {
  console.log("2", data);
//   return "2";
});
 
syncWaterfallHook.tap("3", data => {
  console.log("3", data);
  return "3"
});
 
// 触发事件，让监听函数执行
let ret = syncWaterfallHook.call("panda", 18);
console.log("call", ret);
