(function (exports) {
    var isProduct = false;
    // 线上地址和测试地址
    var onlineUrl = isProduct ? 'http://m.meisheapp.com/mediaMemberForApp/v1/' : 'http://m.meisheapp.com/mediaMemberForApp_test/v1/';
    var buff = isProduct ? 'pro' : 'dev'
    var basicUrl = !isProduct ? 'http://test.meisheapp.com' : 'http://community.meishe-app.com';
    var basicNurl = !isProduct ? 'http://test.api.meisheapp.com' : 'http://api.meishe-app.com';
    var api = {
        // 获取access_token
        getAccess_token: basicNurl + '/accessToken',
       // 获取ios是否正在上线
       isOnlineing: basicNurl + '/v1/config',
       // 创建团队
       createTeam: basicNurl + '/v1/rmtteam/addteam',
       // 获取该融媒体会员包含信息
       getMediaMemberInfo: basicNurl + '/v1/rmtteam/getteaminfobyuid',
       // 验证邀请码
       checkInvitationCode: basicNurl + '/v1/rmtteam/checkinvitecode',
       // 通过邀请码获取团队信息
       getTeamInfoByInvitaion: basicNurl+ '/v1/rmtteam/getteaminfobycode',
       // 加入团队
       addTeam: basicNurl + '/v1/rmtteam/addmember',
       // 通过团队id获取邀请码
       getInvitationCode: basicNurl +'/v1/rmtteam/getteaminfobyteamid',

       // 获取融媒体商品列表接口
       getMediaMemberList: basicNurl + '/v1/rmt/goods/list',
       // 获取用户信息
       getUserInfo: basicNurl + '/v2/user/index',
       // 检查兑换码
       checkExchangeCode: basicNurl + '/v1/rmt/voucher/validate',
       // 兑换码激活
       activeByCode: basicNurl + '/v1/rmt/goods/activateByVoucher',
       // 对公转账激活
       activeByEditInfo: basicNurl + '/v1/rmt/goods/activateByDuigong',

       // 查看历史申请
       getHistory: basicNurl+ '/v1/rmt/goods/order/queryActivationInfo',
       // 修改历史申请图片
       updateHistoryImg: basicNurl + '/v1/rmt/goods/order/reviseReceiptImg',
       // 修改历史申请文本
       updateHistoryText: basicNurl + '/v1/rmt/goods/order/reviseActivationInfo',

       // 获取发票记录
       getReceiptRecord: basicNurl + '/v1/rmt/invoice',
       // 提交发票
       submitReceiptInfo:  basicNurl + '/v1/rmt/invoice/apply'
    }
    // 自定义微信分享
    function wxShare(config, access_token) {
        $.ajax({
            url: api.wxShareConfig,
            data: {
                url: encodeURIComponent(config.link),
                access_token: access_token
            },
            success: function (res) {
                res = res.data;
                wx.config({
                    debug: false,
                    appId: res.appId,
                    timestamp: res.timestamp,
                    nonceStr: res.nonceStr,
                    signature: res.signature,
                    jsApiList: ['hideOptionMenu', 'hideMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
                });

                wx.ready(function () {
                    // 隐藏按钮
                    wx.hideMenuItems({
                        menuList: ["menuItem:favorite", "menuItem:copyUrl", "menuItem:openWithQQBrowser", "menuItem:openWithSafari"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                    });
                    // 分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: config.title,
                        link: config.sharelink,
                        imgUrl: config.imgUrl,
                        success: function () {
                        },
                        cancel: function () {
                            // alert('朋友圈失败')
                        }
                    });
                    // 分享给朋友
                    wx.onMenuShareAppMessage({
                        title: config.title,
                        desc: config.desc,
                        link: config.sharelink,
                        imgUrl: config.imgUrl,
                        success: function () {
                            // alert('分享成功')
                        },
                        cancel: function () {
                            // alert('分享失败')
                        }
                    });

                    // // 分享到QQ
                    wx.onMenuShareQQ({
                        title: config.title,
                        desc: config.desc,
                        link: config.sharelink,
                        imgUrl: config.imgUrl,
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });

                    // // 分享到微博
                    wx.onMenuShareWeibo({
                        title: config.title,
                        desc: config.desc,
                        link: config.sharelink,
                        imgUrl: config.imgUrl,
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });

                    // //分享到QQ空间
                    wx.onMenuShareQZone({
                        title: config.title,
                        desc: config.desc,
                        link: config.sharelink,
                        imgUrl: config.imgUrl,
                        success: function () {
                        },
                        cancel: function () {
                        }
                    });
                });
            },
            error: function (error) {
            }
        })
    }
    exports.onlineUrl = onlineUrl;
    exports.apiModule = api;
    exports.buff = buff;
    exports.wxShareModule = wxShare;
})(window)