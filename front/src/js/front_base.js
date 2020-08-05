$(function () {
    $("#btn").click(function () {
        $(".mask-wrapper").show()
    });
    $(".close-btn").click(function () {
        $(".mask-wrapper").hide();
    });
})

$(function () {
    $(".switch_signup").click(function () {
        $(".scroll-wrapper").css({"left":-400});
    });
    $(".switch_signin").click(function () {
        $(".scroll-wrapper").css({"left":0});
    });
})

function Auth() {
    var self = this;
    self.maskWrapper = $('.mask-wrapper');

}

Auth.prototype.run = function () {
    var self = this;
    self.listenShowHideEvent();
    self.listenSigninEvent();
    self.listenImgCaptchaEvent();
    self.listenSmsCaptchaEvent();
}

Auth.prototype.showEvent = function () {
    var self = this;
    self.maskWrapper.show();
}
Auth.prototype.hideEvent = function () {
    var self = this;
    self.maskWrapper.hide();
}

Auth.prototype.listenShowHideEvent = function () {
    var self = this;
    var signinBtn = $('.signIn-btn');
    signinBtn.click(function () {
        self.showEvent();
        $(".scroll-wrapper").css({"left":0});
    });
    var signupBtn = $('.signup-btn');
    signupBtn.click(function () {
        self.showEvent();
        $(".scroll-wrapper").css({"left":-400});
    });
    var closeBtn = $('.close-btn');
    closeBtn.click(function () {
        self.hideEvent();
    });
}

function sleep(n) {
    var start = new Date().getTime();
    while (true) {
        if (new Date().getTime() - start > n) {
            break;
        }
    }
}

Auth.prototype.listenSigninEvent = function() {
    var self = this;
    var signinGroup = $(".signin-group");
    var telephoneInput = signinGroup.find("input[name='telephone']");
    var passwordInput = signinGroup.find("input[name='password']");
    var rememberInput = signinGroup.find("input[name='remember']");
    var submitBtn = signinGroup.find(".submit-btn");
    submitBtn.click(function () {
        var telephone = telephoneInput.val();
        var password = passwordInput.val();
        var remember = rememberInput.prop("checked");
        $.ajax({
                type: "post", // 请求类型（get/post）
                url: "/account/login/",
                data: {'telephone':telephone,'password':password,'remember':remember?1:0}, //post请求
                async: true, // 是否异步
                dataType: "json", // 设置数据类型
                success: function (result){
                    if(result["code"] == 200) {
                        self.hideEvent();
                        window.location.reload();
                    }else {
                        var messageObject = result["message"];
                        if(typeof messageObject == 'string' && messageObject != ""){
                            window.messageBox.show(messageObject);
                        }else {
                            var messageObject = result["data"];
                            for (var key in messageObject){
                                var messages = messageObject[key];
                                var message = messages[0];
                                window.messageBox.show(message);
                            }
                        }
                    }
                },
                error: function (error){
                    console.log(error);// 请求失败
                }
            });
    });
}

Auth.prototype.listenImgCaptchaEvent = function () {
    var imgCaptcha = $('.img-captcha');
    imgCaptcha.click(function () {
        imgCaptcha.attr("src","/account/img_captcha/"+"?random="+Math.random())
    });
};

Auth.prototype.smsSuccessEvent = function () {
    var self = this;
    messageBox.showSuccess('短信验证码发送成功！');
    self.smsCaptcha.addClass('disabled');
    var count = 10;
    self.smsCaptcha.unbind('click');
    var timer = setInterval(function () {
        self.smsCaptcha.text(count+'s');
        count -= 1;
        if(count <= 0){
            clearInterval(timer);
            self.smsCaptcha.removeClass('disabled');
            self.smsCaptcha.text('发送验证码');
            self.listenSmsCaptchaEvent();
        }
    },1000);
};

Auth.prototype.listenSmsCaptchaEvent = function () {
    var self = this;
    var smsCaptcha = $(".sms-captcha-btn");
    var telephoneInput = $(".signup-group input[name='telephone']");
    smsCaptcha.click(function () {
        var telephone = telephoneInput.val();
        if(!telephone){
            messageBox.showInfo('请输入手机号码！');
        }
        $.ajax({
            type: "get", // 请求类型（get/post）
            url: '/account/sms_captcha/',
            data:{'telephone': telephone},
            async: true, // 是否异步
            dataType: "json", // 设置数据类型
            success: function (result) {
                if(result['code'] == 200){
                    self.smsSuccessEvent();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
};


// 用来处理导航条的
function FrontBase() {}

FrontBase.prototype.run = function () {
    var self = this;
    self.listenAuthBoxHover();
    self.handleNavStatus();
};

FrontBase.prototype.listenAuthBoxHover = function () {
    var authBox = $(".auth-box");
    var userMoreBox = $(".user-more-box");
    authBox.hover(function () {
        userMoreBox.show();
    },function () {
        userMoreBox.hide();
    });
};

FrontBase.prototype.handleNavStatus = function () {
    // http://127.0.0.1:8000/payinfo/
    var url = window.location.href;
    var protocol = window.location.protocol;
    var host = window.location.host;
    // http: + // + 127.0.0.1:8000
    var domain = protocol + '//' + host;
    var path = url.replace(domain,'');
    var navLis = $(".nav li");
    navLis.each(function (index,element) {
        // js => $(js对象)
        var li = $(element);
        var aTag = li.children("a");
        var href = aTag.attr("href");
        if(href === path){
            li.addClass("active");
            return false;
        }
    });
};


$(function () {
    var auth = new Auth();
    auth.run();
})

$(function () {
    var frontBase = new FrontBase();
    frontBase.run();
});











