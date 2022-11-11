const fn = (a: (number | string)[])=>{
    console.log(a)
}

fn([1,2, '3'])

let a: Object = '123'

console.log(a)

// let list1 : [number, string] = [1, '2', 3]
let n1: object = {};

interface Persons{
    name?: string,
    age: number,
    c(a: number):void
}

let p: Persons = {
    name: '123',
    age: 10,
    c: function(x){
        console.log(x)
    }
}

let p2: Person = {
    lastName: '123',
    firstName: '234'
}