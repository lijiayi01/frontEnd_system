const foo = {
    count: 0
}

exports.foo = foo;

setTimeout(()=>{
    exports.foo = "123";
}, 1000)