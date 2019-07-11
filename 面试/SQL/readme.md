## mysql常见用法： ##

### 1. limit用法： ###

<font color=#ff502c>limit常见用法:</font>

```
    /*
        *指的是从从第2行开始搜寻，只找三行数据
        *mysql的offset可以认为类似与数组的索引，第一行数据索引为0，依次类推
    */

    select * from person limit 3 offset 1;

    // 代表从person表的第4行数据开始搜寻，搜寻一行数据

    select * from person limit3,1
```
注意： 如果有order by ，需limit放到最后

### 2. order by 用法： ###

order by 支持多个列排序

比如： order by a,b,c...

会先以a升序排列，如果搜寻的数据 a那个列有相同的，则通过b升序排列，依次类型。那么如果a那个列中没有相同的数据，则后面的b，c排序会废弃，不会影响到排列顺序


### 3. order limit where三者的写法顺序 ###

where order by limit: 这样的写法顺序(mysql顺序)
```
select * from website where alexa >10  order by alexa limit 3 offset 1;
```

### 4. where 用法 ###

1. 支持常见的比较运算符
```
   <  <=   >  >=  !=  <>(相当于!=)     
 ```
2. 支持多个表达式
```
SELECT * from website where (alexa >10 or alexa < 3) and country = 'US'
```

3. 注意运算顺序， 默认 and > or，所以上面的sql语句中，做了()处理，()的顺序 > and;建议使用()来做相关关键字的顺序排列

4. in 关键字：  IN 取一组由逗号分隔、括在圆括号中的合法值。其实in不过是完成了or相同的功能

```
select * from website where country in ('cn' , 'us')

select * from website WHERE country = 'us' or country = 'cn'
```

5. not 关键字：否定其后所跟的任何条件
```
select * from website WHERE not country = 'us'
```

6. like关键字： 后面跟一个类似正则的表达式<br>

    %: 类似于正则中 .* ；代表匹配0到n个任意字符
```
// 搜寻url中以http://开头，以.com结尾，中间任意字符的数据

select * from website where url like 'http://%.com'

```
<br>
    _: 类似与 *{1} ；代表匹配1个任意字符

```
select * from website WHERE country like 'u_'
```


