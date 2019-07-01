// 1.实现一个函数，判断输入是不是回文字符串。
function isSameReseverStr(str){
    var reverseStr = str.split('').reverse().join('');
    if(reverseStr === str){
        return true;
    }
    return false;
}

// console.log(isSameReseverStr('level'))
// 2.两种以上方式实现已知或者未知宽度的垂直水平居中。
// 方法1:利用 transform:translate(-50%,-50%)
// .wrap{
//     position:relative;
// }
// .wrap .box{
//     position:absolute;
//     left:50%;
//     top:50%;
//     transform:translate(-50%,-50%)
// }
// 方法2:利用flex
// .wrap{
//     display:flex;
//     align-item:center;
//    justify-content:center;
// }
// .wrap .box{
//     width:100%;
//     height:100%;
// }
// 方法3：利用margin:负值(用于已知宽高度)
//.wrap{
//     position:relative;
// }
// .wrap .box{
//     position:absolute;
//     left:50%;
//     top:50%;
//     width:100px;
//     height:100px;
//     margin::-50px 0 0 -50px
// }

// 3.实现效果，点击容器内的图标，图标边框变成border 1px solid red，点击空白处重置。

// 4.请简单实现双向数据绑定mvvm
// var data = {};
// var val = 1;
// Object.defineProperty(data,'a',{
//     get:function () {
//         console.log('getter');
//         return val;
//     },
//     set:function (newVal) {
//         console.log('setter');
//         val = newVal;
//         input.value = val;
//     }
// })
// input.addEventListener('input',function (e) {
//     data.a = e.target.value;
// })

//5.实现Storage，使得该对象为单例，并对localStorage进行封装设置值setItem(key,value)和getItem(key)
// (function (window,undifend) {
//     var instance;
//     function Storage() {
//
//     }
//     Storage.prototype = {
//         constructor : Storage,
//         setItem:function (key,val) {
//             if(typeof val === 'object'){
//                 val = JSON.stringify(val);
//             }
//             localStorage.setItem(key,val);
//             return this;
//         },
//         getItem:function (key) {
//             return localStorage.getItem(key);
//         }
//
//
//     }
//     function getSingle(){
//         if(!instance){
//             instance = new Storage();
//         }
//         return instance;
//     }
//     window.getSingle = getSingle;
// })(global)
// var x= getSingle();
// var y = getSingle();
// console.log(x === y);
// x.setItem('key1',123);

