// import from 'babel-core'
var babel = require('babel-core');
babel.transformFile('./a.js', function(err, result){
    console.log(err)
    console.log(result)
})