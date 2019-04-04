(function (exports) {
    var isProduct = true;
    var buff = isProduct ? 'pro' : 'dev'
    var basicUrl = !isProduct ? 'http://test.meisheapp.com' : 'http://community.meishe-app.com';
    var basicNurl = !isProduct ? 'http://test.api.meisheapp.com' : 'http://api.meishe-app.com';
    var api = {
        // 获取access_token
        getAccess_token: basicNurl + '/accessToken',
        // wx自定义分享
        wxConfig: basicNurl + '/v1/weixin/getShareInfo',
        // error上报日志
        errorLog: basicNurl + '/v1/web/log',
        // 通过视频id获取视频信息
        getVideoInfo: basicNurl + '/v1/asset/index',
        // 获取该用户其他视频
        getMoreVideo: basicNurl + '/v1/asset/getUserFilm',
        // 热门视频
        hotVideoList: basicNurl + '/v1/asset/hottest',
        // 大家都在看
        viewMaxList: basicNurl + '/v1/home',
        // 统计视频首播时长接口
        getFirstPlayTime:basicNurl + '/v1/videoplayback/starttime',
        // 统计视频播放卡顿次数接口
        getPlayingLoadingNum:basicNurl + '/v1/videoplayback/stuck',
        // 统计视频播放错误接口
        getPlayingError:basicNurl + '/v1/videoplayback/error',
        // 统计视频还未播放就错误接口
        getNoPlayError:basicNurl + '/v1/videoplayback/errorstart',
        // 增加浏览器
        addView: basicUrl + '/meishe/assetinfo/index.php?command=touchAsset',
        // 获取ip所在的地址
        getIpAddress: basicNurl + '/v1/web/getIpInfo',
        // 通过活动id获取相关视频列表
        getActiveVideo: basicUrl + '/meishe/activity/?command=getHottestList',

    }
    // 自定义微信分享
    function wxShare(config, access_token) {
        $.ajax({
            url: api.wxConfig,
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
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
                });
                wx.ready(function () {
                    // 分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: config.title,
                        link: config.link,
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
                        link: config.link,
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
                        link: config.link,
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
                        link: config.link,
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
                        link: config.link,
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

    exports.apiModule = api;
    exports.buff = buff;
    exports.wxShareModule = wxShare;
})(window)