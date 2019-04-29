
(function () {
    // 视频id
    var id = utilFnModule.getRequest().id;
    pageInfo.videoId = id;
    // "第4范式"提交
    // 创建唯一用户id
    var uuid_invented
    new Fingerprint2().get(function (result, components) {
        uuid_invented = result;
        console.log(uuid_invented)
        getBanner(uuid_invented, 'show')

    });
    watchError()
    // 通用变量
    // UA
    var ua = window.navigator.userAgent;
    var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // 网络情况
    var netWork_type = ua.indexOf('wifi') > -1 ? 1 : 2;

    // 屏幕宽高
    var screenWidth = window.innerWidth || document.documentElement.clientWidth,
        screenHeight = window.innerHeight || document.documentElement.clientHeight;
    // 是否属于"激情燃烧岁月"活动
    var isBelongActivity = false;
    // 视频视频播放过
    var isPlayed = false;
    // 视频是否有广告视频
    var hasAdvVideo = false;
    // 广告视频地址
    var advVideoUrl = '';
    // 视频播放完成是否有片尾广告页(默认是有)
    var hasEndVideo = true;
    // 视频第一次点击时间
    var logFirstStartTime_travel = 0;
    // 当前video元素
    var video
    // 当前视频比例
    var currentFlag

    // 解决video播放后遮挡弹框问题
    var msIdModelDistance = 0
    var isMsIdModelHandle
    /**
     * 捕获页面异常情景：
     *  1.白屏时间超过2s
     *  2.首屏时间超过4s
     *  3.接口请求时长超过2s
     *  4.接口error
     */
    // 捕获接口错误集合
    var jsApi = {
        videoId: id
    };
    /**
     * 需求：
     *      1.普通视频类型(限于老用户)
     *      2.旅行频道类型
     *      3.活动("激情燃烧岁月")id = 190
     *      4.普通视频类型(限于新用户)
     */
    var typeConfig = {
        // 旅行频道id=2
        travelId: 2,
        // "激情燃烧岁月"活动id = 190
        activityId: 190,
        // "明星在线"userId：3875558
        starUserId: 3875558

    }

    function IndexModule() {
        this.id = id;
    }

    IndexModule.prototype = {

        // 初始化
        init: function () {
            this.clickVideo();
            listenVideoEvent($('#v1_0_video'));
            listenVideoEvent($('#v0_video'));
            listenVideoEvent($('#video_v2'))
            listenVideoEvent($('.video_channel'));
            // this.listenVideoEvent($('#video_v2'));
            // this.listenVideoEvent($('#v1_0_video'));
            // this.listenVideoEvent($('#v0_video'));
            // this.listenVideoEvent($('.video_channel'));
            this.getVideoDetail();


            this.clickEvent();
            this.installApp();
            this.hrefNextPage();
        },

        // 获取视频详情
        getVideoDetail: function () {
            var that = this;
            // 新旧用户看到的不同
            var is_first = defaultUser ? 0 : 1;
            // 对单独一个视频做处理，可不予理会
            if (id == '13969221') {
                is_first = 1;
            }

            utilFnModule.ajax({
                type: 'get',
                url: apiModule.getVideoInfo,
                data: {
                    asset_id: id,
                    access_token: access_token,
                    need_ch: 1,
                    is_first: is_first
                },
                success: function (res) {
                    var data = res.data;
                    var currentActivityId = 190;
                    if (res.errNo === 400) {
                        alert("暂未找到当前视频");
                        return false;
                    }
                    // 视频类型: 旅行频道type=1  普通视频(老用户)type=2 "激情燃烧岁月"type=4 普通视频(新用户)type=4
                    var videoType;
                    // 视频尺寸
                    currentFlag = getVideoFlag(data.asset_flag);
                    var ch_list = data.ch_list;
                    var channel_arr = []
                    ch_list.forEach(function (item) {
                        channel_arr.push(item.id);
                    });
                    var travelId = typeConfig.travelId;
                    var isTravelChannel = channel_arr.indexOf(travelId) > -1 ? true : false;
                    $('title').eq(0).text(getShareTitle(data.desc));
                    var activityId = data.activities.length > 0 ? data.activities[0].activity_id : 0;
                    // 扩展只需要再这里定义拓展类型
                    // 1.旅行频道
                    if (isTravelChannel) {
                        videoType = 1;
                        gio('track', 'view_count_travel', { 'videoId': id });
                        $('#body_v1_1_travel').show();
                        // video = $('.video_channel');
                        // that.listenVideoEvent(video, flag)
                    } else {
                        // 4."激情燃烧岁月"视频
                        if (activityId === typeConfig.activityId) {
                            videoType = 4;
                            gio('track', 'view_num_JQ', { 'videoId': id });
                            isBelongActivity = true;
                            $('#body_v1_0_activity').show();
                            // $('#v1_0_video'); 
                            // that.listenVideoEvent(video, flag)
                        } else {
                            // 3.普通视频(新用户)
                            if (!defaultUser) {
                                videoType = 3;
                                $('$body_v0').show();
                                // video = $('#v0_video');
                                // that.listenVideoEvent(video, flag)
                            } else {
                                // 2.普通视频(老用户)
                                videoType = 2;
                                gio('track', 'view_num_ordinary', { 'videoId': id });
                                $('#body_v2').show();
                                // video = $('#video_v2');
                                // that.listenVideoEvent(video, flag)
                                that.starList();
                            }
                        }
                    }

                    // 是否有广告视频
                    if (data['trailer_file_url']) {
                        advVideoUrl = getEndVideo(currentFlag);
                        hasAdvVideo = true;
                    }

                    var userId = data.query_user_id
                    // 填充视频信息
                    that.fillVideoInfo(data, videoType);
                    // 填充用户信息
                    that.fillUserInfo(data, videoType);

                    // 获取热门视频
                    that.getHotVideo(videoType, userId);
                    // 复制msId
                    that.copyMsId(videoType);

                    // wx分享
                    wxShareModule({
                        title: getShareTitle(data.desc),
                        desc: getShareTitle(data.desc),
                        imgUrl: getFitImg(data.thumb_file_url, screenWidth),
                        link: location.href.split('#')[0]
                    }, access_token)
                }
            })
        },

        // 明星在线
        starList: function () {
            utilFnModule.ajax({
                type: 'get',
                url: apiModule.getMoreVideo,
                data: {
                    query_user_id: typeConfig.starUserId,
                    access_token: access_token,
                    page_size: 5,
                },
                success: function (res) {
                    if (res.errNo == 0) {
                        var data = res.data.list;
                        var html = '';

                        for (var i = 0; i < 3; i++) {
                            var flag = getVideoFlag(data[i].asset_flag);
                            var img = ''
                            if (i === 0) {
                                var basicHeight = 3.88,
                                    basicWidth = 6.9;
                                if (flag == 0) {
                                    img = '<img src="' + getFitImg(data[i].thumb_file_url, screenWidth) + '" alt="" class="video_item_poster">';
                                } else if (flag == 1) {
                                    var top = -(basicWidth - basicHeight) / 2;
                                    img = '<img style="' + top + 'rem"src="' + getFitImg(data[i].thumb_file_url, screenWidth) + '" alt="" class="video_item_poster">';
                                } else if (flag == 2) {
                                    var top = -((basicWidth * 16 / 9) - basicHeight) / 2;
                                    img = '<img style="top:' + top + 'rem" src="' + getFitImg(data[i].thumb_file_url, screenWidth) + '" alt="" class="video_item_poster">';
                                }
                                html += ' <li class="video_item_v2 video_item_long_v2" data-id="' + data[i].asset_id + '">' +
                                    '<div class="video_item_poster_swrap_v2">' +
                                    img +
                                    '<div class="video_item_">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="video_item_desc_v2">' +
                                    data[i].desc +
                                    '</div>' +
                                    '</li>'
                            } else {
                                var basicHeight = 1.92,
                                    basicWidth = 3.4;
                                if (flag == 0) {
                                    img = '<img src="' + getFitImg(data[i].thumb_file_url, screenWidth) + '" alt="" class="video_item_poster">';
                                } else if (flag == 1) {
                                    var top = -(basicWidth - basicHeight) / 2;
                                    img = '<img style="' + top + 'rem"src="' + getFitImg(data[i].thumb_file_url, screenWidth) + '" alt="" class="video_item_poster">';
                                } else if (flag == 2) {
                                    var top = -((basicWidth * 16 / 9) - basicHeight) / 2;
                                    img = '<img style="top:' + top + 'rem" src="' + getFitImg(data[i].thumb_file_url, screenWidth) + '" alt="" class="video_item_poster">';
                                }
                                html += '<li class="video_item_v2" data-id="' + data[i].asset_id + '">' +
                                    '<div class="video_item_poster_swrap_v2">' +
                                    img +
                                    '</div>' +
                                    '<div class="video_item_desc_v2">' +
                                    data[i].desc +
                                    '</div>' +
                                    '</li>'
                            }
                        }
                        $('#star_online_area_v2 .video_list_detail_v2').html(html)
                    }
                }
            })
        },
        // 获取热门视频
        getHotVideo: function (type, userId) {
            if (type == 1) {
                this.travelHotVideo()
            } else if (type == 2) {
                this.v2HotVideo()
            } else if (type == 3) {
                this.getHotVideoByNewUser(userId)
            } else if (type == 4) {
                this.getActiveVideo()
            }
        },
        // 点击视频封面并监听视频播放事件
        clickVideo: function () {

            $('.channel_poster,.channel_play').on('click', function () {
                getBanner(uuid_invented, 'detailPageShow')
                $('.channel_poster').hide();
                $('.video_channel').show();
                $('.video_channel')[0].play();
                $('.channel_play').hide()
                $('.channel_video_count').hide();
                logFirstStartTime_travel = new Date().getTime();

            })

            $('.video_control_icon_v2,.video_poster_v2').on('click', function () {
                getBanner(uuid_invented, 'detailPageShow')
                $('.video_view_count_v2').hide();
                $('.video_control_icon_v2').hide();
                $('#video_v2').show();
                $('#video_v2')[0].play();
                $('.video_poster_v2').hide()
                logFirstStartTime_travel = new Date().getTime();

            })


            $('#body_v0 .v1_0_poster,#body_v0 .v1_0_play_icon').on('click', function () {
                getBanner(uuid_invented, 'detailPageShow')
                $('.v1_0_play_icon').hide();
                $('.see').hide();
                $('#v0_video').show();
                $('#v0_video')[0].play();
                $('.v1_0_poster').hide()
                logFirstStartTime_travel = new Date().getTime();

            })

            $('#body_v1_0_activity .v1_0_poster,#body_v1_0_activity .v1_0_play_icon').on('click', function () {
                getBanner(uuid_invented, 'detailPageShow')
                $('.v1_0_play_icon').hide();
                $('.see').hide();
                $('#v1_0_video').show();
                $('#v1_0_video')[0].play();
                $('.v1_0_poster').hide()
                logFirstStartTime_travel = new Date().getTime();

            })

        },
        // 监听视频事件
        /**
         * @ video:当前的video对象，jquery对象
         * @ logFirstStartTime：视频点击开始时间
         * @ flag:视频的比例
         * 
         */

        // 复制美摄id
        copyMsId: function (videoType) {
            // 普通视频
            this.copyUtil('.head_focus_v2', videoType);
            // 旅行视频
            this.copyUtil('.channel_follow_area', videoType);
            // "激情燃烧岁月"视频
            this.copyUtil('.follow', videoType);
            this.copyUtil('.copy', videoType);
        },

        // 复制美摄id封装函数
        /**
         * el：选择器
         * 
         */
        copyUtil: function (el, type) {
            var clipboard = new ClipboardJS(el, {
                text: function (trigger) {
                    var copyId = $(trigger).attr('data-clipboard-target');
                    console.log(copyId);
                    var text = $(copyId).html();
                    return 'meisheid：#' + text + '#';
                }
            });
            clipboard.on('success', function (e) {
                if (type == 1) {
                    gio('track', 'copy_num', { 'videoId': id });
                } else if (type == 2) {
                    gio('track', 'msId_copy_travel', { 'videoId': id });
                }

                stopMsIdModel()
            });

            clipboard.on('error', function (e) {
                alert('亲该浏览器不支持复制啦~')
            });
            msIdModelClose()
        },

        // 安装app
        installApp: function () {
            // 区分主要事为了埋点
            //底部fixed区域 -- 通用区域
            $('.open_app_area').on('click', function () {
                gio('track', 'download_app_travel');
                downloadApp();
            })

            // v2版本(暂不需要埋点)
            $('.install_handle_v2,.see_more_area,.video_tips_v2').on('click', function () {
                downloadApp();
            })
            // v1_1旅行版本
            $('.handle_app_area button').on('click', function () {
                gio('track', 'download_app_travel');
                downloadApp();
            })

            // v1_0"激情燃烧岁月"版本
            $('.download').on('click', function () {
                if (isBelongActivity) {
                    gio('track', 'bigBtn_clickNum_JQ', { 'videoId': id });
                } else {
                    gio('track', 'bigBtn_num', { 'videoId': id });
                }
                downloadApp();
            })


        },

        // 获取v2版本热门视频
        v2HotVideo: function () {
            utilFnModule.ajax({
                url: apiModule.hotVideoList,
                data: {
                    index: 0,
                    count: 5,
                    access_token: access_token
                },
                success: function (res) {
                    if (res.errNo == 0) {
                        var data = res.data.list;
                        var html = '';
                        for (var i = 0; i < 4; i++) {
                            var flag = getVideoFlag(data[i].asset_flag);
                            var img = ''

                            var basicHeight = 1.92,
                                basicWidth = 3.4;
                            if (flag == 0) {
                                img = '<img src="' + getFitImg(data[i].thumb_file_url, screenWidth) + '" alt="" class="video_item_poster">';
                            } else if (flag == 1) {
                                var top = -(basicWidth - basicHeight) / 2;
                                img = '<img style="' + top + 'rem"src="' + getFitImg(data[i].thumb_file_url, screenWidth) + '" alt="" class="video_item_poster">';
                            } else if (flag == 2) {
                                var top = -((basicWidth * 16 / 9) - basicHeight) / 2;
                                img = '<img style="top:' + top + 'rem" src="' + getFitImg(data[i].thumb_file_url, screenWidth) + '" alt="" class="video_item_poster">';
                            }
                            html += '<li class="video_item_v2" data-id="' + data[i].asset_id + '">' +
                                '<div class="video_item_poster_swrap_v2">' +
                                img +
                                '</div>' +
                                '<div class="video_item_desc_v2">' +
                                data[i].desc +
                                '</div>' +
                                '</li>'
                        }
                        $('#view_max_area_v2 .video_list_detail_v2').html(html);

                    }
                }
            })
        },
        // 获取"旅行"专题瞎的热门视频 @date:2018-11-12
        travelHotVideo: function () {
            utilFnModule.ajax({
                url: apiModule.hotVideoList,
                data: {
                    channel_id: typeConfig.travelId,
                    index: 0,
                    count: 10,
                    access_token: access_token
                },
                type: 'get',
                success: function (res) {
                    var res = res.data;
                    var leftHtml = '', rightHtml = '';
                    // li的宽度
                    var liWidth = $('.channel_list_imgFit_left ul').width();
                    for (var i = 0; i < res.list.length; i++) {
                        // 判断视频的flag，也就是比例
                        // 16:9视频  0   
                        // 1:1视频    1
                        // 9:16视频   2
                        var flag = getVideoFlag(res.list[i].asset_flag);
                        var height = 0;
                        var otherHeight = 0;
                        if (flag === 0) {
                            height = 9 / 16;
                            otherHeight = 3 / 4;
                        } else if (flag === 1) {
                            height = 1;
                            otherHeight = 1;
                        } else if (flag === 2) {
                            height = 16 / 9;
                            otherHeight = 4 / 3;
                        }
                        var width = (window.innerWidth > 440 ? 440 : window.innerWidth) / 100 / 2;
                        if (i % 2 === 0) {
                            if (flag == 0) {
                                leftHtml += '<li style="height:' + liWidth * otherHeight + 'px" data-assetId="' + res.list[i].asset_id + '">' +
                                    '<img src="' + getFitImg(res.list[i].thumb_file_url, screenWidth / 2) + '" alt="" class="channel_list_img" style="height:' + liWidth * otherHeight + 'px;margin-left:' + (-(liWidth * otherHeight * 16 / 9 - liWidth) / 2) + 'px">';
                            } else if (flag == 1) {
                                console.log(1111)
                                leftHtml += '<li data-assetId="' + res.list[i].asset_id + '">' +
                                    '<img src="' + getFitImg(res.list[i].thumb_file_url, screenWidth / 2) + '" alt="" class="channel_list_img" style="width:' + liWidth + 'px">';
                            } else {
                                leftHtml += '<li style="height:' + liWidth * otherHeight + 'px" data-assetId="' + res.list[i].asset_id + '">' +
                                    '<img src="' + getFitImg(res.list[i].thumb_file_url, screenWidth / 2) + '" alt="" class="channel_list_img" style="width:' + liWidth + 'px;margin-top:' + (-(liWidth * height - liWidth * otherHeight) / 2) + 'px">';
                            }

                            leftHtml += '<img class="channel_list_imgFit_play" src="./img/v1_1_travel/h5_play.png" />' +
                                '<div class="channel_list_imgFit_desc">' +
                                '<div class="channel_list_imgFit_desc_con">' +
                                '<img src="' + getFitImg(res.list[i].profile_photo_url, 34) + '" alt="" class="channel_list_imgFit_userImg">' +
                                '<div>' +
                                '<img src="./img/v1_1_travel/h5_eye@2x.png" alt="" class="channel_list_eyes">' +
                                '<span class="channel_list_eyes_num">' + res.list[i].views_count + '次播放</span>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</li>'
                        } else {
                            if (flag == 0) {
                                rightHtml += '<li style="height:' + liWidth * otherHeight + 'px" data-assetId="' + res.list[i].asset_id + '">' +
                                    '<img src="' + getFitImg(res.list[i].thumb_file_url, screenWidth / 2) + '" alt="" class="channel_list_img" style="height:' + liWidth * otherHeight + 'px;margin-left:' + (-(liWidth * otherHeight * 16 / 9 - liWidth) / 2) + 'px">';
                            } else if (flag == 1) {
                                rightHtml += '<li data-assetId="' + res.list[i].asset_id + '">' +
                                    '<img src="' + getFitImg(res.list[i].thumb_file_url, screenWidth / 2) + '" alt="" class="channel_list_img" style="width:' + liWidth + 'px">';
                            } else {
                                rightHtml += '<li style="height:' + liWidth * otherHeight + 'px" data-assetId="' + res.list[i].asset_id + '">' +
                                    '<img src="' + getFitImg(res.list[i].thumb_file_url, screenWidth / 2) + '" alt="" class="channel_list_img" style="width:' + liWidth + 'px;margin-top:' + (-(liWidth * height - liWidth * otherHeight) / 2) + 'px">';
                            }

                            rightHtml += '<img class="channel_list_imgFit_play" src="./img/v1_1_travel/h5_play.png" />' +
                                '<div class="channel_list_imgFit_desc">' +
                                '<div class="channel_list_imgFit_desc_con">' +
                                '<img src="' + getFitImg(res.list[i].profile_photo_url, 34) + '" alt="" class="channel_list_imgFit_userImg">' +
                                '<div>' +
                                '<img src="./img/v1_1_travel/h5_eye@2x.png" alt="" class="channel_list_eyes">' +
                                '<span class="channel_list_eyes_num">' + res.list[i].views_count + '次播放</span>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</li>'
                        }

                    }
                    $('.channel_list_imgFit_left ul').append(leftHtml);
                    $('.channel_list_imgFit_right ul').append(rightHtml);
                    $('.channel_list_imgFit li').on('click', function () {
                        var assetId = $(this).attr('data-assetid');
                        window.location.href = "http://m.meisheapp.com/share_new/index.html?id=" + assetId
                    })
                },
                error: function (error) {

                    alert('推荐视频不正确')
                }
            })
        },

        // 获取"激情燃烧岁月"热门视频
        getActiveVideo: function (id) {
            var myVideoArr = [];
            utilFnModule.ajax({
                url: apiModule.getActiveVideo,
                type: 'get',
                data: {
                    startId: 0,
                    id: typeConfig.activityId,
                    access_token: access_token,
                    count: 10
                },
                success: function (data) {
                    if (data.list.length > 1) {
                        var str = '<div class="paddingCon">' +
                            '<div class="moreBox" height="2rem">' +
                            '<ul>';
                        var len = data.list.length;
                        if (len > 10) {
                            len = 10;
                        }
                        for (var i = 0; i < len; i++) {
                            myVideoArr.push(data.list[i]);
                            // str += '<li><div><img class="morev" assetId = "' + data.list[i].asset_id + '" src="'+ data.list[i].thumb_file_url+'" /><img src="/static/images/share/share_play_player.png" /></div></li>'

                            str += '<li data-id="' + data.list[i].assetId + '"><div><img class="morev loading" src="' + data.list[i].thumbUrl + '" assetId = "' + data.list[i].asset_id + '" data-original="' + data.list[i].thumbUrl + '" /><img style="display:none;" src="/static/images/share/share_play_player.png" /></div></li>'
                        }
                        str += '</ul></div></div>';
                        $('.newMoreVideo').html(str);

                        $('.moreVideo ul').css('width', 2.7 * len + 'rem');
                        var moreVideoArr = $('.morev');
                        $('.newMoreVideo .morev').each(function (index) {
                            if (index >= 10) {
                                return false;
                            }
                            var that = $(this);
                            if (getVideoFlag(myVideoArr[index].assetFlag) == 0) {
                                that.height = 150;
                                that.css({
                                    'height': '2.6rem',
                                    'top': '0',
                                    'left': -(2.6 * 16 / 9 - 2.6) / 2 + 'rem'
                                })
                            } else if (getVideoFlag(myVideoArr[index].assetFlag) == 2) {
                                that.css({
                                    'width': '100%',
                                    'top': -(2.6 * 16 / 9 - 2.6) / 2 + 'rem',
                                    'left': 0
                                })
                            } else {
                                that.css({
                                    'max-width': '100%',
                                    'max-height': '100%',
                                    'width': '100%',
                                    'height': '100%'
                                })
                            }
                        })
                    }
                },
                error: function (data) {

                }
            })
        },

        // 新用户获取热门视频
        getHotVideoByNewUser: function (userId) {
            var myVideoArr = []
            utilFnModule.ajax({
                url: apiModule.hotVideoList,
                type: 'get',
                data: {
                    query_user_id: userId,
                    access_token: access_token
                },
                success: function (data) {
                    data = data.data;
                    if (data.list.length > 1) {
                        var str = '<div class="title">' +
                            '<span class="locationName">' + '北京' + '</span><span>热门视频</span>' +
                            '</div>' +
                            '<div class="paddingCon">' +
                            '<div class="moreBox" height="1rem">' +
                            '<ul>';
                        var len = data.list.length;
                        if (len > 10) {
                            len = 10;
                        }
                        for (var i = 0; i < len; i++) {
                            myVideoArr.push(data.list[i]);
                            // str += '<li><div><img class="morev" assetId = "' + data.list[i].asset_id + '" src="'+ data.list[i].thumb_file_url+'" /><img src="/static/images/share/share_play_player.png" /></div></li>'

                            str += '<li data-id="' + data.list[i].asset_id + '"><div><img class="morev loading" src="' + getFitImg(data.list[i].thumb_file_url, screenWidth / 2) + '" assetId = "' + data.list[i].asset_id + '" data-original="' + getFitImg(data.list[i].thumb_file_url, screenWidth / 2) + '" /><img style="display:none;" src="/static/images/share/share_play_player.png" /></div></li>'
                        }
                        str += '</ul></div></div>';
                        $('.isFlag').html(str);
                        getAddress();
                        $('.moreVideo ul').css('width', 2.7 * len + 'rem');
                        var moreVideoArr = $('.morev');
                        $('.isFlag .morev').each(function (index) {
                            if (index >= 10) {
                                return false;
                            }
                            var that = $(this);
                            if (getVideoFlag(myVideoArr[index].asset_flag) == 0) {
                                that.height = 150;
                                that.css({
                                    'height': '2.6rem',
                                    'top': '0',
                                    'left': -(2.6 * 16 / 9 - 2.6) / 2 + 'rem'
                                })
                            } else if (getVideoFlag(myVideoArr[index].asset_flag) == 2) {
                                that.css({
                                    'width': '100%',
                                    'top': -(2.6 * 16 / 9 - 2.6) / 2 + 'rem',
                                    'left': 0
                                })
                            } else {
                                that.css({
                                    'max-width': '100%',
                                    'max-height': '100%',
                                    'width': '100%',
                                    'height': '100%'
                                })
                            }
                        })
                    }
                },
                error: function (data) {

                }
            })
        },

        // 填充用户信息
        fillUserInfo: function (data, type) {
            if (type == 2) {
                // v2版本
                $('.head_info_v2_avater').attr('src', getFitImg(data.profile_photo_url, 34));
                $('.head_info_v2_nickname').html(data.user_name);
                $('.head_info_v2_msid').html(data.user_id);
            } else if (type == 1) {
                // v1_1 旅行
                $('.channel_img_avater').attr('src', getFitImg(data.profile_photo_url, 34));
                $('.channel_user_name').html(data.user_name);
                $('.channel_user_msId').html(data.user_id);
            } else if (type == 3) {
                $('.userAvater').attr('src', getFitImg(data.profile_photo_url, 34));
                $('.username').html(data.user_name);
                $('.copyMsId').html(data.user_id);
            } else if (type == 4) {
                $('.userAvater').attr('src', getFitImg(data.profile_photo_url, 34));
                $('.username').html(data.user_name);
                $('.copyMsId').html(data.user_id);

            }


            // v1_0
        },
        // 填充视频信息
        fillVideoInfo: function (data, type) {
            if (type == 2) {
                // v2版本
                $('.video_poster_v2').attr('src', getFitPoster(data.thumb_file_url, screenWidth));
                $('.video_info_area_v2').html(data.desc);

                // 视频观看数
                $('.video_view_count_num_v2').html(data.views_count);
                // 视频比例
                var flag = getVideoFlag(data.asset_flag);
                var channel_height = channel_width = screenWidth > 440 ? 440 : screenWidth;
                if (flag == 0) {
                    var channel_img_width = channel_width * 16 / 9;
                    $('.video_poster_v2').css({
                        'left': ((channel_img_width - channel_width) / -2) + 'px',
                        'top': 0,
                        'position': 'absolute',
                        'height': '100%'
                    });
                    $('#video_v2').removeAttr('webkit-playsinline');
                    $('#video_v2').removeAttr('playsinline');
                    // $('#video_v2').removeAttr('x5-playsinline');
                    if (isiOS) {
                        $('#video_v2').css('width', '100%');
                    }
                } else if (flag == 1) {
                    $('.video_poster_v2').css({
                        'width': '100%',
                        'height': '100%'
                    });
                } else if (flag == 2) {
                    $('#video_v2').css('width', '100%');
                    $('#video_v2').removeAttr('webkit-playsinline');
                    $('#video_v2').removeAttr('playsinline');
                    $('#video_v2').removeAttr('x5-playsinline');
                    var channel_img_height = channel_width * 16 / 9;
                    $('.video_poster_v2').css({
                        'left': 0,
                        'top': (channel_img_height - channel_height) / -2 + 'px',
                        'position': 'absolute',
                        'width': '100%'
                    });
                }
                $('#video_v2').eq(0).attr('src', getHttpsUrl(data.file_url));
                // $('#video_v2').eq(0).attr('poster', getFitImg(data.thumb_file_url, screenWidth));
            } else if (type == 1) {
                // v1_1旅行

                $('.channel_poster').attr('src', getFitPoster(data.thumb_file_url, screenWidth));
                $('.channel_desc_area').html(data.desc);

                // 视频观看数
                $('.channel_video_count_play').html(data.views_count);
                // 视频比例
                var flag = getVideoFlag(data.asset_flag);
                var currrentScreen = screenWidth > 440 ? 440 : screenWidth;
                var channel_height = channel_width = (currrentScreen / 50) - 0.3 * 2;
                $('.channel_video_area').css({
                    width: channel_width + 'rem',
                    height: channel_width + 'rem'
                })
                if (flag == 0) {
                    var channel_img_width = channel_width * 16 / 9;
                    $('.channel_poster').css({
                        'left': ((channel_img_width - channel_width) / -2) + 'rem',
                        'top': 0,
                        'position': 'absolute',
                        'height': '100%'
                    });
                    $('.video_channel').removeAttr('webkit-playsinline');
                    $('.video_channel').removeAttr('playsinline');
                    if (isiOS) {
                        $('.video_channel').css('width', '100%');
                    }
                } else if (flag == 1) {
                    $('.channel_poster').css({
                        'width': '100%',
                        'height': '100%'
                    });
                } else if (flag == 2) {
                    $('.video_channel').css('width', '100%');
                    $('.video_channel').removeAttr('webkit-playsinline');
                    $('.video_channel').removeAttr('playsinline');
                    $('.video_channel').removeAttr('x5-playsinline');
                    var channel_img_height = channel_width * 16 / 9;
                    $('.channel_poster').css({
                        'left': 0,
                        'top': (channel_img_height - channel_height) / -2 + 'rem',
                        'position': 'absolute',
                        'width': '100%'
                    });
                }
                $('.video_channel').eq(0).attr('src', getHttpsUrl(data.file_url));

            } else if (type == 3) {
                $('.v1_0_poster').attr('src', getFitPoster(data.thumb_file_url, screenWidth));
                // $('.channel_desc_area').html(data.desc);

                // 视频观看数
                $('.see b').html(data.views_count);
                var flag = getVideoFlag(data.asset_flag);
                var channel_height = channel_width = screenWidth;
                if (flag == 0) {
                    var channel_img_width = channel_width * 16 / 9;
                    $('.v1_0_poster').css({
                        'left': ((channel_img_width - channel_width) / -2) + 'px',
                        'top': 0,
                        'position': 'absolute',
                        'height': '100%'
                    });
                    $('#v0_video').removeAttr('webkit-playsinline');
                    $('#v0_video').removeAttr('playsinline');
                    if (isiOS) {
                        $('#v0_video').css('width', '100%');
                    }
                } else if (flag == 1) {
                    $('.v1_0_poster').css({
                        'width': '100%',
                        'height': '100%'
                    });
                } else if (flag == 2) {
                    $('#v0_video').css('width', '100%');
                    $('#v0_video').removeAttr('webkit-playsinline');
                    $('#v0_video').removeAttr('playsinline');
                    $('#v0_video').removeAttr('x5-playsinline');
                    var channel_img_height = channel_width * 16 / 9;
                    $('.v1_0_poster').css({
                        'left': 0,
                        'top': (channel_img_height - channel_height) / -2 + 'px',
                        'position': 'absolute',
                        'width': '100%'
                    });
                }
                $('#v0_video').eq(0).attr('src', getHttpsUrl(data.file_url));
            } else if (type == 4) {
                $('.v1_0_poster').attr('src', getFitPoster(data.thumb_file_url, screenWidth));
                // $('.channel_desc_area').html(data.desc);

                // 视频观看数
                $('.see b').html(data.views_count);
                var flag = getVideoFlag(data.asset_flag);
                var channel_height = channel_width = screenWidth;
                if (flag == 0) {
                    var channel_img_width = channel_width * 16 / 9;
                    $('.v1_0_poster').css({
                        'left': ((channel_img_width - channel_width) / -2) + 'px',
                        'top': 0,
                        'position': 'absolute',
                        'height': '100%'
                    });
                    $('#v1_0_video').removeAttr('webkit-playsinline');
                    $('#v1_0_video').removeAttr('playsinline');
                    if (isiOS) {
                        $('#v1_0_video').css('width', '100%');
                    }
                } else if (flag == 1) {
                    $('.v1_0_poster').css({
                        'width': '100%',
                        'height': '100%'
                    });
                } else if (flag == 2) {
                    $('#v1_0_video').css('width', '100%');
                    $('#v1_0_video').removeAttr('webkit-playsinline');
                    $('#v1_0_video').removeAttr('playsinline');
                    $('#v1_0_video').removeAttr('x5-playsinline');
                    var channel_img_height = channel_width * 16 / 9;
                    $('.v1_0_poster').css({
                        'left': 0,
                        'top': (channel_img_height - channel_height) / -2 + 'px',
                        'position': 'absolute',
                        'width': '100%'
                    });
                }
                $('#v1_0_video').eq(0).attr('src', getHttpsUrl(data.file_url));
            }
        },

        // 跳转下一页
        hrefNextPage: function () {
            // v2版本
            $(document).on('click', '.video_item_v2', function () {
                var cid = $(this).attr('data-id')
                window.location.href = 'http://m.meisheapp.com/share_new/index.html?id=' + cid
            })
            //v1_0版本
            $(document).on('click', '.newMoreVideo li', function () {
                var cid = $(this).attr('data-id')
                window.location.href = 'http://m.meisheapp.com/share_new/index.html?id=' + cid
            })
        },
        // 点击事件
        clickEvent: function(){
            $('.head_info_v2_avater,.head_info_v2_nickname,.head_info_v2_msid').on('click',function(){
                var cid = $('.head_info_v2_msid').html();
                window.location.href = 'http://m.meisheapp.com/person/index.html?id='+cid
            })
        },


        /*
            * @desc:helper类函数
        */
        // 兼容pc段
        fitPC: function () {

        }

        // 






    }
    // 获取缩略图
    function getFitImg(src, width, isNoUse) {
        if (!isNoUse) {
            var currentWidth = width >= 500 ? 500 : width;
            return src + '?imageView2/2/w/' + parseInt(currentWidth * 2);
        } else {
            return src;
        }
    }
  
    // 获取https路径
    function getHttpsUrl(url) {
        // if (url.indexOf('https') == -1) {
        // 	return url.replace('http', 'https');
        // }
        return url;
    }

    // 获取视频类别 0为16:9   1为1:1  2为9:16
    function getVideoFlag(flag) {
        if ((flag & 0x0082) == 0) {
            // 16:9视频
            return 0;
        } else if ((flag & 0x0002) != 0) {
            // 1:1视频
            return 1;
        } else {
            // 9:16视频
            return 2;
        }
        ;
    }
    function downloadApp() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // wx终端
        function isWeiXin() {
            //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
            var ua = window.navigator.userAgent.toLowerCase();
            //通过正则表达式匹配ua中是否含有MicroMessenger字符串
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        }
        if (isiOS) {
            // APP Store
            window.open('http://itunes.apple.com/cn/app/id928359827?mt=8');
            // deep-link
            // window.open('https://gio.ren/dLVYkre')
        } else if (isAndroid) {
            window.open('https://gio.ren/do3b5Qe')
            // deep-link
            // 应用宝
            // window.open('http://a.app.qq.com/o/simple.jsp?pkgname=com.cdv.video360&from=singlemessage');
        }
    }
    // 获取地址
    function getAddress() {
        $.ajax({
            url: apiModule.getIpAddress,
            data: {
                access_token: access_token
            },
            success: function (res) {
                if (res.errNo === 0) {
                    if (res['data'] && res['data']['city']) {
                        $('.locationName').html(res.data.city);
                        localStorage.setItem('city', res.data.city)
                    } else {
                        var city = localStorage.getItem('city');
                        $('.locationName').html(city ? city : '北京')
                    }

                } else {
                    var city = localStorage.getItem('city');
                    $('.locationName').html(city ? city : '北京')
                }
            },
            error: function () {
                var city = localStorage.getItem('city');
                $('.locationName').html(city ? city : '北京')
            }
        })
    }
    // 获取各个尺寸下的片尾视频
    function getEndVideo(flag) {
        // 判断视频的flag，也就是比例
        // 16:9视频  0   
        // 1:1视频    1
        // 9:16视频   2
        if (flag === 0) {
            var num = randomInt(0, 2);
            var arr = ['http://meishevideo2.meishe-app.com/data/mp4/female_16_9.mp4', 'http://meishevideo2.meishe-app.com/data/mp4/female2_16_9.mp4'][num]
            return arr

        } else if (flag === 1) {
            var num = randomInt(0, 3);
            var arr = ['http://meishevideo2.meishe-app.com/data/mp4/female_1_1.mp4', 'http://meishevideo2.meishe-app.com/data/mp4/female2_1_1.mp4', 'http://meishevideo2.meishe-app.com/data/mp4/male_1_1.mp4'][num]
            return arr
        } else {
            var num = randomInt(0, 3);
            var arr = ['http://meishevideo2.meishe-app.com/data/mp4/female_9_16.mp4', 'http://meishevideo2.meishe-app.com/data/mp4/female2_9_16.mp4', 'http://meishevideo2.meishe-app.com/data/mp4/male_9_16.mp4'][num]
            return arr
        }
    }
    // 生成n-m得随即整数
    function randomInt(n, m) {
        return parseInt(Math.random() * (m - n) + n);
    }
    /**
     *@desc:点击"关注"弹出model框，解决如果视频播放过，层次太高遮挡住model框
     *
     */
    function stopMsIdModel() {

        var scrollTop = $(window).scrollTop();
        var video_height = screenWidth;
        if (scrollTop >= video_height) {
            isMsIdModelHandle = false;
        } else {
            msIdModelDistance = scrollTop;
            isMsIdModelHandle = true;
        }
        if (isPlayed && isMsIdModelHandle) {
            $('html,body').animate({ "scrollTop": video_height })
            setTimeout(function () {
                $('.copy_msId_area').show()
            }, 20)
        } else {
            $('.copy_msId_area').show()
        }
    }
    //  "复制msId"弹框关闭
    function msIdModelClose() {
        $('.copy_msId_area .shade,.copy_msId_sure').on('click', function () {
            if (isPlayed && isMsIdModelHandle) {
                $('html,body').animate({ "scrollTop": msIdModelDistance })
            }

            $('.copy_msId_area').hide()
        })
        $('.copy_msId_area').on('touchmove', function () {
            return false;
        })
    }

    // 监控error
    function watchError() {
        // 监控白屏超过2s
        if (emptyPageTime >= 2000) {
            utilFnModule.catchError(access_token, JSON.stringify(pageInfo))
        }
    }

    function getBanner(userId, action) {
        $.ajax({
            type: 'post',
            url: 'https://nbrecsys.4paradigm.com/action/api/log?clientToken=39de3093bb004d7586023e41657fb253',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                "date": new Date().getTime(),
                "actions": [{
                    "itemId": id,
                    "actionTime": new Date().getTime(),
                    "action": action,
                    "userId": userId,
                    "itemSetId": "6444",
                    "sceneId": "12179",
                    "lib": isiOS ? 'ios' : 'android'
                },]
            }),
            success: function () {

            }
        })
    }
    function getShareTitle(title) {
        if (title[0] == '#' || title.length <= 0) {
            title = '云美摄升级视频体验，高清创作有料你就来。';
        }
        return title;
    }

    function listenVideoEvent(video) {
        // 监听播放
        var state = 0;
        var a_travel;
        var isEmit_videoError = false;
        // 从" 统计视频首播时长接口"获取
        var errorId
        // 卡顿次数
        var stuckNum = 0;
        // 播放结束次数(防止循环播放片尾)
        var endNum = 0;
        video.on('play', function () {
            var flag = currentFlag
            console.log('play')
            isPlayed = true;
            if (state == 0) {
                // 统计视频首播时长接口
                var logFirstEndTime = new Date().getTime();
                $.ajax({
                    type: 'get',
                    url: apiModule.getFirstPlayTime,
                    data: {
                        access_token: access_token,
                        asset_id: id,
                        start_playback_duration: parseInt((logFirstEndTime - logFirstStartTime_travel) / 1000),
                        network_type: netWork_type
                    },
                    success: function (res) {
                        if (res.errNo === 0) {
                            errorId = res.data.id;
                        }
                    }
                })

                state = 1;
                if (isBelongActivity) {
                    gio('track', 'video_playNum_JQ', { 'video_id': id });
                } else {
                    gio('track', 'video_Id', { 'video_id': id });
                }

                // 增加浏览
                $.ajax({
                    url: apiModule.addView,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        assetId: id,
                        browseReason: 4
                    }),
                    success: function (res) {
                    },
                    error: function (error) {
                        console.log(error);
                    }
                })
            }
            if (isAndroid) {
                if (!a_travel) {
                    video.one('timeupdate', function () {
                        console.log('timeupdate')
                        if (flag == 0) {
                            a_travel = 10;
                            var de = video[0];
                            // 延时操作：解决安卓无法全屏问题
                            if (de.requestFullscreen) {
                                setTimeout(function(){
                                    console.log('quanpin11')
                                    de.requestFullscreen()
                                },500)
                                
                            } else if (de.mozRequestFullScreen) {
                                setTimeout(function(){
                                    console.log('quanpin22')
                                    de.mozRequestFullScreen();
                                },500)
                                
                            } else if (de.webkitRequestFullScreen) {
                                setTimeout(function(){
                                    console.log('quanpin33')
                                    de.webkitRequestFullScreen();
                                },500)
                                
                               
                            }
                        }
                    })
                }
                if (a_travel == 10) {
                    if (flag == 0) {
                        var de = video[0];
                        if (de.requestFullscreen) {
                            de.requestFullscreen();
                        } else if (de.mozRequestFullScreen) {
                            de.mozRequestFullScreen();
                        } else if (de.webkitRequestFullScreen) {
                            de.webkitRequestFullScreen();
                        }
                    }
                }
            }
        })
        // 监听error
        video.on('error', function (e) {
            console.log(e)
            var errorCode = typeof ($(this)[0].error.code) === 'number' ? $(this)[0].error.code : 2
            var errorMessage = ['用户终止', '网络错误', '解码错误', 'URL无效'];
            // 如果监听过error，再报error即停止
            if (isEmit_videoError) {
                return false;
            }
            isEmit_videoError = true;
            if (isPlayed && errorId) {
                $.ajax({
                    url: apiModule.getPlayingError,
                    type: 'get',
                    data: {
                        access_token: access_token,
                        id: errorId,
                        playback_error: errorMessage[errorCode - 1] + ';浏览器信息:' + ua
                    },
                    success: function (res) {
                    },
                    error: function () {

                    }
                })
            } else {
                $.ajax({
                    url: apiModule.getNoPlayError,
                    type: 'get',
                    data: {
                        access_token: access_token,
                        asset_id: id,
                        network_type: netWork_type,
                        playback_error: errorMessage[errorCode - 1] + ';浏览器信息:' + ua
                    },
                    success: function (res) {
                    },
                    error: function () {

                    }
                })
            }

        })
        // 监听卡顿
        video.on('waiting', function () {
            stuckNum++;
            // 每3次上报一次
            if (stuckNum % 3 === 0) {
                $.ajax({
                    type: 'get',
                    url: apiModule.getPlayingLoadingNum,
                    data: {
                        access_token: access_token,
                        id: errorId,
                        stuck_times: stuckNum
                    },
                    success: function (res) {

                    },
                    error: function () {

                    }
                })
            }
        })
        // 监听结束
        video.on('ended', function () {
            if (hasAdvVideo) {
                if (endNum <= 0) {
                    $(this).attr('src', advVideoUrl)
                    $(this)[0].play();
                    endNum++;
                }
            } else {
                var url = getEndVideo(currentFlag);
                if (hasEndVideo) {
                    if (endNum <= 0) {
                        $(this).attr('src', url)
                        video[0].play()
                        endNum++;
                    }
                }
            }
        })
    }

    window.IndexModule = IndexModule

})();

window.onload = function () {
    new IndexModule().init()
}

  // 获取视频封面
  function getFitPoster(src, width, isNoUse) {
    if (!isNoUse) {
        var currentWidth = width >= 500 ? 500 : width;
        return src + '?imageView2/2/w/' + parseInt(currentWidth * 1.2);
        // return src;
    } else {
        return src;
    }
}