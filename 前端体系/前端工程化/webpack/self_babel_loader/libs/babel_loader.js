const babel = require('@babel/core')
const fs = require('fs');
module.exports = function(source){
    let result = babel.transformSync(source, {
        presets: ['@babel/preset-env'],
        code: true,
        ast: true
    });

    // console.log(result.code)
    fs.writeFile('./code.js', result.code, function(){

    })
    // console.log(result.map)
    // console.log(result.ast);
    console.log(this)
    return result.code;
}