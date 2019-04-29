// 获取url数据
var userId = utilFnModule.getRequest().userId;
var token = utilFnModule.getRequest().token;

(function () {
    // 分页设置
    var PAGE_SIZE = 10;
    var PAGE = 1;
    function ListModule() {
        // 分页配置项
        this.isRequest = false;
        this.hasMore = true;
    }

    ListModule.prototype = {

        init: function () {
            this.getList(PAGE, true);
            this.scroll();
        },

        // 获取list
        getList: function (page, flag) {
            var self = this;
            self.isRequest = true;
            $.ajax({
                type: 'get',
                url: apiModule.getList,
                data: {
                    access_token: access_token,
                    user_id: userId,
                    token: token,
                    page: page,
                    page_size: PAGE_SIZE
                },
                success: function (res) {
                    self.isRequest = false;
                    if (res.errNo === 0) {
                        var data = res.data.records;
                        var len = data.length;
                        // 如果是首次加载
                        if (len < PAGE_SIZE) {
                            self.hasMore = false;
                            if (flag) {
                                $('.loading_wrap').hide();
                                if (!len) {
                                    $('.nodata_wrap').show();
                                    return false;
                                }
                            } else {
                                $('.loading_wrap .flex_box').html('已加载全部');
                            }
                        }

                        var html = '';
                        data.forEach(function (item, key) {
                            var className = item.credits_count > 0 ? '' : 'reduceActive';
                            var symbol = item.credits_count > 0 ? '+' : ''
                            html += '<li class="list_item">' +
                                '<div class="flex_box flex_between flex_align_start">' +
                                '<div>' +
                                '<div class="item_desc">' + item.remark + '</div>' +
                                '<div class="item_date">' + item.create_time.split(' ')[0].replace(/-/g, '.') + '</div>' +
                                '</div>' +
                                '<div class="flex_box">' +
                                '<span class="item_num ' + className + '">' + symbol+ item.credits_count + '</span>' +
                                '<img src="./img/points@2x.png" alt="" class="point_icon">' +
                                '</div>' +
                                '</div>' +
                                '</li>'
                        })


                        $('.list_wrap ul').append(html)
                    }
                },
                error: function () {
                    self.isRequest = false;
                }
            })
        },

        // scroll
        scroll: function () {
            var self = this;
            window.onscroll = debounce(function(){
                // 获取滚动条距离
                var scrollTop = $(window).scrollTop();
                // 屏幕高度
                var basicHeight = $(window).height();
                // 列表高度
                var eleHeight = $('.list_wrap').height();
                var hasMore = self.hasMore;
                var isRequest = self.isRequest;
                console.log(hasMore)
                if(scrollTop + basicHeight > eleHeight && hasMore && !isRequest){
                    PAGE++;
                    self.getList(PAGE)
                }
            },50)
        },


    }

    // 节流函数
    function debounce(method, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(context, args);
            }, delay);
        }
    }


    new ListModule().init()
})()