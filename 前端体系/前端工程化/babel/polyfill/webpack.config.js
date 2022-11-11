const path = require('path');
const webpack =require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    entry:{
        main: './src/main.js',
    },

    output: {
        filename: 'js/dist2.js',
        path: path.join(__dirname, 'dist')
    },

  
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
           
        ]
    },

    plugins: [
        // new CleanWebpackPlugin()
    ]

}