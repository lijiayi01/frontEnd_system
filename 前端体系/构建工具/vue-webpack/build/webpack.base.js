const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
/**
 * path.resolve和paht.join的区别：
 * path.resolve(): 如果参数有绝对路径，则直接被替换，并且返回的是相对于当前目录的一个路径 如： path.resolve('/a', '/b')  ==> /b
 * path.join(): 不管是否有绝对路径，拼接 path.join('/a', '/b') ==> /a/b
 */
const entryPath = path.resolve(__dirname, '../', 'src/main.js');
const outPath = path.resolve(__dirname, '../', 'dist');

module.exports = {
   
    // 入口
    entry: entryPath,
    // 出口
    output: {
        filename: 'js/[name][hash].js',
        path: outPath
    },
    // loader
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'vue-loader'
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
                include: path.resolve(__dirname, '../', 'src/')
                //exclude: /node_module/
            },
            
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit单位： byte(字节)
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|ogg|webm|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },

    // resolve
    resolve:{
        // 别名：通过别名来把原来导入路径映射成一个新的导入路径
        // 用途： 如果内部又很多相对路径，可以通过别名来简化写法
        alias:{
            // import以vue结尾时，其实会导入vue/dist/vue.runtime.esm.js这个地址
            vue$: 'vue/dist/vue.runtime.esm.js',
            components: path.resolve(__dirname, '../src/components')
        },
        // 后缀: 比如import xxx from '../a/b/index' 默认会先找到index.js  如果没有，找index.vue
        extensions:['.js','.vue']
    },
    // 插件
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),

        new VueLoaderPlugin()
    ]
}