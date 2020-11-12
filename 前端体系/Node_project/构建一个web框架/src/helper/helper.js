// 数组扁平化
function flatArray(arr){
    return arr.reduce((pre, item)=>{
        return pre.concat(item)
    }, [])
}


module.exports = {
    flatArray
};