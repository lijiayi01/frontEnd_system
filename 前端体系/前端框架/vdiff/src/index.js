import diffVdom from './diff.js'
import {patch } from  './patch.js'
function createElement(tag, attr, children){
    return new Element(tag, attr, children)
}

class Element{

    constructor(tag, attr, children){
        this.tag = tag;
        this.attr = attr;
        this.children = children;
    }

    render(){
       return createNode(this.tag, this.attr, this.children) 
    }
}

function createNode(tag, attr, children){
    
    let el = document.createElement(tag);
    // 设置属性
    setAttrs(el, attr);

    let child;
    // 对children处理
    if(children.length){
        children.forEach((item)=>{
            child = item instanceof Element ? createNode(item.tag, item.attr, item.children) : document.createTextNode(item);
            el.appendChild(child);
        })
    }
    return el;
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

let vDom = createElement("ul", { class: "dawd" }, [
  createElement("li", { class: "dawd1" }, ["a1"]),
  createElement("li", { class: "dawd2" }, ["a2"]),
  createElement("li", { class: "dawd3" }, ["a3"])
]);

let vDom1 =createElement("ul", {class: "haha", id: 'hh', 'data-id': '2'}, [
    createElement("li", {class: "dawd1"}, ["a1"]),
    createElement("li", {class: "dawd2"}, ["a2333333"]),
    // createElement("div", {class: "dawd3"}, ["a33"])
]);


// let vDom = createElement("ul", {class: "dawd"}, [
//     createElement("li", {class: "dawd"}, [
//         createElement("input", {type: "radio",value: "1651"},[]),
//         createElement("input", {type: "text",value: "1651"},[])
//     ])
// ]);
// let vDom = createElement("div", {class: "div"}, [
// 	createElement("ul", {class: "ul"}, [
// 		createElement("li", {class: "li"},[createElement("input", {type: "radio",value: "1651"},["单选"])]),
// 		createElement("li", {class: "li"},[createElement("input", {type: "text",value: "1651"},[])]),]),
// 		createElement("div", {class: "div"}, [
// 			createElement("p", {class: "p"},[
// 		            createElement("span", {class: "span"},["我是span"])]),
// 			    createElement("a", {class: "a",href: "https://juejin.im/editor/drafts/5cf3c75de51d45572c05fff3"},[
// 				    createElement("span", {class: "span"},["我是超链接里面的span"])]),
// 				    createElement("img", {class: "img",src: "http://g.hiphotos.baidu.com/image/h%3D300/sign=b5e4c905865494ee982209191df4e0e1/c2cec3fdfc03924590b2a9b58d94a4c27d1e2500.jpg",alt: "虚拟DOM图片",title: "虚拟的DOM"},[])
// 	]),
// ]).render()

// console.log(vDom)
let dom = vDom.render()
document.getElementsByTagName("body")[0].appendChild(dom);

let patches = diffVdom(vDom, vDom1);
console.log(patches)
setTimeout(function(){
    patch(dom, patches)
},3000)


// let dom = createDom(vDom);
// document.getElementsByTagName("body")[0].appendChild(dom);




export {
    Element,
    setAttrs
}