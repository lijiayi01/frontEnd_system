import {add} from '@/util/util'
interface Person{
    username: string,
    age: number
}

const p: Person = {
    username: '10',
    age: 1,
}

const fn = ():Promise<any>=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(2)
        }, 1000);
    })
}
// console.log("123")
$('#app').html(p.username);

$(function(){
    console.log(1)
})

$.each([1,2,3,4,5], function(item){
    console.log(item)
})

add(100, 200)

const r: Req = {
    url: '123',
    data: {
        b: 2
    }
}

console.log(r)

let s: Res = [1,2,3,]