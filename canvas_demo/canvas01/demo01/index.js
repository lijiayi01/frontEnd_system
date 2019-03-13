var canvas = document.getElementById('myCanvas');

var ctx = canvas.getContext('2d');

// 绘制三角形
// ctx.beginPath();
//
// ctx.moveTo(100, 100);  //通常会使用moveTo()函数设置起点。我们也能够使用moveTo()绘制一些不连续的路径。
// ctx.lineTo(200,100);
// ctx.lineTo(200,200);
// ctx.fill()
// ctx.beginPath();
// ctx.beginPath();
// ctx.moveTo(300, 100);
// ctx.lineTo(300, 200);
// ctx.lineTo(400, 200);
//
// // ctx.closePath()
// ctx.stroke()

// 绘制笑脸
// ctx.beginPath();
// ctx.arc(100,100,50,0,Math.PI*2,true); // true代表逆时针 false代表顺时针
// ctx.stroke();
// ctx.beginPath();
// ctx.arc(75,75,5,0,Math.PI*2,true)
// ctx.stroke();
// ctx.beginPath();
// ctx.arc(115,75,5,0,Math.PI*2,true)
// ctx.stroke();
// ctx.beginPath();
// ctx.arc(100,100,35,0,Math.PI,false)
// ctx.stroke();

// 透明度使用
// ctx.fillStyle = "#fd0";
// ctx.fillRect(0,0,75,75);
// ctx.fillStyle = "#6c0";
// ctx.fillRect(75,0,75,75);
// ctx.fillStyle = "#09f";
// ctx.fillRect(0,75,75,75);
// ctx.fillStyle = "#f30";
// ctx.fillRect(75,75,75,75);
// ctx.fillStyle = "#fff";
//
// //设置透明值
// ctx.globalAlpha = 0.2;
// for(var i=0; i<7; i++){
//     ctx.beginPath();
//     // ctx.fillStyle = 'rgb('+Math.floor(255-42.5*i)+','+Math.floor(255-12.5*i)+',0)';
//     ctx.arc(75, 75, 10+10*i, 0, Math.PI*2, true);
//     ctx.fill();
// }

// 渐变
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//线性渐变
var lineargradient = ctx.createLinearGradient(0,0,0,140);
lineargradient.addColorStop(0,'#00ABEB');
lineargradient.addColorStop(0.5, "#fff");
lineargradient.addColorStop(0.5, "green");
lineargradient.addColorStop(1,'#fff');

var lineargradient2 = ctx.createLinearGradient(0,50,0,95);
lineargradient2.addColorStop(0,'#f00');
lineargradient2.addColorStop(1,'rgba(0,0,0,0)');

ctx.fillStyle = lineargradient;
ctx.strokeStyle = lineargradient2;

ctx.fillRect(10,10,130,130);
ctx.strokeRect(50,50,50,50);





