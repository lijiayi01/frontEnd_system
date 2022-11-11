declare function $(x:string):any;
declare function $(callback: ()=>any):any

declare namespace ${
    const each: (arr: any[], callback: (item: any)=>any)=>any
}

interface Req{
    url: string,
    data: object
}

declare type Res = number[]
