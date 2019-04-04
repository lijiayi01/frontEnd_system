//1.首次加载的时候 调用动态设置rem的api
setRemSize();

//2.当用户企图更改浏览器宽度 自动获取屏幕宽度 在计算rem赋值给根元素里面的font-size
window.addEventListener("resize", setRemSize, false);

function setRemSize() {
	//1.在任何尺寸中都可以获得rem值
	//获得屏幕的宽度----获取到了rem值    rem=屏幕宽度/6.4+"px"
	var basicWidth = document.documentElement.clientWidth >= 440 ? 440 : document.documentElement.clientWidth
	var _clientWidth = basicWidth / 7.5 + "px";
	
	//console.log(_clientWidth);
	//将得到的rem值赋值给根元素的font-size
	document.documentElement.style.fontSize = _clientWidth;
//	document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _clientWidth + "!important");
}
//适配三星等手机
// fixFontSize()
function fixFontSize(){
	var html=document.documentElement;
	var remBase=document.documentElement.clientWidth / 7.5;
	var fontSize=remBase;
	while(true){
		var actualSize=parseInt(html.style.fontSize);
		
		if(actualSize>remBase&&fontSize>10){
			fontSize--;
			document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + fontSize + "px!important");
		}else{
			break;
		}
	}
}
