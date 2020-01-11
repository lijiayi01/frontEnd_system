class Compile{
    constructor(el,vm){
        this.vm = vm;
        this.$el = this.isElement(el) ? el : document.querySelector(el);
        if(this.$el){
            // 获取内容元素
            this.$fragment = this.node2Fragment(this.$el);
            // 编译
            this.compile(this.$fragment)
            this.$el.appendChild(this.$fragment);
        }
    }

    // 编译
    compile(fragment){
        let childNodes = fragment.childNodes;
       console.log(childNodes)
        let pattern = /\{\{(.*)\}\}/;
        // 编译元素
        [].slice.call(childNodes).forEach(function(el){
            if(this.isElement(el)){
                this.compileEl(el)
            }else if(this.isTextNode(el) && pattern.test(el.textContent)){
                this.compileText(el)
            }
        }.bind(this))  



    }

    // 编译元素
    compileEl(el){

    }

    // 编译文本
    compileText(el){
        console.log(RegExp.$1)
        dirctiveList.text(el, this.vm, RegExp.$1)
    }

    node2Fragment(){
        // 创建一个新的空白文档片段
        let fragment = document.createDocumentFragment();
        // 稍微复习一下原生js的dom相关知识
        // chilren: 获取子元素  childNodes：获取子元素(包括空白节点换行节点)
        let child
        while(child = this.$el.firstChild){
            fragment.appendChild(child)
        }
        console.log(fragment)
        return fragment;
    }

    // 是否是元素
    isElement(el){
        return !!(el.nodeType === 1)
    }

    // 是否是文本元素
    isTextNode(el){
        return !!(el.nodeType === 3)
    }

}


// 指令集合
let dirctiveList = {
    text(node, vm, exp){
        return this.bind(node, vm, exp, 'text')
    },

    /**
     *
     *
     * @param {*} node - 元素
     * @param {*} vm - vue实例
     * @param {*} exp - 正则表达式
     * @param {*} dirctive - 指令名称
     */
    bind(node, vm, exp, dirctive){
        let updateFn = updater[dirctive+'Updater'];
         updateFn && updateFn(node, vm.data[exp]);

        new Watcher(vm, exp, function(newValue, oldValue){
            updateFn && updateFn(node, newValue, oldValue);
        })
    }
}


// 更新函数集合
let updater = {
    textUpdater(node, newValue, oldValue){
        console.log( node.textContent )
        node.textContent  = newValue;
    }
}
