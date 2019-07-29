const webpack = require('webpack');
const path = require('path');
module.exports = {
    mode:'development',
    entry:'./a.js',
    output:{
        path:__dirname,
        filename:'bound1.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:path.resolve(__dirname, 'node_modules'),
            }
        ]
    }
}