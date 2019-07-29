/**
 * 
 * 第 11 题：（携程）算法手写题
    已知如下数组：
    var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
    编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 */

// 扁平化数组方法
function formatArr(arr) {
    return arr.reduce((result, item) => {
        return result.concat(item instanceof Array ? formatArr(item) : item)
    }, [])
}

// 数组去重
function noRepeat(arr) {
    var obj = {}
    var newArr= []
    arr.forEach((item, key) => {
        if( !obj[item]){
            newArr.push(item);
            obj[item] = true
        }
    })
    return newArr;
}

var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

// 将相关方法统一
function unionArr(arr){
    var arr1 = formatArr(arr);

    var arr2 = noRepeat(arr1);

    arr2.sort((a, b)=>{
        return a - b
    })

    return arr2;

}
console.log(unionArr(arr))