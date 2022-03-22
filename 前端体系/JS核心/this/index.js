function foo() {
    console.log(this.a);
}

function active(fn) {
    fn()
}

var a = 20

var obj = {
    a: 10,
    getA: foo,
    active: active
}

active(obj.getA)
obj.active(obj.getA)


var n = 'window ';
var object = {
    n: 'object',
    getNO: function () {
        return function () {
            return this.n;
        }
    }
}
console.log(object.getNO()());