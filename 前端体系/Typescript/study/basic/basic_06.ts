// function add<T>(input: T): T {
//     return input;
// }

// add('1')



// class Animal<U>{
//     who: U;
//     constructor(name: U) {
//         this.who = name;
//     }

//     say(code: U): U {
//         console.log(code)
//         return code;
//     }
// }

// let a1 = new Animal<string>('1')
// a1.say('123')

// type x = 10;
interface Person2 {
    name: string;
    age: number;
    location: string;
}
type K1 = keyof Person2;
type K2 = keyof Person2[];

function x(p: K2){
    console.log(p)
}

function y<T extends Person2>(p: T): T{
    return p;
}

interface Person3  {
    name: string,
    age: number,
    location: string,
    city: string
}

y<Person3>({
    name: '123',
    age: 34,
    location: '222',
    city: '333'
});

type n  = 'click' | 'btton'

let j :n =  'click';

interface A{
    name: string,
    age: number
}

type x = keyof A;




type Human = {
    name: string,
   
  }
  type Duck = {
    name: string,
    age: number
  }
  type Bool = Duck extends Human ? 'yes' : 'no'; // Bool => 'yes'

  type P<T> = T extends 'x' ? string : number;
  type A3 = P<'x' | 'y'> 


  // 高级类型Pick的定义
type Pick1<T, K extends keyof T> = {
    [P in K]: T[P]
}
 
interface A {
    name: string;
    age: number;
    sex: number;
}
 
type A1 = Pick1<A, 'name'|'age'>
// 报错：类型“"key" | "noSuchKey"”不满足约束“keyof A”
// type A2 = Pick1<A, 'name'|'noSuchKey'>

type A4<T> = T extends keyof A ? 'string' : 'number'

type A5 = A4<'name' | 'ages'>
