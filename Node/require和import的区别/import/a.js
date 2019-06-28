let a = 1;

setTimeout(function () {
    a = 2;
},0)

let b = {
    x:1
}

setTimeout(function () {
    console.log(a)
    console.log(b)
},5000)
exports.a = a
exports.b = b