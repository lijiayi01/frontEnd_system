# babel 基础

*本文以babel7.x为例*

babel 本身并不会转化代码，也就说 如果不配置任何配置文件，babel 只会原封不动的把源码输出

## @babel/preset-env

它是 babel 插件的预设，可以理解为 它整合了一系列常用的 babel 插件进行编译代码。

它只会编译语法，不会转义 api

es6 的语法包含箭头函数、...等

es6 的 api 包含 Set Map 实例新增方法等。

注意： async函数并不会被编译转换， 如果代码中有async相关的源代码，仅仅使用`@babel/preset-env`会报`regeneratorRuntime is not defined` error， 因为async函数需要相应的包来转换，这个包就是`regenerator-runtime`， 后面会讲到，这里只大概了解下。 


### 编译 es6 api 方法

#### 1. "useBuiltIns": "entry" + @babel/polyfill

注意：该方法已经过时，能不用就不用。

作用： 会根据browserslist配置文件，将不兼容的api都兼容。

这种方法本质上只是直接`import '@babel/polyfill'`的优化，根据浏览器的兼容，  只引入目标api，而不是全部api。

.babelrc 配置文件

```
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "useBuiltIns": "entry"
    }]
  ]
}

```

"useBuiltIns": "entry" 指的是 将根据我们配置的浏览器兼容，将目标浏览器环境所有不支持的 API 都引入

配置浏览器兼容，可以通过以下几种方式:

1. 通过在 package.json 中增加 browserslist 字段来配置目标运行环境

```package.json
{
    "browserslist": []
}
```

2. 根目录下的.browserslistrc 文件(推荐)
3. .babelrc 文件下的 targets的browsers属性
```
   {
        "presets": [
            ["@babel/preset-env", {
                "modules": false,
                "useBuiltIns": "entry",
                "targets": {
                "browsers": ["iOS 7"]
                }
            }]
        ]
    }
```

三者优先级: .babelrc配置 > .browserslistrc配置和package.json配置。

.browserslistrc配置和package.json配置不能同时配置，会报错，所以不知道谁先谁后。

*browserslist配置文件会影响到打包结果。*

browserslist是个非常重要的配置，不要忽略它。具体查看<https://segmentfault.com/a/1190000040536934?utm_source=sf-similar-article>

在项目的根目录下，可使用`npx browserslist`查看目标浏览器。(使用package.json或者.browserslistrc)

####  "useBuiltIns": "usage" + @babel/plugin-transform-runtime

"useBuiltIns": "usage"指的是 只会引入代码中使用到的新api

"useBuiltIns": "usage"必须指定corejs

如果.babelrc配置文件如下:

```
{
  "presets": [
    ["@babel/preset-env", {
       "useBuiltIns": "usage",
       "corejs": 3
     }]
   ]
}

```

打包后的代码会只引入用到的api，但是*依然会污染全局*

@babel/plugin-transform-runtime: 依赖@babel/runtime, 所以必须提前install这个包。

.babelrc配置文件如下:

```
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ],
  "plugins": [
      [ 
        "@babel/plugin-transform-runtime", {
          "absoluteRuntime": false,
          "corejs": 3,
          "helpers": true,
          "regenerator": true
        }
      ]
    ],
}
```
这种方式，不会污染全局，比如代码中用到了Promise Set等api， 它打包后的代码会以这样的形式出现` new _Promise new _Set`

而且helpers函数也会以import方式导入，而不会每个文件都写入一遍。

helpers函数是否以import方式导入，取决与@babel/plugin-transform-runtime下的helpers属性，默认是true，如果是false，则每个文件还是会写入一遍helpers函数。

以上两种方式都可以实现babel编译转化语法+api， 选择方案都可以。不过一般在库编写时，建议使用第2种，在业务代码中，建议使用第1种，因为我们无法保证我们使用的第三方库也做了浏览器兼容。

## @babel/polyfill

@babel/polyfill提供了一个完整的ES6环境，它对所有es6的语法和api都有对应的hack方式。

@babel/polyfill内部由regenerator-runtime和core-js组成。

*在babel7.4.0后，@babel/polyfill废弃，不建议在使用，如果还需要使用，请按照以下方式*

```JavaScript
import "core-js/stable";
import "regenerator-runtime/runtime";
```
## @babel/plugin-transform-runtime

@babel/plugin-transform-runtime主要为了解决*全局污染和helper重复问题*

@babel/plugin-transform-runtime依赖于@babel/runtime