const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const path = require('path');
const devConfig = {
    mode:'development',
    devtool: 'eval-source-map',
    devServer:{
        contentBase: path.resolve(__dirname,'../dist'),
        port:9000,
        host:'localhost',
        compress: true,
        hot: true,
        inline: true,
        publicPath: '/'
    }
}

const config = merge(baseConfig,devConfig)
module.exports = config