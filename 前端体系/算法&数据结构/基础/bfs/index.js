//深度优先遍历方法
let tree = {
    id: '1',
    title: '节点1',
    children: [
        {
            id: '1-1',
            title: '节点1-1'
        },
        {
            id: '1-2',
            title: '节点1-2',
            children: [{
                id: '2',
                title: '节点2',
                children: [
                    {
                        id: '2-1',
                        title: '节点2-1'
                    }
                ]
            }]
        }
    ]
}


function bfc(node, list = []){
    if(node != null){
        list.push(node.id)
        if(node.children && node.children.length){
            for(var i = 0; i < node.children.length; i++){
                bfc(node.children[i], list)
            }
        }
       
    }   
   return list;
}

console.log(bfc(tree))