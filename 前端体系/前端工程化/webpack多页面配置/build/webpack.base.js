const path = require('path');
const webpackhtmlPlugin = require('html-webpack-plugin')
const basicPath = path.resolve(__dirname, '../src');
const getEntry = require('./getEntry');
// 入口js
const entryPath = getEntry().reduce((initItem, item) => {
    for (let key in item) {
        initItem[key] = item[key]['js']
    }
    return initItem;
}, {})
// 入口页面
let entryHtmlPath = getEntry().map((item) => {
    for (let key in item) {
        return {
            [key]: item[key]['html']
        }
    }
})
// 配置页面
/**
 * @param {} template:页面模板
 * @param {} fileName:生成的页面名称
 * @param {*} chunks : 页面需要的chunk块
 */
function pageConfig(template, fileName, chunks = []) {
    return new webpackhtmlPlugin({
        template: template,
        chunks: [...chunks],
        filename: fileName
    })


}

let config = {
    mode: 'development',
    entry: entryPath,

    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"] // loaders: ['raw-loader'] is also perfectly acceptable.
            },
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
                test: /\.(jpe?g|png|gif)/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 单位字节
                            limit: 1096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]',
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

    ]
}

config.plugins.push(// 由于每个页面所需chunk不同，需要自行配置,如果为了省事，可将vendors和common全部引入
    ...entryHtmlPath.map((item) => {
        for (let key in item) {
            switch (key) {
                // 根据页面自行配置
                case 'Detail':
                    return pageConfig(item[key], key.toLocaleLowerCase() + '.html', ['vendors', 'common', key])
                case 'Index':
                    return pageConfig(item[key], key.toLocaleLowerCase() + '.html', ['vendors', 'common', key])
                case 'List':
                    return pageConfig(item[key], key.toLocaleLowerCase() + '.html', ['vendors', 'common', key])
            }

        }

    }))


module.exports = config