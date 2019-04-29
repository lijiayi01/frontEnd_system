var Component = (function(){
	
	var Modal = function(option){

		this.headerCon = option.headerCon || "提示" ;

		this.bodyCon = option.bodyCon;

		//取消按钮是否存在
		this.isBtn = option.isBtn ||  false;

		this.sureCallback = option.sureCallback || function (){}
		
	};

	Modal.init = function (option) {
		var modal = new this(option);

		//生成html文档
		var rootDiv = document.createElement("div");

		var html =  '<div id = "modalComponent">'+
            			'<div class="modalShade"></div>'+
            			'<div class="modalCon">'+
            				'<div class="modalHeader">'+
            					modal.headerCon+
            				'</div>'+
            				'<div class="modalBody">'+
            					modal.bodyCon+
        					'</div>';
		if(modal.isBtn){
			html += '<div class="modalFooter">'+
                		'<button class="modalCancel">取消</button>'+
                		'<button class="modalSure sureActive">确认</button>'+
                	'</div>';
		}else{
            html += '<div class="modalFooter">'+
            			'<button class="modalSure">确认</button>'+
            			'</div>';
		}
		html +=  '</div>'+
			'</div>';

		rootDiv.innerHTML= html;

		document.body.appendChild(rootDiv);

		//确认

		var sure = document.querySelector(".modalSure");

		sure.addEventListener('click',function(e){

            var e = window.event || e;

			document.body.removeChild(rootDiv);

			modal.sureCallback(e);

		},false)

		//取消

		var cancel = document.querySelector(".modalCancel");

		cancel.addEventListener('click',function(){

            document.body.removeChild(rootDiv);

		},false)


    };
	var ToastInStance
	var Toast = function(option){
		this.con = option.con;
		console.log(ToastInStance)
		if(ToastInStance){
			return ToastInStance;
		}else{
			ToastInStance = this;
		}
		var rootDiv = document.createElement("div");

		rootDiv.setAttribute('id','Toast');

		var html = '<div class="toastCon">'+option.con+'</div>';

		rootDiv.innerHTML = html;

        document.body.appendChild(rootDiv);

		setTimeout(function(){
			ToastInStance = null;
			document.body.removeChild(rootDiv);

		},2000)
	};

    Toast.init = function(option){

		var toast = new this(option);

		//防止多次点击，生成多个Toast
		// var preEle = document.getElementById("Toast");
        //
		// var isExist = document.getElementById("Toast") ?  true : false;
        //
		// if(isExist){
		//
         //    document.body.removeChild(preEle);
		// }

		



	};

	
	return {
		Modal:Modal,
		Toast:Toast
	}
})();


