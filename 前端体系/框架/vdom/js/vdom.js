function createElement(tag, attr, children){
    return new Element(tag, attr, children)
}

class Element{

    constructor(tag, attr, children){
        this.tag = tag;
        this.attr = attr;
        this.children = children;
    }
}

function createNode({tag, attr, children}){
    let el = document.createElement(tag);

    // 设置属性
    setAttrs(el, attr);

    
    return el;
}

function createDom(vdom){
    let {tag, attr, children} = vdom;
    let root = createNode(vdom);
    // children元素设置
    if(children && children.length > 0){
        children.forEach( function(item, key){
            if(item instanceof Element){
                root.appendChild(createDom(item))
            }else{
                root.appendChild( document.createTextNode(item) );
            }
        } )
    }

    return root;
   
}

// 设置属性函数
function setAttrs(el, attr){
    for(let key in attr){
        if(key == 'value'){
            if(el.tagName.toUpperCase() == 'INPUT' || el.tagName.toUpperCase() == 'TEXTAREA'){
                el.value = attr[key]
            }
        }else{
            el.setAttribute(key, attr[key])
        }
    }
}   

// let vDom = createElement("ul", {class: "dawd"}, [
//     createElement("li", {class: "dawd1"}, ["1"]),
//     createElement("li", {class: "dawd2"}, ["2"]),
//     createElement("li", {class: "dawd3"}, ["3"])
// ]);

// let vDom = createElement("ul", {class: "dawd"}, [
//     createElement("li", {class: "dawd"}, [
//         createElement("input", {type: "radio",value: "1651"},[]),
//         createElement("input", {type: "text",value: "1651"},[])
//     ])
// ]);
let vDom = createElement("div", {class: "div"}, [
	createElement("ul", {class: "ul"}, [
		createElement("li", {class: "li"},[createElement("input", {type: "radio",value: "1651"},["单选"])]),
		createElement("li", {class: "li"},[createElement("input", {type: "text",value: "1651"},[])]),]),
		createElement("div", {class: "div"}, [
			createElement("p", {class: "p"},[
		            createElement("span", {class: "span"},["我是span"])]),
			    createElement("a", {class: "a",href: "https://juejin.im/editor/drafts/5cf3c75de51d45572c05fff3"},[
				    createElement("span", {class: "span"},["我是超链接里面的span"])]),
				    createElement("img", {class: "img",src: "http://g.hiphotos.baidu.com/image/h%3D300/sign=b5e4c905865494ee982209191df4e0e1/c2cec3fdfc03924590b2a9b58d94a4c27d1e2500.jpg",alt: "虚拟DOM图片",title: "虚拟的DOM"},[])
	]),
]);

let dom = createDom(vDom);
document.getElementsByTagName("body")[0].appendChild(dom);

