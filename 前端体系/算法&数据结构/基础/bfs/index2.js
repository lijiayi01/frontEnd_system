//深度优先遍历方法

let tree = {
    id: '1',
    title: '节点1',
    children: [
        
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
        },

        {
            id: '1-1',
            title: '节点1-1'
        },
    ]
}

let widthTraversal3 = (node) => {
    let nodes = []
    let stack = []

    if (node) {
        stack.push(node)
        while (stack.length) {
            console.log(stack, 'stack')
            console.log('-----------')
            let item = stack.shift()
            let children = item.children
            nodes.push(item.id)
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    stack.push(children[i])
                }
            }
        }
    }

    return nodes
}


console.log(widthTraversal3(tree))