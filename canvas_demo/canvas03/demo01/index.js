var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var raf;

//小球对象
var ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 1,
    radius: 25,
    color: '#1895c3',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

//清除画布
function clear() {
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

//小球运动及绘制的方法
function draw() {
    clear();
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
        ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
    }

    ball.draw();
    raf = window.requestAnimationFrame(draw);
}

//鼠标移动的时候 让小球跟着鼠标走
canvas.addEventListener('mousemove', function(e){
    clear();
    ball.x = e.clientX;
    ball.y = e.clientY;
    ball.draw();
});

//鼠标移入停止动画
canvas.addEventListener("mouseenter",function(e){
    window.cancelAnimationFrame(raf);
});

//鼠标移出继续动画
canvas.addEventListener("mouseout",function(e){
    raf = window.requestAnimationFrame(draw);
});

//开始第一帧动画
draw();



