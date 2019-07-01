import { dom, body } from './dom'
import {handleImg} from './handleImg'
class Cropper{
    constructor( option ){
        // 裁剪框宽高
        this.width = option.width;
        this.height = option.height;
        // 触发元素
        this.el = option.el;
        this.init(option);
    }
    // 初始化裁剪框
    initCropWrap(){
        const {el, width, height} = this;

        el.style.width = width;
        el.style.height = height;
    }

    init(option){
        const {el, width, height} = this;
        const input = dom.createEle('input',{
            accept:'image/*',
            type: 'file'
        })
        body.appendChild(input);
        el.addEventListener('click', function(){
            input.click();
        })
        input.addEventListener('change', function(e){
            let file = e.target.files[0];
            console.log(file);
            handleImg(file, option)
        })
        
    }

}


new Cropper({
    width: '300px',
    height: '300px',
    el:document.querySelector('.clickArea')
})

