var len;
function buildMaxHeap(arr){
    len = arr.length;
    for(var i = Math.floor(len /2); i >= 0; i--){
        heapify(arr, i)
    }
}

function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function heapSort(arr){
    buildMaxHeap(arr);
    console.log(arr, '....')
    for(var i = arr.length - 1; i > 0; i--){
        swap(arr, 0, i)
        len--;
        heapify(arr, 0)
    }
}

var arr = [4, 6, 8, 5, 9, 1, 6,7,8,4]
console.time()
heapSort(arr)
console.timeEnd()


console.log(arr, '..')