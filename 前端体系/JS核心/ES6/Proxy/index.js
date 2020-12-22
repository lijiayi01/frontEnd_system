var origin = {}
var obj = new Proxy(origin, {
    get: function(target, propkey, receiver){
        console.log('getter')
        return Reflect.get(target, propkey, receiver)
    },

    set: function(target, propkey, value, receiver){
        console.log('setter')
        return Reflect.set(target, propkey,value, receiver)
    }
})

obj.a = 1;

var arr = [1, 2, 3];

var newArr = new Proxy(arr, {
    get(target, props){
        console.log('获取props', props)
        return target[props];
    },
    // set方法应该返回一个布尔值
    set(target, props, value){
        console.log('设置props', props)
        console.log('设置value', value)
        target[props] = value;
        return true;
    }
})

// 使用数组的push方法会先调用 get里面的push属性和length属性，然后设置 元素值和 length
// newArr.push(100)

function fn(x, y){
    return x + y;
}

var newFn = new Proxy(fn, {
    apply(target, isbings, arg){
        console.log(arg[0])
        return target(...arg)
    }
})