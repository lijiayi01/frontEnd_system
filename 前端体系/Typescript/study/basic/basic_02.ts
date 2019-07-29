// let a = '123'
// a =2;

let b: any = '123'
b = 1;

let c: number | string;
c = 2;
c = '1223'

let d: number | string = 1;

d = '122'

// 编译报错
// let x : number | string;
// console.log(x.length)

let x : number | string = 'hello';
console.log(x.length)
