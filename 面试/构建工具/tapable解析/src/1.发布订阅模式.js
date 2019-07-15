/**
 * 以最简单的代码阐述，并不能用于生产
 * 比如没有做过类型处理等等。
 */
class Event {

    constructor() {
        this.task = []
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

}

let a = new Event();

a.on('click', function(){
    console.log(1)
})

a.on('click', function(){
    console.log(2)
})

a.emit('click')  // 1  2