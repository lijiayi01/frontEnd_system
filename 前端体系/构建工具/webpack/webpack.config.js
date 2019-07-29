const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode:'development',
    entry:{
        a:'./a.js',
        b:'./b.js'
    },
    output:{
        path:path.join(__dirname, '/dist'),
        filename:'js/bound.[name].[chunkhash].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: [extractTextPlugin.loader,'css-loader']
            }
        ]
    },
    plugins:[
        new extractTextPlugin({
            filename: "./css/[name].[contenthash:8].css",
            chunkFilename: "[id].css"
        }),

    ]
}