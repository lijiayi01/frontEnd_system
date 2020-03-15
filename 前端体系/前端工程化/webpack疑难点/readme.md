# webpack疑难点

## 1.webpack是什么?为什么要用它

webpack是模块打包机，它可以分析项目结构，找到js以及一些不能直接被浏览器运行的拓展语言(scss ts)，并将其转化为浏览器可运行的结构。

为什么需要它？

1. 随着spa应用的崛起，以及es6+的发展，web应用越来越复杂，因为es5及其以下js不支持模块化，为了代码的清晰性，我们需要模块化编程。其实webpack并不单指webpack，指的是一整套的构建，比如babel-loader css-loader等等，它可以更好的集成这些插件，形成一套系统的构建方案。

2. 支持我们使用ts scss等浏览器不能识别的文件。

3. 支持热替换 生产环境打包等功能。

## 2.module，chunk 和 bundle 的区别是什么

module: 我们可以理解为我们编写的每个js文件，有多少个js文件就有多少个module。(其实每个css png 等也属于module)

chunk: webpack内部运行的概念，对依赖图的部分进行封装的结果。(不好理解，后面我们通过例子演示)

bundle: webpack打包生成后的文件，一般而言，一个chunk代表一个bundle

下面是例子：

``` 
    // 下面是webpack的配置文件
    entry: {
        main: ['./src/test.js', './src/main.js'],
        other: ['./src/other.js']
    },
    output:{
         filename:"[name].bundle.js"
    }

```
解释一下上面的例子，比如我们项目包含了3个文件分别是test.js main.js other.js

那么：

module: test.js main.js other.js (每一个js文件都是一个模块)

chunk: main other (就是对应entry中的对象的key)

bundle: main.bundle.js  other.bundle.js (打包生成的js文件)

补充：

另外，我们一般还会用到按需加载，比如在代码里有这样的代码：

```
  // import()： 按需加载
  // 里面的注释：代表这个动态代码chunkName，可查看打包出来的文件名称
  import(/* webpackChunkName: "MyFile" */'./dyImport').then((...rest)=>{
        console.log(...rest)
  })
```

如果代码中有按需加载的部分，这儿会单独的打包成一个js文件，所以一般而言，chunk = entry中的key + 按需加载的chunk

## 3.hash chunkhash contenthash区别

## 4. code split 是什么

## 5. tree shake是什么

## 6.webpack如何实现模块化

## 7.webpack的loader是什么？工作原理？如果编写一个一个自己的loader

## 8.如何实现一个plugin

## 9.webpack构建优化

## 10.webpack打包优化
