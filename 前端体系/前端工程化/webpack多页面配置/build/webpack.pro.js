const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
// 打包分析
const BundleAnalyzerPluguin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackMerge = require('webpack-merge');
const basicConfig = require('./webpack.base');
module.exports = webpackMerge(basicConfig, {
    mode: 'production',
    devtool: '#source-map',
    module: {
        rules: [
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
                        loader: 'css-loader',
                       
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
                        loader: 'css-loader',
                       
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: { // 抽离第三方模块
                    test: /[\\/]node_modules[\\/]/,     // 指定是node_modules下的第三方包
                    name: "vendors",
                    priority: -10    
                },
                // styles: {
                //     name: 'styles',
                //     test: /\.(scss|css)$/,
                //     minChunks: 2,
                   
                // },
                utilCommon: {   // 抽离自定义工具库
                    name: "common",
                    // test: /\.js$/,
                    minSize: 0,     // 将引用模块分离成新代码文件的最小体积
                    minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
                    priority: -20
                }

            }
        }
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "NODE_ENV": JSON.stringify('pro')
        }),
         // 生成css文件
         new miniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),

        // public目录直接拷贝到指定目录
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist'),
        }]),


        new BundleAnalyzerPluguin({
            analyzerMode: 'static'
        })
    ]
})