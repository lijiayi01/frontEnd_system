const loaderUtils = require('loader-utils');
module.exports  = function(source){
    console.log('源码，', source)

    // 获取配置项
    const options = loaderUtils.getOptions(this);
    console.log('配置项', options)
    return source;
}