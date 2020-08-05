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
                    console.log(result["message"]); //请求成功后的回调方法，进行数据赋值、显示等操作
                },
                error: function (errorMsg){
                    console.log("请求失败");// 请求失败
                }
            });
    });
}


$(function () {
    var auth = new Auth();
    auth.run();
})












