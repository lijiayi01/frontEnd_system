// 写一个类似delegates包，具体用法请查看 https://segmentfault.com/a/1190000017313480

class Deledates {
    /**
     *Creates an instance of Deledates.
     * @desc target将其子属性mountProps下的所有属性挂载到target身上
     * @param {object} target - 目标对象
     * @param {object} mountProps - 目标对象下的子属性
     * @memberof Deledates
     */
    constructor(target, mountProps) {
        this.target = target;
        this.mountProps = target[mountProps];
    }

    method(methodName) {
        if (typeof this.mountProps[methodName] !== 'function') {
            console.warn(`${methodName}不是一个方法，请使用getter挂载`);
            return;
        }
        if (!this.mountProps[methodName]) {
            console.warn(`${methodName}不存在`);
            return;
        }
        this.target[methodName] = this.mountProps[methodName];
        return this;
    }

    getter(props) {
        console.log(this.mountProps)
        if (!this.mountProps[props]) {
            console.warn(`${props}不存在`);
            return;
        }
        this.target[props] = this.mountProps[props];
        
        return this;
    }
    // 设置父的props时也同时修改mountProps下的props元素
    setter(props) {
        Object.defineProperty(this.target, props, {
            get(){
               return this.mountProps[props];
            },

            set(val){
                this.mountProps[props] = val;
                this[props] = val;
            }
        })
        return this;
    }
    // 只要有一个改变了，另外一个就会改变
    access(props) {
        let self = this
        Object.defineProperty(self.target, props, {
            // get(){
            //    return this.mountProps[props];
            // },

            set(val){
                console.log(self)
                self.mountProps[props] = val;
                self[props] = val;
            }
        })
        // Object.defineProperty(self.mountProps, props, {
        //     set(val){
        //         self.mountProps[props] = val;
        //         self[props] = val;
        //     }
        // })
        
        return this;
    }
}


function proxyFn(target, mountProps) {
    return new Deledates(target, mountProps)
}

module.exports = {
    deledates: proxyFn
}


