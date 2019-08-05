const webpack = require('webpack');
const merge = require('webpack-merge');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const webpackBasicConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 打包分析
const BundleAnalyzerPluguin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
module.exports = merge(webpackBasicConfig, {
    mode: 'production',
    devtool: '#source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\\/]node_modules[\\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 1,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
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
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 配置环境变量，数量不限
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify('production')
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