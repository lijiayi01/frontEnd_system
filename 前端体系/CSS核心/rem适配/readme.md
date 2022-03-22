# 移动端适配

## 淘宝flexable.js的思路

1. 如果html页面中未meta viewport，则通过获取设备dpr， 修改scale比例，然后获取屏幕宽度， 计算根元素font-size

2. 如果页面设置meta viewport，则通过正则匹配获取到scale， 获取平面内宽高，计算根元素font-size

## 最推荐的适配方案

flex + rem + vw + wh + px

布局使用flex，rem和vw可以随意选一个，用来设置元素宽高， px用来设置字体大小（字体一般无需自适应，大屏手机应该改显示会更多的内容，而非更大的字体）

## rem问题

因为rem计算会导致小数点， 如果使用float布局时，可能就会因为各个浏览器对小数点的处理不同，导致页面适配出现问题。

rem具体如何对小数点，请查看以下文章 `https://www.zhihu.com/question/264372456`

## em计算方式

1em = 当前元素的font-size，注意： 是当前元素，不是父元素！！！

为什么经常有人说是根据父元素的font-size计算呢？

如果当前元素未设置font-size， 自然会向父元素获取font-size, 如果父元素也未设置font-size,则一直往上，直到遇到有祖先元素有设置font-size。

但是我们知道，font-size是可以继承的， 所以记住 1em = 当前元素的font-size
    