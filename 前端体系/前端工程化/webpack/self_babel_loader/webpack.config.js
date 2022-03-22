const path = require('path')
const MyPlugin = require('./libs/myPlugins')
module.exports = {
    mode: 'production',
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'boundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: './libs/babel_loader.js'
                    }
                ]
            },
           
        ]
    },

    plugins: [
        new MyPlugin()
    ]
}