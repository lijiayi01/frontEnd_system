(function () {
    var teamId = utilFnModule.getRequest().teamId;
    function InvitationH5Module() {


    }

    InvitationH5Module.prototype = {

        init: function () {
            this.getTeamInfo()
            this.copy();
            this.openApp()
        },

        getTeamInfo: function () {

            $.ajax({
                type: 'get',
                url: apiModule.getInvitationCode,
                data: {
                    team_id: teamId
                },
                success: function (res) {
                    if (res.errNo === 0) {
                        var data = res.data;
                        $('.team_name').html('"' + data.team_name + '"');
                        $('.team_code').html(data.invite_code);
                    } else {
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

        // copy
        copy: function () {
            var clipboard = new ClipboardJS('.copy_wrap', {
                text: function () {
                    return $('.team_code').html()
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
        },

        // 打开app
        openApp: function () {
            $('.canSubmit').on('click', function () {
                downloadApp();
            })

        }
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
            // window.open('https://gio.ren/do3b5Qe')
            // deep-link
            // 应用宝
            window.open('http://a.app.qq.com/o/simple.jsp?pkgname=com.cdv.video360&from=singlemessage');
        }
    }

    new InvitationH5Module().init()
})(window)