## typescript学习

### 基础：

typescript其实就是带类型的JavaScript。平时我们使用的js是弱类型语言，对于一个变量可以随便赋值，这个变量可以任何的数据类型。<br>

而typescript就是让这个变量更加有约束性。一个变量如果确定下来是numbber类型，那么这个变量就不能赋值为string或者其他。如果确定将这个变量赋值为string，typescript编译器将会报错。<br>

typescript让js有点像静态语言，代码就要经过编译。语法尤其像java，因为typescript包含了类似java的很多概念，如接口 泛型等等。<br>

尽管typescript提供了很多概念，但是我们页可以直接编写js代码，并将其后缀改为.ts,ts编译器不会报错。因为typescript是js的超类，会自动识别js代码。

#### 1. 基础数据类型

js的基础数据类型有 number string boolean null undefined Symbol(es6)

下面说一下ts下这几种基础数据类型的使用：(代码见study/basic/basic_01.ts)

**格式： 变量 : 变量类型 = 值**

```
    let num : number = 12;
    let str : string = '123';
    let flag : boolean = true;
    let c : null = null;
    let d : undefined = undefined;
```

需要注意的几个问题：

1. NaN Infinity也属于number类型
2. 通过构造函数返回的变量是这个构造函数对象
3. null和undefined是所有类型的子类，也就是说undefined可以赋值给number类型

#### 2.any任意值

我们在项目中初用typescript的时候，可能无法很好的使用它。比如一个变量不能很确定的确定其变量，此时就会用到any


any:代表任意值，也就是说这个变量可以被任意类型赋值

```
    let a : any = 1;
    a = '123';
    a = false;
```
等同于js的
```
    let a = 1;
    a = '123';
    a = false;
```

#### 3.类型推论

typescript会在变量没有指定数据类型时自动推断一个类型，这就是类型推论。

```
let a = '123'
a =2;
```
上面代码会报错: 根据类型推断，a的数据类型时string，当对a进行number类型的数值赋值时，编译报错。

```
let b : any = '123'
b=1
```

不会报错，因为指定了any类型(这就是我们初用typescript在项目中any不断的原因)

<font color="#f00">如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查</font>

#### 4.联合类型

联合类型表示变量取值可以是多种类型中的一种

语法: 变量 : 类型1 | 类型2  = 值

如果联合类型的方法或属性，则只能访问联合变量所有变量类型里的共有方法或属性

```
    let x : number | string;
    console.log(x.length)

```
编译失败，根据规则，要访问number和string的共有方法和属性。 number没有length属性，所以编译失败。

```
    let x : number | string = 'hello';
    console.log(x.length)
````
编译成功，因为此时x已经赋值了，根据类型推论，它是一个string类型值，有length属性

#### 5.对象的类型--接口

在typescript中，使用接口来定义对象类型。

接口是对行为的抽象，而具体实现由类实现。

关键字： interface 

```
interface Person{
    name : string;
    age: number
}

let p : Person = {
    name: 'ljy',
    age: 18
}
```
注意： 赋值的时候，变量的形状要和接口的形状一样。比如多加一个属性是报错的，少一个属性也是报错的。

如果想少一个属性编译也成功，需要用到可选属性。

可选属性: 需要在interface里属性后面加个 ? 

```
interface Person{
    name : string;
    age ?: number
}

let p : Person = {
    name: 'ljy',
}
```
但是依然不能添加新的属性

如果想加属性，需要用到任意属性

```
interface Person{
    name : string,
    age : number,
    [propName:string]:string
}

let p : Person = {
    name: 'ljy',
    age: 18,
    '1': '1'
}
```

编译失败，上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了

<font color="#f00">一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集</font>

只读属性：我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性

```
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

p.id=2
```
编译失败，因为id是一个只读属性



