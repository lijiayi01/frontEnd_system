function quickSort(arr){
    if(arr.length < 2){
        return arr;
    }

    var basicItem = arr[0];
    var leftArr = [];
    var rightArr = [];
    for(var i = 0; i < arr.length; i++){
        if(arr[i] < basicItem){
            leftArr.push(arr[i])
        }else if(arr[i] > basicItem){
            rightArr.push(arr[i])
        }
    }
    return quickSort(leftArr).concat([basicItem], quickSort(rightArr))
}

console.log(quickSort([4,1,5,9,2,10,6,8,7]))