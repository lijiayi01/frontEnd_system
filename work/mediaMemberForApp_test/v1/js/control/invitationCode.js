(function (exports) {
    var userId = utilFnModule.getRequest().userId;
    var userToken = utilFnModule.getRequest().token;
    function ExchangeCodeModule() {


    }

    ExchangeCodeModule.prototype = {

        init: function () {
            this.initSession();
            this.getUserInfo();
            this.input();
            this.clearInput();
            this.exchange();
        },

        initSession:function(){
            var exchangeVal =   sessionStorage.getItem('invationCodeVal'+buff);
            if(exchangeVal){
                $('#input').val(exchangeVal);
                $('.add_team_wrap button').addClass('canSubmit');
            }
        },

        getUserInfo: function () {
            var self = this;
            if (userId) {
                self.isLogin = true
                $.ajax({
                    type: 'get',
                    url: apiModule.getUserInfo,
                    data: {
                        access_token: token,
                        token: userToken,
                        user_id: userId
                    },
                    success: function (res) {
                        if (res.errNo === 0) {
                            var data = res.data;
                            // 判断用户是否是融媒体会员
                            var isMediaMember = !!data.rmt_state;
                            self.isMediaMember = isMediaMember;
                            var mediaProgress = data.rmt_state;
                            // 判断用户是否绑定手机号
                            var isBindPhone = !!Number(data.cellphone_number);
                            self.isBindPhone = isBindPhone;

                            // 判断用户是否是会员
                            var isMember = data.is_member || data.is_super_member || data.is_company_member;
                            self.isMember = isMember



                        }
                    }
                })
            } else {
                self.isLogin = false
            }

        },

        // input
        input: function(){
            $('#input').on('input', function(){
                var val = $(this).val();
                sessionStorage.setItem('invationCodeVal'+buff,val);
                if(val.length){
                    $('.add_team_wrap button').addClass('canSubmit');
                    $('.clear_input_icon').show()
                }else{
                    $('.add_team_wrap button').removeClass('canSubmit');
                    $('.clear_input_icon').hide()
                }

            })  
        },

        // clear input
        clearInput: function(){

            $('.clear_input_icon').on('click', function(){
                $('#input').val('');
                $(this).hide();
                $('.add_team_wrap button').removeClass('canSubmit');
            })
        },

        exchange: function(){
            var self = this;
            $('.add_team_wrap button').on('click', function(){
                if($(this).hasClass('canSubmit')){
                    var isLogin = self.isLogin;
                    var isBindPhone = self.isBindPhone;
                    var isMember = self.isMember;
                    var isMediaMember = self.isMediaMember;
                    if(!isLogin){
                        window.location.href = 'http://meishe-app.com?command=enterLogin';
                        return false;
                    }

                    if(isMediaMember){
                        Component.Toast.init({
                            con: '您正在加入或已经是融媒体成员，不可再次加入'
                        })
                        return false;
                    }

                    // 如果属于融媒体会员团体
    
                    if(isMember){
                        Component.Toast.init({
                            con: '会员无法加入融媒体团队'
                        })
                        return false;
                    }
    
                    if(!isBindPhone){
                        window.location.href = 'http://meishe-app.com?command=bindPhone';
                        return false;
                    }

                    $.ajax({
                        type: 'get',
                        // contentType: 'application/json; charset=utf-8',
                        // dataType: 'json',
                        url: apiModule.checkInvitationCode,
                        data:{
                            access_token: token,
                            code: $('#input').val()
                        },
                        success: function(res){
                            if(res.errNo == 0){
                                var validity = res.data.state;
                                // 有效
                                if(validity){
                                    window.location.href = 'addTeam.html?userId='+userId+'&token='+userToken+'&code='+$('#input').val();
                                }else {
                                    Component.Toast.init({
                                        con: '兑换码错误'
                                    })
                                }
                            }else {
                                Component.Toast.init({
                                    con: res.message
                                })
                                return false;
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
            })
        }
    }


    new ExchangeCodeModule().init()
})(window)


// 原生调js方法
window.APPHREF = function (userId, token) {
    window.location.replace(onlineUrl + 'invitationCode.html?userId=' + userId + '&token=' + token)
}

window.OFFLINE = function(){
    window.location.replace(onlineUrl + 'invitationCode.html')   
}