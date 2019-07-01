const doc = document;
const body = document.getElementsByTagName('body')[0];
const dom = {
    /**
     * @desc:生成元素
     * @param: tag=>标签  string
     * @param: attr=>属性  object 
     * */

    createEle(tag, attr){
        let el = document.createElement(tag);
        for(let i in attr){
            el.setAttribute(i, attr[i])
        }
        return el;
    }
}

export {dom, body}