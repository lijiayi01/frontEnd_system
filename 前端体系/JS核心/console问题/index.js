/*!
 *  @copyright (c) 2016
 *  @author: wenfeng.lei
 *  @update: Thu Oct 11 2018 17:57:55 GMT+0800 (涓浗鏍囧噯鏃堕棿)
 */
!
    function (t) {
        function e(i) {
            if (o[i]) return o[i].exports;
            var r = o[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return t[i].call(r.exports, r, r.exports, e),
                r.loaded = !0,
                r.exports
        }

        var o = {};
        return e.m = t,
            e.c = o,
            e.p = "/",
            e(0)
    }([function (t, e, o) {
        t.exports = o(26)
    },
        function (t, e) {
            var o = {},
                i = null,
                r = null,
                n = null,
                s = null;
            i = function (t, e) {
                o[t] || (o[t] = []),
                    o[t].push(e)
            },
                r = function () {
                    var t = Array.prototype.slice.call(arguments),
                        e = Array.prototype.shift.call(t),
                        i = o[e];
                    if (i && i.length >= 0) for (var r = 0,
                                                     n = i.length; r < n; r++) i[r].apply(null, t)
                },
                n = function (t, e) {
                    var i = o[t];
                    if (!i) return !1;
                    if (e) for (var r = i.length - 1; r >= 0; r--) {
                        var n = i[r];
                        n === e && i.splice(r, 1)
                    } else i && (i.length = 0)
                },
                s = function () {
                    o = {}
                },
                t.exports = {
                    listen: i,
                    trigger: r,
                    remove: n,
                    clearAll: s
                }
        },
        function (t, e, o) {
            var i = o(7),
                r = {};
            t.exports = {
                create: function (t) {
                    i(t) && (r = t)
                },
                setter: function (t, e) {
                    r[t] = e
                },
                getter: function (t) {
                    return r[t]
                },
                get: function () {
                    return r
                }
            }
        },
        function (t, e, o) {
            var i = o(7),
                r = o(1),
                n = {};
            t.exports = {
                create: function (t) {
                    i(t) && (n = t)
                },
                setter: function (t, e) {
                    n[t] = e
                },
                getter: function (t) {
                    return n[t]
                },
                get: function () {
                    return n
                },
                sendSign: function (t) {
                    var e = {
                            webinar_id: VHALL_SDK.options.roomid,
                            user_id: this.get().userid,
                            nick_name: this.get().username,
                            sign_id: t
                        },
                        o = "//e.vhall.com/api/jssdk/v1/webinar/add-sign-record";
                    o.indexOf("http") < 0 && o.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (o = VHALL_SDK.options.protocol + ":" + o),
                        $.ajax({
                            url: o,
                            type: "get",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: e,
                            success: function (t) {
                                i(t) || (t = JSON.parse(t));
                                var e = {
                                    code: 2e4,
                                    msg: "璇锋眰鎴愬姛"
                                };
                                "200" != t.code && (e = {
                                    code: 20005,
                                    msg: "鎺ュ彛璇锋眰澶辫触"
                                }),
                                    r.trigger("sendSign", e)
                            },
                            error: function (t) {
                                r.trigger("sendSign", {
                                    code: 20005,
                                    msg: "鎺ュ彛璇锋眰澶辫触"
                                })
                            }
                        })
                },
                updateUserInfo: function (t) {
                    var e = {
                        update_auth: n.updateAuth,
                        join_id: n.userid
                    };
                    t && (e.username = encodeURIComponent(t)),
                    n.dataToken && (e.token = n.dataToken);
                    var o = "//e.vhall.com/api/jssdk/v1/webinar/update-token";
                    o.indexOf("http") < 0 && o.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (o = VHALL_SDK.options.protocol + ":" + o),
                        $.ajax({
                            url: o,
                            type: "get",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: e,
                            success: function (t) {
                                var e = {
                                    code: 2e4,
                                    msg: "璇锋眰鎴愬姛"
                                };
                                200 == t.code ? (n.dataToken = t.data.token, n.username = t.data.visitor.nick_name, n.avatar = t.data.visitor.avatar, n.dataToken && r.trigger("_updateUserInfo", n.dataToken)) : e = {
                                    code: 20005,
                                    msg: "鎺ュ彛璇锋眰澶辫触"
                                },
                                    r.trigger("UpdateUser", e)
                            },
                            error: function (t) {
                                r.trigger("UpdateUser", {
                                    code: 20005,
                                    msg: "鎺ュ彛璇锋眰澶辫触"
                                })
                            }
                        })
                }
            }
        },
        function (t, e, o) {
            function i(t) {
                if (t) {
                    t = t.replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\n/g, "<br/>");
                    var e = "//cnstatic01.e.vhall.com/static/img/arclist/";
                    e.indexOf("http:") < 0 && e.indexOf("https:") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (e = VHALL_SDK.options.protocol + ":" + e);
                    var o = t.match(/\[[^@]{1,3}\]/g);
                    if (null !== o) for (var i = 0; i < o.length; i++) {
                        var r = n(o[i]);
                        r && (t = t.replace(o[i], '<img width="24" src="' + e + "Expression_" + r + '@2x.png" border="0"/>'))
                    }
                }
                return t
            }

            o(28);
            var r = o(8),
                n = o(25);
            $.fn.qqFace = function (t) {
                var e = {
                        id: "facebox",
                        path: "face/",
                        assign: "#content"
                    },
                    o = $.extend(e, t),
                    i = o.assign,
                    s = o.id,
                    a = o.path;
                return a.indexOf("http:") < 0 && a.indexOf("https:") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (a = VHALL_SDK.options.protocol + ":" + a),
                    i.length <= 0 ? (alert("缂哄皯琛ㄦ儏璧嬪€煎璞°€�"), !1) : ($(this).click(function (t) {
                        var e, i, c;
                        if (!$(this).hasClass("disabled")) {
                            var l = $(this).parent().find("." + s);
                            if (l.length <= 0) if (r) {
                                e = '<div class="' + s + ' facebox-pc mCustomScrollbar"><table border="0" cellspacing="0" cellpadding="0"><tr>';
                                for (var d = 1; d <= 90; d++) i = n(d - 1),
                                    e += '<td><img width="24" src="' + a + "Expression_" + d + '@2x.png" onclick="$(\'' + o.assign + "').setCaret();$('" + o.assign + "').insertAtCaret('" + i + "');\" /></td>",
                                d % 9 === 0 && (e += "</tr><tr>");
                                e += "</tr></table></div>",
                                    $(this).parent().append(e),
                                    c = $(this).position()
                            } else {
                                var p = $(window).width(),
                                    u = "";
                                e = '<div class="' + s + ' facebox-mobile" style="width:' + p + 'px;"><div class="qqFace-box" style="width:' + 5 * p + 'px">';
                                for (var d = 1; d <= 5; d++) {
                                    e += '<div class="qqFace-mobile" style="width:' + p + 'px">';
                                    for (var h = 1; h <= 20; h++) {
                                        var f = 20 * (d - 1) + h;
                                        i = n(f - 1),
                                        i && (e += "<li onclick=\"$('" + o.assign + "').setCaret();$('" + o.assign + "').insertAtCaret('" + i + '\');"><img width="24" src="' + a + "Expression_" + f + '@2x.png" /></li>')
                                    }
                                    e += "<li onclick=\"$('" + o.assign + '\').deleteCaret();" ><img width="24" src="' + a + 'faceDelete@2x.png" /></li></div>',
                                        u += 1 === d ? "<a class='active'></a>" : "<a></a>"
                                }
                                e += "<div style='clear:both'></div></div><div class='text-center'>" + u + "</div></div>",
                                    $(this).parent().append(e),
                                    c = $(this).position(),
                                    l = $(this).parent().find("." + s),
                                    l.data("data", {
                                        index: 0
                                    });
                                var g, v, y = !1,
                                    m = l.find(".qqFace-box").eq(0).get(0);
                                l[0].addEventListener("touchstart",
                                    function (t) {
                                        g = t.touches[0].pageX
                                    },
                                    !1),
                                    l[0].addEventListener("touchmove",
                                        function (t) {
                                            t.preventDefault(),
                                                v = t.touches[0].pageX - g;
                                            var e = $(this).data("data").index * p,
                                                o = "translate3d(" + (v - e) + "px, 0, 0)";
                                            m.style.webkitTransform = o,
                                                m.style.mozTransform = o,
                                                m.style.transform = o,
                                                y = !0
                                        },
                                        !1),
                                    l[0].addEventListener("touchend",
                                        function (t) {
                                            if (y) {
                                                var e = $(this).data("data").index,
                                                    o = e * p;
                                                v < -50 ? e < 4 && (e += 1, $(this).data("data", {
                                                    index: e
                                                }), o += p) : v > 50 && e >= 1 && (e -= 1, $(this).data("data", {
                                                    index: e
                                                }), o -= p),
                                                    l.find(".text-center a").removeClass("active").eq(e).addClass("active");
                                                var i = "translate3d(-" + o + "px, 0, 0)";
                                                m.style.webkitTransform = i,
                                                    m.style.mozTransform = i,
                                                    m.style.transform = i
                                            }
                                            y = !1
                                        },
                                        !1),
                                    l.on("click", "li",
                                        function (t) {
                                            t.stopPropagation()
                                        })
                            }
                            $(this).parent().find("." + s).toggle(),
                                t.stopPropagation()
                        }
                    }), void $(document).click(function () {
                        $("." + s).hide()
                    }))
            },
                $.fn.extend({
                    selectContents: function () {
                        $(this).each(function (t) {
                            var e, o, i, r, n = this;
                            (i = n.ownerDocument) && (r = i.defaultView) && "undefined" != typeof r.getSelection && "undefined" != typeof i.createRange && (e = window.getSelection()) && "undefined" != typeof e.removeAllRanges ? (o = i.createRange(), o.selectNode(n), 0 === t && e.removeAllRanges(), e.addRange(o)) : document.body && "undefined" != typeof document.body.createTextRange && (o = document.body.createTextRange()) && (o.moveToElementText(n), o.select())
                        })
                    },
                    setCaret: function () {
                        if (/msie/.test(navigator.userAgent.toLowerCase())) {
                            var t = function () {
                                var t = $(this).get(0);
                                t.caretPos = document.selection.createRange().duplicate()
                            };
                            $(this).click(t).select(t).keyup(t)
                        }
                    },
                    insertAtCaret: function (t) {
                        var e = $(this).get(0);
                        if (document.all && e.createTextRange && e.caretPos) {
                            var o = e.caretPos;
                            o.text = "" === o.text.charAt(o.text.length - 1) ? t + "" : t
                        } else if (e.setSelectionRange) {
                            var i = e.selectionStart,
                                n = e.selectionEnd,
                                s = e.value.substring(0, i),
                                a = e.value.substring(n);
                            e.value = s + t + a;
                            var c = t.length;
                            e.setSelectionRange(i + c, i + c),
                                r ? $(this).focus() : $(this).blur()
                        } else e.value += t
                    },
                    deleteCaret: function () {
                        var t = $(this),
                            e = t.val(),
                            o = /(\[[^@]{1,3}\])$/;
                        e = o.test(e) ? e.replace(o, "") : e.substring(0, e.length - 1),
                            t.val(e),
                            t.blur()
                    }
                }),
                t.exports = i
        },
        function (t, e) {
            t.exports = {
                10000: "娑堟伅浣撴牸寮忎笉姝ｇ‘",
                10001: "杈撳叆涓嶈兘涓虹┖",
                10002: "褰撳墠鐢ㄦ埛琚瑷€",
                10003: "鑱婂ぉ杈撳叆涓嶈兘瓒呰繃140涓瓧绗�",
                10004: "褰撳墠宸插紑鍚叏鍛樼瑷€",
                10005: "褰撳墠娲诲姩涓嶅湪鐩存挱",
                10006: "褰撳墠娲诲姩鏈紑鍚棶绛�",
                10007: "褰撳墠鐢ㄦ埛琚涪鍑�",
                20000: "鎺ュ彛璇锋眰鎴愬姛",
                20005: "鎺ュ彛璇锋眰澶辫触",
                50400: "鐢ㄦ埛韬唤璁よ瘉閿欒",
                50401: "鐢ㄦ埛鍙戦€佹秷鎭娆¤秴杩囬檺鍒�",
                50402: "娲诲姩xxx鍙戦€佹秷鎭娆¤秴杩囬檺鍒�",
                50403: "鑷畾涔夊箍鎾秷鎭唴瀹归暱搴﹁秴杩囬檺鍒�"
            }
        },
        function (t, e, o) {
            var i = o(1),
                r = o(5),
                n = o(4),
                s = (o(3), {
                    eventProcessors: {},
                    init: function (t) {
                        this.options = t;
                        var e = "https:" === window.location.protocol;
                        return "https" == VHALL_SDK.options.protocol && (e = !0),
                        "http" == VHALL_SDK.options.protocol && (e = !1),
                            this.pushstream ? void this.reInit() : (this.pushstream = new PushStream({
                                host: t.domain,
                                port: t.port,
                                modes: "websocket|longpolling",
                                messagesPublishedAfter: 0,
                                useSSL: e,
                                messagesControlByArgument: !0
                            }), this.pushstream.addChannel(t.roomid), this.pushstream.connect(), VHALL_SDK.Pusher = this, void this.bind())
                    },
                    reInit: function () {
                        this.pushstream._keepConnected || this.open()
                    },
                    close: function () {
                        this.pushstream.disconnect()
                    },
                    open: function () {
                        this.pushstream.connect()
                    },
                    onevent: function (t, e) {
                        return "string" != typeof t ? console.log("浜嬩欢绫诲瀷蹇呴』浼犲叆string") : void(this.eventProcessors[t] = e)
                    },
                    bind: function () {
                        var t = this;
                        this.pushstream.onmessage = function (e) {
                            var o;
                            try {
                                o = JSON.parse(e)
                            } catch (t) {
                                return void console.log(t, e)
                            }
                            try {
                                t.eventProcessors[o.event](o)
                            } catch (t) {
                                return void console.log(t, o)
                            }
                        },
                            i.listen("_updateUserInfo",
                                function (t) {
                                    this.options.token = t
                                }.bind(this)),
                            this.onevent("online",
                                function (t) {
                                    i.trigger("userOnline", t)
                                }),
                            this.onevent("offline",
                                function (t) {
                                    i.trigger("userOffline", t)
                                }),
                            this.onevent("msg",
                                function (t) {
                                    var e = VHALL_SDK.getUserinfo();
                                    return !(t.user_id == e.userid || e.forbidchat && "user" == t.role || t.data.notpublic && "host" != t.role) && (t.avatar = t.avatar ? t.avatar : "//cnstatic01.e.vhall.com/static/images/watch/head50.png", t.avatar.indexOf("http") < 0 && t.avatar.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (t.avatar = VHALL_SDK.options.protocol + ":" + t.avatar), t.content = n(t.data.text), void i.trigger("chatMsg", t))
                                }),
                            this.onevent("custom_broadcast",
                                function (t) {
                                    i.trigger("customEvent", t.data)
                                }),
                            this.onevent("question",
                                function (t) {
                                    var e = VHALL_SDK.getUserinfo();
                                    return ("question" != t.data.type || "user" != e.role && e.userid != t.data.join_id) && ((!t.data.answer || "0" != t.data.answer.is_open || "user" != e.role || t.data.join_id == e.userid) && (t.data.content = n(t.data.content), t.data.answer && (t.data.answer.content = n(t.data.answer.content)), void i.trigger("questionMsg", t)))
                                })
                    },
                    sendCustomEvent: function (t) {
                        var e = s.options.pubUrl;
                        e.indexOf("http") < 0 && e.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (e = VHALL_SDK.options.protocol + ":" + e),
                            $.ajax({
                                url: e,
                                type: "get",
                                dataType: "jsonp",
                                jsonp: "callback",
                                data: {
                                    token: s.options.token,
                                    event: "custom_broadcast",
                                    app_key: s.options.app_key,
                                    data: JSON.stringify(t)
                                },
                                success: function (e) {
                                    e = JSON.parse(e);
                                    var o = {
                                        code: 2e4,
                                        msg: "璇锋眰鎴愬姛",
                                        data: t
                                    };
                                    "200" != e.code && (o = r[e.code] ? {
                                        code: e.code,
                                        msg: r[e.code],
                                        data: t
                                    } : {
                                        code: 20005,
                                        msg: "鎺ュ彛璇锋眰澶辫触",
                                        data: t
                                    }),
                                        i.trigger("sendCustomEvent", o)
                                },
                                error: function (t) {
                                    i.trigger("sendCustomEvent", {
                                        code: 20005,
                                        msg: "鎺ュ彛璇锋眰澶辫触"
                                    })
                                }
                            })
                    },
                    sendChat: function (t) {
                        if (s.filterWords && s.filterWords.length > 0) {
                            for (var e = !1,
                                     o = t.text,
                                     r = s.filterWords,
                                     n = 0,
                                     a = s.filterWords.length; n < a; n++) if (o.indexOf(r[n]) >= 0) {
                                e = !0;
                                break
                            }
                            if (e) return void i.trigger("sendChat", t)
                        }
                        var c = s.options.pubUrl;
                        c.indexOf("http") < 0 && c.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (c = VHALL_SDK.options.protocol + ":" + c),
                            $.ajax({
                                url: c,
                                type: "get",
                                dataType: "jsonp",
                                jsonp: "callback",
                                data: {
                                    token: s.options.token,
                                    event: "msg",
                                    app_key: s.options.app_key,
                                    data: JSON.stringify(t)
                                },
                                success: function (t) {
                                    t = JSON.parse(t);
                                    var e = {
                                        code: 2e4,
                                        msg: "璇锋眰鎴愬姛"
                                    };
                                    "200" != t.code && (e = {
                                        code: 20005,
                                        msg: "鎺ュ彛璇锋眰澶辫触"
                                    }),
                                        i.trigger("sendChat", e)
                                },
                                error: function (t) {
                                    i.trigger("sendChat", {
                                        code: 20005,
                                        msg: "鎺ュ彛璇锋眰澶辫触"
                                    })
                                }
                            })
                    },
                    sendQuestion: function (t) {
                        var e = "//e.vhall.com/api/jssdk/v1/question/addquestion";
                        e.indexOf("http") < 0 && e.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (e = VHALL_SDK.options.protocol + ":" + e),
                            $.ajax({
                                url: e,
                                type: "get",
                                dataType: "jsonp",
                                jsonp: "callback",
                                data: {
                                    token: s.options.token,
                                    content: t,
                                    app_key: s.options.app_key
                                },
                                success: function (t) {
                                    var e = {
                                        code: 2e4,
                                        msg: "璇锋眰鎴愬姛"
                                    };
                                    "200" != t.code && (e = {
                                        code: 20005,
                                        msg: "鎺ュ彛璇锋眰澶辫触"
                                    }),
                                        i.trigger("sendQuestion", e)
                                },
                                error: function (t) {
                                    i.trigger("sendQuestion", {
                                        code: 20005,
                                        msg: "鎺ュ彛璇锋眰澶辫触"
                                    })
                                }
                            })
                    }
                });
            t.exports = s
        },
        function (t, e) {
            function o(t) {
                return "[object Object]" === Object.prototype.toString.call(t)
            }

            t.exports = o
        },
        function (t, e) {
            function o() {
                for (var t = navigator.userAgent,
                         e = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"], o = !0, i = 0; i < e.length; i++) if (t.indexOf(e[i]) > 0) {
                    o = !1;
                    break
                }
                return o
            }

            t.exports = o()
        },
        function (t, e, o) {
            function i(t) {
                t.indexOf("http") < 0 && t.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (t = VHALL_SDK.options.protocol + ":" + t),
                    a.doc[0].src = t
            }

            function r() {
                var t = "";
                t = "1" == s.get().isBoard ? a.board_url : a.curr_file && "0" != a.curr_file ? a.doc_url + "/" + a.curr_file + "/" + a.curr_page + ".jpg" : "//cnstatic01.e.vhall.com/static/img/mobile/doc_noloading.png",
                    i(t)
            }

            var n = o(7),
                s = (o(1), o(2)),
                a = {
                    doc_url: "",
                    curr_file: "0",
                    curr_page: "",
                    totalPage: "",
                    board_url: "//cnstatic01.e.vhall.com/static/img/mobile/blankspace.jpg"
                },
                c = {
                    doc_url: "",
                    curr_file: "0",
                    curr_page: "",
                    totalPage: "",
                    board_url: "//cnstatic01.e.vhall.com/static/img/mobile/blankspace.jpg"
                };
            t.exports = {
                create: function (t) {
                    if (t.docContent) {
                        var e = "//cnstatic01.e.vhall.com/static/img/mobile/doc_noloading.png",
                            o = "//cnstatic01.e.vhall.com/static/img/mobile/doc_error.png";
                        e.indexOf("http") < 0 && e.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (e = VHALL_SDK.options.protocol + ":" + e, o = VHALL_SDK.options.protocol + ":" + o),
                            a = $.extend({},
                                c, t),
                            $(a.docContent).html('<img style="width:100%" src="' + e + '" onerror="this.src = \'' + o + "'\"/>"),
                            a.doc = $(a.docContent).find("img"),
                            r()
                    }
                },
                setter: function (t, e) {
                    1 == s.getter("type") ? setTimeout(function () {
                            n(t) ? a = $.extend({},
                                a, t) : a[t] = e,
                                r()
                        },
                        15e3) : (n(t) ? a = $.extend({},
                        a, t) : a[t] = e, r())
                },
                getter: function (t) {
                    return t ? a[t] : a
                }
            }
        },
        function (t, e, o) {
            var i = o(8),
                r = o(17),
                n = o(2),
                s = o(1),
                a = o(14),
                c = o(18),
                l = null,
                d = {
                    init: function (t) {
                        if (i) {
                            var e = "//cnstatic01.e.vhall.com/3rdlibs/swfobject/2.2.0/swfobject.js",
                                o = "//cnstatic01.e.vhall.com/3rdlibs/jquery-object/jqueryObject.js";
                            e.indexOf("http") < 0 && e.indexOf("https") < 0 && ("http" == t.protocol || "https" == t.protocol) && (e = t.protocol + ":" + e, o = t.protocol + ":" + o),
                                a([e, o],
                                    function () {
                                        c.init(t),
                                            l = c.player(),
                                            l.on("_playerReady",
                                                function () {
                                                    sendMsgToFlash("*SDKReg", {
                                                        type: "*SDKReg",
                                                        subType: "play"
                                                    }),
                                                        sendMsgToFlash("*SDKReg", {
                                                            type: "*SDKReg",
                                                            subType: "pause"
                                                        }),
                                                    1 != n.getter("type") && (sendMsgToFlash("*SDKReg", {
                                                        type: "*SDKReg",
                                                        subType: "start"
                                                    }), sendMsgToFlash("*SDKReg", {
                                                        type: "*SDKReg",
                                                        subType: "over"
                                                    }), sendMsgToFlash("*SDKReg", {
                                                        type: "*SDKReg",
                                                        subType: "timeUpdate"
                                                    })),
                                                        s.trigger("playerReady")
                                                })
                                    }),
                                this.exchageWhite = c.exchageWhite
                        } else l = new r(t),
                            l.on("_playerError",
                                function (t) {
                                    s.trigger("playerError", t)
                                }),
                            l.on("_playerReady",
                                function () {
                                    this.on = function (t, e) {
                                        l.on(t, e)
                                    },
                                        this.setPlayerLine = function (t) {
                                            l.setPlayerLine(t)
                                        },
                                        this.setPlayerDefinition = function (t) {
                                            l.setPlayerDefinition(t)
                                        },
                                    1 == n.getter("type") && (this.seek = function (t) {
                                        l.seek(t)
                                    }),
                                        s.trigger("playerReady"),
                                        l.onready()
                                }.bind(this))
                    },
                    on: function (t, e) {
                        l.on(t, e)
                    },
                    play: function () {
                        l.play()
                    },
                    pause: function () {
                        l.pause()
                    }
                };
            t.exports = d
        },
        function (t, e, o) {
            var i = o(1);
            t.exports = {
                init: function (t) {
                    this.token = t
                },
                sendSurvey: function (t) {
                    this.queryQuestionList(t.survey_id)
                },
                queryQuestionList: function (t) {
                    var e = "//e.vhall.com/api/jssdk/v1/survey/show";
                    e.indexOf("http") < 0 && e.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (e = VHALL_SDK.options.protocol + ":" + e),
                        $.ajax({
                            url: e,
                            type: "get",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                survey_id: t,
                                token: this.token
                            },
                            success: function (t) {
                                200 == t.code ? i.trigger("questionPagerList", t.data) : i.trigger("error", t)
                            },
                            error: function (t) {
                                i.trigger("error", t)
                            }
                        })
                },
                sendQuestionPager: function (t) {
                    var e = "//e.vhall.com/api/jssdk/v1/survey/addsurvey";
                    e.indexOf("http") < 0 && e.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (e = VHALL_SDK.options.protocol + ":" + e),
                        $.ajax({
                            url: e,
                            type: "get",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                survey_id: t.survey_id,
                                token: this.token,
                                res: JSON.stringify(t.data)
                            },
                            success: function (t) {
                                200 == t.code ? console.log("--鎻愪氦闂嵎绛旀鎴愬姛--") : i.trigger("error", t)
                            },
                            error: function (t) {
                                i.trigger("error", t)
                            }
                        })
                }
            }
        },
        function (t, e, o) {
            function i() {
                var t = r();
                return t = t.match(/(https?:|rtmp:)?(\/\/)?([a-zA-Z0-9]+\.)?([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+/),
                t && (t = t[0]),
                    t
            }

            function r() {
                var t = "";
                return t = $("video#vhall-h5-player")[0].src
            }

            function n() {
                return (new Date).getTime() - _
            }

            function s() {
                return {
                    p: R.p,
                    pf: "3",
                    aid: R.p,
                    uid: D.join_uid,
                    s: R.s,
                    vid: R.vid,
                    vfid: R.vfid,
                    guid: R.guid,
                    vtype: R.vtype,
                    topic: R.topic
                }
            }

            function a() {
                var t = s();
                t.tt = n(),
                    1 == D.webinar_type ? (t.sd = i(), t.browser = R.ua, t._bc = S, t._bt = w) : t.fd = r(),
                    t.ua = R.ua,
                    t.tf = R.tf,
                    T({
                        k: v.heart_beat,
                        id: String(R.s) + (new Date).getTime(),
                        s: R.s,
                        token: t
                    })
            }

            function c() {
                var t = s();
                1 == D.webinar_type ? (t.sd = i(), t.browser = R.ua) : t.fd = r(),
                    T({
                        k: v.player_pause,
                        id: String(R.s) + (new Date).getTime(),
                        s: R.s,
                        token: t
                    })
            }

            function l() {
                var t = s();
                1 == D.webinar_type ? (t.sd = i(), t.browser = R.ua) : t.fd = r(),
                    T({
                        k: v.player_resume,
                        id: String(R.s) + (new Date).getTime(),
                        s: R.s,
                        token: t
                    })
            }

            function d() {
                x = 0,
                    k = 0;
                var t = s();
                1 == D.webinar_type ? (t.sd = i(), t.browser = R.ua) : t.fd = r(),
                    T({
                        k: v.open_stream,
                        id: String(R.s) + (new Date).getTime(),
                        s: R.s,
                        token: t
                    })
            }

            function p() {
                var t = s();
                1 == D.webinar_type ? (t.sd = i(), t.browser = R.ua) : t.fd = r(),
                    t.tt = n(),
                    t._bc = x,
                    t._bt = "",
                    T({
                        k: v.close_stream,
                        id: String(R.s) + (new Date).getTime(),
                        s: R.s,
                        token: t
                    })
            }

            function u() {
                var t = s();
                1 == D.webinar_type ? (t.sd = i(), t.browser = R.ua) : t.fd = r(),
                    t.tt = (new Date).getTime() - _,
                    t._bc = S,
                    t._bt = w,
                    T({
                        k: v.lag,
                        id: String(R.s) + (new Date).getTime(),
                        s: R.s,
                        token: t
                    }),
                    S = 0
            }

            function h(t) {
                "http" != t && "https" != t || (y = t + ":" + y);
                var e = f.get(),
                    o = g.get();
                D.webinar_id = e.id,
                    D.webinar_type = e.type,
                    D.sessionId = o.sessionId,
                    D.join_uid = o.userid,
                1 == e.type && (v = {
                    open_stream: 52001,
                    close_stream: 52002,
                    heart_beat: 52003,
                    player_pause: 52004,
                    player_resume: 52005,
                    lag: 54001
                }),
                    R = {
                        p: D.webinar_id,
                        s: D.sessionId,
                        ua: navigator.userAgent,
                        tf: "",
                        vid: e.vid,
                        vfid: e.vfid,
                        guid: e.guid,
                        vtype: e.vtype,
                        topic: e.topic
                    },
                    A = setTimeout(function () {
                            var t = 1;
                            $("video#vhall-h5-player")[0] ? t = $("video#vhall-h5-player")[0].paused : $("audio")[0] && (t = $("audio")[0].paused),
                            b || t || (d(this.src), clearInterval(b), b = setInterval(function () {
                                    a(),
                                    1 != D.webinar_type && u(),
                                        S = 0
                                },
                                6e4))
                        },
                        1e3),
                $("video#vhall-h5-player")[0] && ($("video#vhall-h5-player")[0].addEventListener("play",
                    function () {
                        _ = (new Date).getTime(),
                            clearInterval(b),
                            b = setInterval(function () {
                                    a(),
                                    1 != D.webinar_type && u(),
                                        S = 0
                                },
                                6e4),
                        L && (d(this.src), L = !1),
                            k = 0,
                            l()
                    },
                    !1), $("video#vhall-h5-player")[0].addEventListener("timeupdate",
                    function () {
                        k && (w = (new Date).getTime() - k)
                    },
                    !1), $("video#vhall-h5-player")[0].addEventListener("pause",
                    function () {
                        k = 0,
                            clearInterval(b),
                            c()
                    },
                    !1), $("video#vhall-h5-player")[0].addEventListener("ended",
                    function () {
                        k = 0,
                            clearInterval(b)
                    },
                    !1), $("video#vhall-h5-player")[0].addEventListener("waiting",
                    function () {
                        S++,
                            x++,
                            k = (new Date).getTime()
                    }))
            }

            var f = o(2),
                g = o(3),
                v = {
                    open_stream: 92001,
                    close_stream: 92002,
                    heart_beat: 92003,
                    player_pause: 92004,
                    player_resume: 92005,
                    lag: 94001
                },
                y = "//la.e.vhall.com/login",
                m = {},
                _ = (new Date).getTime(),
                L = !0,
                b = null,
                A = null,
                x = 0,
                S = 0,
                k = 0,
                w = 0,
                D = {},
                R = {
                    p: D.webinar_id,
                    s: D.sessionId,
                    ua: navigator.userAgent
                },
                T = function (t) {
                    t.token = Base64.encode(JSON.stringify(t.token)),
                        $.getJSON(y, t,
                            function () {
                            })
                },
                E = {},
                H = null;
            H = function (t, e) {
                E[t] || (E[t] = []),
                    E[t].push(e)
            },
                m.trigger = function () {
                    var t = Array.prototype.slice.call(arguments),
                        e = Array.prototype.shift.call(t),
                        o = E[e];
                    if (o && o.length >= 0) for (var i = 0,
                                                     r = o.length; i < r; i++) o[i].apply(null, t)
                },
                H("changeline",
                    function (t, e) {
                        p(t),
                            d(e)
                    }),
                m.init = h,
                m.destoryPort = function () {
                    A && clearTimeout(A),
                    b && clearInterval(b),
                        b = null,
                        A = null
                },
                t.exports = m
        },
        function (t, e, o) {
            function i(t) {
                this.content = c(JSON.parse(t.content).text),
                    this.avatar = t.avatar ? t.avatar : "//cnstatic01.e.vhall.com/static/images/watch/head50.png",
                this.avatar.indexOf("http") < 0 && this.avatar.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (this.avatar = VHALL_SDK.options.protocol + ":" + this.avatar),
                    this.role = t.user_role,
                    this.user_name = t.user_name,
                    this.time = t.created_at,
                    this.user_id = t.user_id
            }

            function r(t) {
                var e = new Date;
                if (e.setHours(0), e.setMinutes(0), t) {
                    var o = t.split(":");
                    2 === o.length && (e.setHours(o[0]), e.setMinutes(o[1]))
                }
                return e
            }

            function n(t) {
                var e = sessionStorage.getItem("historyFilter"),
                    o = [];
                if (e && (o = JSON.parse(e)), 0 === o.length) return t;
                for (var i = [], n = 0; n < t.length && !(i.length >= 20); n++) 0 === o.length ? i.push(t[n]) : r(t[n].time) > r(o[0].time) ? i.push(t[n]) : (i.push(o[0]), n--, o.shift());
                if (i.length < 20 && o.length > 0) for (var n = 0; n < o.length && !(i.length >= 20); n++) i.push(o[n]);
                return i
            }

            var s = o(1),
                a = o(5),
                c = o(4),
                l = o(6);
            t.exports = {
                sign: 0,
                getLiveChatMsg: function () {
                    if (!this.sign) return s.trigger("error", {
                        code: 1006,
                        msg: "sign error"
                    });
                    var t = "//e.vhall.com/api/jssdk/v1/webinar/historymsg";
                    t.indexOf("http") < 0 && t.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (t = VHALL_SDK.options.protocol + ":" + t),
                        $.ajax({
                            url: t,
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                webinar_id: VHALL_SDK.options.roomid
                            },
                            success: function (t) {
                                if ("200" == t.code) {
                                    var e = [],
                                        o = 0;
                                    for (t.data.length; o < t.data.length; o++) e.push(new i(t.data[o]));
                                    s.trigger("vhall_live_history_chat_msg", {
                                        code: 200,
                                        data: e,
                                        msg: "鎷夊彇鏁版嵁鎴愬姛"
                                    })
                                } else s.trigger("vhall_live_history_chat_msg", {
                                    code: 20005,
                                    msg: a[20005]
                                })
                            },
                            error: function (t) {
                                s.trigger("vhall_live_history_chat_msg", {
                                    code: 20005,
                                    msg: a[20005]
                                })
                            }
                        })
                },
                getRecordChatMsg: function (t) {
                    if (!this.sign) return s.trigger("error", {
                        code: 1006,
                        msg: "sign error"
                    });
                    var e = "//e.vhall.com/api/jssdk/v1/webinar/getmsg";
                    e.indexOf("http") < 0 && e.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (e = VHALL_SDK.options.protocol + ":" + e),
                        $.ajax({
                            url: e,
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                webinar_id: VHALL_SDK.options.roomid,
                                curr_page: t
                            },
                            success: function (t) {
                                if ("200" == t.code) {
                                    var e = [],
                                        o = 0;
                                    for (t.data.data.length; o < t.data.data.length; o++) e.push(new i(t.data.data[o]));
                                    var r = n(e);
                                    s.trigger("vhall_record_history_chat_msg", {
                                        code: 200,
                                        curr_page: t.data.curr_page,
                                        total: t.data.total,
                                        data: r,
                                        total_page: t.data.total_page,
                                        msg: "鎷夊彇鏁版嵁鎴愬姛"
                                    })
                                } else s.trigger("vhall_record_history_chat_msg", {
                                    code: 20005,
                                    msg: a[20005]
                                })
                            },
                            error: function (t) {
                                s.trigger("vhall_record_history_chat_msg", {
                                    code: 20005,
                                    msg: a[20005]
                                })
                            }
                        })
                },
                sendRecordChat: function (t) {
                    if (!this.sign) return s.trigger("error", {
                        code: 1006,
                        msg: "sign error"
                    });
                    if (this.filterWords && this.filterWords.length > 0) {
                        var e = sessionStorage.getItem("historyFilter"),
                            o = [];
                        e && (o = JSON.parse(e));
                        for (var i = !1,
                                 r = t.content,
                                 n = this.filterWords,
                                 a = 0,
                                 c = this.filterWords.length; a < c; a++) if (r.indexOf(n[a]) >= 0) {
                            o.length >= 20 && o.pop(),
                                o.unshift(t),
                                sessionStorage.setItem("historyFilter", JSON.stringify(o)),
                                i = !0;
                            break
                        }
                        if (i) return void this.getRecordChatMsg(1)
                    }
                    var l = this,
                        d = "//e.vhall.com/api/jssdk/v1/webinar/addmsg";
                    d.indexOf("http") < 0 && d.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (d = VHALL_SDK.options.protocol + ":" + d),
                        $.ajax({
                            url: d,
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: t,
                            success: function (t) {
                                "200" == t.code ? (s.trigger("sendChat", {
                                    code: 2e4,
                                    msg: "璇锋眰鎴愬姛"
                                }), setTimeout(function () {
                                        l.getRecordChatMsg(1)
                                    },
                                    800)) : s.trigger("sendChat", {
                                    code: 20005,
                                    msg: "鎺ュ彛璇锋眰澶辫触"
                                })
                            },
                            error: function (t) {
                                s.trigger("sendChat", {
                                    code: 20005,
                                    msg: "鎺ュ彛璇锋眰澶辫触"
                                })
                            }
                        })
                },
                getQuestionlist: function () {
                    if (!this.sign) return s.trigger("error", {
                        code: 1006,
                        msg: "sign error"
                    });
                    if (1 != VHALL_SDK.getRoominfo().openQuestion) return s.trigger("error", {
                        code: 10006,
                        msg: a[10006]
                    });
                    if (1 != VHALL_SDK.getRoominfo().type) return s.trigger("error", {
                        code: 10005,
                        msg: a[10005]
                    });
                    var t = "//e.vhall.com/api/jssdk/v1/question/list";
                    t.indexOf("http") < 0 && t.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (t = VHALL_SDK.options.protocol + ":" + t),
                        $.ajax({
                            url: t,
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                token: l.options.token
                            },
                            success: function (t) {
                                if ("200" == t.code) {
                                    var e = [],
                                        o = 0;
                                    for (t.data.length; o < t.data.length; o++) t.data[o].content = c(t.data[o].content),
                                    t.data[o].answer && (t.data[o].answer.content = c(t.data[o].answer.content)),
                                        e.push({
                                            data: t.data[o]
                                        });
                                    s.trigger("getQuestionList", {
                                        code: 200,
                                        data: e,
                                        msg: "璇锋眰鎴愬姛"
                                    })
                                } else s.trigger("getQuestionList", t)
                            },
                            error: function (t) {
                                s.trigger("getQuestionList", t)
                            }
                        })
                },
                getHistoryQuestionlist: function () {
                    if (!this.sign) return s.trigger("error", {
                        code: 1006,
                        msg: "sign error"
                    });
                    var t = VHALL_SDK.getRoominfo(),
                        e = "//e.vhall.com/api/jssdk/v1/question/lists";
                    e.indexOf("http") < 0 && e.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (e = VHALL_SDK.options.protocol + ":" + e),
                        $.ajax({
                            url: e,
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                join_id: t.join_id,
                                webinar_id: t.id
                            },
                            success: function (t) {
                                if ("200" == t.code) {
                                    var e = [],
                                        o = 0;
                                    for (t.data.length; o < t.data.length; o++) t.data[o].content = c(t.data[o].content),
                                    t.data[o].answer && (t.data[o].answer.content = c(t.data[o].answer.content)),
                                        e.push({
                                            data: t.data[o]
                                        });
                                    s.trigger("getQuestionList", {
                                        code: 200,
                                        data: e,
                                        msg: "璇锋眰鎴愬姛"
                                    })
                                } else s.trigger("getQuestionList", t)
                            },
                            error: function (t) {
                                s.trigger("getQuestionList", t)
                            }
                        })
                },
                getNotice: function (t) {
                    if (t = t ? t : 1, !this.sign) return s.trigger("error", {
                        code: 1006,
                        msg: "sign error"
                    });
                    var e = "//e.vhall.com/api/jssdk/v1/webinar/announcement-list";
                    e.indexOf("http") < 0 && e.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (e = VHALL_SDK.options.protocol + ":" + e),
                        $.ajax({
                            url: e,
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                webinar_id: VHALL_SDK.options.roomid,
                                curr_page: t
                            },
                            success: function (t) {
                                s.trigger("vhall_history_notice", t)
                            },
                            error: function (t) {
                                s.trigger("vhall_history_notice", t)
                            }
                        })
                }
            }
        },
        function (t, e) {
            function o(t, e) {
                if ("string" == typeof t) {
                    var o = t;
                    t = [],
                        t.push(o)
                }
                var r = function (t, e) {
                    i(t.shift(),
                        function () {
                            t.length ? r(t, e) : e && e()
                        })
                };
                r(t, e)
            }

            function i(t, e) {
                var o = !1,
                    i = document.createElement("script");
                i.src = t,
                    i.onload = i.onreadystatechange = function () {
                        o || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (o = !0, e && e())
                    },
                    document.body.appendChild(i)
            }

            t.exports = o
        },
        function (t, e, o) {
            e = t.exports = o(16)(),
                e.push([t.id, ".facebox-pc{background:#f7f7f7;padding:2px;border:1px solid #afafaf;position:absolute;display:none;z-index:2;top:-266px;left:0}.facebox-pc table td{padding:0}.facebox-pc table td img{cursor:pointer;border:1px solid #f7f7f7}.facebox-pc table td img:hover{border:1px solid #06c}.facebox-mobile{background:#fff;border-top:1px solid #ddd;position:absolute;display:none;z-index:2;overflow:hidden;height:170px;padding:0 1%;top:-170px}.facebox-mobile .qqFace-mobile{float:left}.facebox-mobile .qqFace{float:left;text-align:left}.facebox-mobile li{display:inline-block;padding:10px 0;width:14%;text-align:center}.facebox-mobile .text-center a{width:10px;height:10px;border-radius:100%;background:#ddd;border:none;color:#fff;margin:5px 15px 0 0;display:inline-block;text-decoration:none}.facebox-mobile .text-center a.active{background:#ff3334}.facebox-mobile .text-center{text-align:center}", ""])
        },
        function (t, e) {
            t.exports = function () {
                var t = [];
                return t.toString = function () {
                    for (var t = [], e = 0; e < this.length; e++) {
                        var o = this[e];
                        o[2] ? t.push("@media " + o[2] + "{" + o[1] + "}") : t.push(o[1])
                    }
                    return t.join("")
                },
                    t.i = function (e, o) {
                        "string" == typeof e && (e = [[null, e, ""]]);
                        for (var i = {},
                                 r = 0; r < this.length; r++) {
                            var n = this[r][0];
                            "number" == typeof n && (i[n] = !0)
                        }
                        for (r = 0; r < e.length; r++) {
                            var s = e[r];
                            "number" == typeof s[0] && i[s[0]] || (o && !s[2] ? s[2] = o : o && (s[2] = "(" + s[2] + ") and (" + o + ")"), t.push(s))
                        }
                    },
                    t
            }
        },
        function (t, e, o) {
            function i(t) {
                return this.sourceType = 0,
                    this.queryTime = 0,
                    this.querySetTimeId = 0,
                    this.slowSetTimeId = 0,
                    this.stream = t.stream,
                    this.clientList = {},
                    this.$videoCont = $(t.videoCont),
                    this.type = g.getter("type"),
                    this.currentLine = "",
                    this.lines = t.lines,
                    this.x5_video_fullscreen = t.x5_video_fullscreen,
                    this.x5_video_type = t.x5_video_type,
                    this.protocol = t.protocol,
                    this.webinarImg = t.webinarImg,
                    this.definitions = t.definitions,
                    this.playSource = {
                        defaultLines: {},
                        play_token: "",
                        lines: {}
                    },
                    this.api_host = t.against_url,
                    this.default_token = t.against_token,
                    this.init(t),
                    this
            }

            function r(t) {
                for (var e = window.crcTable || (window.crcTable = x()), o = -1, i = 0; i < t.length; i++) o = o >>> 8 ^ e[255 & (o ^ t.charCodeAt(i))];
                return (o ^ -1) >>> 0
            }

            function n(t) {
                var e = t.split("_"),
                    o = e[0].split("").reverse().join("");
                return o = r(o).toString(16).toUpperCase(),
                o + "_" + e[1]
            }

            function s(t) {
                0 != t.lines.length && (t.playSource.default_token = n(t.default_token), t.lines.forEach(function (e) {
                    var o = e.name.replace(/\D/g, "");
                    if (t.playSource.defaultLines[o] || (t.playSource.defaultLines[o] = {}), 1 == t.type) t.playSource.defaultLines[o].same = e.srv.replace("{stream}", t.stream),
                        t.definitions.forEach(function (i) {
                            1 == i.valid && (t.playSource.defaultLines[o][i.value.replace("_", "")] = e.srv.replace("{stream}", t.stream + i.value))
                        });
                    else if (3 == t.type) for (var i in e) "srv" == i ? t.playSource.defaultLines[o].same = e[i] : "srv_audio" == i ? t.playSource.defaultLines[o].a = e[i] : 0 == i.indexOf("srv_") && (t.playSource.defaultLines[o][i.replace("srv_", "")] = e[i])
                }))
            }

            function a(t, e, o, i) {
                var r = t;
                r.indexOf("http") < 0 && r.indexOf("https") < 0 && ("http" == o.protocol || "https" == o.protocol) && (r = o.protocol + ":" + r),
                    $.ajax({
                        url: r,
                        type: "get",
                        dataType: "json",
                        timeout: 3e3,
                        data: e,
                        success: function (t) {
                            if ("200" == t.code) {
                                if (o.playSource.play_token = n(t.data.token), 1 == o.type && t.data.hls_urls) for (var e in t.data.hls_urls) t.data.hls_urls[e].forEach(function (t) {
                                    var i = t.line.replace(/\D/g, "");
                                    o.playSource.lines[i] || (o.playSource.lines[i] = {}),
                                        o.playSource.lines[i][e] = t.hls_url
                                });
                                else if (3 == o.type) {
                                    var i = t.data.hls_domainnames || t.data.mp4_domainnames;
                                    i.forEach(function (t) {
                                        var e = t.line.replace(/\D/g, "");
                                        o.playSource.lines[e] || (o.playSource.lines[e] = {}),
                                            o.playSource.lines[e][o.currDefinitions] = t.hls_domainname || t.mp4_domainname
                                    })
                                }
                                o.sourceType = 1
                            }
                        },
                        complete: function (t, e) {
                            if (1 == o.sourceType) {
                                var r = Object.keys(o.playSource.lines);
                                0 == r.length && 0 == o.sourceType
                            }
                            if (s(o), 0 == o.sourceType) {
                                var r = Object.keys(o.playSource.defaultLines);
                                if (0 == r.length) return void o.trigger("_playerError", {
                                    msg: "褰撳墠鏃犳挱鏀剧嚎璺紒"
                                })
                            }
                            console.log(o.playSource),
                                clearInterval(o.querySetTimeId),
                                o.queryTime = 0,
                                o.querySetTimeId = setInterval(function () {
                                        o.queryTime++,
                                        o.queryTime > _ && (clearInterval(o.querySetTimeId), o.queryTime = 0, l.call(o))
                                    },
                                    1e3),
                            i && i(o)
                        }
                    })
            }

            function c(t) {
                t.currDefinitions = t.currDefinitions || "same";
                var e = h.call(t);
                t.currentLine = "1",
                    t.currCdnServerLine = e[t.currentLine],
                    t.video = t.createVideo(t.$videoCont),
                    m.init(t.protocol),
                    t.bind(),
                    t.trigger("_playerReady")
            }

            function l(t) {
                d.call(this,
                    function () {
                        t && t()
                    }.bind(this))
            }

            function d(t) {
                if (1 == this.type) {
                    var e = this.api_host + "api/dispatch_play",
                        o = {
                            webinar_id: g.getter("id"),
                            rand: Math.floor(899999999 * Math.random()) + 1e8,
                            uid: v.getter("userid")
                        };
                    a(e, o, this, t)
                } else if (3 == this.type) {
                    if (0 == this.lines.length) return void setTimeout(function () {
                        this.trigger("_playerError", {
                            msg: "褰撳墠鏃犳挱鏀剧嚎璺紒"
                        })
                    }.bind(this), 0);
                    var e = this.api_host + "api/dispatch_replay",
                        i = "";
                    this.playSource.defaultLines[1] ? i = this.playSource.defaultLines[1][this.currDefinitions] : this.lines[0].srv ? (this.currDefinitions = "same", i = this.lines[0].srv) : (this.currDefinitions = "a", i = this.lines[0].srv_audio);
                    var o = {
                        webinar_id: g.getter("id"),
                        rand: Math.floor(899999999 * Math.random()) + 1e8,
                        uid: v.getter("userid"),
                        uri: i.replace(/(.+\.com)/, "")
                    };
                    a(e, o, this, t)
                } else if (2 == this.type && this.webinarImg) {
                    var r = $('<img style="width: 100%;height: 100%;" src="' + this.webinarImg + '?x-oss-process=image/resize,w_640,h_360">');
                    this.$videoCont.append(r)
                }
            }

            function p(t, e) {
                for (var o = "",
                         t = Object.keys(t), i = 0; i < t.length; i++) if (e.indexOf(t[i]) == -1) {
                    o = t[i];
                    break
                }
                return o
            }

            function u(t) {
                0 == $("#_log").length && $("body").prepend('<div id="_log" style="display:none;word-break: break-all;font-size:12px;position:fixed;width:100%;height:200px;bottom:0;overflow-y:auto;background-color:white;z-index:1111;"></div>');
                var e = new Date;
                $("#_log").prepend("<div>" + t + " 鏃堕棿:" + e.getHours() + ":" + e.getMinutes() + "</div>")
            }

            function h(t) {
                return 1 == this.sourceType ? t ? this.playSource.lines[t] : this.playSource.lines : t ? this.playSource.defaultLines[t] : this.playSource.defaultLines
            }

            function f() {
                return 1 == this.sourceType ? this.playSource.play_token : this.playSource.default_token
            }

            var g = o(2),
                v = o(3),
                y = o(9),
                m = o(12),
                _ = (o(5), 300),
                L = [],
                b = {
                    same: "鍘熺敾",
                    "720p": "瓒呮竻",
                    "480p": "楂樻竻",
                    "360p": "鏍囨竻",
                    a: "绾煶棰�"
                },
                A = {
                    "鍘熺敾": "same",
                    "瓒呮竻": "720p",
                    "楂樻竻": "480p",
                    "鏍囨竻": "360p",
                    "绾煶棰�": "a"
                },
                x = function () {
                    for (var t, e = [], o = 0; o < 256; o++) {
                        t = o;
                        for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                        e[o] = t
                    }
                    return e
                };
            i.prototype.init = function () {
                this.on("_streamOver",
                    function () {
                        clearInterval(this.querySetTimeId),
                            this.queryTime = 0
                    }.bind(this)),
                    d.call(this, c)
            },
                i.prototype.onready = function () {
                    if (2 != this.type) {
                        var t = [],
                            e = h.call(this);
                        Object.keys(e).forEach(function (e) {
                            t.push("绾胯矾" + e)
                        }),
                            this.trigger("canPlayLines", t),
                            this.getCanPlayDefinitions()
                    }
                },
                i.prototype.getCanPlayDefinitions = function () {
                    var t = [],
                        e = [];
                    Object.keys(this.playSource.defaultLines[1]).forEach(function (e) {
                        this.playSource.defaultLines[1][e] && t.push(b[e])
                    }.bind(this));
                    for (var o in b) t.indexOf(b[o]) != -1 && e.push(b[o]);
                    this.trigger("canPlayDefinitions", e)
                },
                i.prototype.createVideo = function (t) {
                    $("#vhall-h5-player").remove();
                    var e = $("<video id='vhall-h5-player'></video>");
                    e.attr("webkit-playsinline", ""),
                        e.attr("playsinline", ""),
                        e.attr("x5-playsinline", ""),
                        e.attr("x-webkit-airplay", "allow"),
                        e.attr("controls", ""),
                        e.css({
                            width: "100%",
                            height: "100%"
                        }),
                    this.webinarImg && e.attr("poster", this.webinarImg + "?x-oss-process=image/resize,w_640,h_360"),
                    this.x5_video_fullscreen && e.attr("x5-video-player-fullscreen", this.x5_video_fullscreen),
                    this.x5_video_type && e.attr("x5-video-player-type", this.x5_video_type);
                    var o = f.call(this),
                        i = this.currCdnServerLine[this.currDefinitions] + "?token=" + o;
                    return u("鍦板潃绫诲瀷:" + (this.sourceType ? "闃茬洍閾�" : "鍘熷") + " 鎾斁鍦板潃:" + i),
                        e.attr("src", i),
                        t.append(e),
                        e.load(),
                        e[0]
                },
                i.prototype.seek = function (t) {
                    this.type && (this.video.currentTime = t, this.trigger("seek", t))
                },
                i.prototype.on = function (t, e) {
                    this.clientList[t] || (this.clientList[t] = []),
                        this.clientList[t].push(e)
                },
                i.prototype.trigger = function () {
                    var t = Array.prototype.slice.call(arguments),
                        e = Array.prototype.shift.call(t),
                        o = this.clientList[e];
                    if (o && o.length >= 0) for (var i = 0,
                                                     r = o.length; i < r; i++) o[i].apply(null, t)
                },
                i.prototype.bind = function () {
                    var t = this;
                    this.video.addEventListener("waiting",
                        function () {
                            u("寮€濮嬪崱椤�,褰撳墠绾胯矾:" + t.currentLine),
                                clearTimeout(t.slowSetTimeId),
                                t.slowSetTimeId = setTimeout(function () {
                                        var e = h.call(t);
                                        if (4 == t.video.readyState) return void u("涓嶅崱浜�,褰撳墠绾胯矾:" + t.currentLine);
                                        clearInterval(t.querySetTimeId),
                                            t.queryTime = 0,
                                        L.indexOf(t.currentLine) == -1 && L.push(t.currentLine);
                                        var o = p(e, L);
                                        o ? (u("鍗￠】5绉�,灏濊瘯鎹㈢嚎:" + o), t.setPlayerLine(o)) : (u("鍗￠】5绉�,閲嶆柊鑾峰彇鍘熺敾绾胯矾"), L = [], t.playSource.defaultLines[1].same ? t.setPlayerDefinition(b.same) : t.setPlayerDefinition(b[t.currDefinitions]))
                                    },
                                    5e3),
                                t.trigger("waiting")
                        },
                        !1),
                        this.video.addEventListener("play",
                            function () {
                                0 == parseInt(this.currentTime) && 1 != t.type && t.trigger("start"),
                                    t.trigger("play")
                            },
                            !1),
                        this.video.addEventListener("pause",
                            function () {
                                t.trigger("pause")
                            },
                            !1),
                        1 == this.type ? this.video.addEventListener("timeupdate",
                            function () {
                                t.trigger("timeupdate")
                            },
                            !1) : this.recordTimeupdate()
                },
                i.prototype.recordTimeupdate = function () {
                    var t = 0,
                        e = -1,
                        o = "",
                        i = "no",
                        r = null,
                        n = "//e.vhall.com/api/jssdk/v1/webinar/cuepoint";
                    n.indexOf("http") < 0 && n.indexOf("https") < 0 && ("http" == this.protocol || "https" == this.protocol) && (n = this.protocol + ":" + n),
                        $.ajax({
                            url: n,
                            type: "GET",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                roomid: g.getter("id"),
                                app_key: VHALL_SDK.options.appkey
                            },
                            success: function (t) {
                                if ($.trim(t.data)) {
                                    var e = $.parseJSON(t.data).cuepoint;
                                    if ("object" == typeof e) {
                                        for (var n = [], s = !1, a = !1, c = 0, l = e.length - 1; c <= l; c++) {
                                            var d = $.parseJSON(e[c].content);
                                            "flipOver" != d.type && "change_showtype" != d.type || n.push({
                                                created_at: e[c].created_at,
                                                type: d.type,
                                                page: d.page ? d.page : "",
                                                doc: d.doc ? d.doc : "",
                                                showType: d.showType
                                            }),
                                            0 === e[c].created_at && ("flipOver" === d.type ? (d.doc && d.page ? y.create({
                                                curr_file: d.doc,
                                                curr_page: d.page
                                            }) : y.create({
                                                curr_file: "",
                                                curr_page: ""
                                            }), i = o, a = !0) : "change_showtype" === d.type && (g.setter("isBoard", d.showType), y.create({}), 1 === d.showType ? s = !0 : 0 === d.showType && (s = !1)))
                                        }
                                        r = n
                                    }
                                }
                            }
                        });
                    var s = 0,
                        a = this;
                    this.video.addEventListener("timeupdate",
                        function () {
                            a.video.ended && s != this.currentTime && (a.trigger("timeUpdate", {
                                time: this.currentTime
                            }), a.trigger("over")),
                                s = this.currentTime,
                            a.video.ended || a.trigger("timeUpdate", {
                                time: this.currentTime
                            });
                            var o = this.currentTime;
                            if (t = parseInt(o), r && t != e) {
                                for (var i = r.length - 1; i >= 0; i--) {
                                    var n = r[i];
                                    if (t > parseFloat(n.created_at)) {
                                        if ("flipOver" === n.type) {
                                            y.setter({
                                                curr_file: n.doc,
                                                curr_page: n.page
                                            });
                                            break
                                        }
                                        if ("change_showtype" === n.type) {
                                            g.setter("isBoard", n.showType),
                                                y.setter({});
                                            break
                                        }
                                    }
                                }
                                e = t
                            }
                        },
                        !1)
                },
                i.prototype.setPlayerLine = function (t) {
                    t = t.replace(/\D/g, "");
                    var e = "";
                    this.currentLine = t,
                        this.currCdnServerLine = h.call(this, t),
                        e = this.currCdnServerLine[this.currDefinitions] + "?token=" + f.call(this),
                        u("鍦板潃绫诲瀷:" + (this.sourceType ? "闃茬洍閾�" : "鍘熷") + " 鎾斁鍦板潃:" + e);
                    var o = this.video.paused;
                    if (this.video.src = e, this.video.load(), this.video.dataset.ct && (this.video.currentTime = this.video.dataset.ct), !o) {
                        var i = this.video.play();
                        i.then(function () {
                            L.count = 0,
                                L = [],
                                u("鎾斁瑙嗛涓�")
                        })
                    }
                },
                i.prototype.setPlayerDefinition = function (t) {
                    var e = "";
                    if (1 == this.type) {
                        this.currCdnServerLine[A[t]] && (this.currDefinitions = A[t], e = this.currCdnServerLine[this.currDefinitions] + "?token=" + f.call(this)),
                            u("鍦板潃绫诲瀷:" + (this.sourceType ? "闃茬洍閾�" : "鍘熷") + " 鎾斁鍦板潃:" + e);
                        var o = this.video.paused;
                        this.video.src = e,
                            this.video.load(),
                        !o && this.video.play()
                    } else if (3 == this.type) {
                        var i = this.api_host + "api/dispatch_replay";
                        this.currDefinitions = A[t];
                        var r = {
                            webinar_id: g.getter("id"),
                            rand: Math.floor(899999999 * Math.random()) + 1e8,
                            uid: v.getter("userid"),
                            uri: this.playSource.defaultLines[1][this.currDefinitions].replace(/(.+\.com)/, "")
                        };
                        clearInterval(this.querySetTimeId),
                            this.queryTime = 0,
                            a(i, r, this,
                                function (t) {
                                    t.video.dataset.ct = t.video.currentTime;
                                    var e = t.video.paused;
                                    t.video.src = t.currCdnServerLine[t.currDefinitions] + "?token=" + f.call(t),
                                        u("鍦板潃绫诲瀷:" + (t.sourceType ? "闃茬洍閾�" : "鍘熷") + " 鎾斁鍦板潃:" + t.video.src),
                                        t.video.load(),
                                    t.video.dataset.ct && (t.video.currentTime = t.video.dataset.ct),
                                    !e && t.video.play()
                                })
                    }
                },
                i.prototype.play = function () {
                    this.video && this.video.play()
                },
                i.prototype.pause = function () {
                    this.video && this.video.pause()
                },
                t.exports = i
        },
        function (t, e, o) {
            function i() {
                return this.clientList = {},
                    this
            }

            function r(t) {
                t ? ($("#" + a).css({
                    height: "1px",
                    width: "1px",
                    visibility: "hidden"
                }), $("#" + c).css({
                    height: "100%",
                    width: "100%",
                    visibility: "visible"
                })) : ($("#" + c).css({
                    height: "1px",
                    width: "1px",
                    visibility: "hidden"
                }), $("#" + a).css({
                    height: "100%",
                    width: "100%",
                    visibility: "visible"
                }))
            }

            var n = o(2),
                s = "vhall-video-player",
                a = "vhall-doc-player",
                c = "vhall-white-board";
            i.prototype.on = function (t, e) {
                this.clientList[t] || (this.clientList[t] = []),
                    this.clientList[t].push(e)
            },
                i.prototype.trigger = function () {
                    var t = Array.prototype.slice.call(arguments),
                        e = Array.prototype.shift.call(t),
                        o = this.clientList[e];
                    if (o && o.length >= 0) for (var i = 0,
                                                     r = o.length; i < r; i++) o[i].apply(null, t)
                },
                i.prototype.play = function () {
                    sendMsgToFlash("*SDKCall", {
                        type: "*SDKCall",
                        subType: "play"
                    })
                },
                i.prototype.pause = function () {
                    sendMsgToFlash("*SDKCall", {
                        type: "*SDKCall",
                        subType: "pause"
                    })
                };
            var l = new i,
                d = function (t) {
                    function e(e, o) {
                        $("#" + e).flash({
                            swf: o,
                            width: "100%",
                            height: "100%",
                            allowfullscreen: !0,
                            wmode: t.isFlashVR ? "direct" : "transparent",
                            allowscriptaccess: "always",
                            allowFullScreenInteractive: !0,
                            encodeParams: !1,
                            bgcolor: "#363636",
                            quality: "high",
                            class: "Intranet_Runner",
                            name: "Intranet_Runner",
                            style: "visibility:visible",
                            id: e,
                            flashvars: t.flashvars
                        })
                    }

                    function o(o) {
                        var i = n.getter("isBoard");
                        if (console.log(i), o.success) return r(parseInt(i)),
                            !1;
                        e(c, t.flash_whiteBoard_url);
                        var s = setInterval(function () {
                                100 == Math.floor($("#" + c)[0].PercentLoaded()) && (r(i), clearInterval(s))
                            },
                            60)
                    }

                    function i(o) {
                        o.success || e(s, t.flash_video_url)
                    }

                    function l(o) {
                        o.success || e(a, t.flash_doc_url)
                    }

                    var d = $(t.videoCont),
                        p = $(t.docContent);
                    p.css({
                        "background-color": "#cccccc",
                        "background-image": "url(data:image/png;base64,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OHny5FczgZEhZaKjsFgQ4MM+xTyUbWWDYaV3Y8E1JnYlf89ZlAmGdu0y0VFYLAiw/f0ShvQyxpL2QNuMibDpfmFeOBqRvDTkjy2BTIaSKcwFJkNyScgVgS4QkCF1AZ6iioBLQIbkkpArAl0gIEPqAjxFFQGXgAzJJSFXBLpAQIbUBXiKKgIugVgaEtuZzQaAt5kHuCDi7rosXDZx55Fr/WP5QJYHbC8B6vrW1tZDCxYsyJVZJPVhkaiXwyaSdcxnpWI5IvFKyAygPqe779mu5bB4zmFzNkA+ERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABEYgMgT5hrsmePXsu5Hd3HuAV/49Rzif5WN8Pw1xelS2+BEL9/0j8StoUjOgSmqcf5x38RKEZlA4RCB2BUBtS6GipQCIQQCDUhlRYWFjLvz6/Qdntt2q+7/xEYUBVJBYBERABERABERABERABERABERABERABERABERABERABERABEfgICSRfEVq4cOHnSHfYR5h2UFIHHn744eeDAk3ejWXJVAy/sNbS0tKt8+fPf88vMFXWyXp0mMcjjzxywalTp8aTX74/OR2msqTiDct1oj8nG4IHn1fwOk7/fJeOfAaSR0ZD6q6ydKauLS0tFxEvK0PqbD06ysMJv7gz5c81TpjKkmvZu0Pf7c/JEYlfIzifn0e3Tp7Xg5dQD5HX0UyZdFdZMpXBL4wbTSuj0UHctF+/9tPvTD2yyYPG68OoNBQ3eSP0y7+rsjCVpat1yVf8bPpzvvJWuiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiKQZwLJ50h5zqfXJ2/PhKjEKM5Q/1dxlqBPo7c30/M8b335Xdn9/Gj121mmHUu1vD7QixjRATygHByVOvEwdwB1yfRgPFlfPkJzCl0ZUobG14iUAY43yN4mePTRR8t5x63IK++Nft4XbJs3b15Dpjc03PriFjY3Nx9hhGrtjXVVmUVABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABERABEQgkgQ2bdpUklqx6urqP3jxxRcz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)",
                        "background-repeat": "no-repeat",
                        "background-position": "center center",
                        "background-size": "220px 220px"
                    });
                    var u = !1;
                    try {
                        var h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                        h && (u = !0)
                    } catch (t) {
                        try {
                            u = void 0 != navigator.plugins["Shockwave Flash"]
                        } catch (t) {
                            u = !1
                        }
                    }
                    if (!u) return void(t.videoCont ? d.html('<div style="position:absolute;color:#999;text-align:center;font-size:16px;height:30px;top:50%;margin-top:-15px;width:100%;">绯荤粺妫€娴嬪埌鎮ㄧ殑娴忚鍣ㄦ湭瀹夎flash鎻掍欢,鐐瑰嚮<a href="//get.adobe.com/cn/flashplayer/" target="_blank">杩欓噷</a>瀹夎</div>') : t.docContent && p.html('<div style="position:absolute;color:#999;text-align:center;font-size:16px;height:30px;top:50%;margin-top:-15px;width:100%;">绯荤粺妫€娴嬪埌鎮ㄧ殑娴忚鍣ㄦ湭瀹夎flash鎻掍欢,鐐瑰嚮<a href="//get.adobe.com/cn/flashplayer/" target="_blank">杩欓噷</a>瀹夎</div>'));
                    t.videoCont && d.append('<div style="width:100%;height:100%;" id="' + s + '"></div>'),
                    t.docContent && p.append("<div style='width:100%;height:100%;' id='" + a + "'></div><div style='width:1px;height:1px;' id='" + c + "'></div>");
                    var f = "10.0.0",
                        g = "//cnstatic01.e.vhall.com/3rdlibs/swfobject/2.2.0/expressInstall.swf";
                    g.indexOf("http") < 0 && g.indexOf("https") < 0 && ("http" == t.protocol || "https" == t.protocol) && (g = t.protocol + ":" + g);
                    var v = {};
                    v.quality = "high",
                        v.bgcolor = "#363636",
                        v.allowscriptaccess = "always",
                        v.allowfullscreen = "true",
                        v.allowFullScreenInteractive = "true",
                        v.wmode = t.isFlashVR ? "direct" : "transparent";
                    var y = {};
                    y.styleclass = "Intranet_Runner",
                        y.name = "Intranet_Runner",
                        y.align = "middle",
                    t.flash_doc_url.indexOf("http") < 0 && t.flash_doc_url.indexOf("https") < 0 && ("http" == t.protocol || "https" == t.protocol) && (t.flash_doc_url = t.protocol + ":" + t.flash_doc_url, t.flash_whiteBoard_url = t.protocol + ":" + t.flash_whiteBoard_url, t.flash_video_url = t.protocol + ":" + t.flash_video_url),
                    !t.flash_doc_url || swfobject.embedSWF(t.flash_doc_url, a, "100%", "100%", f, g, t.flashvar, v, y, l),
                    !t.flash_whiteBoard_url || swfobject.embedSWF(t.flash_whiteBoard_url, c, "100%", "100%", f, g, t.flashvar, v, y, o),
                    !t.flash_video_url || swfobject.embedSWF(t.flash_video_url, s, "100%", "100%", f, g, t.flashvar, v, y, i),
                        swfobject.createCSS(".Intranet_Runner", "display:block;text-align:left;position:absolute;")
                };
            !
                function (t) {
                    t.sendMsgToFlash = function (t, e) {
                        var o = $(".Intranet_Runner");
                        $.each(o,
                            function (o, i) {
                                try {
                                    i.sendMsgToAs(t, e)
                                } catch (t) {
                                    console.log("flsah 閿欒淇℃伅锛�" + t.message)
                                }
                            })
                    },
                        t.sendEveToFlash = function (t, e) {
                            var o = $(".Intranet_Runner");
                            $.each(o,
                                function (o, i) {
                                    try {
                                        i.sendEventToAs(t, e)
                                    } catch (t) {
                                        console.log("flsah 閿欒淇℃伅锛�" + t.message)
                                    }
                                })
                        },
                        t.sendCmdMsg = function (e) {
                            try {
                                var o = Base64.decode(e);
                                if (e = $.parseJSON(o), t.sendMsgToFlash(e.type, e), 3 == n.getter("type") && "*changeShowType" == e.type && r(parseInt(e.showType)), "*vod_inited" == e.type && l.trigger("_playerReady"), "*SDKTrigger" == e.type) switch (e.subType) {
                                    case "start":
                                    case "over":
                                        l.trigger(e.subType);
                                        break;
                                    case "timeUpdate":
                                        l.trigger(e.subType, {
                                            time: e.time
                                        });
                                        break;
                                    default:
                                        l.trigger(e.subType, e)
                                }
                                return !0
                            } catch (t) {
                                return console.log("parse JSON error:" + t.message),
                                    !1
                            }
                        },
                        t.sendRecordMsg = function (t, e) {
                            try {
                                return sendEveToFlash(t, e),
                                    !0
                            } catch (t) {
                                return ldebug("parse JSON error:" + t.message),
                                    !1
                            }
                        }
                }(window),
                t.exports.init = d,
                t.exports.exchageWhite = r,
                t.exports.player = function () {
                    return l
                }
        },
        function (t, e, o) {
            function i(t) {
                if (s.destoryPort(), VHALL_SDK.clearAllEvent(), "undefined" == typeof t) return t = {},
                    console.error("璇峰厛闃呰鏂囨。浼犲叆姝ｇ‘鍙傛暟");
                if (!(t.roomid && t.app_key && t.signedat && t.sign && t.username)) return console.error("鏈夊繀濉」鏈～");
                var e = {
                    account: t.account,
                    email: t.email,
                    roomid: t.roomid,
                    username: t.username,
                    appkey: t.app_key,
                    signedat: t.signedat,
                    sign: t.sign,
                    facedom: t.facedom,
                    textdom: t.textdom,
                    videoContent: t.videoContent,
                    docContent: t.docContent,
                    x5_video_fullscreen: t.x5_video_fullscreen,
                    x5_video_type: t.x5_video_type,
                    protocol: t.protocol
                };
                VHALL_SDK.options = e,
                    "http" == t.protocol || "https" == t.protocol ? n([t.protocol + "://cnstatic01.e.vhall.com/3rdlibs/nginx-push-stream/0.5.1/pushstream.js", t.protocol + "://cnstatic01.e.vhall.com/3rdlibs/socket.io/1.3.5/socket.io.min.js", t.protocol + "://cnstatic01.e.vhall.com/3rdlibs/jquery-json/2.4.0/jquery.json.min.js", t.protocol + "://cnstatic01.e.vhall.com/3rdlibs/base64/base64.js"],
                        function () {
                            r(e)
                        }) : n(["//cnstatic01.e.vhall.com/3rdlibs/nginx-push-stream/0.5.1/pushstream.js", "//cnstatic01.e.vhall.com/3rdlibs/socket.io/1.3.5/socket.io.min.js", "//cnstatic01.e.vhall.com/3rdlibs/jquery-json/2.4.0/jquery.json.min.js", "//cnstatic01.e.vhall.com/3rdlibs/base64/base64.js"],
                        function () {
                            r(e)
                        })
            }

            var r = o(20),
                n = o(14),
                s = o(12);
            t.exports = i
        },
        function (t, e, o) {
            function i(t) {
                c.filterWords = [],
                    h.filterWords = [];
                var e = {
                        webinar_id: t.roomid
                    },
                    o = "//e.vhall.com/api/webinar/v1/webinar/keywords-list";
                o.indexOf("http") < 0 && o.indexOf("https") < 0 && ("http" == t.protocol || "https" == t.protocol) && (o = t.protocol + ":" + o),
                    $.ajax({
                        url: o,
                        type: "get",
                        dataType: "jsonp",
                        jsonp: "callback",
                        data: e,
                        success: function (t) {
                            200 == t.code ? (c.filterWords = t.data, h.filterWords = t.data) : l.trigger("error", t)
                        },
                        error: function (t) {
                            l.trigger("error", t)
                        }
                    })
            }

            function r(t) {
                var e = {
                    roomid: t.roomid,
                    account: t.account,
                    username: t.username,
                    app_key: t.appkey,
                    signedat: t.signedat,
                    sign: t.sign
                };
                t.email && (e.email = t.email);
                var o = "//e.vhall.com/api/jssdk/v1/webinar/init";
                o.indexOf("http") < 0 && o.indexOf("https") < 0 && ("http" == VHALL_SDK.options.protocol || "https" == VHALL_SDK.options.protocol) && (o = VHALL_SDK.options.protocol + ":" + o),
                    $.ajax({
                        url: o,
                        type: "get",
                        dataType: "jsonp",
                        jsonp: "callback",
                        data: e,
                        success: function (e) {
                            200 == e.code ? (e.data.roomid = t.roomid, s(e.data, t), i(t), l.trigger("ready")) : l.trigger("error", e)
                        },
                        error: function (t) {
                            l.trigger("error", t)
                        }
                    })
            }

            function n(t, e) {
                var o = t.visitor;
                console.log(t),
                    v.init(t.socketToken),
                    d.create({
                        id: t.roomid,
                        join_id: t.visitor.id,
                        type: t.webinarStatus,
                        openQuestion: t.openQuestion,
                        isBoard: parseInt(t.doc.whiteBoard),
                        vid: t.reportedData.vid,
                        vfid: t.reportedData.vfid,
                        guid: t.reportedData.guid,
                        vtype: t.reportedData.vtype,
                        topic: t.reportedData.topic,
                        webConfig: t.webConfig
                    });
                var i = "//cnstatic01.e.vhall.com/static/images/watch/head50.png";
                i.indexOf("http") < 0 && i.indexOf("https") < 0 && ("http" == e.protocol || "https" == e.protocol) && (i = e.protocol + ":" + i),
                    p.create({
                        username: o.nick_name,
                        userid: o.id,
                        sessionId: t.sessionId,
                        forbidchat: t.forbidchat ? t.forbidchat : 0,
                        role: o.role ? o.role : "user",
                        avatar: o.avatar ? o.avatar : i,
                        is_gag: t.visitor.is_gag,
                        is_kickout: t.visitor.is_kickout,
                        updateAuth: t.updateAuth,
                        dataToken: t.socketToken
                    }),
                e.docContent && !g && u.create({
                    doc_url: t.doc.srv,
                    curr_file: t.doc.currFile,
                    curr_page: t.doc.currPage,
                    totalPage: t.doc.totalPage,
                    docContent: e.docContent
                })
            }

            function s(t, e) {
                n(t, e),
                1 == t.webinarStatus && (c.init({
                    pubUrl: t.pushstreamPubUrl,
                    token: t.socketToken,
                    domain: t.pushstreamDomain,
                    port: t.pushstreamPort,
                    roomid: e.roomid
                }), a.init({
                    srv: t.socketSrv,
                    token: t.socketToken,
                    app: "vhall"
                })),
                    h.sign = 1;
                var o = "//cnstatic01.e.vhall.com/static/img/arclist/";
                o.indexOf("http") < 0 && o.indexOf("https") < 0 && ("http" == e.protocol || "https" == e.protocol) && (o = e.protocol + ":" + o),
                e.facedom && e.textdom && $(e.facedom).qqFace({
                    assign: e.textdom,
                    path: o
                });
                var i = t.webinarImg;
                i || (i = "//cnstatic01.e.vhall.com/static/img/video_default_nologo.png"),
                i.indexOf("http") < 0 && i.indexOf("https") < 0 && ("http" == e.protocol || "https" == e.protocol) && (i = e.protocol + ":" + i),
                e.videoContent && f.init($.extend({
                        videoCont: e.videoContent,
                        docContent: e.docContent,
                        x5_video_fullscreen: e.x5_video_fullscreen,
                        x5_video_type: e.x5_video_type,
                        protocol: e.protocol,
                        webinarImg: i
                    },
                    g ? t.flashPlayer : t.mobilePlayer))
            }

            var a = o(21),
                c = o(6),
                l = o(1),
                d = o(2),
                p = o(3),
                u = o(9);
            o(4);
            var h = o(13),
                f = o(10),
                g = o(8),
                v = o(11);
            t.exports = r
        },
        function (t, e, o) {
            function i(t) {
                switch (t.type) {
                    case "*disablechat":
                        l.getter("userid") == t.user_id && l.setter("is_gag", 1),
                            r.trigger("disableChat", t.user_id);
                        break;
                    case "*permitchat":
                        l.getter("userid") == t.user_id && l.setter("is_gag", 0),
                            r.trigger("permitChat", t.user_id);
                        break;
                    case "*kickout":
                        l.getter("userid") == t.user_id && l.setter("is_kickout", 1),
                            r.trigger("kickout", t.user_id);
                        break;
                    case "*kickoutrestore":
                        l.getter("userid") == t.user_id && l.setter("is_kickout", 0),
                            r.trigger("kickoutRestore", t.user_id);
                        break;
                    case "*forbidchat":
                        "1" === t.status ? l.setter("forbidchat", 1) : l.setter("forbidchat", 0),
                            r.trigger("forbidChat", t.status);
                        break;
                    case "*question":
                        "1" == t.status ? c.setter("openQuestion", 1) : c.setter("openQuestion", 0),
                            r.trigger("questionSwitch", {
                                status: t.status
                            });
                        break;
                    case "*publish_start":
                        s ? window.sendMsgToFlash("*publish_start", $.toJSON(t)) : d.player.setPlayerDefinition(t.trans);
                        break;
                    case "*whiteBoard":
                        s ? (c.setter("isBoard", t.status), window.sendMsgToFlash("*changeShowType", $.toJSON({
                            showType: parseInt(t.status)
                        })), "1" == t.status ? d.exchageWhite(1) : d.exchageWhite(0)) : (setTimeout(function () {
                                c.setter("isBoard", t.status),
                                    survey
                            },
                            15e3), a.setter({}));
                        break;
                    case "*over":
                        if (s) {
                            var e = {};
                            e.desc = "娲诲姩缁撴潫",
                                c.setter("type", 3),
                                window.sendMsgToFlash("*over", $.toJSON(e))
                        } else setTimeout(function () {
                                r.trigger("streamOver"),
                                    d.player.trigger("_streamOver")
                            },
                            15e3);
                        break;
                    case "*publishStart":
                        s ? (c.setter("type", 1), window.sendMsgToFlash("*publishStart", $.toJSON(t))) : setTimeout(function () {
                                r.trigger("publishStart")
                            },
                            15e3);
                        break;
                    case "*announcement":
                        r.trigger("announcement", t.content);
                        break;
                    case "*startSign":
                        r.trigger("startSign", t);
                        break;
                    case "*survey":
                        p.sendSurvey(t)
                }
            }

            var r = o(1),
                n = (o(4), o(22)),
                s = o(8),
                a = o(9),
                c = o(2),
                l = o(3),
                d = o(10),
                p = (o(6), o(11)),
                u = {
                    init: function (t) {
                        var e = t.srv;
                        return "http" == VHALL_SDK.options.protocol ? e = "ws://" + e : "https" == VHALL_SDK.options.protocol && (e = "wss://" + e),
                            this.socket ? void this.reInit() : (this.socket = io.connect(e, {
                                query: "token=" + t.token + "&app=" + (t.app || "vhall"),
                                transports: n ? ["polling"] : ["websocket", "polling"]
                            }), VHALL_SDK.socket = this, void this.bind())
                    },
                    reInit: function () {
                        this.socket.disconnected && this.socket.open()
                    },
                    bind: function () {
                        this.socket.on("online",
                            function (t) {
                            }),
                            this.socket.on("cmd",
                                function (t) {
                                    try {
                                        t = $.parseJSON(t)
                                    } catch (e) {
                                        t = t
                                    }
                                    i(t)
                                }),
                            this.socket.on("flashMsg",
                                function (t) {
                                    if (s) window.sendEveToFlash("flashMsg", t);
                                    else try {
                                        var e = $.parseJSON(t);
                                        "flipOver" == e.type && a.setter({
                                            curr_file: e.doc,
                                            curr_page: e.page,
                                            totalPage: e.totalPage
                                        })
                                    } catch (t) {
                                    }
                                })
                    },
                    close: function () {
                        this.socket.close()
                    },
                    open: function () {
                        this.socket.open()
                    }
                };
            t.exports = u
        },
        function (t, e) {
            function o() {
                var t = !1;
                return "Microsoft Internet Explorer" == navigator.appName && ("MSIE9.0" != navigator.appVersion.split(";")[1].replace(/[ ]/g, "") && "MSIE8.0" != navigator.appVersion.split(";")[1].replace(/[ ]/g, "") || (t = !0)),
                    t
            }

            t.exports = o()
        },
        function (t, e) {
            function o(t) {
                return "[object Number]" === Object.prototype.toString.call(t)
            }

            t.exports = o
        },
        function (t, e) {
            function o(t) {
                return "[object String]" === Object.prototype.toString.call(t)
            }

            t.exports = o
        },
        function (t, e, o) {
            function i(t) {
                return c.indexOf(t)
            }

            function r(t) {
                return c[t]
            }

            function n(t) {
                return a(t) ? i(t) + 1 : s(t) ? r(t) : null
            }

            var s = o(23),
                a = o(24),
                c = ["[寰瑧]", "[鎾囧槾]", "[鑹瞉", "[鍙戝憜]", "[寰楁剰]", "[娴佹唱]", "[瀹崇緸]", "[闂槾]", "[鐫", "[鍝璢", "[灏村艾]", "[鍙戞€抅", "[璋冪毊]", "[鍛茬墮]", "[鎯婅]", "[闅捐繃]", "[閰穄", "[姹梋", "[鎶撶媯]", "[鍚怾", "[鍋风瑧]", "[鎰夊揩]", "[鐧界溂]", "[鍌叉參]", "[楗ラタ]", "[鍥癩", "[鎯婃亹]", "[娴佹睏]", "[鎲ㄧ瑧]", "[鎮犻棽]", "[濂嬫枟]", "[鍜掗獋]", "[鐤戦棶]", "[鍢榏", "[鏅昡", "[鐤簡]", "[琛癩", "[楠烽珔]", "[鏁叉墦]", "[鍐嶈]", "[鎿︽睏]", "[鎶犻蓟]", "[榧撴帉]", "[绯楀ぇ浜哴", "[鍧忕瑧]", "[宸﹀摷鍝糫", "[鍙冲摷鍝糫", "[鍝堟瑺]", "[閯欒]", "[濮斿眻]", "[蹇摥浜哴", "[闃撮櫓]", "[浜蹭翰]", "[鍚揮", "[鍙€淽", "[鑿滃垁]", "[瑗跨摐]", "[鍟ら厭]", "[绡悆]", "[涔掍箵]", "[鍜栧暋]", "[楗璢", "[鐚ご]", "[鐜懓]", "[鍑嬭阿]", "[鍢村攪]", "[鐖卞績]", "[蹇冪]", "[铔嬬硶]", "[闂數]", "[鐐稿脊]", "[鍒€]", "[瓒崇悆]", "[鐡㈣櫕]", "[渚夸究]", "[鏈堜寒]", "[澶槼]", "[绀肩墿]", "[鎷ユ姳]", "[寮篯", "[寮盷", "[鎻℃墜]", "[鑳滃埄]", "[鎶辨嫵]", "[鍕惧紩]", "[鎷冲ご]", "[宸姴]", "[鐖变綘]", "[NO]", "[OK]"];
            Array.prototype.indexOf || (Array.prototype.indexOf = function (t) {
                var e = this.length >>> 0,
                    o = Number(arguments[1]) || 0;
                for (o = o < 0 ? Math.ceil(o) : Math.floor(o), o < 0 && (o += e); o < e; o++) if (o in this && this[o] === t) return o;
                return -1
            }),
                t.exports = n
        },
        function (t, e, o) {
            function i(t, e) {
                if (!c.sign) return n.trigger(t, {
                    code: 1006,
                    msg: "sign error"
                }) && !1;
                if (!e) return n.trigger(t, {
                    code: 1e4,
                    msg: p[1e4]
                }) && !1;
                if (!$.trim(e.text)) return n.trigger(t, {
                    code: 10001,
                    msg: p[10001]
                }) && !1;
                var o = s.getter("webConfig").chat_limit,
                    i = 140;
                return "1" == o && (i = 1e3),
                    e.text && $.trim(e.text).length > i ? n.trigger(t, {
                        code: 10003,
                        msg: p[10003]
                    }) && !1 : ("1" == a.getter("is_gag") && n.trigger(t, {
                        code: 10002,
                        msg: p[10002]
                    }) && !1, 1 != a.getter("forbidchat") || n.trigger(t, {
                        code: 10004,
                        msg: p[10004]
                    }) && !1)
            }

            var r = o(19),
                n = o(1),
                s = o(2),
                a = o(3),
                c = o(13),
                l = o(6),
                d = o(4),
                p = o(5),
                u = o(10),
                h = o(7),
                f = o(12),
                g = o(11);
            window.VHALL_SDK = window.VHALL_SDK || {},
                VHALL_SDK.Version = "2.4.0",
                VHALL_SDK.on = n.listen,
                VHALL_SDK.remove = n.remove,
                VHALL_SDK.clearAllEvent = n.clearAll,
                VHALL_SDK.destroy = function () {
                    f.destoryPort(),
                        VHALL_SDK.clearAllEvent(),
                    VHALL_SDK.socket && VHALL_SDK.socket.close(),
                    VHALL_SDK.Pusher && VHALL_SDK.Pusher.close()
                },
                VHALL_SDK.init = r,
                VHALL_SDK.reconnect_msg_server = function () {
                    if (1 == VHALL_SDK.getRoominfo().type) {
                        VHALL_SDK.socket.reInit(),
                            VHALL_SDK.Pusher.reInit();
                        var t = setTimeout(function () {
                                clearTimeout(t),
                                    VHALL_SDK.socket.reInit(),
                                    VHALL_SDK.Pusher.reInit()
                            },
                            22e3)
                    }
                },
                VHALL_SDK.getRoominfo = s.get,
                VHALL_SDK.getUserinfo = a.get,
                VHALL_SDK.vhall_get_live_history_chat_msg = function (t) {
                    c.getLiveChatMsg(t)
                },
                VHALL_SDK.vhall_get_live_history_question_msg = function (t) {
                    c.getQuestionlist(t)
                },
                VHALL_SDK.vhall_get_history_question_msg = function (t) {
                    c.getHistoryQuestionlist(t)
                },
                VHALL_SDK.vhall_get_record_history_chat_msg = function (t) {
                    c.getRecordChatMsg(t)
                },
                VHALL_SDK.vhall_get_history_notice = function (t) {
                    c.getNotice(t)
                },
                VHALL_SDK.sendSign = function (t) {
                    if (!t) return n.trigger("sendSign", {
                        code: 1e4,
                        msg: p[1e4]
                    }) && !1;
                    var e = a.get();
                    return "1" == e.is_kickout ? n.trigger("sendSign", {
                        code: 10007,
                        msg: p[10007]
                    }) && !1 : 1 != VHALL_SDK.getRoominfo().type ? n.trigger("sendSign", {
                        code: 10005,
                        msg: p[10005]
                    }) && !1 : void a.sendSign(t)
                },
                VHALL_SDK.updateUserInfo = function (t) {
                    return !t || t.length > 30 ? n.trigger("UpdateUser", {
                        code: 1e4,
                        msg: p[1e4]
                    }) && !1 : void a.updateUserInfo(t)
                },
                VHALL_SDK.sendCustomEvent = function (t) {
                    return t && h(t) ? JSON.stringify(t).length > 200 ? n.trigger("sendCustomEvent", {
                        code: 50403,
                        msg: p[50403]
                    }) && !1 : 1 != VHALL_SDK.getRoominfo().type ? n.trigger("sendCustomEvent", {
                        code: 10005,
                        msg: p[10005]
                    }) && !1 : void l.sendCustomEvent(t) : n.trigger("sendCustomEvent", {
                        code: 1e4,
                        msg: p[1e4]
                    }) && !1
                },
                VHALL_SDK.sendChat = function (t) {
                    if (!i("sendChat", t)) return !1;
                    var e = a.get();
                    if ("1" != e.is_gag && 1 != e.forbidchat) if (1 == VHALL_SDK.getRoominfo().type) l.sendChat(t);
                    else {
                        var o = new Date,
                            r = o.getHours() < 10 ? "0" + o.getHours() : o.getHours(),
                            n = o.getMinutes() < 10 ? "0" + o.getMinutes() : o.getMinutes(),
                            s = r + ":" + n;
                        c.sendRecordChat({
                            content: t.text,
                            webinar_id: VHALL_SDK.options.roomid,
                            nick_name: e.username,
                            user_id: e.userid,
                            avatar: e.avatar,
                            role: e.role,
                            user_name: e.username,
                            time: s
                        })
                    }
                    return {
                        avatar: e.avatar,
                        content: d(t.text),
                        user_name: e.username,
                        user_id: e.userid,
                        role: e.role
                    }
                },
                VHALL_SDK.sendQuestion = function (t) {
                    if (!i("sendQuestion", t)) return !1;
                    if (1 != VHALL_SDK.getRoominfo().type) return n.trigger("sendQuestion", {
                        code: 10005,
                        msg: p[10005]
                    }) && !1;
                    if (1 != VHALL_SDK.getRoominfo().openQuestion) return n.trigger("sendQuestion", {
                        code: 10006,
                        msg: p[10006]
                    }) && !1;
                    var e = a.get();
                    "1" != e.is_gag && 1 != e.forbidchat && l.sendQuestion(t.text);
                    var o = new Date;
                    return o = (o.getHours() > 9 ? o.getHours() : "0" + o.getHours()) + ":" + (o.getMinutes() > 9 ? o.getMinutes() : "0" + o.getMinutes()),
                        {
                            avatar: e.avatar,
                            data: {
                                content: d(t.text),
                                created_at: o,
                                join_id: e.userid,
                                nick_name: e.username
                            }
                        }
                },
                VHALL_SDK.sendQuestionPagerAnswer = function (t) {
                    g.sendQuestionPager(t)
                },
                VHALL_SDK.player = u
        },
        function (t, e, o) {
            function i(t, e) {
                for (var o = 0; o < t.length; o++) {
                    var i = t[o],
                        r = h[i.id];
                    if (r) {
                        r.refs++;
                        for (var n = 0; n < r.parts.length; n++) r.parts[n](i.parts[n]);
                        for (; n < i.parts.length; n++) r.parts.push(l(i.parts[n], e))
                    } else {
                        for (var s = [], n = 0; n < i.parts.length; n++) s.push(l(i.parts[n], e));
                        h[i.id] = {
                            id: i.id,
                            refs: 1,
                            parts: s
                        }
                    }
                }
            }

            function r(t) {
                for (var e = [], o = {},
                         i = 0; i < t.length; i++) {
                    var r = t[i],
                        n = r[0],
                        s = r[1],
                        a = r[2],
                        c = r[3],
                        l = {
                            css: s,
                            media: a,
                            sourceMap: c
                        };
                    o[n] ? o[n].parts.push(l) : e.push(o[n] = {
                        id: n,
                        parts: [l]
                    })
                }
                return e
            }

            function n(t, e) {
                var o = v(),
                    i = _[_.length - 1];
                if ("top" === t.insertAt) i ? i.nextSibling ? o.insertBefore(e, i.nextSibling) : o.appendChild(e) : o.insertBefore(e, o.firstChild),
                    _.push(e);
                else {
                    if ("bottom" !== t.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
                    o.appendChild(e)
                }
            }

            function s(t) {
                t.parentNode.removeChild(t);
                var e = _.indexOf(t);
                e >= 0 && _.splice(e, 1)
            }

            function a(t) {
                var e = document.createElement("style");
                return e.type = "text/css",
                    n(t, e),
                    e
            }

            function c(t) {
                var e = document.createElement("link");
                return e.rel = "stylesheet",
                    n(t, e),
                    e
            }

            function l(t, e) {
                var o, i, r;
                if (e.singleton) {
                    var n = m++;
                    o = y || (y = a(e)),
                        i = d.bind(null, o, n, !1),
                        r = d.bind(null, o, n, !0)
                } else t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (o = c(e), i = u.bind(null, o), r = function () {
                    s(o),
                    o.href && URL.revokeObjectURL(o.href)
                }) : (o = a(e), i = p.bind(null, o), r = function () {
                    s(o)
                });
                return i(t),
                    function (e) {
                        if (e) {
                            if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                            i(t = e)
                        } else r()
                    }
            }

            function d(t, e, o, i) {
                var r = o ? "" : i.css;
                if (t.styleSheet) t.styleSheet.cssText = L(e, r);
                else {
                    var n = document.createTextNode(r),
                        s = t.childNodes;
                    s[e] && t.removeChild(s[e]),
                        s.length ? t.insertBefore(n, s[e]) : t.appendChild(n)
                }
            }

            function p(t, e) {
                var o = e.css,
                    i = e.media;
                if (i && t.setAttribute("media", i), t.styleSheet) t.styleSheet.cssText = o;
                else {
                    for (; t.firstChild;) t.removeChild(t.firstChild);
                    t.appendChild(document.createTextNode(o))
                }
            }

            function u(t, e) {
                var o = e.css,
                    i = e.sourceMap;
                i && (o += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
                var r = new Blob([o], {
                        type: "text/css"
                    }),
                    n = t.href;
                t.href = URL.createObjectURL(r),
                n && URL.revokeObjectURL(n)
            }

            var h = {},
                f = function (t) {
                    var e;
                    return function () {
                        return "undefined" == typeof e && (e = t.apply(this, arguments)),
                            e
                    }
                },
                g = f(function () {
                    return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
                }),
                v = f(function () {
                    return document.head || document.getElementsByTagName("head")[0]
                }),
                y = null,
                m = 0,
                _ = [];
            t.exports = function (t, e) {
                e = e || {},
                "undefined" == typeof e.singleton && (e.singleton = g()),
                "undefined" == typeof e.insertAt && (e.insertAt = "bottom");
                var o = r(t);
                return i(o, e),
                    function (t) {
                        for (var n = [], s = 0; s < o.length; s++) {
                            var a = o[s],
                                c = h[a.id];
                            c.refs--,
                                n.push(c)
                        }
                        if (t) {
                            var l = r(t);
                            i(l, e)
                        }
                        for (var s = 0; s < n.length; s++) {
                            var c = n[s];
                            if (0 === c.refs) {
                                for (var d = 0; d < c.parts.length; d++) c.parts[d]();
                                delete h[c.id]
                            }
                        }
                    }
            };
            var L = function () {
                var t = [];
                return function (e, o) {
                    return t[e] = o,
                        t.filter(Boolean).join("\n")
                }
            }()
        },
        function (t, e, o) {
            var i = o(15);
            "string" == typeof i && (i = [[t.id, i, ""]]);
            o(27)(i, {});
            i.locals && (t.exports = i.locals)
        }]);