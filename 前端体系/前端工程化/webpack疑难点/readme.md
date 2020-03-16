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

如果代码中有按需加载的部分，这儿会单独的打包成一个js文件，所以一般而言，chunk = entry中的key + 按需加载的chunk + 公共模块的chunk(如果已经配置过的话)

一个chunk对应一个bundle

## 3.hash chunkhash contenthash区别

这三个值通常是在webpack中的配置文件中的output中使用。

hash: 与项目构建相关，只要改变项目中的任何文件，打包后的hash值就不相同。其实这对于我们增加web缓存不友好，因为每次都会生成新的文件，web无法缓存。

chunkhash: 针对于chunk的，比如一个chunk中的module没有发生改变，那么这个chunk的chunkhash就不会发生改变，这样就不会像hash一样，改变了代码就会改变hash。

contenthash: 主要用于css输出，一般而言，我们会将css打包成单独的css文件。只要其css不修改，这个值就不会变。

一般而言，我们需要正确使用hash设置，保证我们web缓存。

## 4. code split 是什么

code split： 也就是代码分割。

下面我们会以代码的形式来讲解：

   1.只进行一个单入口配置，然后打包，会发生什么情况？(但是会依赖jquery)

```
    entry:{
        main: './src/main.js',
    },

    output: {
        filename: 'js/[name][hash].js',
        path: path.join(__dirname, 'dist')
    }

```
项目会打包成一个js文件，包含jq库。我们发现这个js文件很大，依赖包和业务代码都打包在一起，当我们业务代码改动，就会导致这个js的hash变化，所以无法使用到我们的web缓存。

2.现在我们配置多入口的，比如src下有main.js index.js, 且他们都引入了jq依赖

```
entry:{
        main: './src/main.js',
        index: './src/index.js'
    },

    output: {
        filename: 'js/[name][hash].js',
        path: path.join(__dirname, 'dist')
    }
```

打包发现： 打包会生成两个文件，但是这种方式如果chunk之间包含相同的依赖，那打包生成的文件都会包含jq。 反而引起了包过大的问题。

3.现在我们需要把jq单独的打包出来，怎么做呢?

```
    entry:{
        main: './src/main.js',
        index: './src/index.js'
    },

    output: {
        filename: 'js/[name][hash].js',
        path: path.join(__dirname, 'dist')
    },

  
    // 注意： 我们现在用的都是webpack4.x，所以之前的CommonsChunkPlugin已经移除，webpack推荐我们使用webpack4.x
    // optimization.splitChunks
    optimization:{
        splitChunks: {
            chunks: 'all'
        }
    }
```

打包看看，我们发现，jq已经被打包成一个单独的文件，是不是觉得配置很简单。其实是因为webpack本身为我们做了很多，比如上面` splitChunks: {
            chunks: 'all'
        }`内部已经做了很多处理，下面详细说一下splitChunks

```
    // 上面 = 下面的代码，webpack内部为我们做了很多
    splitChunks: {
        chunks: "all", // 代表拆分的范围，async： 只从异步加载的模块里面拆，initial： 只从入口模块进行拆分， all: 上面两者都有。 另外这里还可以是一个函数，但是一般使用比较少，一般我们使用'all'即可
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/, // 正则匹配，匹配node_modules目录下的第三方模块
                priority: -10 // 权重
            },
            default: {
                minChunks: 2, // 最少引用数为2
                priority: -20, // 权重
                reuseExistingChunk: true
            }
        }
    }

  ```

  我们当然也可以更加细微的分割代码，我们可以自己编写对应的正则，一般而言，我们使用webpack默认提供的即可。

```

    splitChunks: {
        chunks: "all", // 代表拆分的范围，async： 只从异步加载的模块里面拆，initial： 只从入口模块进行拆分， all: 上面两者都有。 另外这里还可以是一个函数，但是一般使用比较少，一般我们使用'all'即可
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/, // 正则匹配，匹配node_modules目录下的第三方模块
                priority: -10 // 权重
            },
            default: {
                minChunks: 2, // 最少引用数为2
                priority: -20, // 权重
                reuseExistingChunk: true
            },
            // 自定义
            xxx: {
                minChunks: 1, // 引用数为1
                priority: 0, // 权重： 如果配置了多个cacheGroups里的自定义选项，会按照priority的大小来决定谁先执行。值越大，越先执行
                test:  /[\\/]src[\\/]util[\\/]/ //比如匹配src目录下util里的下的文件
            }
        }
    }

  ```

  4.import():动态引入，会生成单独的chunk，上面已经提到过。

  5.css使用mini-css-extract-plugin生成单独的css文件

## 5. tree shake是什么

tree-shake: 就是删除那些项目中无用的代码(可能写了，但没用到)

如何配置：在package.json里配置 `sideEffects: false`

但是我们通过打包发现，其实有的时候并没有真正完全去除无用代码，因为在babel编译中无法得知真正的代码使用情况，比如副作用函数。

```
// maths.js
export function square ( x ) {
    return x.a
}
square({ a: 123 })

export function cube ( x ) {
    return x * x * x;
}
//main.js
import { cube } from './maths.js';
console.log( cube( 5 ) ); // 125
```

上面代码打包会形成：

```
function square ( x ) {
  return x.a
}
square({ a: 123 });

function cube ( x ) {
    return x * x * x;
}
console.log( cube( 5 ) ); 
```
其实我们认为square就应该被删除，但是为深刻打包后还是出现了呢？ 

我们很疑惑： 不过就是获取了一下对象的属性，怎么就有副作用了，不过babel认为确实有副作用。

一般我们认为，以下几种就属于有副作用：

1. 立即执行函数
2. 函数里使用了外部变量
3. 修改了window的属性
4. 是否复写了原生对象方法

其实还有很多，不过在我们编写第3方库的时候，其实只要保证我们写的代码不会影响到其他包，我们就可以认为我们写的写的库是无副作用的，可以添加` sideEffects: false `(代表没有副作用)，大家有兴趣的可以查看vue的sideEffects属性。

但是笔者不建议在项目中使用这个属性，因为它非常考验程序员的开发能力，而且配置相对复杂，但是在编写插件库的时候可以考虑使用。

## 6.webpack如何实现模块化

## 7.webpack的loader是什么？工作原理？如何编写一个一个自己的loader

## 8.如何实现一个plugin

## 9.webpack构建优化

## 10.webpack打包优化
