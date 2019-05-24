
var userId = utilFnModule.getRequest().userId;
var userToken = utilFnModule.getRequest().token;
(function () {
    /* ------------------系统信息变量----------------------*/
    var ua = window.navigator.userAgent;
    var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // 网络情况
    var netWork_type = ua.indexOf('wifi') > -1 ? 1 : 2;
    // 屏幕宽高
    var screenWidth = window.innerWidth || document.documentElement.clientWidth,
        screenHeight = window.innerHeight || document.documentElement.clientHeight;

    function OrderCodeModule() {


    }


    OrderCodeModule.prototype = {

        init: function () {
            this.initUI();
            this.initSession();
            this.changeTab();
            this.getUserInfo();
            this.getMemberlist();
            this.changeGood();
            this.slicePayType();
            this.purchase();
            this.copy();
        },

        initUI: function () {
            $('.member_all_option').eq(0).show();
            $('.android_footer_area').eq(0).show();
            if (isiOS) {
                $('.member_pay_option_ara').each(function () {
                    $(this).find('li').eq(1).hide();
                })
            }
        },

        initSession: function () {
            var type = sessionStorage.getItem('media_see_type' + buff) ? sessionStorage.getItem('media_see_type' + buff) : 1;
            if (type) {
                $('.member_type_list li').eq(type - 1).addClass('active').siblings().removeClass('active');
                $('.member_all_option').hide();
                $('.member_all_option').eq(type - 1).show();
                $('.android_footer_area').hide();
                $('.android_footer_area').eq(type - 1).show();
            }

        },

        getUserInfo: function () {
            var self = this;
            $.ajax({
                type: 'get',
                url: apiModule.getUserInfo,
                data: {
                    user_id: userId,
                    access_token: token,
                    token: userToken
                },
                success: function (res) {
                    if (res.errNo === 0) {
                        var data = res.data;
                        var user_id = data.user_id;
                        var user_name = data.user_name;
                        var user_avater = data.profile_photo_url;
                        $('.user_avater').attr('src', user_avater);
                        $('.user_avater').on('error', function () {
                            $(this).attr('src', './img/default_img.png')
                        })
                        $('.user_name').html(user_name);
                        var isMediaMember = !!data.rmt_state;
                        // 判断用户是否绑定手机号
                        var isBindPhone = !!Number(data.cellphone_number);
                        self.isBindPhone = isBindPhone;
                        // 判断用户是否是会员
                        var isMember = data.is_member || data.is_super_member || data.is_company_member;
                        self.isMember = isMember
                        if (isMediaMember) {
                            alert('您已是融媒体会员,不可再次购买');
                            return false;
                        }
                    }
                },
                error: function () {
                    Component.Toast.init({
                        con: '哎呀，网络不好啦'
                    })
                }


            })

        },

        changeTab: function () {
            $('.member_type_list li').on('click', function () {
                var index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $('.member_all_option').hide();
                $('.member_all_option').eq(index).show();
                $('.android_footer_area').hide();
                $('.android_footer_area').eq(index).show();
            })

        },

        getMemberlist: function () {
            var mediaIndex = sessionStorage.getItem('media' + buff) ? sessionStorage.getItem('media' + buff) : 1;
            var companyIndex = sessionStorage.getItem('company' + buff) ? sessionStorage.getItem('company' + buff) : 1;
            $.ajax({
                type: 'get',
                url: apiModule.getMediaMemberList,
                data: {
                    access_token: token,
                    // 1为企业包 2为普通包
                    goods_type: 1
                },
                success: function (res) {
                    if (res.errNo === 0) {
                        var data = res.data.reverse();
                        var html = ''
                        data.forEach(function (item, key) {
                            var liClassName = '';
                            var checkboxClassName = '';
                            var imgSrc = './img/uncheck_icon@2x.png'

                            if (key == (companyIndex - 1)) {
                                liClassName = 'choseActive';
                                checkboxClassName = 'selectActve';
                                imgSrc = './img/selected_icon@2x.png';
                                $('.pay_price').eq(1).html(item.goods_price);
                                $('.company_media').attr('data-cid', item.id);
                            }
                            html += '<li data-cid="' + item.id + '" class="flex_box flex_between ' + liClassName + '">' +
                                '<span class="member_month">' + item.goods_name + '12个月</span>' +
                                '<div class="flex_box">' +
                                '<del class="old_price">¥' + item.display_price + '</del>' +
                                '<span class="normal_price_area">¥' +
                                '<span class="normal_price">' + item.goods_price + '</span>' +
                                '</span>' +
                                '<img src="' + imgSrc + '" alt="" class="select_icon ' + checkboxClassName + '">' +
                                '</div>' +
                                '</li>'
                        })

                        $('.company_media ul').html(html);
                    }
                },
                error: function () {
                    Component.Toast.init({
                        con: '哎呀，网络不好啦'
                    })
                }

            })


            $.ajax({
                type: 'get',
                url: apiModule.getMediaMemberList,
                data: {
                    access_token: token,
                    // 1为企业包 2为普通包
                    goods_type: 2
                },
                success: function (res) {
                    if (res.errNo === 0) {
                        var data = res.data.reverse();
                        var html = ''
                        data.forEach(function (item, key) {
                            var liClassName = '';
                            var checkboxClassName = '';
                            var imgSrc = './img/uncheck_icon@2x.png'
                            if (key == (mediaIndex - 1)) {
                                liClassName = 'choseActive';
                                checkboxClassName = 'selectActve';
                                imgSrc = './img/selected_icon@2x.png';
                                $('.pay_price').eq(0).html(item.goods_price);
                                $('.ordinary_media').attr('data-cid', item.id)
                            }
                            html += '<li data-cid="' + item.id + '" class="flex_box flex_between ' + liClassName + '">' +
                                '<span class="member_month">' + item.goods_name + '12个月</span>' +
                                '<div class="flex_box">' +
                                '<del class="old_price">¥' + item.display_price + '</del>' +
                                '<span class="normal_price_area">¥' +
                                '<span class="normal_price">' + item.goods_price + '</span>' +
                                '</span>' +
                                '<img src="' + imgSrc + '" alt="" class="select_icon ' + checkboxClassName + '">' +
                                '</div>' +
                                '</li>'
                        })

                        $('.ordinary_media ul').html(html);

                    }
                },
                error: function () {
                    Component.Toast.init({
                        con: '哎呀，网络不好啦'
                    })
                }

            })


        },


        // 切换选中商品
        changeGood: function () {

            $('.ordinary_media').on('click', 'li', function () {
                var index = $(this).index();
                var cid = $(this).attr('data-cid');
                $(this).addClass('choseActive').siblings().removeClass('choseActive');
                $(this).find('.select_icon').addClass('selectActve').attr('src', './img/selected_icon@2x.png');
                $(this).siblings().find('.select_icon').removeClass('selectActve').attr('src', './img/uncheck_icon@2x.png');
                var price = $(this).find('.normal_price').html();
                $('.pay_price').eq(0).html(price);
                $('.ordinary_media').attr('data-cid', cid)
            })

            $('.company_media').on('click', 'li', function () {
                var index = $(this).index();
                var cid = $(this).attr('data-cid');
                $(this).addClass('choseActive').siblings().removeClass('choseActive');
                $(this).find('.select_icon').addClass('selectActve').attr('src', './img/selected_icon@2x.png');
                $(this).siblings().find('.select_icon').removeClass('selectActve').attr('src', './img/uncheck_icon@2x.png');
                var price = $(this).find('.normal_price').html();
                $('.pay_price').eq(1).html(price);
                $('.company_media').attr('data-cid', cid)
            })
        },

        // 切换支付方式
        slicePayType: function () {

            $('.member_pay_option_ara li').on('click', function () {
                var parent = $(this).parents('.member_pay_option_ara');
                var parentIndex = parent.attr('data-index') - 1;
                var index = $(this).index();
                $(this).find('.pay_option_icon').addClass('selectActve').attr('src', './img/selected_icon@2x.png');
                $(this).siblings().find('.pay_option_icon').removeClass('selectActve').attr('src', './img/uncheck_icon@2x.png');
                $(this).parent('ul').attr('data-paytype', index + 1);
                if (index == 1) {
                    $(this).siblings().find('.public_text_wrap').slideUp();
                    $('.pay_price_text').eq(parentIndex).html('去支付');
                } else {
                    $(this).find('.public_text_wrap').slideDown();
                    $('.pay_price_text').eq(parentIndex).html('申请激活');
                }


            })
        },

        // 购买
        purchase: function () {
            var self = this;
            $('.pay_price_text').on('click', function () {
                var isBindPhone = self.isBindPhone;
                var isMember = self.isMember;
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
                var parent = $(this).parents('.android_footer_area ');
                var index = parent.attr('data-index');
                // 商品id
                var cid = $('.member_option_wrap ').eq(index).attr('data-cid');
                // 支付方式
                var payType = $('.member_pay_option_ara').eq(index).find('ul').attr('data-paytype');

                console.log('cid=' + cid, 'payType=' + payType)

                if (payType == 1) {
                    window.location.replace('applyActive.html?userId=' + userId + '&token=' + userToken + '&cid=' + cid);
                }
                if (payType == 2 && isAndroid) {
                    // 交互
                    window.location.href = 'http://meishe-app.com?command=createMediaMemberOrder&goods_id=' + cid + '&pay_mode=1'
                }


            })
        },

        // 复制
        copy: function () {
            var clipboard = new ClipboardJS('.media_copy_text', {
                text: function () {
                    return '云美摄APP对公账号\n' +
                        '公司名称：北京云摄美网络科技有限公司\n' +
                        '开户银行：中国工商银行股份有限公司北京紫竹桥支行\n' +
                        '银行账号：0200 2355 0920 1067 897'
                }
            });

            clipboard.on('success', function () {
                Component.Toast.init({
                    con: '复制成功'
                })
            })
            clipboard.on('error', function (e) {
                alert('亲该浏览器不支持复制啦~')
            });
        }





    }


    new OrderCodeModule().init();

})(window)

window.PAYSUCCESS = function () {
    window.location.replace('paySucc.html?userId=' + userId + '&token=' + userToken);
}
window.PAYFAIL = function (msg) {
    if (msg) {
        $('.payFail_info').html(msg);
    }
    $('.payFail_wrap').show();
    setTimeout(function () {
        $('.payFail_wrap').hide();
    }, 2000)
}

// 原生调js方法
window.APPHREF = function (userId, token) {
    window.location.replace(onlineUrl + 'orderCode.html?userId=' + userId + '&token=' + token)
}

window.OFFLINE = function () {
    window.location.replace(onlineUrl + 'orderCode.html')
}