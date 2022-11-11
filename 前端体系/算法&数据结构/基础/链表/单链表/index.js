/**
 * 单链表:每一个块中必须包含当前节点内容以及后继指针
 */
function SingleLinkedList(){
    let head = null;
    let length = 0;

    // 向末尾插入
    this.append = function(element){
        let node = new Node(element)
        let el = head;
        if(head){
            while(el.next){
                el = el.next;
            }
            el.next = node;
        }else{
            head = node;
        }
        length += 1;
    }

    this.search = function(element){
        let el = head;
        if(!el){
            return false;
        }else{
            do{
                console.log(el)
                let name = el.element;
                if(name == element){
                    return true;
                }
                el = el.next;
            }while(el)

            return false;
        }
    }

    // 指定位置插入
    this.insert = function(position, element){
        let node = new Node(element)
        let prev = head;
        let curr = head;
        let index = 0;
        if(!head){
            head = node;
            return false;
        }
        if(position >= 0 && position <= length){
            if(position == 0){
                node.next = head;
                head = node;
               
            }else{
                while(index < position){
                    index++;
                    prev = curr;
                    curr = curr.next;
                    console.log('当前current', curr)
                }
    
                prev.next = node;
                node.next = curr;
            }

            length += 1;
           
        }
    }

    // 删除
    this.remove = function(element){
        let el = head;
        if(!el){
            return null;
        }else{
           let prev = head;
           while(el){
                let name = el.element;
                if(element == name){
                    el = el.next;
                    prev.next = el;
                }else{
                    prev = el;
                    el = el.next;
                }
           }
        } 
    }
}

function Node(element){
    this.element = element;
    this.next = null;
}

var list = new SingleLinkedList()

for(var i = 1; i< 5; i++){
    list.append(i)
}

console.log(list)
list.insert(3, 600)

console.log(list.search(5))