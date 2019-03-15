class Chart{
    constructor(option){
        // 图表类型: 柱状图 折线图 扇形图
        this.chartType = ['bar','line','fan'];
        // canvas放在哪个el内
        this.el = option.el;
        // 绘制图的类型，如饼状图 柱状图等
        this.type = option.type;
        // 数据
        this.data = option.data;
        // 传递数据结构为:
        // {
        //     title:'标题',
        //     x:[
        //         2007,2008,2009,2010,2011,2012
        //     ],
        //     y:[
        //         100,120,140,154,112,200
        //     ],
        //     xTips:'年份',
        //     yTips:'产量',
        //     colors:'#ff0'
        // }
        this.render();
    }
    // 渲染函数
    render(){
        this.initCanvas();
        if(this.type == this.chartType[0]){
            this.drawBar();
            this.eventFn()
        }else if(this.type == this.chartType[1]){
            this.drawLine();
            // this.eventFn();

        }

    }
    // 初始化canvas，比如宽高
    initCanvas() {
        const el = this.el;
        let canvas = document.createElement('canvas');
        /*
        * 为了精简，需将宽高通过内联的方式挂在到el上
        * */
        el.appendChild(canvas);
        let width = el.style.width,
            height = el.style.height;
        // 默认获取的元素带'px'，需去掉
        canvas.width = parseInt(width.slice(0, -2));
        canvas.height = parseInt(height.slice(0, -2));
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');

        //canvas相关配置
        // 每个柱状图margin距离
        let nMargin = 30;
        // 绘制的图形距离canvas (0,0) 点距离
        let nPading = 60;
        this.nMargin = nMargin;
        this.nPading = nPading;

        // 运动相关信息
        let start = 1, end = 100, speed = 10;
        this.start = start;
        this.end = end;
        this.speed = speed;

        // 事件相关 鼠标坐标
        this.mousePosition = {
            x: 0,
            y: 0
        }
    }


    // 绘制柱状图
    drawBar(){
        this.drawXY();
        this.drawBarRect();
    }

    // 绘制折线图
    drawLine(){
        this.drawXY();
        this.drawJoinLine();
    }

    // 绘制x y轴
    drawXY(){
        let { ctx, nMargin, nPading } = this;
        // 解决1px模糊问题
        ctx.translate(0.5,0.5)
        // XY焦点的位置(原点)
        let xPos = nPading;
        let yPos = parseInt(this.height - nPading);
        // xy在canvas中占据的宽高
        let xWidth = parseInt(this.width - nPading*2);
        let yHeight = parseInt(this.height - nPading*2);
        this.xPos = xPos;
        this.yPos = yPos;
        this.xWidth = xWidth;
        this.yHeight = yHeight;
        ctx.strokeStyle = '#000'
        // x轴
        ctx.beginPath()
        ctx.moveTo(xPos,yPos);
        ctx.lineTo(xPos+xWidth,yPos);
        ctx.stroke();
        ctx.closePath()
        // y轴
        ctx.beginPath()
        ctx.moveTo(xPos,yPos);
        ctx.lineTo(xPos,nPading);
        ctx.stroke();
        ctx.closePath()
        ctx.translate(-0.5,-0.5);

        // 绘制 x y 文字
        let xData = this.data.x;
        let len = xData.length;
        ctx.fillStyle = '#000';
        xData.map((value,index)=>{
            ctx.textAlign = 'center';
            // 坐标系需找对规律
            ctx.fillText(value,nPading + (index + 1)*(xWidth / len ) - (xWidth / len - nMargin) / 2,yPos + 20)
        });
        // 获取数据最大值最小值，初始化Y轴坐标系(坐标系应该比最小更小一点，比最大更大一点)
        let yMax , yMin ;
        let yData = this.data.y;

        if( !isNumber(yData)){
            console.error('y轴数据只能接收number类型')
        }else{
            yMax = parseInt(Math.max.apply(null,yData)); yMin = parseInt(Math.min.apply(null,yData));
        }
        // !isNumber(yData) ?  console.error('y轴数据只能接收number类型') : (yMax = Math.max.apply(null,yData); yMin = Math.min.apply(null,yData););
        // 设置y轴 分为 10组，如果10 20 30 40 ... 90
        let yBasicGroup = 10;
        let maxBasic = 20;
        // y轴的起始点坐标
        let yBasic = [ 0, yMax+maxBasic];
        this.yBasic = yBasic
        for(let i = 0; i <= yBasicGroup; i++){
            ctx.textAlign = 'right';
            ctx.fillText( i*((yMax+20) / yBasicGroup ), xPos -10, yPos - i*(yHeight / yBasicGroup) + 5);
        }
    }

    // 绘制柱状图rect
    drawBarRect(flag){
        let ctx = this.ctx
        let yData = this.data.y;
        let len = yData.length;
        let { yPos, nMargin, nPading, xWidth, yHeight, yBasic, start, end} = this;
        // ctx.fillStyle = '#0f0';

        yData.map((value,index)=>{
            let rectWidth = (xWidth / len) -nMargin;
            let rectHeight = start / end *(value / (yBasic[1]) * yHeight);
            let x = nPading + index*(xWidth / len) + nMargin;
            let y = yPos - rectHeight;
            this.drawRect(x,y,rectWidth, rectHeight,flag);
            ctx.textAlign = 'left'
            ctx.fillText(parseInt( start / end * value)>value?value:parseInt( start / end * value),x,y-10);


        });
        this.animate();

    }

    // 绘制折线图内容
    drawJoinLine(){
        console.log(this)
        let { ctx, data, xWidth, yHeight, yBasic, nPading, yPos } = this;
        let yData = data.y;
        let len  = yData.length;
        ctx.beginPath();
        ctx.strokeStyle = "#566a80";
        yData.map((value,key)=>{
            let x = nPading + (key+0.5)*(xWidth / len);
            let y = (yHeight*value)/yBasic[1];
            console.log(x,y)
            if(key == 0){
                ctx.moveTo(x,y);
            }else{
                ctx.lineTo(x,y);
            }
        })
        ctx.stroke()
        ctx.lineTo(nPading + (len-0.5)*(xWidth / len),yPos);
        ctx.lineTo(nPading+0.5*(xWidth / len),yPos);
        var gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(133,171,212,0.6)');
        gradient.addColorStop(1, 'rgba(133,171,212,0.1)');
        ctx.fillStyle = gradient
        ctx.fill()
        ctx.closePath()

        yData.map((value,key)=>{
            ctx.beginPath();
            ctx.fillStyle = '#f00'
            let x = nPading + (key+0.5)*(xWidth / len);
            let y = (yHeight*value)/yBasic[1];
            ctx.arc(x,y,2,0,2*Math.PI,true);
            ctx.fill();
            ctx.closePath();
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center'
            ctx.fillText(value,x,y-5)
        })

    }
    // 绘制rect
    drawRect(x,y,width,height,flag){
        let { ctx, mousePosition } = this;
        ctx.beginPath();
        ctx.rect(x,y,width,height);
        if(flag &&  ctx.isPointInPath(mousePosition.x, mousePosition.y)){
            console.log(mousePosition)
            ctx.fillStyle = '#f00'
        }else{
            ctx.fillStyle = '#0f0'
        }
        ctx.fill();
        ctx.closePath();

    }
    // 动画
    animate(){
        let { ctx, speed, width, height}= this;
        if(this.start<=this.end){
            this.start++
            setTimeout(()=>{
                ctx.clearRect(0,0,width,height);
                this.drawXY();
                this.drawBarRect();
            },speed)
        }

    }

    // 事件event
    eventFn(){
        let { canvas, ctx, width, height } = this;
        let timer = null;
        canvas.addEventListener('mousemove', (e)=> {
            let ev = e || window.event;
            if( e.offsetX || e.offsetX==0 ){
                this.mousePosition.x = e.offsetX;
                this.mousePosition.y = e.offsetY;
            }else if( e.layerX || e.layerX==0 ){
                this.mousePosition.x = e.layerX;
                this.mousePosition.y = e.layerY;
            }
            clearTimeout(timer);
            timer = setTimeout(()=>{
                ctx.clearRect(0,0,width, height);
                this.drawXY();
                this.drawBarRect(true);
            })
        })
    }


}
// 判断数据是否为数字
function isNumber(data){
    data.map((index,value)=>{
        if(typeof parseInt(value) !== 'Number'){
            return false;
        }
    })
    return true;
}
