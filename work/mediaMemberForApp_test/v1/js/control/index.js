(function () {
    // userId   ?userId = XXX 
    var userId = utilFnModule.getRequest().userId;
    var userToken = utilFnModule.getRequest().token;
    var version = utilFnModule.getRequest().v;

    // 常量
    /* ------------------系统信息变量----------------------*/
    var ua = window.navigator.userAgent;
    var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var CURRENT_IOS_VERSION = '3.4.8'
    var CURRENT_ANDROID_VERSION = '3.5.1'

    var announcementSwiper = new Swiper('#media_ordmember_swiper', {
        centeredSlides: true,
        on: {
            slideChangeTransitionStart: function () {
                var index = index = this.activeIndex;
                sessionStorage.setItem('media' + buff, index - 0 + 1)

            }
        }
    });
    var other_announcementSwiper = new Swiper('#media_companyMember_swiper', {
        centeredSlides: true,
        on: {
            slideChangeTransitionStart: function () {
                var index = index = this.activeIndex;
                sessionStorage.setItem('company' + buff, index - 0 + 1)

            }
        }
    })

    $('.company_type_detail').hide();
    function IndexModule() {


    }

    IndexModule.prototype = {

        init: function () {
            this.initSession()
            this.forAppConcat();
            this.slide();
            this.getUserInfo();
            this.open();
            this.copy();
            this.clickHandle();
        },
        initSession: function () {
            var type = sessionStorage.getItem('media_see_type' + buff) ? sessionStorage.getItem('media_see_type' + buff) : 1;
            if (type) {
                $('.member_type_detail').eq(type - 1).addClass('active').siblings().removeClass('active');
                if (type == 1) {
                    var mediaIndex = sessionStorage.getItem('media' + buff);
                    announcementSwiper.slideTo(mediaIndex - 1);
                } else {
                    var companyIndex = sessionStorage.getItem('company' + buff);
                    $('.company_type_detail').show().addClass('show');
                    $('.media_type_detail').hide();
                    other_announcementSwiper.slideTo(companyIndex - 1)
                }
            }
        },
        forAppConcat: function () {
            window.location.href = 'http://meishe-app.com?command=setHeaderOption&option=consult';
        },
        getUserInfo: function () {
            var self = this;
            if (userId) {
                self.isLogin = true
                $.ajax({
                    type: 'get',
                    url: apiModule.getUserInfo,
                    data: {
                        access_token: token,
                        token: userToken,
                        user_id: userId
                    },
                    success: function (res) {
                        if (res.errNo === 0) {
                            var data = res.data;
                            // 判断用户是否是融媒体会员
                            var isMediaMember = !!data.rmt_state;
                            var mediaProgress = data.rmt_state;
                            // 判断用户是否绑定手机号
                            var isBindPhone = !!Number(data.cellphone_number);
                            self.isBindPhone = isBindPhone;

                            // 判断用户是否是会员
                            var isMember = data.is_member || data.is_super_member || data.is_company_member;
                            self.isMember = isMember
                            // 已经是融媒体会员
                            if (isMediaMember) {
                                $('body').css('backgroundColor', '#fff');
                                $('.user_avater').attr('src', data.rmt_team_img);
                                var text = ''
                                $('#purchasedPage').show();
                                $('#page').hide();
                                if (mediaProgress == 1) {
                                    text = '正在审核中'
                                    $('.company_name').html(text);
                                } else if (mediaProgress == 2) {
                                    text = '审核失败'
                                    $('.company_name').html(text);
                                } else if (mediaProgress == 3) {
                                    text = '请先创建团队';
                                    $('.company_name').html(text)
                                } else if (mediaProgress == 4 || mediaProgress == 5) {
                                    // 团队已经创建
                                    var rmt_team_name = data.rmt_team_name
                                    $('.company_name').html(rmt_team_name);
                                    $('.team_number').html(data.rmt_team_id);
                                    var pattern = /-/gi;
                                    if(mediaProgress == 4){
                                        $('.out_time').html(data.rmt_team_end_time.split(' ')[0].replace(pattern, '.') + '到期');
                                    }else{
                                        $('.out_time').html('已过期')
                                    }
                                   
                                    $('.mediaMember_team').show()
                                    $('.out_time').show();
                                    $('.check_status_wrap').addClass('checkActive')
                                }
                                var gradeArr = ['企业进阶包', '企业高级包', '融媒体标准包', '融媒体进阶包', '融媒体高级包'];
                                var rmt_goods_id = data.rmt_goods_id
                                $('.mediaMember_level').html('等级：' + gradeArr[rmt_goods_id - 1]);

                                $('.media_img').attr('src', './img/' + rmt_goods_id + '_media_standard_package_icon@2x.png');

                            } else {
                                $('#page').css('visibility', 'visible');
                            }
                        }
                    }
                })
            } else {
                self.isLogin = false
                $('#page').css('visibility', 'visible');
            }

        },

        slide: function () {
            $('.member_type_detail').on('click', function () {
                $(this).addClass('active').siblings().removeClass('active');
                var index = $(this).index();
                sessionStorage.setItem('media_see_type' + buff, (index - 0 + 1));
                if (index == 1) {
                    $('.company_type_detail').show().addClass('show');
                    $('.media_type_detail').hide();
                } else {
                    $('.media_type_detail').show();
                    $('.company_type_detail').hide();
                }

                $('.footer_item').eq(index).show().siblings().hide();
            })
        },

        // 开通
        open: function () {
            var self = this;
            $('.footer_item').on('click', function () {
                var index = $(this).index();
                var isLogin = self.isLogin;
                var isBindPhone = self.isBindPhone;
                var isMember = self.isMember;
                if(!version){
                    Component.Toast.init({
                        con: '请升级到云美摄最新版本'
                    })
                    return false; 
                }else{
                    if(isiOS){
                        if(version != CURRENT_IOS_VERSION){
                            Component.Toast.init({
                                con: '请升级到云美摄最新版本'
                            })
                            return false;
                        }
                    }else{
                        if(version != CURRENT_ANDROID_VERSION){
                            Component.Toast.init({
                                con: '请升级到云美摄最新版本'
                            })
                            return false;
                        }
                    }
                }
                if (!isLogin) {
                    window.location.href = 'http://meishe-app.com?command=enterLogin';
                    return false;
                }

                if (isMember) {
                    Component.Toast.init({
                        con: '请使用非会员账号购买融媒体包'
                    })
                    return false;
                }

                if (!isBindPhone) {
                    window.location.href = 'http://meishe-app.com?command=bindPhone';
                    return false;
                }

                window.location.href = 'orderCode.html?userId=' + userId + '&type=' + (index + 1) + '&token=' + userToken;
            })
        },

        copy: function(){
            var clipboard = new ClipboardJS('.copy_icon', {
                text: function () {
                    return $('.team_number').html()
                }
            });
            clipboard.on('success', function () {
                Component.Toast.init({
                    con: '复制成功'
                })
            })
            clipboard.on('error', function (e) {
                alert('当前环境不支持复制啦~')
            });
        },

        clickHandle: function(){
            $(document).on('click', '.media_img', function(){
                window.location.href = 'http://m.meisheapp.com/agreement/mediaMemberBenifit.html'
            })

            $(document).on('click', '.swipe_detail img', function(){
                window.location.href = 'http://m.meisheapp.com/agreement/mediaMemberBenifit.html'
            })
        }


    }

    new IndexModule().init()
})(window)
// 原生调js方法
window.APPHREF = function (userId, token) {
    window.location.href = onlineUrl + 'index.html?userId=' + userId + '&token=' + token
}

window.OFFLINE = function () {
    window.location.replace(onlineUrl + 'index.html')
}