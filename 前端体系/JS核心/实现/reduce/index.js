// Array.prototype.MyReduce = function(callback, origin){
//     console.log(this)
//     var data = origin;
//     for(var i = 0; i<this.length; i++){
//         data = callback(data, this[i])
//     }
//     return data;
// }
// var arr = [1,2,3]
// var x = arr.MyReduce(function(pre, item){
//     return pre + item;
// }, 0)

var name = 'ljy'

var obj = {
    a: {
        b: ()=>{
            console.log(this.name)
        },
        name: '234'
    },
    name: 'jsjs'
}

obj.a.b()