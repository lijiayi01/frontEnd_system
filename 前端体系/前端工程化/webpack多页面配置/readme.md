## webpack 多页面配置

### 1.基础配置可查vue-webpack的配置文件

js css img资源文件  devServer等配置文件详见vue-webpack中的配置文件

### 2.本文主要讲解的是多入口配置   代码分割动态引入(import()) 公共文件分离等功能。

多页面配置：

其实多页面的配置非常简单，主要分为以下几个部分。

#### 1. 需要定义页面规则：

首先查看当前项目的目录结构：

- build：webpack配置文件
- src: 前端业务代码

本文把页面创建在src目录下的page目录，所以说：看项目有多少页面，只需查看page目录下文件即可。

本文会有3个页面
- index: 登录页面
- list: 列表页面
- detail: 详情页面


本文的项目规则:

1. 页面首字母大写，创建页面目录，目录下index.html为页面内容，目录下可创建js css img文件针对于当前页面的配置，默认index.js是当前页面的入口js(必须这样)
2. api目录为接口 ajax相关配置
3. util目录为公共方法目录
4. libs目录为第三方插件目录
5. components目录为自定义组件目录
6. resource目录为静态资源目录，主要放公共img 公共css 公共资源文件

#### 2.多入口配置：

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


#### 3.代码分割动态引入(import())

    动态引入也就是俗称的懒加载，我们在vue项目中应该有过接触，比如路由的懒加载。

    语法 import (文件).then(()=>{})

    就会发现: 生成了单独的chunk块。

    // 本文的例子(src/page/Index/index.js)
    ```
    $('#username').on('change', function(){
        // import()： 按需加载
        // 里面的注释：代表这个动态代码chunkName，可查看打包出来的文件名称
        import(/* webpackChunkName: "MyFile" */'./dyImport').then((...rest)=>{
            console.log(...rest)
        })
    })
    ```

#### 4.将公共代码打包分离
 
    公共代码主要分为两种，一种是框架源码，一种是自己写的公共代码。

    如果不对公共文件进行处理，每个入口js都会包含框架源码部分，增大包体积。

    下面针对于"框架源码"提供几种方案：

    1. externals设置
    比如项目依赖jquery，可设置:
    ```
        externals: {
            jquery: 'jQuery'
        }
    ```
    externals是为了防止某个包打包进bundle中,这里是为了防止将jquery打包进去。而真正的jquery文件由cdn去提供。但是你在代码中，依然可以使用 import $ from 'jquery'，但是jquery并不是打包。

    上面配置为什么写了个jQuery?

    解释：代码中import $ from 'jquery'， 因为jquery并没有真正存在，所以为了找到它，就会找到它对用的value值，也就是jQuery, 如果全局中存在jQuery变量，则查找成功。所以这个value如果是string，则被认为是全局变量，并不是随便写的。

    所以对应的页面应该提供
    ```
        <script src="https://xxxcdn.com/jquery.js"></script>
    ```

    2. 配置层面的分割代码：
    ```
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: { // 抽离第三方模块
                    test: /[\\/]node_modules[\\/]/,     // 指定是node_modules下的第三方包
                    name: "vendors",                    // chunk name
                    priority: -10                       // 权重
                },
                utilCommon: {   // 抽离自定义工具库
                    name: "common",
                    minSize: 0,     // 将引用模块分离成新代码文件的最小体积
                    minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
                    priority: -20
                }

            }
        }
    }
    ```

    本文中使用第2中方案写的。在webpack.pro.js配置可查看。

    上面也已经提供了自己写的公共代码的配置代码，注意一点： 这个公共代码包括css js，并非单纯的js。

#### 5.页面增加chunk

    其实每个页面需要的chunk文件是不同的，尤其是对公共文件分割后，比如login页面需要公共js文件，而list不需要，我们是不能单纯的将所有的chunk包都放进页面的，这样会增大页面体积。

    所以需要单独配置，这也是项目中唯一需要使用这个脚手架配置的地方(webpack.base.js)：

    ```
        config.plugins.push(// 由于每个页面所需chunk不同，需要自行配置,如果为了省事，可将vendors和common全部引入
            ...entryHtmlPath.map((item) => {
                for (let key in item) {
                    switch (key) {
                        // 根据页面自行配置
                        case 'Detail':
                            return pageConfig(item[key], key.toLocaleLowerCase() + '.html', ['vendors', key])
                        case 'Index':
                            return pageConfig(item[key], key.toLocaleLowerCase() + '.html', ['vendors', 'common', key])
                        case 'List':
                            return pageConfig(item[key], key.toLocaleLowerCase() + '.html', ['vendors', 'common', key])
                    }

                }

    }))

    ```

### 3.在开发过程中，发现了几个问题：

1. devServer到底应该怎么配置？里面的contentBase是什么?publicPath是什么? output中的publicPath又是什么?

    - 在output中的publicPath：打包的html中引用资源的前缀,通常用于生产环境cdn级别的处理。
    ```
        output: {
            filename: 'js/[name].[hash:8].js',
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/assets/'
        }
        // 最后生成的html文件中js的引用事这样的： 
        <script src="/assets/js/xxx.js"></script>
    ```
    - 在devServer中的publicPath：可以近似的理解为打包生成的静态文件的位置(但是并非是文件级别的，因为dev环境下，文件是在内存中的)<br>
    而且，如果devServer中并未设置publicPath，会使用output中publicPath的值。
    ```
        // 以本文配置距离
        devServer: {
            publicPath:'/resource/',
            port:'8090',
            host:'127.0.0.1'
        }

        // 最后生成的访问路径：
        index.html: localhost:8090/resource/
        index.html页面内部的引用js文件: 
        <script src="/resource/js/xxx.js"></script>
    ```

    - 但是注意：如果output和devServer中都存在publicPath，且值不相同。会发生什么？<br>
    通过上面得知，开发环境下打包的静态资源都是在 devServer.publicPath中，但是html内部引用的js文件引用关系是这样：<br>
    ```
    <script src="${output.publicPath}/js/xxx.js"></script>
    //由于output.publicPath != devSerer.publicPath,所以我们访问html的时候js无法获取到。
    所以说: output.publicPath是来重写引用规则的，devSerer.publicPath是来生成静态资源文件的。
    ```
    - contentBase: 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。<br>
    注: 默认它指向根目录，而且根据经验，无需对这个值配置。如果出现页面404问题，可尝试用publicPath来解决

2. 页面并不属于chunk，无法做到热更新。(也就是说直接修改html文件页面不修改)

    这里提供了两个方案供参考:

    1. js css等文件使用热替换，页面手动刷新(本文使用的就是这种方案)
    2. 所有文件只使用热更新，不使用热替换。将webpack.dev.js中devServer配置中的watchContentBase:true写上，即可更新
    3. **将页面也看成是一个静态文件处理，使用row-loader，笔者还需要研究验证

3. 页面中使用img引入图片，提示404?

    联想到写react项目中，img文件需要require(图片地址)才可。

    普通的页面： 使用html-loader

    本文已配置好。

4. 项目中背景图片不显示问题?

    原因：当所有的img打包的dist目录下的img目录，发现在使用了背景图片的相关css中，使用背景图片的代码如下:
    ```
      .class{
          backgorund:url(img/xxx.png);
      }
    ```
    因为css和img是单独目录，所以上面地址其实是: xxx.com/css/img/xxx.png

    导致了背景图片的不显示。

    修改：
    miniCssExtractPlugin增加publicPath

    ```
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here             
                            // by default it use publicPath in webpackOptions.output             
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here             
                            // by default it use publicPath in webpackOptions.output             
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
    ```








