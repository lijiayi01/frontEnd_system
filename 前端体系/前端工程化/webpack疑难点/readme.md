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
其实我们认为square就应该被删除，但是为什么打包后还是出现了呢？ 

我们很疑惑： 不过就是获取了一下对象的属性，怎么就有副作用了，不过babel认为确实有副作用。

一般我们认为，以下几种就属于有副作用：

1. 立即执行函数
2. 函数里使用了外部变量
3. 修改了window的属性
4. 是否复写了原生对象方法

其实还有很多，不过在我们编写第3方库的时候，其实只要保证我们写的代码不会影响到其他包，我们就可以认为我们写的写的库是无副作用的，可以添加` sideEffects: false `(代表没有副作用)，大家有兴趣的可以查看vue的sideEffects属性。

但是笔者不建议在项目中使用这个属性，因为它非常考验程序员的开发能力，而且配置相对复杂，但是在编写插件库的时候可以考虑使用。

## 6.webpack如何实现模块化

不知道大家有没有想过，webpack是如何将那么多的js代码打包成一个文件，并能让我们浏览器执行呢？我们代码写了那么多import，那webpack是如何将import这些代码转化成我们可执行的代码的?如果你有这些疑惑，那可以接着往下看。

这里我们先写个简单的demo，demo代码见 前端工程化/webpack/如何实现模块化

首先，src下我们有两个文件：

```
    // index.js
    function add(x){
        return x*2
    }
    export {add}

    // main.js
    import { add } from './index.js'

    const a= 1;

    add(a);
```
通过webpack将这两个代码打包，生成一个bundle.js文件，现在我们查看一下bundle.js文件.



```
 (function(modules) { // webpackBootstrap
 	// The module cache
 	var installedModules = {};

 	// The require function
 	function __webpack_require__(moduleId) {

 		// Check if module is in cache
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
     module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}


 	// expose the modules object (__webpack_modules__)
 	__webpack_require__.m = modules;

 	// expose the module cache
 	__webpack_require__.c = installedModules;

 	// define getter function for harmony exports
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};

 	// define __esModule on exports
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};

 	// create a fake namespace object
 	// mode & 1: value is a module id, require it
 	// mode & 2: merge all properties of value into the ns
 	// mode & 4: return value when already ns object
 	// mode & 8|1: behave like require
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	// getDefaultExport function for compatibility with non-harmony modules
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	// Object.prototype.hasOwnProperty.call
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	// __webpack_public_path__
 	__webpack_require__.p = "";


 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
 })
/************************************************************************/
 ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\nfunction add(x){\n    return x*2\n}\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\n\nconst a= 1;\n\nObject(_index_js__WEBPACK_IMPORTED_MODULE_0__[\"add\"])(a);\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

 });

```
乍一看，好像非常复杂的样子，那我们一步一步看下去。

首先，我们关注到这其实是个匿名函数：

```
(function(modules){

})({
    './src/index.js': function(){},
    './src/main.js': function(){}
})

```

这里很好理解，那我们继续下一步，看一下这个匿名函数内部的代码

```
    (function(module){
        var installedModules = {};
        function __webpack_require__(moduleId) {
            // Check if module is in cache
            if(installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            // Create a new module (and put it into the cache)
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            // 执行代码  
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

            // Flag the module as loaded
            module.l = true;

            // Return the exports of the module
            return module.exports;
        }


        // expose the modules object (__webpack_modules__)
        __webpack_require__.m = modules;

        // expose the module cache
        __webpack_require__.c = installedModules;

        // define getter function for harmony exports
        __webpack_require__.d = function(exports, name, getter) {
            if(!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, { enumerable: true, get: getter });
            }
        };

        // define __esModule on exports
        __webpack_require__.r = function(exports) {
            if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            }
            Object.defineProperty(exports, '__esModule', { value: true });
        };

        // Object.prototype.hasOwnProperty.call
        __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

        // __webpack_public_path__
        __webpack_require__.p = "";


        // Load entry module and return exports
        return __webpack_require__(__webpack_require__.s = "./src/main.js");
    })(...)

```
上面一些不是很重要的代码笔者已经删除了，我们还是不先关注具体实现，继续往下剖析这里面的代码结构。

上面的代码的结构应该就是下面这样

```
    (function(modules){
        function __webpack_require__ (moduleId){

        }

        ...


        return __webpack_require__('./src/main.js')
    })(...)

```

我们发现，最后一行后面的 函数参数就是我们的entry入口文件，那接着往下执行.

下面我们执行`__webpack_require__('./src/main.js')`

看看 __webpack_require__ 函数

```
    function __webpack_require__(moduleId) {
            // Check if module is in cache
            if(installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            // Create a new module (and put it into the cache)
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            // 执行代码  
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

            // Flag the module as loaded
            module.l = true;

            // Return the exports of the module
            return module.exports;
        }


```
这里我们把'./src/main.js'传入函数，`modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);` 我们发现了这行代码，modules是我们传入匿名函数的参数，它找到对应'./src/main.js'并自执行。

下面我们再看看'./src/main.js'的里的函数体,

```
    (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";

    __webpack_require__.r(__webpack_exports__);

    var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/index.js");

    const a= 1;

    Object(_index_js__WEBPACK_IMPORTED_MODULE_0__["add"])(a);

```

当我们格式化代码并删除一些没用的注释以后，函数体内容就很好理解了。

首先会执行__webpack_require__.r函数，那就看这个函数的实现。

```
 	__webpack_require__.r = function(exports) {

 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {

 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

 		}
         
 		Object.defineProperty(exports, '__esModule', { value: true });
 	}
```

很好理解，其实代表当前模板是个es模块

继续往下执行，` var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/index.js");`

这里又用到了__webpack__require__,其实这个函数就是webpack的核心函数。

那我们就执行__webpack_require__("./src/index.js")

看看'./src/index.js'的代码

```
    __webpack_require__.r(__webpack_exports__);

    __webpack_require__.d(__webpack_exports__, "add", function() { return add; });

    function add(x){  return x*2}
```

第一行代码我们就不解释了，代表当前模板是个es模块

下面我们发现了  __webpack_require__.d  函数，那就查看一下这个函数的实现

```
 	__webpack_require__.d = function(exports, name, getter) {

 		if(!__webpack_require__.o(exports, name)) {

 			Object.defineProperty(exports, name, { enumerable: true, get: getter });

 		}

 	};
```

这个代码我们应该特别户熟悉，vue的核心函数就是通过这个函数实现的，意思是给name设置getter，也就相对于exports.name = getter;

我们返回到index.js里看，那`__webpack_require__.d(__webpack_exports__, "add", function() { return add; });`不就相对于相当于为__webpack_exports__添加属性为add的key，getter为后面的函数。

我们在转到main.js, 那我们了解了

```
    var _index_js__WEBPACK_IMPORTED_MODULE_0__ = {

            add: function(){
                ...
            }
        
    }
```

上面不懂的好好看看__webpack_require__的返回。

继续往下， `Object(_index_js__WEBPACK_IMPORTED_MODULE_0__["add"])(a);`

是不是就相当于这个对象的add方法的执行。

到了这里，其实我们已经分析了webpack实现模块化的实现流程。

下面我们总结一下：

* webpack的模块化实际上依赖于__webpack__require__的，这个函数会返回一个exports对象。这样可以保证让其他模块通过对象.属性的方法调用。

到了这里大家可以好好屡屡流程，也可以自己动手打包一下，看看bundle内的代码，慢慢研究。


## 7.webpack的loader是什么？工作原理？如何编写一个一个自己的loader
[推荐阅读](https://www.jianshu.com/p/c021b78c9ef2)

webpack只能识别js文件，loader就是将css 图片等其他资源转换为js的模块

loader必须有如下条件

- 必须是一个node模块，必须返回一个函数

    ```JavaScript

    module.exports = function(source){

    }

    ```

loader内部可以获取options配置，也可以返回其他除了内容之外的东西，也支持同步异步转化

``` JavaScript

    const loaderUtils = require('loader-utils');
    module.exports = function(source){
        // 获取options配置， 就是在webpack中配置loader里的options
        loaderUtils.getOptions(this);

        // 如果是异步
        let callback = this.async(); // 代表异步
        asyncTask(source, (err, result)=>{
            // callback里支持返回其他数据
            // this.callback(
            //     // 当无法转换原内容时，给 Webpack 返回一个 Error
            //     err: Error | null,
            //     // 原内容转换后的内容
            //     content: string | Buffer,
            //     // 用于把转换后的内容得出原内容的 Source Map，方便调试
            //     sourceMap?: SourceMap,
            //     // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
            //     // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
            //     abstractSyntaxTree?: AST
            // );
            callback(err, code, map, ast)
        })

    }
    
 ```
只要按照上面的要求，足以编写一个自己的loader
## 8.如何实现一个plugin

## 9.webpack构建优化和打包优化

webpack的优化主要策略：

1. 使用多进程打包HappyPack, 但是注意：使用了也不代表一定会有特别大的优化速度，对于一些不大的项目，开启多进程反而会造成进程开辟的消耗。

代码： 
```
    const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: 5}); //构建共享进程池，包含5个进程
...
plugins: [
    // happypack并行处理
    new HappyPack({
        // 用唯一ID来代表当前HappyPack是用来处理一类特定文件的，与rules中的use对应
        id: 'babel',
        loaders: ['babel-loader?cacheDirectory'],//默认设置loader处理
        threadPool: happyThreadPool,//使用共享池处理
    }),
    new HappyPack({
        // 用唯一ID来代表当前HappyPack是用来处理一类特定文件的，与rules中的use对应
        id: 'css',
        loaders: [
            'css-loader',
            'postcss-loader',
            'sass-loader'],
            threadPool: happyThreadPool
    })
],
module: {
    rules: [
    {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=babel'],
        exclude: path.resolve(__dirname,' ./node_modules'),
    },
    {
        test: /\.(scss|css)$/,
        //使用的mini-css-extract-plugin提取css此处，如果放在上面会出错
        use: [MiniCssExtractPlugin.loader,'happypack/loader?id=css'],
        include:[
            path.resolve(__dirname,'src'),
            path.join(__dirname, './node_modules/antd')
        ]
    },
}

```
2. webpack的配置优化：比如 loader的处理目录, reslove.module的处理, resolve的extensions配置

```
// babel-loader只处理src下目录代码
{
    test: /\.js$/,
    use: [
        'babel-loader?cacheDirectory',//开启转换结果缓存
    ],
    include: path.resolve(__dirname, 'src'),//只对src目录中文件采用babel-loader
    exclude: path.resolve(__dirname,' ./node_modules'),//排除node_modules目录下的文件
}
// resolve.module配置： 这样的话，我们寻找第三方模块，可以快捷更多
resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
    }
// extensions配置: 一般而言，我们建议： 我们开发的时候，引入代码时把它的全部信息都写上
extensions: [".js", '....'],

```

3. DllPlugin优化

DllPlugin其实就是讲我们不用变的代码单独打包，比如vue react等，然后后续的代码构建就不会再去打包这些文件。可以极大的优化我们的构建速度。
首先，我们新建一个文件 webpack.dll.config.js
```
const path    = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
      vendor: ['vue-router','vuex','vue/dist/vue.common.js','vue/dist/vue.js','vue-loader/lib/component-normalizer.js','vue']
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve('./dist', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
};

```
然后，配置npm,在根目录下的package.json添加：
```
"script": {
    "build:dll" : "webpack --config webpack.dll.config.js的路径"
}
```

执行打包，会在dist目录下生成两个文件： vendor.dll.js 和 vendor-mainfest.json

然后在我们之前的webpack.pro.js里的plugin增加配置

```
new webpack.DllReferencePlugin({
    manifest: require('../dist/vendor-manifest.json')
})
```

在我们默认的html魔板中添加：
```
<script type="text/javascript" src="./vendor.dll.js"></script>
```

一般情况下，我们也会使用optimization.splitChunks来分包，但是使用optimization.splitChunks在构建过程中依然会再次构建。具体这两种方案由开发者自行选择。

4. externals配置

可以让webpack不打包这部分代码，这部分真正由cdn引入。

```
module.exports = {
    externals: {
        'vue': 'window.Vue',
        'vuex': 'window.Vuex',
        'vue-router': 'window.VueRouter'
        ...
    }
}
<script src="XXX/cdn/vue.min.js"></script>
<script src="XXX/cdn/vuex.min.js"></script>
<script src="XXX/cdn/vueRouter.min.js"></script>
```

5. 懒加载

一般分为路由懒加载和业务懒加载，他们都是通过import()实现的。这也已经成为业内通用的方法了。

通过懒加载的方式，会打包出多个chunk包。

6. 代码压缩