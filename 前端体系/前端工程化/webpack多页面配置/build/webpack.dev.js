const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const basicConfig = require('./webpack.base');
const path = require('path')
module.exports = webpackMerge(basicConfig, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '127.0.0.1',
        port: '8090',
        // watchContentBase: true,
        // publicPath: '/assets/'
    },
    module: {
        rules: [
            // {
            //     test: /\.html$/,
            //     use: ["raw-loader"] // loaders: ['raw-loader'] is also perfectly acceptable.
            // },
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: 'style-loader',
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
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        new webpack.DefinePlugin({
            "NODE_ENV": JSON.stringify('dev')
        })
    ]
})