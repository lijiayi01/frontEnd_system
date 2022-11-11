// 本道题我们希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。
// function f(a: string | number, b: string | number) {
//     if (typeof a === 'string') {
//       return a + ':' + b; // no error but b can be number!
//     } else {
//         console.log(b);
//       return a + b; // error as b can be number | string
//     }
//   }
  
function f<T extends string | number>(a: T, b: T) {
    if (typeof a === 'string') {
      return a + ':' + b; // no error but b can be number!
    } else {
      return (a as number) + (b as number); // error as b can be number | string
    }
  }
  f(2, 3); // Ok
  f('1', 2)
//   f(1, 'a'); // Error
//   f('a', 2); // Error
//   f('a', 'b') // Ok
type Combinable = string | number; 
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

  const result = add('Semlinker', ' Kakuqo');
  result.split('')
  function add2(a : number, b: number | string){
    return a + b;
  }

  let v : string | number = '10';
  let ff :number = (<string>v).length;

  interface N{
      [props: string]: string,
      age?: string
  }


 function c<T extends keyof Person2>(x: T){
    console.log(x)
 }

 c('name')

 type A7 = 'name' |  'age'  | 'location' | 'city' extends keyof Person2 ? string : number;

 type PickUser = Pick<Person2, "name">

 type A8<T> =T extends string ? string : boolean;
 let gg: A8<'34'> = 21;
