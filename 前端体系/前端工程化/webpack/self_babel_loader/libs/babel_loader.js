const babel = require('@babel/core')
const fs = require('fs');
module.exports = function (source) {
    // console.log(source)
    let callback = this.async();

    babel.transform(source, {
        presets: ['@babel/preset-env'],
        code: true,
        ast: true
    }, (err, result) => {
        const { code, map, ast } = result;
        callback(err, code, map, ast)
    })
    
    return;
    // console.log(result)

    // console.log(result.code)
    // fs.writeFile('./code.js', result.code, function(){

    // })
    // // console.log(result.map)
    // // console.log(result.ast);
    // // console.log(this)
    // return result.code;
}