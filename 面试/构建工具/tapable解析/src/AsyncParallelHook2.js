// AsyncSeriesHook 钩子：tapPromise/promise 的使用
const { AsyncSeriesHook } = require("tapable");
 
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

// 1 panda 18 2019-07-15T09:20:37.648Z
// 2 panda 18 2019-07-15T09:20:39.656Z
// 3 panda 18 2019-07-15T09:20:42.658Z
// time: 6019.048ms
// [ '1', '2', '3' ]