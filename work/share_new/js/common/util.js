(function (exports) {
    // var pageInfo = {}
    var utilFn = {
       
        // isWx:this.ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false,
        // 格式化时间
        formatTime: function (timer) {
            console.log(timer)
            var time = new Date(parseInt(timer) * 1000);
            console.log(time)
            var month = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 + '' : '0' + (time.getMonth() + 1);
            var day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();

            var hour = time.getHours() >= 10 ? time.getHours() + '' : '0' + time.getHours();
            var minutes = time.getMinutes() >= 10 ? time.getMinutes() + '' : '0' + time.getMinutes();
            return month + '-' + day + ' ' + hour + ':' + minutes;
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
        // 自定义ajax
        ajax: function (option) {
            var that = this;
            var startTime = new Date().getTime();
            var type = option.type || 'GET',
                data = option.data,
                url = option.url,
                success = option.success,
                err = option.error;
            $.ajax({
                type: type,
                url: url,
                data: data,
                dataType: 'json',
                success: function (res) {
                    var endTime = new Date().getTime();
                    // watchNum++;
                    success(res)
                    if (endTime - startTime >= 2000) {
                        console.log(pageInfo)
                        pageInfo.jsApi = {
                            url: url,
                            apiTime: endTime - startTime + 'ms',
                            errorType: 'h5 api timeout'
                        }
                        that.catchError(access_token,JSON.stringify(pageInfo))
                    }
                },
                error: function (error) {
                    pageInfo.jsApi = {
                        url: url,
                        apiTime: errorTime - startTime + 'ms',
                        errorType: 'h5 api error'
                    }
                    that.catchError(access_token,JSON.stringify(pageInfo))
                    err(error);
                }
            })
        },
        // 捕获错误
        catchError: function (access_token,errCon) {
            $.ajax({
                type: 'POST',
                url: apiModule.errorLog,
                data: {
                    access_token: access_token,
                    content: errCon
                },
                success: function (data) {
                },
                error: function (err) {
                }
            })
        }

    }

    exports.utilFnModule = utilFn
})(window)