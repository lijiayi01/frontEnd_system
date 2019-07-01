function Parent(name,age,sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
}

var a = new Parent('ljy',18,'男');
console.log(a); //Parent { name: 'ljy', age: 18, sex: '男' }

/*
* 我们想一下
* 1.在Parent函数中，其实并没有返回值，为什么打印中有返回值
* 2.为什么就生成了一个对象
* */

// 自己实现
function _new(prototypeFn,name,age,sex){
     // 首先将arguments 转化为 数组
    var arr = Array.prototype.slice.call(arguments);
    var prototypeFn = arr.shift();
    var obj = {};
    obj.__proto__ = prototypeFn.prototype;
    var returnText = prototypeFn.apply(obj,arr);

    // 另外：如果构造函数一个新对象，则返回这个新对象，否则返回obj
    // 如果返回number string boolean等，new方法会忽略该返回值
    // 如果构造函数没有返回，则默认返回obj

    if(typeof returnText === 'object' && returnText != null){
        return returnText
    }else{
        return obj;
    }
}

var b= _new(Parent,'ljy',18,'男');
console.log(b); //Parent { name: 'ljy', age: 18, sex: '男' }

/*
* 总结:
* new究竟干了什么？
  创建一个空对象，作为将要返回的对象实例。
  将这个空对象的原型，指向构造函数的prototype属性。
  将这个空对象赋值给函数内部的this关键字。
  开始执行构造函数内部的代码。
* */