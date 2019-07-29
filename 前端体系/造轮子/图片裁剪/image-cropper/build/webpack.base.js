const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'[name].js',
        path: path.resolve(__dirname,'../dist')
    },
    module: {
        rules:[
            {
                test:/\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                include: path.resolve(__dirname,'../src')
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader:'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ],
                include: path.resolve(__dirname,'../src')
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        })
    ]
    
   
}