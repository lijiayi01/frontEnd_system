const path = require('path');
const webpack =require('webpack')
module.exports = {
    // mode: 'production',
    entry:{
        main: './src/main.js',
        index: './src/index.js'
    },

    output: {
        filename: 'js/[name][hash].js',
        path: path.join(__dirname, 'dist')
    },

  
    // 注意： 我们现在用的都是webpack4.x，所以之前的CommonsChunkPlugin已经移除，webpack推荐我们使用webpack4.x
    // optimization.splitChunks
    optimization:{
        splitChunks: {
            chunks: 'all'
        }
    }
}