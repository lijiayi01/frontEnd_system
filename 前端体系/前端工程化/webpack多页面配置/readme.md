## webpack 多页面配置

### 1.基础配置可查vue-webpack的配置文件

js css img资源文件  devServer等配置文件详见vue-webpack中的配置文件

### 2.本文主要讲解的是多入口配置  动态引入(import()) 代码分割等功能。

多页面配置：

其实多页面的配置非常简单，主要分为以下几个部分。

#### 1. 需要定义页面规则：

首先查看当前项目的目录结构：

- build：webpack配置文件
- src: 前端业务代码

本文把页面创建在src目录下的page目录，所以说：看项目有多少页面，只需查看page目录下文件即可。

本文会有3个页面
- login: 登录页面
- list: 列表页面
- detail: 详情页面

![avatar]()

本文的项目规则:

1. 页面首字母大写，创建页面目录，目录下index.html为页面内容，目录下可创建js css img文件针对于当前页面的配置，默认index.js是当前页面的入口js(必须这样)
2. api目录为接口 ajax相关配置
3. util目录为公共方法目录
4. libs目录为第三方插件目录
5. components目录为自定义组件目录
6. resource目录为静态资源目录，主要放公共img 公共css 公共资源文件

多入口配置：

entry配对象：
```
 entry: {
     main:'./src/xxx.js'
     login: './src/login.js'
     list: './src/list.js'
 }
```
其实多页面配置就是这么简单，配置多个入口即可。

根据上面的规则，其实页面和页面的入口js都在page目录下的各个页面内部。

所以需要写一个方法，动态获取页面数量和页面入口js

> 根据经验：每个 HTML 文档只使用一个入口起点。

获取入口文件：
```
function getEntry() {
    // 所有页面的基础目录
    let basicPagepath = path.resolve(__dirname, '../src/page');
    // 各个页面目录
    let dirs = fs.readdirSync(basicPagepath);
    return dirs.map((item, key) => {
        return {
            js: path.resolve(__dirname, '../src/page',`${item}/index.js`),
            html: path.resolve(__dirname, '../src/page',`${item}/index.html`)
        }
    })
}
```

对每个入口文件生成对应的页面(具体代码可查看build/webpack.base.js)
```
function pageConfig(extalChunk = []){
    let entryHtmlPath = getEntry().map(( item) => {
        for (let key in item) {
            return {
                [key]: item[key]['html']
            }
        }
    })
    return entryHtmlPath.map((path)=>{
        for(let entrykey in path){
            return new webpackhtmlPlugin({
                template: path[entrykey],
                chunks:[...extalChunk,entrykey],
                filename: entrykey.toLocaleLowerCase()+ '.html'
            })
        }
    })
}

```
在开发环境配置热更新热替换功能：

在开发过程中，发现了几个问题：

1. dev-server到底应该怎么配置？里面的contentBase是什么?publicPath是什么? output中的publicPath又是什么?

2. 页面并不属于chunk，无法做到热更新。(也就是说直接修改html文件页面不修改)

    这里提供了两个方案供参考:

    1. js css等文件使用热替换，页面手动刷新(本文使用的就是这种方案)
    2. 所有文件只使用热更新，不使用热替换。将webpack.dev.js中devServer配置中的watchContentBase:true写上，即可更新







