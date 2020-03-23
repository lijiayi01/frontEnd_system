const path = require('path')
module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'boundle.js'
    },
     
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: './libs/babel_loader.js'
                    }
                ]
            }
        ]
    }
}