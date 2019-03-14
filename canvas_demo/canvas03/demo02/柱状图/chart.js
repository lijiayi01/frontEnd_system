class Chart{
    // 图表类型: 柱状图 折线图 扇形图

    constructor(option){
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
            this.animate();
        }

    }
    // 初始化canvas，比如宽高
    initCanvas(){
        const el = this.el;
        let canvas = document.createElement('canvas');
        /*
        * 为了精简，需将宽高通过内联的方式挂在到el上
        * */
        el.appendChild(canvas);
        let width = el.style.width,
            height = el.style.height;
        console.log(width,height)
        canvas.width = width.slice(0,-2);
        canvas.height = height.slice(0,-2);
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');
        let start = 1,end = 100,speed = 50;
        this.start = start;
        this.end = end;
    }

    // 绘制柱状图
    drawBar(){
        this.drawX()
    }
    // 绘制x y轴
    drawX(){
        let ctx = this.ctx;
        // 解决1px模糊问题
        ctx.translate(0.5,0.5)
        // 每个柱状图margin距离
        let nMargin = 30;
        // 绘制的图形距离canvas (0,0) 点距离
        let nPading = 60;
        // XY焦点的位置
        let xPos = nPading;
        let yPos = this.height - nPading;
        let xWidth = this.width - nPading*2;
        let yHeight = this.height - nPading*2;
        // x轴
        ctx.moveTo(xPos,yPos);
        ctx.lineTo(xPos+xWidth,yPos);
        ctx.stroke();
        // y轴
        ctx.moveTo(xPos,yPos);
        ctx.lineTo(xPos,nPading);
        ctx.stroke();
        ctx.translate(-0.5,-0.5);

        // 绘制 x y 文字
        let xData = this.data.x;
        let len = xData.length;
        xData.map((value,index)=>{
            ctx.textAlign = 'center';
            // 坐标系需找对规律
            ctx.fillText(value,nPading + (index + 1)*(xWidth / len ) - (xWidth / len - nMargin) / 2,yPos + 20)
        });
        // 获取数据最大值最小值，初始化Y轴坐标系(坐标系应该比最小更小一点，比最大更大一点)
        let yMax , yMin ;
        let yData = this.data.y;
        // 判断数据是否为数字
        function isNumber(data){
            data.map((index,value)=>{
                if(typeof parseInt(value) !== 'Number'){
                    return false;
                }
            })
            return true;
        }
        if( !isNumber(yData)){
            console.error('y轴数据只能接收number类型')
        }else{
            yMax = Math.max.apply(null,yData); yMin = Math.min.apply(null,yData);
        }
        // !isNumber(yData) ?  console.error('y轴数据只能接收number类型') : (yMax = Math.max.apply(null,yData); yMin = Math.min.apply(null,yData););
        // 设置y轴 分为 10组，如果10 20 30 40 ... 90
        let yBasicGroup = 10;
        // y轴的起始点坐标
        let yBasic = [ 0, yMax+20];
        for(let i = 0; i <= yBasicGroup; i++){
            ctx.textAlign = 'right';
             ctx.fillText( i*((yMax+20) / yBasicGroup ), xPos -10, yPos - i*(yHeight / yBasicGroup) + 5)
        }

        yData.map((value,index)=>{
            console.log(value / (yMax+20) * yHeight)
            this.drawRect(nPading + index*(xWidth / len) + nMargin ,yPos - (value / (yMax+20) * yHeight),(xWidth / len) -nMargin, this.start/this.end*(value / (yMax+20) * yHeight))

        })


    }

    // 绘制rect
    drawRect(x,y,width,height){
        let ctx = this.ctx;
        ctx.fillStyle = this.data.colors;
        ctx.fillRect(x,y,width,height);

    }
    // 动画
    animate(){
        let ctx= this.ctx
        let timer = setInterval(()=>{

            this.start++;
            if(this.start<=this.end){
                ctx.clearRect(0,0,600,400)
                this.drawBar();
            }else{
                clearInterval(timer)
            }
        },this.speed)
    }


}
