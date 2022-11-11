// 双链表
function DoubleLinkedList() {
    let length = 0;
    // 开始节点
    let head = null;
    // 结束节点
    let tail = null;

    // 增
    // append: 插入到最后
    this.append = function (element) {
        let ele = new Node(element);
        if (!head) {
            head = tail = ele
        } else {
            let el = head;
            while (el.next) {
                el = el.next;
            }
            el.next = ele;
            ele.prev = el;
            tail = ele;
        }
        length += 1;
    }
    // insert: 指定位置增加
    this.insert = function (position, element) {
        let el = new Node(element);
        let prev = null;
        let curr = head;
        let index = 0;
        if(!curr){
            head = curr;
            tail = curr;
            length += 1;
            return false;
        }
       
        if(position >= 0 && position <= length){
            if(position == 0){
                el.next = curr;
                curr.prev = el;
                head = el;
                length += 1;
                return true;
            }
            if(position == length){
                el.prev = tail;
                tail.next = el;
                tail = el;
                length += 1;
                return true;
            }
            
            while(index < position){
                index++;
                prev = curr;
                curr = curr.next;
            }
            el.prev = prev;
            el.next = curr;

            curr.prev = el;
            prev.next = el;
            length += 1
            return true;
        }else{
            return false;
        }
    }
    // 查
    this.search = function () {
        let el = head;
        while(el){
            console.log(el)
            el = el.next;
        }
    }

    // 删
    this.delete = function(position){
        if(position > length){
            return null;
        }
        if(position && length >= position){
            let index = 0;
            let prev = null;
            let curr = head;
            if(position == 1){
                if(length == 1){
                    head = null;
                    tail =null;
                    
                }else{
                    head = curr.next;
                    head.prev = null;
                }
            }else if(position == length){
                // 删最后1个
                curr = tail;
                tail =  tail.prev;
                tail.next = null;
            }else{
                while(index < position){
                    index++;
                    prev = curr;
                    curr = curr.next;
                }
                prev.prev.next = curr;
                curr.prev = prev.prev.next

            }
            length -= 1
            return true;
            
        }else{
            return null;
        }
       
    }

}

function Node(element) {
    this.value = element;
    this.prev = null;
    this.next = null;
}

var d = new DoubleLinkedList()
d.append(3)
d.append(4)
d.append(5)
d.insert(1, 10)
d.delete(3)
d.search()