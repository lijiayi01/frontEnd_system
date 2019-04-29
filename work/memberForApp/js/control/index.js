/* ------------------url传递变量------------------*/
// userId   ?userId = XXX 
var userId = utilFnModule.getRequest().userId;
// 会员类型  ?type = XXX      type= 1（普通会员）｜｜ 2 (超级会员)  ｜｜ 3 (企业会员) 
var passType = utilFnModule.getRequest().type;

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
                            $('.member_equity_item').eq(0).find('img').attr('src', './img/test_vip_equity_icon@2x.png')
                            $('.member_equity_item').eq(1).find('img').attr('src', './img/test_svip_equity_icon@2x.png')
                            $('.member_equity_item').eq(2).find('img').attr('src', './img/test_company_vip_equity_icon@2x.png')
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
                        var currentDate  = new Date(data.now.replace(/-/g,'/'));

                        // 判断用户最大身份,默认普通会员权重1  超级2 企业3  普通用户0
                        var indentity = 0;

                        // 普通会员
                        var isMember = data.is_member;
                        var member_expire_time = data.member_expire_time;
                        if (isMember) {
                            indentity = 1;
                            $('.member_card .member_card_info').hide();
                            $('.member_card .user_info_handle').show();
                            $('.member_card .user_outDate').html(member_expire_time.split(' ')[0].replace(/-/g,'.') + '到期');
                            $('.member_card .user_card_status button').html('立即续费');
                            $('.footer_area').eq(0).html('立即续费');

                            // 计算当前时间与会员过期时间的差
                            var time = compareDate(currentDate.getTime(), member_expire_time.replace(/-/g,'/'));
                            if (-TIP_TIME <= time) {
                                $('.member_card .user_outDate').addClass('expireActive');
                                if(isiOS){
                                    setTimeout(function(){
                                        $('.member_card .user_outDate').addClass('expireActive');
                                    },0)
                                }else{
                                    $('.member_card .user_outDate').addClass('expireActive');
                                }
                                
                                
                            }

                            // 如果是普通会员且不为超级会员，则购买超级会员改为“立即升级”
                            if (!is_superMember) {
                                $('.superMember_card .user_card_status button').html('立即升级');
                                $('.footer_area').eq(1).html('立即升级');
                                $('.member_equity_item').eq(1).find('.tips_info').html('升级超级会员，会员时长为超级会员开通日期起一年')
                            }

                        }

                        // 超级会员
                        var is_superMember = data.is_super_member;
                        var super_member_expire_time = data.super_member_expire_time;
                        if (is_superMember) {
                            indentity = 2;
                            $('.superMember_card .member_card_info').hide();
                            $('.superMember_card .user_info_handle').show();
                            $('.superMember_card .user_outDate').html(super_member_expire_time.split(' ')[0].replace(/-/g,'.') + '到期');
                            $('.superMember_card .user_card_status button').html('立即续费');
                            $('.footer_area').eq(1).html('立即续费');
                            $('.footer_area').eq(0).addClass('active');
                            $('.user_card_status').eq(0).find('button').addClass('active');
                            $('.member_equity_item').eq(0).find('.tips_info').html('您当前已是超级会员，不能购买普通会员')

                            // 计算当前时间与会员过期时间的差
                            var time = compareDate(currentDate.getTime(), super_member_expire_time.replace(/-/g,'/'));
                            if (-TIP_TIME <= time) {
                                if(isiOS){
                                    setTimeout(function(){
                                        $('.superMember_card .user_outDate').addClass('expireActive');
                                    },0)
                                }else{
                                    $('.superMember_card .user_outDate').addClass('expireActive');
                                }
                               
                            }

                        }

                        // 企业会员
                        var is_companyMember = data.is_company_member;
                        var company_member_expire_time = data.company_member_expire_time;
                        if (is_companyMember) {
                            indentity = 3;
                            $('.companyMember_card .member_card_info').hide();
                            $('.companyMember_card .user_info_handle').show();
                            $('.companyMember_card .user_outDate').html(company_member_expire_time.split(' ')[0].replace(/-/g,'.') + '到期');
                            $('.companyMember_card .user_card_status button').html('立即续费');
                            $('.footer_area').eq(2).html('立即续费');
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

                        // 所有会员均过期
                        var expireTimeList = [new Date(member_expire_time ? member_expire_time.replace(/-/g,'/') : null).getTime(), new Date(super_member_expire_time ? super_member_expire_time.replace(/-/g,'/') : null).getTime(), new Date(company_member_expire_time ? company_member_expire_time.replace(/-/g,'/') : null).getTime()];
                        if (!isMember && !is_superMember && !is_companyMember) {
                            var maxObj = getMaxValue(expireTimeList);
                            // 如果最大值为0，则说明用户还未开通过会员
                            if (maxObj.max !== 0) {
                                var key = maxObj.key;
                                // 计算时间差
                                var maxTime = compareDate(currentDate.getTime(), expireTimeList[key]);
                                if (TIP_TIME >= maxTime) {
                                    $('.user_card_status').eq(key).find('button').html('立即续费');
                                    $('.footer_area').eq(key).html('立即续费');
                                }
                            }
                        }

                        // 卡片
                        var sessionType = sessionStorage.getItem('hrefIndex' + buff);
                        if (sessionType) {
                            announcementSwiper.slideTo(sessionType)
                        } else {
                            if (passType) {
                                announcementSwiper.slideTo(passType - 1)
                            } else {
                                announcementSwiper.slideTo((indentity - 1) < 0 ? 0 : (indentity - 1))
                            }
                        }

                    }else if(res.errNo === 400){
                        Component.Toast.init({
                            con: res.message
                        })
                        $('.footer_area').addClass('active')
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
                    if (index == 1) {
                        Component.Toast.init({
                            con: '您当前已是超级会员，不能购买普通会员'
                        })
                        return false;
                    }
                } else {
                    window.location.href = 'orderCode.html?userId=' + userId + '&type=' + (index)+'&v='+version
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
                var parent = $(this).parents('.swiper-slide');
                var hasActive = $(this).hasClass('active');
                var index = parent.index();
                if (hasActive) {
                    if (index == 0) {
                        Component.Toast.init({
                            con: '您当前已是超级会员，不能购买普通会员'
                        })
                        return false;
                    }

                } else {
                    window.location.href = 'orderCode.html?userId=' + userId + '&type=' + (index+1)+'&v='+version;
                }
            })
        },

        // 复制微信公众号
        copyText: function () {
            var clipboard = new ClipboardJS('.copy_wechat_service', {
                text: function (trigger) {
                    var copyId = $(trigger).attr('data-clipboard-target');
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
    window.location.replace(onlineUrl + 'index.html?userId=' + userId + '&token=' + token + '&type=' + passType)
}

window.OFFLINE = function(){
    window.location.replace(onlineUrl + 'index.html')   
}