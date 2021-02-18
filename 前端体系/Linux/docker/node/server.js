// nodejs服务器
const express = require("express");

// 创建express实例和vue实例
const app = express();


app.get("/", async (req, res) => {
  try {
    const html = 'hello';
    console.log(html);
    res.send(html);
  } catch (err) {
    res.status(500).send("服务器内部错误");
  }
});

app.listen(3000, () => {
  console.log("服务器启动成功");
});

