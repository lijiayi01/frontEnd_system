
async function a(){
    let result = await p();
    console.log(result)
}

a()
function p (){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(4);
        }, 2000)
    })
}

class Person{

}

let x = new Set([1, 2])

var arr = [1,2,3,4]
arr.includes('1');

const fn = (a, b)=>a+b;

new  Promise(()=>{

})