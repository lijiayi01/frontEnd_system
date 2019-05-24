(function () {
    var userId = utilFnModule.getRequest().userId;
    var userToken = utilFnModule.getRequest().token;
    var TeamId = utilFnModule.getRequest().TeamId;

    function ApplyReceiptModule() {
        

    }

    ApplyReceiptModule.prototype = {

        init: function () {
            this.initUI();
            this.getApplyStatus();
            this.input();
            this.clearInput();
            this.applyHandle();
        },

        initUI: function () {

        },

        // 判断用户是否已经提交过申请
        getApplyStatus: function () {
            var self = this;
            $.ajax({
                type: 'get',
                url: apiModule.getReceiptRecord,
                data: {
                    access_token: token,
                    token: userToken,
                    team_id: TeamId,
                    user_id: userId
                },
                success: function (res) {
                    if (res.errNo === 0) {
                        if('data' in res){
                            var data = res.data.invoice;
                            $('#receipt_code').val(data.title).prop('disabled', true);
                            $('#tax_code').val(data.tax_id).prop('disabled', true);
                            $('#address_reg').val(data.registered_address).prop('disabled', true);
                            $('#contact_tel').val(data.registered_landline).prop('disabled', true);
                            $('#bank_info').val(data.bank_name).prop('disabled', true);
                            $('#bank_num').val(data.bank_account).prop('disabled', true);
    
                            $('#receive_person').val(data.recipient_name).prop('disabled', true);
                            $('#receive_tel').val(data.recipient_phone).prop('disabled', true);
                            $('#receive_address').val(data.recipient_address).prop('disabled', true);
                            $('.create_team_wrap').hide();
                            $('.tips').show();
    
                        }else{
                        }
                       
                       

                        

                        
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

            this.inputUtilFn($('#receipt_code'));
            this.inputUtilFn($('#tax_code'));
            this.inputUtilFn($('#address_reg'));
            this.inputUtilFn($('#contact_tel'));
            this.inputUtilFn($('#bank_info'));
            this.inputUtilFn($('#bank_num'));
            this.inputUtilFn($('#receive_person'));
            this.inputUtilFn($('#receive_tel'));
            this.inputUtilFn($('#receive_address'));

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

        // 判断是否可以申请
        canCreateFlag: function () {
            var receipt_code = !!$('#receipt_code').val().length;
            var tax_code = !!$('#tax_code').val().length;
            var address_reg = !!$('#address_reg').val().length;
            var contact_tel = !!$('#contact_tel').val().length;

            var bank_info = !!$('#bank_info').val().length;
            var bank_num = !!$('#bank_num').val().length;
            var receive_person = !!$('#receive_person').val().length;
            var receive_tel = !!$('#receive_tel').val().length;
            var receive_address = !!$('#receive_address').val().length;


            if ( receipt_code && tax_code && address_reg && contact_tel && bank_info && bank_num && receive_person && receive_tel && receive_address ) {
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
                    var title =   $('#receipt_code').val();
                    var tax_id =  $('#tax_code').val();
                    var registered_address = $('#address_reg').val();
                    var registered_landline =$('#contact_tel').val();
                    var bank_name =$('#bank_info').val();
                    var bank_account =$('#bank_num').val();
                    var recipient_name =$('#receive_person').val();
                    var recipient_phone =$('#receive_tel').val();
                    var recipient_address = $('#receive_address').val();
                    var data= {
                        access_token: token,
                        user_id: userId,
                        token: userToken,
                        team_id: TeamId,
                        title: title,
                        tax_id: tax_id,
                        registered_address: registered_address,
                        registered_landline: registered_landline,
                        bank_name: bank_name,
                        bank_account: bank_account,
                        recipient_name: recipient_name,
                        recipient_phone: recipient_phone,
                        recipient_address: recipient_address
                    }
                    var url = apiModule.submitReceiptInfo;
                    self.commmonAjaxFn(url,data, function(){
                        window.location.href = 'receiptSucc.html'
                    })


                }
            })

        },

        // input 判断:写个公用方法
        inputUtilFn: function (inputEle) {
            var self = this;
            inputEle.on('input', function () {
                var el = $(this)
                var val = $(this).val();
               
                if (val.length) {
                    inputEle.siblings('.close_icon').show();
                  
                    if(el.hasClass('band_info')){
                        el.val(val.replace(/[^0-9]+/,'').slice(0,19))
                    }

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
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                success: function (res) {
                    var res = typeof res === 'string' ? JSON.parse(res) : res;
                    if (res.errNo === 0) {
                        callback(res);

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
                    return false;
                }
            })
        }

    }





    new ApplyReceiptModule().init();

})()