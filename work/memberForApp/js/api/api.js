(function (exports) {
    var isProduct = true;
    // 线上地址和测试地址
    var onlineUrl = isProduct ? 'http://m.meisheapp.com/memberForApp/' : 'http://m.meisheapp.com/memberForApp_test/';
    var buff = isProduct ? 'pro' : 'dev'
    var basicUrl = !isProduct ? 'http://test.meisheapp.com' : 'http://community.meishe-app.com';
    var basicNurl = !isProduct ? 'http://test.api.meisheapp.com' : 'http://api.meishe-app.com';
    var api = {
        // 获取access_token
        getAccess_token: basicNurl + '/accessToken',
       //member：通过美摄id获取用户信息
       getUserInfo: basicNurl + '/v1/search/getUserInfo',
       //member:获取普通会员价格 id,企业会员价格 id(接口相同，传参不同)
       getVipPrice: basicUrl + '/meishe/goodsandorder/index.php?command=getMemberGoodsListNew',
       // 获取ios是否正在上线
       isOnlineing: basicNurl + '/v1/config'

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