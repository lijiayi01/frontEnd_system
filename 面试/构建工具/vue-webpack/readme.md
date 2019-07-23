# 自己配置一个vue开发环境
## 1.主要实现的功能：
1. ES6转ES5
2. scss转css
3. img资源处理
4. 自动添加css前缀
5. .vue转成js文件
6. 构建之前清除之前的代码
7. 定义环境变量
8. 区分生产开发环境
9. 热更新 热替换

### 1.es6转es5：

需要支持语法、新api的转换：
首先我们安装基础的依赖包：
```
    npm install --save-dev babel-loader @babel/core @babel/preset-env
```
上面这些依赖包会帮我们识别es6语法，但是api级别的比如promisee set map等无法识别，为了识别api，我们会有以下几种方式：<br>

**方法一：**<br>
一般常见的，我们会把@babel/polyfill当作依赖项。<br>

```
    npm install --save-dev @babel/polyfill
```

在webpack入口配置
```
    entry:['@babel/polyfill','./src/main.js']
```
或者在入口js文件添加：
```
    import '@babel/polyfill'
```


.babelrc文件：
```
    {
        "presets":["@babel/preset-env"]
    }

````
但这种方式会导致打包出的包过大，@babel/polyfill是一个完整的模拟es6+的包，一般情况下，我们方式我们不会用到。

**方法二：**<br>
babel7以后提供了useBuiltIns属性，它有三个参数：<br>

false：(默认值)不用任何处理<br>
entry: 按需浏览器引入, 以 targets 最低要求为准 <br>
usage: 按需加载，只转换代码中用到的api <br>

一般我们按照下面配置：
如果使用usage属性，我们不在需要安装@babel/polyfill，只需要安装core-js，我们安装的是3的版本。<br>
安装core-js
```
    npm install --save-dev core-js@3
```

```
{
    "presets": [
        ["@babel/preset-env", {
            "targets":{
                "browsers":["> 1%", "last 2 versions", "ie >= 8"]
            },
            "useBuiltIns" : "usage",
            "corejs" : 3
        }
        ]
    ]
}
```
**方法三:**<br>
使用@babel/plugin-transform-runtime，之前babel6的配置，@babel/plugin-transform-runtime依赖于@babel/runtime,
所以先安装这两个包:

```
    npm install --save-dev @babel/plugin-transform-runtime @babel/runtime
```
由于babel7的改动，@babel/plugin-transform-runtime只包含了一些helps函数，所以还需要@babel/runtime-corejs3这个核心文件，安装：
```
    npm instal -save-dev @babel/runtime-corejs3
```

.babelrc文件：
```
{
    "presets": [
        ["@babel/preset-env", {
            "targets":{
                "browsers":["> 1%", "last 2 versions", "ie >= 8"]
            }
            
        }
        ]
    ],
    "plugins": [
        [
          "@babel/plugin-transform-runtime",
          {
            "corejs": 3
          }
        ]
      ]
}

```

在bebel6的版本中，我们通常使用第三种方法，但是在babel7中，经过测试，发现方法2比方法3打出的包略小一点。而且从简易性而言，目前推荐第2种方案。


### 2.scss转css 

安装依赖：
1. <font>sass-loader</font>: 将sass代码转成css代码
2. css-loader: 解析css中url和@import代码
3. style-loader: 将css代码生成到页面style标签内
4. node-sass: sass-loader依赖node-sass

```
npm install --save-dev sass-loader css-loader style-loader node-sass
```

### 3.img等资源处理
安装依赖：
```
npm install file-loader url-loader -D
```
1. file-loader: 解析文件url，并将文件复制到输出目录
2. url-loader: 功能和file-loader类似，如果文件大小小于x限制大小，则会返回base64编码，否则使用file-loader将文件复制到输出目录

比如： 我们css中引用了一张背景图片，如果不做url-loader处理，则会build失败，因为无法对img进行处理


