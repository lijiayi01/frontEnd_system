/**
 * 循环单链表:每一个块中必须包含当前节点内容以及后继指针，尾节点指向的是头节点，这就形成了一个首尾相连的环
 */
function RepeatSingleLinkedList(){
    let head = null;
    let length = 0;

    this.search = function(element){
       if(!head){
            return false;
       }
       let index = 0;
       let curr = head;
       while(index < length){
           index++;
           console.log(curr)
           if(curr.element == element){
                return true; 
           }
           curr = curr.next;
       }
       return false;
    }

    this.append = function(element){
        let el = new Node(element)
        if(head){
            let index = 0;
            let prev = null
            let curr = head;
            while(index < length){
                index++;
                prev = curr;
                curr = curr.next;
            }
            prev.next = el;
            el.next = head;
        }else{
            head = el;
            el.next = head;
        }
        length += 1
        return true;
    }

    // 指定位置插入
    this.insert = function(position, element){
        let el = new Node(element);
        if(position >= 0 && position <= length){
            let index = 0;
            let prev = null;
            let curr = head;
            if(position == 0){
                if(!head){
                    head = el;
                    el.next = head;
                    length += 1;
                    return true;
                }else{
                    while(index < length){
                        index++;
                        prev = curr;
                        curr = curr.next;
                    }
                    prev.next = el;
                    el.next = curr;
                    head = el;
                    length +=1
                    return true;
                }
            }else{
                while(index < position){
                    index++;
                    prev = curr;
                    curr = curr.next;
                }
                prev.next = el;
                el.next = curr;
                length += 1
            }
            
        }
    }

    // 删除
    this.remove = function(position){
       if(position >=0 && position <= length){
        if(position == 0){
            if(!head){
                return null;
            }
            let index = 0;
            let prev = null;
            let curr = head;
            while(index < length){
                index++;
                prev = curr;
                curr = curr.next;
            }

            prev.next = curr.next;
            head = curr.next;
            length -= 1;
            return true;
        }else{
            let index = 1;
            let prev = null;
            let curr = head;
            while(index < position){
                index++;
                prev = curr;
                curr = curr.next;
            }

            prev.next = curr.next;
            length -= 1;
            return true
            
        }
       }else{
           return null;
       }
    }
}

function Node(element){
    this.element = element;
    this.next = null;
}

var list = new RepeatSingleLinkedList()
list.append(1)
list.append(2)
list.append(3)



list.insert(2, 430)
list.remove(3)
console.log(list.search(42))