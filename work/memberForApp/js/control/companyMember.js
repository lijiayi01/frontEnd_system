/* ------------------url传递变量------------------*/
// userId   ?userId = XXX 
var userId = utilFnModule.getRequest().userId;

// ios版本号
var version = utilFnModule.getRequest().v;
(function (exports) {


    /* ------------------系统信息变量----------------------*/
    var ua = window.navigator.userAgent;
    var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // 网络情况
    var netWork_type = ua.indexOf('wifi') > -1 ? 1 : 2;
    // 屏幕宽高
    var screenWidth = window.innerWidth || document.documentElement.clientWidth,
        screenHeight = window.innerHeight || document.documentElement.clientHeight;


    /** -----------------会员相关变量----------------------- */
    // 如果在10天之内或者10天之外会有相关提示,当作常量处理
    var TIP_TIME = 10;
    $('.footer_area').eq(0).show();

    // IndexModule
    function IndexModule() {


    }

    IndexModule.prototype = {

        init: function () {
            this.getOnlineStatus();
            this.getUserInfo();
            this.clickOpenMember();
            this.copyText();
            this.hrefPage();
        },
        // ios正在上线审核
        // ios是否正在上线
        getOnlineStatus: function () {
            if (isiOS) {
                $.ajax({
                    type: 'get',
                    url: apiModule.isOnlineing,
                    data: {
                        type: 2,
                        v: version,
                        access_token: token
                    },
                    async: false,
                    success: function (res) {
                        var data = res.data;
                        if (!data.wx_service_display) {
                            $('.member_equity_item').eq(0).find('img').attr('src', './img/test_company_vip_equity_icon@2x.png')
                            $('.wechat_focus_area').hide();
                            $('.member_equity_item').eq(0).show();
                        }else{
                            $('.member_equity_item').eq(0).show();
                            $('.wechat_focus_area').show();
                        }
                    },
                    error: function(){
                        Component.Toast.init({
                            con: '哎呀，网络不好啦'
                        })
                        return false;
                    }
                })
            }else{
                $('.member_equity_item').eq(0).show();
            }

        },
        // 获取用户信息
        getUserInfo: function () {
            var self = this;
            if (!userId) {
                $('.user_card_status button').addClass('noLogin');
                $('.footer_area').addClass('noLogin');
                return false;
            }
            $.ajax({
                type: 'get',
                url: apiModule.getUserInfo,
                data: {
                    'access_token': token,
                    'user_id': userId
                },
                success: function (res) {
                    if (res.errNo === 0) {
                        var data = res.data;
                        // 卡片信息填充
                        // 用户信息填充
                        var user_id = data.user_id;
                        var user_name = data.user_name;
                        var user_avater = data.profile_photo_url;
                        $('.user_avater').attr('src', user_avater);
                        $('.user_avater').on('error',function(){
                            $(this).addClass('noAvater')
                        })
                        $('.user_name').html(user_name)
                        // 服务器当前时间
                        var currentDate = new Date(data.now.replace(/-/g,'/'));

                        // 企业会员
                        var is_companyMember = data.is_company_member;
                        var company_member_expire_time = data.company_member_expire_time;
                        if (is_companyMember) {
                            indentity = 3;
                            $('.companyMember_card .user_info_handle').show();
                            $('.companyMember_card .member_card_info').hide();
                            $('.companyMember_card .user_outDate').html(company_member_expire_time.split(' ')[0].replace(/-/g,'.') + '到期');
                            $('.companyMember_card .user_card_status button').html('立即续费');
                            $('.footer_area').eq(0).html('立即续费');
                            // 计算当前时间与会员过期时间的差
                            var time = compareDate(currentDate.getTime(), company_member_expire_time.replace(/-/g,'/'));
                            if (-TIP_TIME <= time) {
                                if(isiOS){
                                    setTimeout(function(){
                                        $('.companyMember_card .user_outDate').addClass('expireActive');
                                    },0)
                                }else{
                                    $('.companyMember_card .user_outDate').addClass('expireActive');
                                }
                                
                            }
                        }

                    }else if(res.errNo === 400){
                        Component.Toast.init({
                            con: res.message
                        })
                        $('.footer_area').addClass('active');
                        return false;
                    }
                },
                error: function(){
                    Component.Toast.init({
                        con: '哎呀，网络不好啦'
                    })
                    return false;
                }
            })
        },

        // 点击开通会员
        clickOpenMember: function () {
            $('.footer_area').on('click', function () {
                var noLogin = $(this).hasClass('noLogin');
                if (noLogin) {
                    // 需要交互
                    // alert('跳转到app登录页面');
                    window.location.href = 'http://meishe-app.com?command=enterLogin'
                    return false;
                }
                var hasActive = $(this).hasClass('active');
                var index = $(this).index();
                if (hasActive) {
                   
                } else {
                    window.location.href = 'companyOrder.html?userId=' + userId+'&v='+version;
                }
            })

            $('.user_card_status button').on('click', function () {
                var noLogin = $(this).hasClass('noLogin');
                if (noLogin) {
                    // 需要交互
                    // alert('跳转到app登录页面');
                     window.location.href = 'http://meishe-app.com?command=enterLogin'
                    return false;
                }
                var hasActive = $(this).hasClass('active');
                if (hasActive) {
                   

                } else {
                    window.location.href = 'companyOrder.html?userId=' + userId+'&v='+version;
                }
            })
        },

        // 复制微信公众号
        copyText: function () {
            var clipboard = new ClipboardJS('.copy_wechat_service', {
                text: function (trigger) {
                    var copyId = $(trigger).attr('data-clipboard-target');
                    console.log(copyId);
                    var text = $(copyId).html();
                    return text
                }
            });
            clipboard.on('success', function (e) {
                window.location.href = 'http://meishe-app.com?command=openWechat'
            });
        },

        // 跳转到会员权益页面
        hrefPage: function () {
            $('.member_equity_item>img').on('click', function () {
                var index = $(this).parent('.member_equity_item').index();
                sessionStorage.setItem('hrefIndex' + buff, index);
                window.location.href = 'http://m.meisheapp.com/agreement/memberBenifit.html'
            })
        }

    }


    new IndexModule().init();



    /**
     * 通用类函数
     * 
     */
    // 比较时间
    function compareDate(currntTime, expireTime) {
        var timer1 = new Date(currntTime).getTime();
        var timer2 = new Date(expireTime).getTime();

        var num = timer1 - timer2;

        //计算出相差天数
        var days = Math.floor(num / (24 * 3600 * 1000))
        return days;
    }

    // 计算数组最大值
    function getMaxValue(arr) {
        var max = 0;
        var currentkey = 0;
        arr.forEach(function (item, key) {
            if (item > max) {
                max = item;
                currentkey = key
            }
        })
        return {
            max: max,
            key: currentkey
        }
    }

   

})(window)

 // 原生调js方法
 window.APPHREF = function (userId, token) {
    window.location.replace(onlineUrl + 'companyMember.html?userId=' + userId + '&token=' + token);
}

window.OFFLINE = function(){
    window.location.replace(onlineUrl + 'companyMember.html')   
}