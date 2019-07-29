/**
 * 以最简单的代码阐述，并不能用于生产
 * 比如没有做过类型处理等等。
 */
class Event {

    constructor() {
        this.task = {}
    }

    on(name, callback) {
        if (!this.task[name]) {
            this.task[name] = [];
        }
        this.task[name].push(callback);
    }

    emit(name) {
        let list = this.task[name];
        list.forEach((item) => {
            item()
        })
    }
    // 这里只能删除非匿名函数
    remove(name, fn) {
        let fns = this.task[name];
        // 如果缓存列表中没有函数，返回false
        if (!fns) return false;
        // 如果没有传对应函数的话
        // 就会将key值对应缓存列表中的函数都清空掉
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            // 遍历缓存列表，看看传入的fn与哪个函数相同
            // 如果相同就直接从缓存列表中删掉即可
            fns.forEach((cb, i) => {
                console.log(cb, fn)
                if (cb === fn) {
                    fns.splice(i, 1);
                }
            });
        }

    }

}

let a = new Event();

a.on('click', function () {
    console.log(1)
})

a.on('click', function () {
    console.log(2)
})

a.remove('click', function(){
    console.log(2)
})
console.log(...a.task.click)
a.emit('click')  // 1  2