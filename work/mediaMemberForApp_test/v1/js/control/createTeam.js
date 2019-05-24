
(function (exports) {
    var userId = utilFnModule.getRequest().userId;
    var BASIC_NUM = 3;
    function CreateTeamModule() {

    }

    CreateTeamModule.prototype = {

        init: function () {
            this.cutImg();
            this.getMediaInfo();
            this.inputTeamName();
            this.clearName();
            this.choseIndentity();
            this.createTeam();
            this.currentCreateTeam();
        },

        // 获取融媒体包信息
        getMediaInfo: function () {
            $.ajax({
                type: 'get',
                url: apiModule.getMediaMemberInfo,
                data: {
                    access_token: token,
                    user_id: userId
                },
                success: function (res) {
                    if (res.errNo == 0) {
                        var data = res.data.team;
                        $('.companyMember_all').html(data.enterprisemember_all_number);
                        if(data.supermember_all_number){
                            $('.superMember_all').html(data.supermember_all_number)
                        }else{
                            $('.member_item').eq(1).hide();
                        }
                        $('.Member_all').html(data.member_all_number);
                    }
                }
            })
        },


        // 裁剪图片
        cutImg: function () {
            var self = this;
            var imgWrapper = document.querySelector('.chose_icon');
            var zxImageProcess = new ZxImageProcess({
                // 触发文件选择的元素
                selector: '.chose_icon',
                // 限制宽度缩放，则只需设置width值
                // 限制高度缩放，则只需设置height值
                // 同时设置了width、height值，则会对图片按尺寸裁剪
                width: 600,
                height: 600,
                accept: "image/*",
                submitText: '完成',
                cancelText: '取消',
                success: function (result) {
                    // 返回数据
                    console.log(result);
                    // 添加图片至目标容器
                    imgWrapper.src = result.base64;
                    imgWrapper.setAttribute('data-chose', 1);

                    self.canCreateFlag();
                    // img.style.display = '';
                    // imgWrapper.className += ' hide';
                },
                error: function (err) {
                    console.error(err);
                    if (err.code === 9 || err.code === 22) return
                }
            })
        },

        // 输入名称
        inputTeamName: function () {
            var self = this;
            $('#team_name').on('input', function () {
                var val = $(this).val();
                if (val.length) {
                    $('.clear_input_icon').show();
                } else {
                    $('.clear_input_icon').hide();
                }

                self.canCreateFlag();
            })
        },

        // 清除名称
        clearName: function () {
            var self = this;
            $('.clear_input_icon').on('click', function () {
                $('#team_name').val('');
                $(this).hide();
                self.canCreateFlag();
            })
        },

        // 选择身份
        choseIndentity: function () {
            var self = this;
            $('.member_item').on('click', function () {
                var type = $(this).attr('data-id');
                var arr = ['company_vip', 'svip', 'vip'];
                $(this).addClass('choseActive').siblings().removeClass('choseActive');
                $('.current_member_img').attr('src', './img/media_' + arr[BASIC_NUM-type] + '_equity_icon@2x.png');
                $('.current_member_info').show();

                self.memberType = type - 0;
                self.canCreateFlag();
            })
        },

        // 判断是否可以创建团队
        canCreateFlag: function () {
            // 头像是否选取
            var isChose = $('.chose_icon').attr('data-chose');
            // 团队名称
            var hasName = !!$('#team_name').val().length;
            console.log(hasName)
            // 身份选择
            var isIndentity
            $('.member_item').each(function (item) {
                if ($(this).hasClass('choseActive')) {
                    isIndentity = true;
                }
            })

            if (isChose && hasName && isIndentity) {
                $('.create_team_wrap button').addClass('canSubmit');
            } else {
                $('.create_team_wrap button').removeClass('canSubmit');
            }
        },

        // 创建团队
        createTeam: function () {
            $('.create_team_wrap button').on('click', function () {
                if ($(this).hasClass('canSubmit')) {
                    $('.sure_model').show();
                }
            })
        },

        // 真正创建团队
        currentCreateTeam: function () {
            var self = this;
            $('.handle_sure').on('click', function () {
                self.createFn();
            })

            $('.handle_cancel,.shade').on('click', function () {
                $('.sure_model').hide();
            })

        },

        createFn: function () {
            var self = this;
            var team_name = $('#team_name').val();
            var member_type = self.memberType;
            var imgtype = '';
            var pattern = /data:\w+\/(\w+);base64,/gi;
            var fileblob = $('.chose_icon').attr('src').replace(pattern, function () {
                imgtype = RegExp.$1;
                return ''
            });
            $('.sure_model').hide();
            $('.loading_model').show()
            $.ajax({
                type: 'post',
                url: apiModule.createTeam,
                data: JSON.stringify({
                    access_token: token,
                    user_id: userId,
                    fileblob: fileblob,
                    imgtype: imgtype,
                    team_name: team_name,
                    member_type: member_type
                }),
                success: function (res) {
                    if (res.errNo === 0) {
                        $('.loading_model').hide();
                        // 交互
                        window.location.href = 'http://meishe-app.com?command=createTeam'
                    } else {
                        Component.Toast.init({
                            con: res.message
                        })
                        $('.loading_model').hide();
                        return false;
                    }
                },
                error: function () {
                    $('.loading_model').hide();
                    Component.Toast.init({
                        con: '哎呀，网络不好啦'
                    })
                    return false;
                }
            })
        }

    }


    new CreateTeamModule().init();
})(window)