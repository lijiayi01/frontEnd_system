/* ------------------url传递变量------------------*/
// userId   ?userId = XXX 
var userId = utilFnModule.getRequest().userId;
// 会员类型  ?type = XXX      type= 1（普通会员）｜｜ 2 (超级会员)  ｜｜ 3 (企业会员) 
var passType = utilFnModule.getRequest().type;

// ios版本号
var version = utilFnModule.getRequest().v;

// 购买类型
var purchaseType = 3;
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
    // 红包使用范围
    var BALANCE_LIMIT = [0, 30]
    $('.user_info').show()
    $('.member_option_area ').show();
    // 机型判别
    if (isiOS) {
        $('.ios_footer_area').show();
    } else {
        $('.android_footer_area').show();
    }
    function OrderCode() {
        // ios下商品id
        this.apple_product_id_list = [];
        // ios下 is_renewable 参数列表
        this.renewableList = [];
        // 接口下的商品id
        this.goodsIdList = [];
        // 商品价格,顺序为: 普通会员 超级会员 企业会员
        this.goodsPrice = []
    }

    OrderCode.prototype = {

        init: function () {
            this.getOnlineStatus();
            this.getVipPrice();
            this.getUserInfo();
            this.purchase();
            this.checkRedpackage();
            this.checkPayType();
            this.handUp()
        },
        // 选项卡切换
        tabChange: function () {
            $('.member_type_list li').on('click', function () {
                var index = $(this).index();
                $('.member_option_area ').eq(index).show().siblings('.member_option_area ').hide();
                $(this).addClass('active').siblings().removeClass('active');
                $('.user_info').eq(index).show().siblings().hide();
                if (isiOS) {
                    $('.ios_footer_area').eq(index).show().siblings('.ios_footer_area').hide();
                } else {
                    $('.android_footer_area ').eq(index).show().siblings('.android_footer_area').hide();
                }
            })
        },
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
                            $('.vip_equity_text').find('img').attr('src', './img/test_company_vip_equity_text@2x.png')
                        }
                    },
                    error: function(){
                        Component.Toast.init({
                            con: '哎呀，网络不好啦'
                        })
                        return false;
                    }
                })
            }

        },
        // 获取各个会员价格
        getVipPrice: function () {
            var self = this;
            var requestNum = 0;
            //获取 普通会员 商品ID
            $.ajax({
                type: 'GET',
                url: apiModule.getVipPrice,
                data: {
                    userId: userId,
                    lang: 'zh_CN'
                },
                async: false,
                success: function (res) {
                    if (res.errNo === 0) {
                        // 商品id
                        // var goodsId = res.goodsList[0].id;
                        // self.goodsPrice[0] = res.goodsList[0].goods_price;
                        // self.goodsIdList[0] = goodsId;
                        // self.apple_product_id_list[0] = res.goodsList[0].apple_product_id;
                        // self.renewableList[0] = res.goodsList[0].is_renewable;

                        // 商品id
                        var data = res.goodsList;
                        data.forEach(function (item, key) {
                            if(key == 2){
                                self.goodsId = item.id;
                                self.iosProductId = item.apple_product_id;
                                self.isRenewable = item.is_renewable;
                                self.goodsType = item.goods_type;
                                if (isiOS) {
                                    $('.member_option_area').find('.old_price').html('¥' + item.apple_display_price);
                                    $('.member_option_area').find('.normal_price').html(item.apple_goods_price);
                                } else {
                                    self.goodsPrice.push(item.goods_price)
                                    $('.member_option_area').find('.old_price').html('¥' + item.display_price);
                                    $('.member_option_area').find('.normal_price').html(item.goods_price);
                                }
                            }
                           

                        })
                    }

                },
                error: function(){
                    Component.Toast.init({
                        con: '哎呀，网络不好啦'
                    })
                    return false;
                }
            });

            // 获取超级会员 商品ID
            // $.ajax({
            //     type: 'GET',
            //     url: apiModule.getVipPrice,
            //     data: {
            //         goodsType: 7
            //     },
            //     success: function (res) {
            //         if (res.errNo === 0) {
            //             requestNum++;
            //             var goodsId = res.goodsList[0].id;
            //             self.goodIdList[1] = goodsId;
            //             self.goodsPrice[1] = res.goodsList[0].goods_price;
            //         }

            //     },
            //     error: function (error) {
            //         alert('服务器故障，请稍后再试');
            //     }
            // })
            // 获取升级vip会员 商品ID
            // $.ajax({
            //     type: 'GET',
            //     url: apiModule.getVipPrice,
            //     data: {
            //         goodsType: 6
            //     },
            //     success: function (res) {
            //         if (res.errNo === 0) {
            //             requestNum++;
            //             var goodsId = res.goodsList[0].id;
            //             self.goodIdList[2] = goodsId;
            //             self.priceList[2] = res.goodsList[0].goods_price;
            //             $('.upgradeSuperVip').html('价格:<span class="newPrice_area_text">￥<span class="newPrice_area">' + res.goodsList[0].goods_price + '</span>/年</span>');
            //             // 是否是活动价格
            //             var goods_activity = res.goodsList[0].goods_activity;
            //             if (notEmptyObj(goods_activity)) {
            //                 self.activityPriceList[2] = goods_activity.activity_price;
            //             }
            //         }

            //     },
            //     error: function (error) {
            //         alert('服务器故障，请稍后再试');
            //     }
            // })
            // $.ajax({
            //     type: "GET",
            //     url: apiModule.getVipPrice,
            //     data: {
            //         goodsType: 3
            //     },
            //     success: function (e) {
            //         if (0 === e.errNo) {
            //             0;
            //             var t = e.goodsList[0].id;
            //             i.goodIdList[3] = t,
            //                 i.priceList[3] = e.goodsList[0].goods_price,
            //                 $("#memberType-container .swiper-slide").eq(0).attr("data-goodsId", t),
            //                 $(".cpmpany_member_area .vipPrice").html(e.goodsList[0].goods_price),
            //                 $(".footer").eq(0).find(".footer_price").html(e.goodsList[0].goods_price);
            //             i.identityUser()
            //         }
            //     },
            //     error: function (e) {
            //         alert("服务器故障，请稍后再试")
            //     }
            // })

            // var timer = setInterval(function () {
            //     if (requestNum >= 3) {
            //         clearInterval(timer);
            //     }
            // }, 100)
        },
        getUserInfo: function () {
            var self = this;
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
                            $(this).attr('src','./img/default_img.png')
                        })
                        $('.user_name').html(user_name)
                        // 服务器当前时间
                        var currentDate = new Date(data.now.replace(/-/g,'/'));
                        console.log(currentDate)
                        // 企业会员
                        var is_companyMember = data.is_company_member;
                        var company_member_expire_time = data.company_member_expire_time;
                        if (is_companyMember) {
                            // $('.user_member_symbol').hide();
                            $('.companyMember_user .user_member_symbol').show();
                            $('.open_status').html(company_member_expire_time.split(' ')[0] + '到期');
                            // 计算当前时间与会员过期时间的差
                            var time = compareDate(currentDate.getTime(), company_member_expire_time.replace(/-/g,'/'));
                            if (-TIP_TIME <= time) {
                                $('.open_status').addClass('expireActive');
                            }
                        }

                        // 红包处理
                        var balance = data.balance;
                        var canUseNum = 0;
                        if (balance >= BALANCE_LIMIT[1]) {
                            canUseNum = BALANCE_LIMIT[1];
                        } else {
                            canUseNum = balance;
                        }
                        self.canUseNum = canUseNum;

                        if (canUseNum > 0 && !isiOS) {
                            $('.member_couple_area').show();
                            $('.member_couple_price').html(canUseNum);
                        }
                        if (!isiOS) {
                            $('.member_pay_option_ara').show()
                        }

                        // 需花费价格
                        var priceList = self.goodsPrice;
                        if (!isiOS) {
                            $('.android_footer_area').find('.pay_price').html((priceList[0] - canUseNum).toFixed(2))
                        }

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

        // 购买
        purchase: function () {
            var self = this;
            if (isiOS) {
                $('.ios_footer_area').on('click', function () {
                    if (!$(this).hasClass('noSubmit')) {
                        var goodsId = self.goodsId;
                        var apple_product_id = self.iosProductId;
                        var is_renewable = self.isRenewable;
                        $(this).find('.flex_justify_center').html('<span class="loading_icon"></span> 正在支付...');
                        var that = $(this)
                        // 交互
                        console.log(goodsId, apple_product_id, is_renewable);
                        setTimeout(function () {
                            that.find('.flex_justify_center').html('去支付');
                        }, 2000)
                         window.location.href = 'http://meishe-app.com?command=createOrder&goodsId='+goodsId+'&apple_product_id='+apple_product_id+'&is_renewable='+is_renewable
                    }
                })
            } else {
                $('.android_footer_area .pay_price_text').on('click', function () {
                    var parent = $(this).parents('.android_footer_area');
                    if (!$(this).hasClass('noSubmit')) {
                        var goodsId = self.goodsId;
                        // 微信或者支付宝
                        var payType = $('.member_pay_option_ara').find('ul').attr('data-payType');
                        // 优惠券id(目前2019.04.17 已废弃)
                        var couponId = 0;
                        // 支付类型( 红包 或者 是现金)
                        var payMethod = 0;
                        if (self.canUseNum > 0) {
                            if ($('.member_couple_area').find('.check_icon').hasClass('checkActive')) {
                                payMethod = 3;
                            } else {
                                payMethod = 1;
                            }
                        } else {
                            payMethod = 1;
                        }
                        var goodsType = self.goodsType;
                        console.log(goodsId, payType, couponId, payMethod,goodsType);
                        $(this).html('<span class="loading_icon"></span>');
                        var that = $(this)
                        setTimeout(function () {
                            that.html('去支付')
                        }, 2000)

                        
                        // 交互
                         window.location.href = 'http://meishe-app.com?command=createOrder&goodsId='+goodsId+'&payType='+payType+'&couponId='+couponId+'&payMethod='+payMethod+'&goodsType='+goodsType;

                    }
                })
            }
        },

        // 红包是否使用
        checkRedpackage: function () {
            var self = this;
            $('.member_couple_area').on('click', function () {
                var el = $(this).find('.check_icon');
                if (el.hasClass('checkActive')) {
                    el.attr('src', './img/uncheck_icon@2x.png');
                    $('.android_footer_area ').find('.pay_price').html(self.goodsPrice[0])
                } else {
                    el.attr('src', './img/selected_icon@2x.png');
                    $('.android_footer_area ').find('.pay_price').html((self.goodsPrice[0] - self.canUseNum).toFixed(2))
                }
                el.toggleClass('checkActive');


            })
        },

        // 切换支付方式
        checkPayType: function () {
            $('.member_pay_option_ara li').on('click', function () {
                var index = $(this).index();
                $(this).addClass('payActive').find('.pay_option_icon').attr('src', './img/selected_icon@2x.png');
                $(this).siblings('li').removeClass('payActive').find('.pay_option_icon').attr('src', './img/uncheck_icon@2x.png');
                $(this).parent('ul').attr('data-payType', index + 1)
            })
        },

        // 切换ui
        handUp: function () {
            $('.member_benefit').on('click', function () {
                $(this).find('.pack_up_icon').toggleClass('rotate');
                $(this).find('.vip_equity_text').toggle();
            })

            $(document).on('click','.question_icon',function(){
                window.location.href = 'http://m.meisheapp.com/agreement/usePackageagreement.html'
            })
        }
    }
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

    var a = new OrderCode()
    a.init()
    console.log(a)
})(window)

window.PAYSUCCESS = function () {
    window.location.replace('orderSucc.html?type='+purchaseType+'&v='+version);
}

window.PAYFAIL = function (isCancel) {
    $('.payFail_wrap').show();
    setTimeout(function () {
        $('.payFail_wrap').hide();
    }, 2000)
}