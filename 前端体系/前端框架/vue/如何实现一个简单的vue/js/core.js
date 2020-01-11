class Vue{
    constructor(option){
        let selector = option.el;
        let data = option.data;
        if(!selector){
            console.warn('selector不能为空')
            return;
        }  
        let element = document.querySelector(selector);
        this.el = element;
        this.data = data;
        this.loopData(this.data);
        new Compile(selector, this)

    }

    // 循环data对象
    loopData(data){
        if(!data || typeof data !== 'object' ){
            return;
        }
        Object.keys(data).forEach( key =>{
            this.defineReactive(data, key, data[key])
        })
    }

    defineReactive(obj, key, value){
        var dep = new Dep();
        this.loopData(value)
        Object.defineProperty(obj, key, {
            get(){
                console.log('getter');
                Dep.target && dep.addSub(Dep.target);
                console.log(dep)
                return value;
            },

            set(newValue){
                if(value !== newValue){
                    console.log('setter')
                    value = newValue;
                    // 通知所有的订阅者
                    dep.update()
                }
            }
        })
    }
}


class Dep{
    constructor(){
        this.Sublist = []
    }

    addSub( sub ){
        this.Sublist.push(sub)
    }

    update(){
        this.Sublist.forEach(function(sub){
            sub.notice()
        })
    }




}


class Watcher{
    constructor(vm, exp, callback){
        this.vm = vm;
        this.key = exp;
        this.callback = callback;
        this.value = this.get(this.key);
    }

    get(key){
        Dep.target = this;
        // 触发getter
        let value = this.vm.data[key];
        Dep.target = null;
        return value;
    }

    notice(){
        let newValue = this.get(this.key)
        if(newValue != this.value){
            this.callback(newValue, this.value)
        }
       
    }
}
