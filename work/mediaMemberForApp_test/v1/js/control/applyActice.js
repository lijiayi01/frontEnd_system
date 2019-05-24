(function () {
    var userId = utilFnModule.getRequest().userId;
    var userToken = utilFnModule.getRequest().token;
    var code = utilFnModule.getRequest().code;
    var cid = utilFnModule.getRequest().cid;
    var orderId = utilFnModule.getRequest().orderId ;

    var ua = window.navigator.userAgent;
    var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    function ApplyActiveModule() {

        // 激活方式： 1：兑换码激活 2.对公转账
        if (code) {
            this.applyStyle = 1;
        } else if (!code && cid) {
            this.applyStyle = 2;
        }

    }

    ApplyActiveModule.prototype = {

        init: function () {
            this.initUI();
            this.getApplyStatus();
            this.input();
            this.clearInput();
            this.uploadFile();
            this.applyHandle();
        },

        initUI: function () {
            var height = $(document).height();
            if(isAndroid){
                window.onresize = function(){
                    $('#page').height(height )
                }   
            }
        },

        // 判断用户是否已经提交过申请
        getApplyStatus: function () {
            var self = this;
            if(!orderId){
                return false;
            }
            $.ajax({
                type: 'post',
                url: apiModule.getHistory,
                data: {
                    access_token: token,
                    token: userToken,
                    order_id: orderId,
                    user_id: userId
                },
                success: function (res) {
                    if (res.errNo === 0) {
                        var data = res.data;

                        // 1: 审核中  2：审核成功  3：审核失败
                        var status = data.pay_status;
                        if (status == 1) {
                            $('.check_result').html('正在审核中');
                            $('.check_proress_wrap').show();
                        } else if (status == 2) {

                        } else if (status == 3) {
                            $('.check_result').html('审核失败:'+data.remark);
                            $('.check_proress_wrap').show();
                        }
                        self.applyed = true;

                        $('#team_name').val(data.company_name).prop('disabled', true);
                        $('#bank_info').val(data.bank_account).prop('disabled', true);
                        $('#bank_text').val(data.deposit_bank).prop('disabled', true);
                        $('#team_tel').val(data.telephone).prop('disabled', true);

                        $('.upload_file_icon').attr('src', data.receipt_img_url).addClass('choseActive');;
                        $('#upload_file').prop('disabled', true);
                        $('.create_team_wrap button').html('修改').addClass('canUpdate');

                    } else {
                        // Component.Toast.init({
                        //     con: res.message
                        // })
                        // return false;
                    }
                },
                error: function () {
                    Component.Toast.init({
                        con: '哎呀，网络不好啦'
                    })
                    return false;
                }
            })

        },

        // 所有input统一处理
        input: function () {

            this.inputUtilFn($('#team_name'));
            this.inputUtilFn($('#bank_info'));
            this.inputUtilFn($('#bank_text'));
            this.inputUtilFn($('#team_tel'));

        },

        // clear input
        clearInput: function () {
            var self = this;
            $('.close_icon').on('click', function () {
                $(this).siblings('input').val('');
                $(this).hide();
                self.canCreateFlag();
            })
        },
        // 上传图片
        uploadFile: function () {
            var self = this;
            $('#upload_file').on('change', function () {
                $('#team_name').blur();
                $('#bank_info').blur();
                $('#bank_text').blur();
                $('#team_tel').blur();
                var applyed = self.applyed;
                if (applyed) {
                    self.uploaded = true;
                }
                var file = $(this)[0].files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    let result = e.target.result;
                    $('.upload_file_icon').attr('src', result).addClass('choseActive');
                    self.canCreateFlag();
                };
                reader.onerror = function () {
                    $this.uploadErr = true;
                    $this.uploadComplete = false;
                };
                reader.readAsDataURL(file);


            })
        },

        // 判断是否可以申请
        canCreateFlag: function () {
            // 头像是否选取
            var isChose = $('.upload_file_icon').hasClass('choseActive');
            // 公司名称
            var team_name = !!$('#team_name').val().length;
            // 银行账户
            var bank_num = !!$('#bank_info').val().length;
            // 开户银行
            var bank_name = !!$('#bank_text').val().length;
            // 联系电话
            var phone = !!$('#team_tel').val().length;

            if (isChose && team_name && bank_num && bank_name && phone) {
                $('.create_team_wrap button').addClass('canSubmit');
            } else {
                $('.create_team_wrap button').removeClass('canSubmit');
            }
        },

        // 提交申请
        applyHandle: function () {
            var self = this;
            $('.create_team_wrap button').on('click', function () {

                if ($(this).hasClass('canSubmit')) {
                    // 是否有申请记录
                    var url = ''
                    var applyed = self.applyed;
                    var uploaded = self.uploaded;
                    var applyStyle = self.applyStyle;
                    // 内容
                    var companyName = $('#team_name').val();
                    var bankNum = $('#bank_info').val();
                    var bankName = $('#bank_text').val();
                    var phone = $('#team_tel').val();
                    // 图片file
                    var file = $('#upload_file')[0].files[0];
                    var formData = new FormData();
                    formData.append('access_token', token);
                    formData.append('user_id', userId);
                    formData.append('token', userToken);
                    if (applyed) {
                        formData.append('order_id', orderId);
                        if (uploaded) {
                            formData.append('pic', file);
                            url = apiModule.updateHistoryImg;
                            self.commmonAjaxFn(url, formData, function () {
                                var formData = new FormData();
                                formData.append('access_token', token);
                                formData.append('user_id', userId);
                                formData.append('token', userToken);
                                formData.append('order_id', orderId);
                                formData.append('company_name', companyName);
                                formData.append('telephone', phone);
                                formData.append('bank_account', bankNum);
                                formData.append('deposit_bank', bankName);
                                var url = apiModule.updateHistoryText;
                                self.commmonAjaxFn(url, formData, function(){
                                    window.location.href = 'activeSucc.html'
                                })

                            })
                        } else {
                            formData.append('company_name', companyName);
                            formData.append('telephone', phone);
                            formData.append('bank_account', bankNum);
                            formData.append('deposit_bank', bankName);
                            url = apiModule.updateHistoryText;
                            console.log(formData)
                            self.commmonAjaxFn(url, formData, function(){
                                window.location.href = 'activeSucc.html'
                            })
                        }
                    } else {
                        formData.append('company_name', companyName);
                        formData.append('telephone', phone);
                        formData.append('bank_account', bankNum);
                        formData.append('deposit_bank', bankName);
                        formData.append('pic', file);
                        if (applyStyle == 1) {
                            formData.append('voucher_code', code);
                            url = apiModule.activeByCode;
                            self.commmonAjaxFn(url, formData, function(){
                                window.location.href = 'activeSucc.html'
                            })
                        } else {
                            formData.append('goods_id', cid);
                            url = apiModule.activeByEditInfo;
                            self.commmonAjaxFn(url, formData, function(){
                                window.location.href = 'activeSucc.html'
                            })
                        }
                    }
                }

                // 可修改
                if ($(this).hasClass('canUpdate')) {
                    $('#team_name').prop('disabled', false);
                    $('#bank_info').prop('disabled', false);
                    $('#bank_text').prop('disabled', false);
                    $('#team_tel').prop('disabled', false);
                    $('#upload_file').prop('disabled', false);
                    $(this).addClass('canSubmit').removeClass('canUpdate');
                    $(this).html('提交申请');
                    $('#team_name').focus();
                }
            })

        },

        // input 判断:写个公用方法
        inputUtilFn: function (inputEle) {
            var self = this;
            inputEle.on('input', function () {
                var el = $(this)
                var val = $(this).val();
                console.log(val.length)
                if (val.length) {
                    inputEle.siblings('.close_icon').show();
                    if(el.hasClass('band_info')){
                        el.val(val.replace(/[^0-9]+/,'').slice(0,19))
                    }else if(el.hasClass('tel_info')){
                        el.val(val.slice(0,20))
                    }
                    // if(val.length > 19){
                       
                    // }

                } else {
                    inputEle.siblings('.close_icon').hide();
                }
                self.canCreateFlag();
            })
        },

        // 修改编辑公共ajax
        commmonAjaxFn: function (url, data, callback) {
            var callback = callback ? callback : function(){};
            var self = this;
            $('.loading_model').show()
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                processData:false,
                contentType:false,
                success: function (res) {
                    var res = typeof res === 'string' ? JSON.parse(res) : res;
                    if (res.errNo === 0) {
                        $('.loading_model').hide();
                        callback();

                    } else {
                        $('.loading_model').hide();
                        Component.Toast.init({
                            con: res.message
                        })

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





    new ApplyActiveModule().init();

})()