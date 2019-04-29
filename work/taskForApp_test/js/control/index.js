// 获取url数据
var userId = utilFnModule.getRequest().userId;
var token = utilFnModule.getRequest().token;
var version = utilFnModule.getRequest().v;
(function () {
    function SignModule() {

    }

    SignModule.prototype = {

        init: function () {
            this.getTaskList();
            this.exchangeHandle();
            this.modelHide();
            this.jsBridge();
            this.submitExchange();
            this.href();
            this.switchTipsStatus();
        },

        // 获取任务列表
        getTaskList: function () {
            var self = this;
            if (userId) {
                $.ajax({
                    type: 'get',
                    url: apiModule.getTaskList,
                    data: {
                        access_token: access_token,
                        user_id: userId,
                        token: token
                    },
                    success: function (res) {
                        var res = (typeof res === 'string') ? JSON.parse(res) : res;
                        if (res.errNo === 0) {
                            var data = res.data;
                            // 当前积分
                            var credits_count = data.credits_count;
                            // 当前水印
                            var atermark_count = data.atermark_count;
                            // 高清数
                            var hd_upload_coun = data.hd_upload_coun;
                            // 提醒状态
                            var sign_in_remind_status = data.sign_in_remind_status;
                            // 签到天数
                            var sign_in_count = data.sign_in_count;
                            self.sign_in_count = sign_in_count;
                            // 签到任务
                            var sign_in_tasks = data.sign_in_tasks;
                            // day array
                            var sign_day = sign_in_tasks.days;
                            // 商品
                            var goods = data.goods;
                            // 任务列表
                            var tasks = data.tasks;
                            // 签到key
                            var taskKey = sign_in_tasks.task_key;
                            // 签到记录
                            var record_id = sign_in_tasks.record_id;

                            $('.integral_total_num').html(credits_count);

                            if (sign_in_count < 7) {
                                $('.sign_header_item').html('已签到 <span class="signed_day">' + sign_in_count + '</span> 天，连续签到7天奖励额外积分')
                            } else {
                                $('.sign_header_item').html('已签到 <span class="signed_day">' + sign_in_count + '</span> 天，下周签到还能领积分')
                            }

                            $('#switch_btn').addClass(sign_in_remind_status ? 'checked' : '').attr('data-stauts', sign_in_remind_status);

                            sign_day.forEach(function (item, key) {
                                if (key != 6) {
                                    $('.sign_reward').eq(key).html(item.reward);
                                    if (item.status) {
                                        $('.sign_status').eq(key).find('img').attr('src', './img/Signed@2x.png');
                                        $('.sign_reward').eq(key).addClass('today_sign_active')
                                    } else {
                                        $('sign_status').eq(key).find('img').attr('src', './img/noSign@2x.png');
                                    }
                                } else {
                                    if (item.status) {
                                        $('.sign_status').eq(key).find('img').attr('src', './img/gift@2x.png');
                                    } else {
                                        $('.sign_status').eq(key).find('img').attr('src', './img/gift_gray@2x.png');
                                    }
                                }
                            })
                            var goodsPrice = [];
                            goods.forEach(function (item, key) {
                                goodsPrice.push(item.goods_price);
                                $('.exchange_item').eq(key).find('.exchange_item_name').html(item.goods_name);
                                $('.exchange_item').eq(key).find('.exchange_item_price').html(item.goods_price);
                                $('.exchange_item').eq(key).find('.surplus_num').html(item.own_number >= 100000000 ? '无限次' : item.own_number);
                                $('.exchange_item').eq(key).attr('data-goodsId', item.goods_id);
                                if (!item.is_show || item.own_number >= 100000000) {
                                    $('.exchange_item').eq(key).find('.exchange_item_btn').addClass('noExchangeActive');
                                }

                            })
                            self.goodsPrice = goodsPrice;

                            var textArr = ['已关注', '已评论', '已点赞', '已分享', '已发布', '已完善']
                            tasks.forEach(function (item, key) {
                                if (key < 3) {
                                    $('.task_item').eq(key).find('.task_item_complete').html(item.cur_num);
                                    $('.task_item').eq(key).find('.task_item_total').html(item.number);
                                    $('.task_item').eq(key).find('.lightColor').html(item.reward + '积分');
                                } else {
                                    $('.task_item').eq(key).find('.lightColor').html(item.reward + '积分');
                                }

                                if (item.status) {
                                    $('.task_item').eq(key).find('.task_item_btn').html(textArr[key]).addClass('taskCompleteActive')
                                }

                            })

                            // 今日签到状态
                            var sign_status = sign_in_tasks.status;
                            // 完成签到
                            if (!sign_status) {
                                self.signHandle(taskKey, record_id);
                            }


                        } else if (res.errNo <= 400) {
                            Component.Toast.init({
                                con: res.message
                            })
                        }
                    },
                    error: function () {
                        Component.Toast.init({
                            con: '哎呀，网络不好啦'
                        })
                    }
                })
            } else {
                window.location.href = 'http://meishe-app.com?command=enterLogin'
                return false;
            }
        },

        // 签到操作
        signHandle: function (task_key, record_id) {
            var sign_in_count = this.sign_in_count;
            var self = this;
            $.ajax({
                type: 'get',
                url: apiModule.complateTask,
                data: {
                    user_id: userId,
                    access_token: access_token,
                    token: token,
                    task_key: task_key,
                    record_id: record_id
                },
                success: function (res) {
                    if (res.errNo === 0) {
                        var res = (typeof res === 'string') ? JSON.parse(res) : res;
                        var data = res.data;
                        ++sign_in_count;
                        if (sign_in_count < 7) {
                            $('.receive_num_model_wrap').find('.add_icon, .extra_model').hide();
                            $('.receive_current_num').html(data.rewards[0]);
                            $('.receive_content_detail').html('恭喜你获得' + data.rewards[0] + '积分');
                            $('.extra_num_text').html(data.rewards[0])
                        } else {
                            $('.receive_current_num').html(data.rewards[0]);
                            $('.receive_content_detail').html('恭喜你获得' + data.rewards.reduce(function (pre, next) {
                                return pre + next;
                            }) + '积分');
                            $('.extra_num_text').html(data.rewards[0])
                        }
                        $('.receive_num_model_wrap').show();
                        self.getTaskList();
                    } else if (res.errNo <= 400) {
                        Component.Toast.init({
                            con: res.message
                        })
                    }
                },
                error: function () {
                    Component.Toast.init({
                        con: '哎呀，网络不好啦'
                    })
                }
            })
        },

        // 切换 "提醒"状态
        switchTipsStatus: function () {
            var self = this;
            $('#switch_btn').on('click', function () {
                var hasChecked = $(this).hasClass('checked');
                if (hasChecked) {
                    $('.sign_tips_model_wrap').show();
                } else {
                    self.switchHandle();
                }
            })
        },

        // 兑换
        exchangeHandle: function () {
            var self = this;
            $('.exchange_item_btn').on('click', function () {
                var preTotal = $('.integral_total_num').html();

                var notActive = $(this).hasClass('noExchangeActive');
                if (notActive) {
                    return false;
                }
                var parents = $(this).parents('.exchange_item');
                var currentNum = parents.find('.exchange_item_price').html();
                var goodsId = parents.attr('data-goodsId');
                var index = parents.attr('data-index');
                var preValue = parents.find('.surplus_num').html();
                var text = parents.find('.exchange_item_name').html();
                self.purchaseModelShow(text);
                self.exchangeItem = {
                    // goodsId
                    goodsId: goodsId,
                    // 还剩多少积分
                    preTotal:preTotal,
                    // 当前商品需要多少积分
                    currentNum: currentNum,
                    // 当前用户有多少个当前商品
                    preValue: preValue,
                    // 当前属于哪个index
                    index: index
                }

            })
        },

        // 兑换操作
        exchangeAjax: function (option) {
            var self = this;
            $.ajax({
                type: 'GET',
                url: apiModule.exchangeHandle,
                data: {
                    access_token: access_token,
                    user_id: userId,
                    token: token,
                    goods_id: option.goodsId
                },
                success: function (res) {
                    var res = (typeof res === 'string') ? JSON.parse(res) : res;
                    if (res.errNo === 0) {
                        $('.exchange_item').eq(option.index).find('.surplus_num').html(option.preValue - 0 + 1);
                        $('.integral_total_num').html(option.preTotal - option.currentNum);

                        // 判断剩余积分
                        var remainNum = option.preTotal - option.currentNum;
                        var goodsPrice = self.goodsPrice;
                        goodsPrice.filter(function (item, key) {
                            if (remainNum < item) {
                                $('.exchange_item_btn').eq(key).addClass('noExchangeActive');
                            }
                        })

                        $('.purchase_tips_model_wrap').hide();
                    } else if (res.errNo <= 400) {
                        Component.Toast.init({
                            con: res.message
                        })
                    }
                },
                error: function () {
                    Component.Toast.init({
                        con: '哎呀，网络不好啦'
                    })
                }
            })
        },

        // 交互
        jsBridge: function () {
            $('.task_item_btn').on('click', function () {
                var noClick = $(this).hasClass('taskCompleteActive');
                if (noClick) {
                    return false;
                }
                var index = $(this).parents('.task_item').index() + 1;
                window.location.href = 'http://meishe-app.com?command=dailyTaskAction&actionType=' + index;
                return false;
            })
        },

        // 页面跳转
        href: function () {
            $('.rule_icon').on('click', function () {
                window.location.href = 'http://m.meisheapp.com/agreement/integralagreement.html'
            })

            $('.integral_detail_text').on('click', function () {
                window.location.href = 'integralList.html?userId=' + userId + '&token=' + token;
            })

            $('.swiper-slide').on('click', function () {
                var index = $(this).attr('data-swiper-slide-index');
                if (index == 1) {
                    window.location.href = 'http://m.meisheapp.com/memberForApp/index.html?userId=' + userId + '&type=2&v=' + version
                } else {
                    window.location.href = 'http://m.meisheapp.com/memberForApp/index.html?userId=' + userId + '&type=1&v=' + version
                }
            })
        },

        // model关闭
        modelHide: function () {
            var self = this;

            // 签到提醒框 --shade区域
            $('.model_shade').on('click', function () {
                $(this).parent().hide();
            })

            // 签到提醒框 -- 取消
            $('.sign_handle_cancel').on('click', function () {
                $('.sign_tips_model_wrap').hide();
            })

            $('.purchase_handle_cancel').on('click', function () {
                $('.purchase_tips_model_wrap').hide();
            })

            // 签到提醒框 -- 确认
            $('.sign_handle_sure').on('click', function () {
                self.switchHandle();
            })

            // 签到成功框
            $('.receive_num_close img').on('click', function () {
                $('.receive_num_model_wrap').hide();
            })
        },
        // 兑换model显示
        purchaseModelShow: function (text) {
            $('.purchase_model_header').html('领取' + text);
            $('.purchase_model_body').html('确认领取' + text + '次数吗?');
            $('.purchase_tips_model_wrap').show();
        },

        // 兑换model 确认按钮
        submitExchange: function(){
            var self = this;
            $('.purchase_handle_sure').on('click', function(){
                var option = self.exchangeItem;
                self.exchangeAjax(option)
            })
        },

        switchHandle: function () {
            $.ajax({
                type: 'get',
                url: apiModule.setTipsSwitch,
                data: {
                    access_token: access_token,
                    user_id: userId,
                    token: token
                },
                success: function (res) {
                    var res = (typeof res === 'string') ? JSON.parse(res) : res;
                    if (res.errNo === 0) {
                        var data = res.data;
                        if (data.status) {
                            $('#switch_btn').addClass('checked');
                        } else {
                            $('#switch_btn').removeClass('checked');
                        }
                        $('.sign_tips_model_wrap').hide();

                    } else if (res.errNo <= 400) {
                        Component.Toast.init({
                            con: res.message
                        })
                    }
                },
                error: function () {
                    Component.Toast.init({
                        con: '哎呀，网络不好啦'
                    })
                }
            })
        }

    }


    new SignModule().init()
})()

window.APPHREF = function (userId, token) {
    window.location.replace(onlineUrl + 'index.html?userId=' + userId + '&token=' + token + '&v=' + version)
}