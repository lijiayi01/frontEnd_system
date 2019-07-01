/**
 * 裁剪框生成
 * 
 * 
 */
import { dom, body } from './dom'
import './css/index.css'

export class CropperWrap{

    constructor(option){
        this.width = option.width;
        this.height = option.height;
        this.base64 = option.base64
        this.init(option)
    }


    init(option){

        let wrap = dom.createEle('div',{
            class: 'cropper_wrap'
        })
        body.appendChild(wrap);
        let html = `
            <div class="img_wrap">
                <img src="${option.base64}" class="img_current"/> 
            </div>
            <div class="cropper_item">

            </div>
        `

        wrap.innerHTML = html;
    }
}
