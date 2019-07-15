const {SyncBailHook} = require('tapable')

let syncBailHook = new SyncBailHook(["name", "age"]);
 
// 注册事件
syncBailHook.tap("1", (name, age) => console.log("1", name, age));
 
syncBailHook.tap("2", (name, age) => {
  console.log("2", name, age);
  return "2";
});
 
syncBailHook.tap("3", (name, age) => console.log("3", name, age));
 
// 触发事件，让监听函数执行
syncBailHook.call("panda", 18);