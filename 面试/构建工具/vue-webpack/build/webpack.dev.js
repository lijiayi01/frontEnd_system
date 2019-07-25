
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackBasicConfig = require('./webpack.base');

module.exports = merge(webpackBasicConfig, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
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
    devServer: {
        port: 8000,
        host: '127.0.0.1',
        overlay: {
            errors: true,
        },
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        // 配置环境变量，数量不限
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify('dev')
        })
    ]
})






