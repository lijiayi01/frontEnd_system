class SyncLoopHook {

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


        this.task.forEach((item) => {
            do{
                res =  item(...arg);
            }while(res === true || res !== undefined )
        })

    }
}

// 创建实例
let syncLoopHook = new SyncLoopHook(["name", "age"]);
 
// 定义辅助变量
let total1 = 0;
let total2 = 0;
 
// 注册事件
syncLoopHook.tap("1", (name, age) => {
  console.log("1", name, age, total1);
  return total1++ < 2 ? true : undefined;
});
 
syncLoopHook.tap("2", (name, age) => {
  console.log("2", name, age, total2);
  return total2++ < 2 ? true : undefined;
});
 
syncLoopHook.tap("3", (name, age) => console.log("3", name, age));
 
// 触发事件，让监听函数执行
syncLoopHook.call("panda", 18);