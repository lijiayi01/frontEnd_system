
class Echart {

    constructor(option) {
        this.el = option.el;
        this.data = option.data;
        this.ctx = this.el.getContext('2d');
        this.mousePosition = {
            x: 0,
            y: 0
        }
        this.init(option);
        
    }

    init(option) {
        this.initWidth(option);
        this.initToolTip();
        this.drawCircle()
        this.emitEvent()
    }

    // 初始化canvas宽高
    initWidth(option) {
        let el = this.el;
        el.width = option.width;
        el.height = option.height;
        this.width = option.width;
        this.height = option.height;
    }

    // 初始化tooltip
    initToolTip() {
        let data = this.data;
        let ctx = this.ctx;
        let total = data.reduce((num, item) => {
            return num + item.value;
        }, 0)
        this.total = total;

        data.forEach((item, key) => {

            ctx.beginPath()
            ctx.fillStyle = item.color;
            ctx.rect(10, 10 + key * 5 + key * 15, 40, 15);
            ctx.font = "12px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText(item.name + ':' + ((item.value / total * 100).toFixed(1) + '%'), 55, 12 + 20 * key);
            ctx.fill();

        })
    }

    // 绘制饼状图
    /**
     * 
     * @param {boolean} flag : 是否重绘
     */
    drawCircle(flag) {
        let data = this.data;
        let ctx = this.ctx;
        let width = this.width;
        let height = this.height;
        let total = this.total;
        let mousePosition = this.mousePosition;
        ctx.save();
        ctx.translate(width / 2, height / 2);
        //ctx.rotate(30 * Math.PI / 180)


        let start = 0;
        let lineStart = 0
        data.forEach((item, key) => {
            ctx.beginPath();
            ctx.fillStyle = item.color;
            ctx.moveTo(0,0);
            ctx.arc(0,0, 100, start, start + item.value / total * 2 * Math.PI);
            start += item.value / total * 2 * Math.PI;
            
            if(flag && ctx.isPointInPath(mousePosition.x, mousePosition.y)){
                ctx.globalAlpha=0.8;
            }
           
            ctx.closePath();
            ctx.fill()
            ctx.globalAlpha=1;

            // 绘制折线
            let r = 1.2 * 100;
            let initR = 100
            let cosA = r*Math.cos(lineStart + item.value / total * Math.PI);
            let sinA = r*Math.sin(lineStart + item.value / total * Math.PI);
            let initcosA = initR*Math.cos(lineStart + item.value / total * Math.PI);
            let initsinA = initR*Math.sin(lineStart + item.value / total * Math.PI);
            lineStart += item.value / total * 2 * Math.PI
            ctx.beginPath()
            ctx.strokeStyle = item.color;
            ctx.moveTo(initcosA,initsinA);
            ctx.lineTo(cosA, sinA);
            if(cosA < 0){
                ctx.lineTo(cosA-50, sinA);
            }else{
                ctx.lineTo(cosA+50, sinA);
            }
            ctx.stroke();
            ctx.beginPath();
            ctx.font = "12px Arial";
           
            ctx.textBaseline = "bottom";
            if(cosA < 0){
                ctx.textAlign = "left";
                ctx.fillText(item.name, cosA-50, sinA);
            }else{
                ctx.textAlign = "right";
                ctx.fillText(item.name, cosA+50, sinA);
            }
           
            ctx.fill();



        })
        ctx.restore();

    }

    // 事件
    emitEvent() {
        let canvas = this.el;
        let ctx = this.ctx;
        let width = this.width;
        let height = this.height;
        let timer = null;
        let self = this;
        canvas.onmousemove = function (e) {
            // 做节流处理
            let ev = e || window.event;
            if (ev.offsetX || ev.offsetX == 0) {
                self.mousePosition.x = ev.offsetX;
                self.mousePosition.y = ev.offsetY
            } else if (ev.layerX || ev.layerX == 0) {
                self.mousePosition.x = ev.layerX;
                self.mousePosition.y = ev.layerY;
            }


            clearTimeout(timer);
            timer = setTimeout(() => {
                ctx.clearRect(0, 0, width, height)
                self.initToolTip()
                self.drawCircle(true)
            }, 10)

        }
    }

}