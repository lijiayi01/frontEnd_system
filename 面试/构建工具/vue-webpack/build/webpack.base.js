const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
/**
 * path.resolve和paht.join的区别：
 * path.resolve(): 如果参数有绝对路径，则直接被替换，并且返回的是相对于当前目录的一个路径 如： path.resolve('/a', '/b')  ==> /b
 * path.join(): 不管是否有绝对路径，拼接 path.join('/a', '/b') ==> /a/b
 */
const entryPath = path.resolve(__dirname, '../', 'src/main.js');
const outPath = path.resolve(__dirname, '../', 'dist');

module.exports = {
    mode: 'development',
    // 入口
    entry: entryPath,
    // 出口
    output: {
        filename: 'js/[name][chunkhash].js',
        path: outPath
    },
    // loader
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader:'babel-loader',
                    }
                ],
                include: path.resolve(__dirname,'../','src/')
                //exclude: /node_module/
            },
            {
                test:/\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4086,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name:'img/[name][hash8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },

    // 插件
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            
        })
    ]
}