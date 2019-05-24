(function () {
    var userId = utilFnModule.getRequest().userId;
    var userToken = utilFnModule.getRequest().token;
    var code = utilFnModule.getRequest().code;
    var BASIC_NUM = 3;
    function AddTeamModule() {


    }

    AddTeamModule.prototype = {

        init: function () {
            this.getTeamInfo();
            this.choseMemberIndentity();
            this.addTeam();
            this.addTeamFn();
        },

        getTeamInfo: function () {
            $.ajax({
                type: 'get',
                url: apiModule.getTeamInfoByInvitaion,
                data: {
                    invite_code: code
                },
                success: function (res) {
                    if (res.errNo === 0) {
                        var team = res.data;
                        $('.team_name').html('"' + team.team_name + '"');
                        $('.companyMember_all').html(team.enterprisemember_all_number);
                        if(team.supermember_all_number){
                            $('.superMember_all').html(team.supermember_all_number);
                        }else{
                            $('.member_item').eq(1).hide();
                        }
                       
                        $('.Member_all').html(team.member_all_number);

                        $('.companyMember_used').html(team.enterprisemember_all_number - team.enterprisemember_number);
                        $('.superMember_used').html(team.supermember_all_number - team.supermember_number);
                        $('.Member_used').html(team.member_all_number - team.member_number);
                        if (!team.enterprisemember_number) {
                            $('.member_item').eq(0).addClass('noUse');
                        }
                        if (!team.supermember_number) {
                            $('.member_item').eq(1).addClass('noUse');
                        }
                        if (!team.member_number) {
                            $('.member_item').eq(2).addClass('noUse');
                        }

                    }
                }
            })
        },


        // 选择会员身份
        choseMemberIndentity: function () {
            $('.member_item').on('click', function () {
                $('.member_item').each(function(){
                    $(this).removeClass('noUseActive').removeClass('choseActive')
                })
                var arr = ['company_vip', 'svip', 'vip'];
                var index = $(this).attr('data-id');
                $('.current_member_img').attr('src', './img/media_' + arr[BASIC_NUM-index] + '_equity_icon@2x.png');
                $('.current_member_info').show()
                if($(this).hasClass('noUse')){
                    $(this).addClass('choseActive').addClass('noUseActive');
                    $('.add_team_wrap button').removeClass('canSubmit');
                }else{
                    $(this).addClass('choseActive');
                    $('.add_team_wrap button').addClass('canSubmit');
                    $('.member_type_wrap').attr('data-index',index)
                }
            })
        },

        // 加入团队
        addTeam: function(){
            $('.add_team_wrap button').on('click', function () {
                if ($(this).hasClass('canSubmit')) {
                    $('.sure_model').show();
                }
            })
        },

        // 真正加入团队
        addTeamFn: function(){
            var self = this;
            $('.handle_sure').on('click', function () {
                var type = $('.member_type_wrap').attr('data-index');
                $.ajax({
                    type: 'get',
                    url: apiModule.addTeam,
                    data: {
                        access_token: token,
                        code: code,
                        user_id: userId,
                        member_type:type
                    },
                    success: function(res){
                        if(res.errNo === 0){
                            var state = res.data.state;
                            if(state){
                                window.location.href = 'invitaionSucc.html'
                            }else{
                                Component.Toast.init({
                                    con: res.data.info
                                })
                            }
                        }else{
                            Component.Toast.init({
                                con: res.data.info
                            })  
                        }
                    },
                    error: function(){
                        Component.Toast.init({
                            con: '哎呀，网络不好啦'
                        })
                        return false;
                    }
                })
            })

            $('.handle_cancel,.shade').on('click', function () {
                $('.sure_model').hide();
            })
        }
    }




    new AddTeamModule().init()
})()