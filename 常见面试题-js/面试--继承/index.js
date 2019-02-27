function Parent(name,age,sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.arr = [1,2,3]
}
Parent.prototype = {
    constructor:Parent,
    init:function () {
        console.log(this)
    },
    getList:function () {
        
    }
    
}
/*-----------------------构造函数继承-----------------------*/
// function Child(weight) {
//     Parent.call(this);
//     this.weight = weight;
//
// }
//
// var a = new Child(10);
// console.log(a);

/*------------------------原型链继承------------------------*/
// function Child(weight) {
//     this.weight = weight;
// }
// Child.prototype = new Parent('ljy',18,'男');
// var x = new Parent('ljy',18,'男');
// x.arr.push(4);
// console.log(x);
// var y = new Parent('ljy',18,'男');
// console.log(y);
// var a = new Child(10);
// a.arr.push(4);
// console.log(a);
// var b = new Child(20);
// console.log(b);

/*--------------------------组合继承-------------------------*/

// function Child(name,age,sex,weight) {
//     Parent.call(this,name,age,sex);
//     this.weight= weight;
// }
// Child.prototype =  new Parent();
// // 如果不设置，默认指向 Parent
// Child.prototype.constructor = Child;
// console.log(Child.prototype.constructor);
// Child.prototype.init = function () {
//     alert(1)
// }
// var a = new Child('ljy',18,'男',100);
// console.log(a);
// a.init();

/*----------------------------寄生组合继承------------------------*/
function Child(name,age,sex,weight) {
    Parent.call(this,name,age,sex);
    this.weight= weight;
}
// Child.prototype.__proto__ = Parent.prototype;
/*
* 我的第一想法是:Child.prototype. = Parent.prototype;
* 因为上面的组合继承虽然已经很好了，但是它会调用两次Parent()
* 组合继承方法的缺点:在Child原型中声明了Parent实例的属性，在Child实例中也声明了Parent实例的属性，造成内存浪费
*
* Child.prototype = Parent.prototype;这个方法可以完全解决实例重复问题，因为Child.prototype指向的是Parent.prototype，
* 并不像之前是指向Parent的实例
* 但是，有如下问题：如果修改了Child.prototype的值，势必会引起Parent.prototype变化，如何解决问题呢？
*
* 方法: 声明一个中间方法就好了
* function Create(obj){
*   var f = function(){};
*   f.prototype = obj;
*   return new f()
* }
* var basicObj =  Create(Parent.prototype);
* basicObj.constructor = Child;
* Child.prototype = Create(Parent.prototype)
*
* 上述代码就解决了上述问题
* */
function Create(obj){
   var f = function(){};
   f.prototype = obj;
   return new f()
}
 var basicObj =  Create(Parent.prototype);
 basicObj.constructor = Child;
 Child.prototype = basicObj
Child.__proto__ = Parent;
var a = new Child('ljy',18,'男',100);
console.log(a)
a.init();
console.log(a.constructor)