(function(exports){
    var utilFn = {
        // UA
        ua:window.navigator.userAgent.toLowerCase(),
        // isWx:this.ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false,
        // 格式化时间
        formatTime:function(timer){
            console.log(timer)
            var time = new Date(parseInt(timer)*1000);
            console.log(time)
            var month = time.getMonth()+1 >= 10 ?  time.getMonth()+1+'' : '0'+(time.getMonth()+1);
            var day = time.getDate()>= 10 ? time.getDate() : '0'+time.getDate() ;

            var hour = time.getHours() >= 10 ?  time.getHours()+'' : '0'+ time.getHours();
            var minutes = time.getMinutes() >= 10 ? time.getMinutes()+'' : '0'+time.getMinutes();
            return month+'-'+day+' | '+hour+':'+minutes;
        },
        // 格式化url
        getRequest: function () {
            var url = window.location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
    }

    exports.utilFnModule = utilFn
        
})(window)