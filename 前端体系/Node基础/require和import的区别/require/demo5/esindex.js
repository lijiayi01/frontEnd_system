// import a from './libs.js'

// console.log(a)

// import {a as a1, b} from './es6.js'

// console.log(a1)

setTimeout(function(){
    import('./es6.js').then((res)=>{
        const {a, b, 'default': c} = res;
        console.log(a, b, c)
    })
}, 1000)