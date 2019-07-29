// interface Person{
//     name : string;
//     age: number
// }

// let p : Person = {
//     name: 'ljy',
//     age: 18,
// }

// interface Person{
//     name : string;
//     age ?: number
// }

// let p : Person = {
//     name: 'ljy',
// }

// interface Person{
//     name : string,
//     age : number,
//     [propName:string]:string
// }

// let p : Person = {
//     name: 'ljy',
//     age: 18,
//     '1': '1'
// }

interface Person {
    readonly id: number,
    name: string,
    age: number,
    [propName: string]: any
}

let p: Person = {
    id: 1,
    name: 'ljy',
    age: 18,
    sex: ' 男'
}

// p.id=2