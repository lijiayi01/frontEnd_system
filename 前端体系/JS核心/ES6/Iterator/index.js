
/**
 * 迭代对象特点：
 * 可被for of循环
 * 要求：
 *      1. 迭代对象必须在其本身或者其原型链含有一个Symbol.iterator属性，其值是一个无参函数,函数返回迭代器协议
 *      2. 迭代器协议：必须实现next方法，该方法返回一个对象，拥有done(boolean)和value属性
 *  js中默认的迭代对象有： String，Array，Map，Set
 */

Object.prototype[Symbol.iterator] = function(){
    let index = 0;
    let keys = Object.keys(this);
    return {
        next: ()=>{
           return {
                value: [keys[index], this[keys[index++]]],
                done: index > keys.length
           } 
        }
    }
}
let obj = {
    a: 1,
    b:2,
}
for(var [key, value] of obj){
    console.log(`${key}:${value}`)
};