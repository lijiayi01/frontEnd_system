## js == 规则：

js ==规则是以非常怪异的运算方式。

==主要用在一下几种情况：

1. 基本数据类型的比较
2. null undefined比较
3. 基本数据类型和引用数据类型比较
4. 引用数据类型比较

### 1.基本数据类型的比较

我们暂时不考虑Symbol，而且null undefined会在下面讲解，那这儿说的基本数据类型只有number string boolean。

规则：<font color="#f00">如果两个数据基础数据类型不同，都将转成number运算。如果相同，则直接比较</font>

```
   1 == false     ==> Number(1) == Number(false)   也就是 1 == 0    false

   1 == '22ab'    ==> Number(1) == Number('22ab')   也就是1 == NaN  false (NaN不等于任何数，包括本身)

   '1' == true    ==>Number('1') == Number(true)  也就是 1 == 1 true 

```

### 2. null undefined比较

记住一点就好了 undefined null只与undefined null相等

```
undefined == null

undefined == undefined
```

### 3.基本数据类型和引用数据类型比较

比如 1 == []

基本数据类型和引用数据类型的比较相对复杂: 

前置知识：
valueOf() 方法返回对象的原始值。<br>
toString() 返回一个字符串

规则：

1. 如果引用数据类型有valueOf方法，返回一个原始类型，那么js会按照原始数据类型比较规则，进行比较

2. 否则，如果引用数据类型有toString方法，返回一个原始类型，那么js会按照原始数据类型比较规则而进行比较

3. 如果上面都不成立，抛出错误。

注意的是： 会先调用valueOf()，后调toString()

```
 1 == [1]

 [1]的valueOf()返回值为[1]，不满足 "返回原始类型"条件，所以使用toString()方法，返回 '1',然后将'1'转成Number， 1== 1， true

 1 ==[1,2],
 
 [1,2]valueOf()返回值为[1，2]，不满足 "返回原始类型"条件，所以使用toString()方法，返回 '1，2',然后将'1，2'转成Number， 1 == NaN， false

 1 == {}
 
 {} valueOf()返回值是一个{}，不满足 "返回原始类型"条件，所以使用toString()方法，返回 '[object Object]',然后将'[object Object]'转成Number， 1 == NaN， false

```

注意：如果我们重写了valueOf或者toString()方法呢？

```
var a = {

    valueOf(){

        return 'abc'
    },

    toString(){
        return '123'
    }
}

a == 'abc'    true
```

上面更加证明了valueOf的权重 > toString的权重。

### 4.引用数据类型比较

引用数据类型比较，其实是对它们引用地址的比较。

```
[] == []  false

[] == {}  false

{} == function(){}  false

```