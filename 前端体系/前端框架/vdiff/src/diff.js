import { Element } from "./index.js";
// diff算法
let Index = 0;
// 定义基础的差异
const REPLACE = "REPLACE";
const ATTR = "ATTR";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
function diffVdom(oldVdom, newVdom) {
  const patches = {};
  walk(oldVdom, newVdom, Index, patches);

  return patches;
}
/**
 *
 * @param {Element} oldVdom : 老vdom
 * @param {Element} newVdom ：新vdom
 * @param {number} index  ： 索引
 * @param {object} patches ：补丁对象
 */
function walk(oldVdom, newVdom, index, patches) {
  Index++;
  let currentPatches = [];
  let compareAttrPatches = [];
  // 如果两个是string
  if (isString(oldVdom) && isString(newVdom)) {
    if (oldVdom !== newVdom) {
      currentPatches.push({
        type: TEXT,
        value: newVdom
      });
    }
  } else if (isElemetInstace(oldVdom) && isElemetInstace(newVdom)) {
    // 优化算法
    // 增加是否遍历子级的标志位
    if (oldVdom.tag !== newVdom.tag) {
      currentPatches.push({
        type: REPLACE,
        newVdom
      });
      // 如果第一个元素都变化了，则其他就不再比较
      if (index === 0) {
        if (currentPatches.length) {
          patches[String(index)] = currentPatches;
        }
        return;
      }
     
       compareAttrPatches = compareAttr(oldVdom, newVdom, currentPatches);

     
    }
    compareAttrPatches = compareAttr(oldVdom, newVdom, currentPatches);
    if (oldVdom.children.length) {
      oldVdom.children.forEach((item, ids) => {
        walk(item, newVdom.children[ids], Index, patches);
      });
    }
  } else if (!newVdom) {
    // 如果新节点不存在，则直接删除
    currentPatches.push({
        type: REMOVE,
        newVdom
      });
  }

  if (currentPatches.length) {
    patches[String(index)] = currentPatches;
  }
}

// 判断是String

function isString(value) {
  return typeof value === "string";
}

// 判断是Element的实例
function isElemetInstace(instance) {
  return instance instanceof Element;
}

// 比较属性
function compareAttr(oldVdom, newVdom, patches) {
  for (let key in oldVdom.attr) {
    if (oldVdom.attr[key] !== newVdom.attr[key]) {
      // 属性不同
      patches.push({
        type: ATTR,
        key,
        value: newVdom.attr[key]
      });
    }
  }

  for (let key in newVdom.attr) {
    // 如果是新的vdom新增了属性
    if (!oldVdom.attr.hasOwnProperty(key)) {
      patches.push({
        type: ATTR,
        key,
        value: newVdom.attr[key]
      });
    }
  }

}
export {
    REMOVE,
    ATTR,
    REPLACE,
    TEXT
}
export default diffVdom;
