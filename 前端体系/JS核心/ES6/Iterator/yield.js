function *countSalay(){
    var list = [1, 2, 3]
    for(var i = 0; i< list.length; i++){
        console.log(yield list[i])

    }

    return 10;
}

var fn = countSalay()
console.log(fn.next())
console.log(fn.next())
console.log(fn.next())
console.log(fn.next())

function* lazy(){
    function fn(){
        setTimeout(function(){
            console.log('dingshiqi')
        }, 1000)
    }

    yield fn();
    return 2;
}
var x = lazy();
// console.log(x.next())
// console.log(x.next())