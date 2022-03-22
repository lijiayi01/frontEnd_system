var express=require("express")
var app=express()
//引用session
var session=require("express-session");
app.use(session({
  secret:"dsafsafsf",//设置签名秘钥  内容可以任意填写
  cookie:{maxAge:80*1000},//设置cookie的过期时间，例：80s后session和相应的cookie失效过期
  resave:true,//强制保存，如果session没有被修改也要重新保存
  saveUninitialized:false//如果原先没有session那么久设置，否则不设置
}))
//读取session
app.get("/select",function(req,res){
  //查看session
  console.log(req.session)
  res.send("查询成功")
})
//设置session里面的内容
app.get("/add",function(req,res){
  //往session里存储数据
  req.session.loginok=true;//loginok:可以是任意内容，可以为true或false
  res.send("添加成功")
})
app.get("/del",function(req,res){
  req.session.destroy();
  res.redirect("http://www.baidu.com");//删除成功后转到百度页面
  res.send("删除成功")
})
app.listen(3000)