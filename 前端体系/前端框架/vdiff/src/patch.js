// 通过补丁文件来计算最少渲染
import { REMOVE, ATTR, REPLACE, TEXT } from "./diff";
let Index = 0;
function patch(oldDom, patches) {
  dfPatch(oldDom, patches, Index);
}

function dfPatch(oldDom, patches, index) {
  var currentPatches = patches[index];
  Index++;
  if (currentPatches && index === 0) {
    updateDom(oldDom, currentPatches, index);
  }
  // 获取节点
  let children = [].slice.call(oldDom.childNodes);
  children &&
    children.forEach(item => {
      dfPatch(item, patches, Index);
    });

  if (currentPatches) {
    updateDom(oldDom, currentPatches, index);
  }
}

function updateDom(node, currentPatches, index) {
  currentPatches.forEach(patches => {
    switch (patches.type) {
      case REMOVE:
        node.parentNode.removeChild(node)
        break;
      case REPLACE:
        node.parentNode.replaceChild(patches.newVdom.render(), node);
        break;
      case TEXT:
        node.textContent = patches.value;
        break;
      case ATTR:
        // node.setAttribute()

        setAttrs(node, patches.key, patches.value);

        break;
    }
  });
}

// 设置属性函数
function setAttrs(el, attr, value) {
  if (attr == "value") {
    if (
      el.tagName.toUpperCase() == "INPUT" ||
      el.tagName.toUpperCase() == "TEXTAREA"
    ) {
      el.value = value;
    }
  } else {
    el.setAttribute(attr, value);
  }
}
export { patch };
