const path = require('path');
const webpackhtmlPlugin = require('html-webpack-plugin')
const basicPath = path.resolve(__dirname, '../src');
const getEntry = require('./getEntry');
// 入口
const entryPath = getEntry().reduce((initItem, item) => {
    for (let key in item) {
        initItem[key] = item[key]['js']
    }
    return initItem;
}, {})

// 配置页面
/**
 * 
 * @param {*} extalChunk : 额外的chunk块，主要是公共模块相关chunk
 */
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

module.exports = {
    mode: 'development',
    entry: entryPath,

    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        // publicPath:'/assets/'
    },

    module: {
        rules: [
            {
                test: /\.js$/i,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                include: basicPath
            },
            {
                test: /\.(jpe?g | png | gif)/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 单位字节
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    filename: 'img/[name].[hash:8].[ext]'
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

    plugins: [
        ...pageConfig()
    ]
}