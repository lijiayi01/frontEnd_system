// nodejs服务器
const express = require("express");
const Vue = require("vue");

// 创建express实例和vue实例
const app = express();

// 创建渲染器
// 是一个工厂函数：一个函数返回一个对象
const renderer = require("vue-server-renderer").createRenderer();

const page = new Vue({
  data: { title: "哈哈哈" },
  template: "<div>{{title}}<div> hello, vue ssr! </div></div>"
});

app.get("/", async (req, res) => {
  try {
    const html = await renderer.renderToString(page);
    console.log(html);
    res.send(html);
  } catch (err) {
    res.status(500).send("服务器内部错误");
  }
});

app.listen(3000, () => {
  console.log("服务器启动成功");
});

