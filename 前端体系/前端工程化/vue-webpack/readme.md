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

字体 音视频等其他资源和图片相同处理，具体配置查看webpack.base.js

### 4.自动添加css前缀

使用postcss-loader实现该功能，安装依赖 postcss-loader autoprefixer 

```
    npm install postcss-loader autoprefixer -D
```

注意: 除了修改webpack配置文件外，也需要在根目录创建postcss.config.js

另外：要想前缀生效，必须设置支持的浏览器才会自动添加添加浏览器兼容。

目前，npm推荐的两种写法：<br>

1. 在package.json里添加browserslist参数。本例代码如下：

```
 "browserslist": [
    "defaults",
    "not ie < 11",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
  ]
```
当然可以根据需要自行配置浏览器的兼容情况。

2. 根目录下创建.browserslistrc文件

```
# 注释是这样写的，以#号开头
    defaults,
    not ie < 11,
    last 2 versions,
    > 1%,
    iOS 7,
    last 3 iOS versions
```

### 5. .vue文件转成js文件

安装依赖文件:vue-loader vue-template-compiler cache-loader thread-loader

```
    npm install vue-loader vue-template-compiler cache-loader thread-loader -D
```

1. vue-loader: 用于解析.vue文件
2. vue-template-compiler: 用于编译模板
3. cache-loader: 用于缓存loader编译的结果
4. thread-loader： 使用 worker 池来运行loader，每个 worker 都是一个 node.js 进程

webapck配置文件可看配置文件

### 6.配置开发环境，支持热更新热替换

支持npm run dev: 开启开发环境<br>
    npm run build: 开启生产环境打包

安装依赖：webpack-dev-server

```
    npm install -D webpack-dev-server
```

webpack-dev-server可配置host port 等参数，并且天生支持热更新。

热更新：当代码发生变化后，页面自动刷新

热替换：当代码发生变化后，页面不刷新，只内部修改代码发生改变。

**<font color="$f00">问题：</font>**
尽管使用了webpack-deb-server和webpack.HotModuleReplacementPlugin，但是发现热替换依旧没有生效。

支持npm命令行操作：

在package.json的scripts中添加设置

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./build/webpack.base.js --progress",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js"
}

````

### 7. 定义环境变量

使用webpack内部插件DefinePlugin，配置代码如下：

```
plugins: [
    new webpack.DefinePlugin({
      env:'dev || pro'
    }),
]
```

### 8. 开发环境和生产环境的区别：

开发环境：<br>

1. 不需要压缩代码
2. 需要热更新
3. css不需要提取到单独的css文件
4. source map
5. ...

生产环境:<br>
1. 压缩代码
2. 需要热更新
3. css需要提取到单独的css文件
4. source map
5. 构建前清除上一次构建的内容
6. ...

所以，将webpack配置文件分为3个

webpack.base.js 两者公用的配置文件，比如loader的配置。<br>
webpack.dev.js: 开发环境配置<br>
webpack.pro.js: 生产环境配置<br>


### 问题：webpack4.x optimization的了解

