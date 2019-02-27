/*
* 首先说三者的相同点：
* 都是为了改变函数体内的this指向
*
* 不同点：
* call()：第一个参数是要this要指向的对象，后面的参数则按照参数顺序传递进去
* apply():第一个参数是要this要指向的对象，后面的参数以数组格式传递进去
* bind():第一个参数是要this要指向的对象,但是其返回的依然是函数
*/

Function.prototype.myCall = function () {
    var args = Array.prototype.slice.call(arguments);
    // this指向
    var context = args.shift();
    if(context ==  null){
        context = window
    }
    context.fn= this;
    // 这儿有个问题，如果args是个数组,如[1,2,3],args.toString()会转为"1,2,3" 将其看成一个整体，会造成bug
    // var result = context.fn(args.toString());

    // 解决上述问题,需使用eval方法
    if(args.length){
        var arr = [];
        for(var i= 0; i < args.length; i++){
            arr.push('args['+i+']');
        }
        var result = eval("context.fn(" + arr.toString() + ")");
    }else{
        var result = context['fn']();
    }

    delete context.fn;

    return result;

}

Function.prototype.myApply = function () {
    var args = Array.prototype.slice.call(arguments);
    // this指向
    var context = args.shift();
    // 因为apply函数第2个参数是数组，则如果还有第3个参数，则warn
    if(args.length > 1){
        throw new Error('apply函数只能有两个参数');
        return false;
    }
    if(context ==  null){
        context = window
    }
    context.fn= this;

    if(args.length){
        var arr = [];
        for(var i = 0; i < args[0].length; i++ ){
            arr.push('args[0]['+i+']');
        }
        var result = eval('context.fn('+arr.toString()+')')
    }else{
        var result = context.fn()
    }
    delete context.fn;

    return result;

}


Function.prototype.myBind = function () {
    var args = Array.prototype.slice.call(arguments);
    var context =  args.shift();
    var _this = this;
    return function () {
        return _this.apply(context,args.concat(Array.prototype.slice.call(arguments)))
    }
}



var a = {
    name:'ljy',
    log:function(x,y){
        console.log(this.name);
        return this.name+x+y
    }
}

var name = 'qianduan'
console.log(a.log.myCall(null,'24','男'))
console.log(a.log.myApply(null,['24','男']))
console.log(a.log.myBind(null)('24','男'))
