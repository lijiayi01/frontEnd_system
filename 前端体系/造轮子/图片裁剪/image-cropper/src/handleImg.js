/**
 * 操作图片文件
 * 
 */
import {CropperWrap} from './cropperWrap'
function handleImg(file, option){
    const reader = new FileReader();
    reader.onload = function(){
        console.log(this.result);
        let option = Object.assign({},option,{
            base64: this.result
        })
        new CropperWrap(option)
    }
   
    reader.readAsDataURL(file);


}

export {
    handleImg
}