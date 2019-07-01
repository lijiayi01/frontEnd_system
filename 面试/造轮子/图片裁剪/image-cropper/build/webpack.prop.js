const path = require('path');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');

const proConfig = {
    mode:'production'
}

module.exports = merge(baseConfig,proConfig)