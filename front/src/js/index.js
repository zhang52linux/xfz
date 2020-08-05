function Banner() {
    this.BannerWidth = 870;
    this.bannerGroup = $("#bannerGroup");
    this.leftArrow = $(".left-arrow");
    this.rightArrow = $(".right-arrow");
    this.total = $("#banner-ul > li").length;
    this.liList = $("#banner-ul").children("li");
    this.banner = $("#banner-ul");
    this.pageControl = $(".page-control");
    this.index = 1;
    this.listenBannerHover();
}

Banner.prototype.animate = function() {
    var self = this;
    self.banner.animate({"left":-870*self.index},500);
    var index = self.index;
    if(index === 0){
        index = self.total - 1;
    }else if(index === self.total + 1){
        index = 0;
    }else{
        index = self.index - 1;
    }
    self.pageControl.children("li").eq(index).addClass("active").siblings().removeClass("active");
}

Banner.prototype.initBanner = function() {
    var self = this;
    var firstBanner = self.liList.eq(0).clone();
    var lastBanner = self.liList.eq(self.total - 1).clone();
    self.banner.append(firstBanner);
    self.banner.prepend(lastBanner);
    self.banner.css({"width":self.BannerWidth*(self.total+2),"left":-self.BannerWidth});
}

Banner.prototype.initPageControl = function() {
    var self = this;
    var pageControl = $(".page-control");
    pageControl.css({"width":30*self.total});
    for(var i = 0;i < self.total;i++){
        var circle = $("<li></li>");
        pageControl.append(circle);
        if(i === 0){
            circle.addClass("active");
        }
    }
}

Banner.prototype.toggleArrow = function(isShow) {
    var self = this;
    if(isShow){
        self.leftArrow.show();
        self.rightArrow.show();
    }else{
        self.leftArrow.hide();
        self.rightArrow.hide();
    }
}

Banner.prototype.loop = function() {
    var self = this;
    self.timer = setInterval(function () {
        if(self.index >= self.total + 1) {
            self.banner.css({"left":-self.BannerWidth});
            self.index = 2;
        }else{
            self.index++;
        }
        self.animate();
    },2000);
}

Banner.prototype.listenBannerHover = function() {
    var self = this;
    this.bannerGroup.hover(function () {
         clearInterval(self.timer);
         self.toggleArrow(true);
    },function () {
         self.loop();
         self.toggleArrow(false);
    })
}

Banner.prototype.listenArrowClick = function() {
    var self = this;
    self.leftArrow. click(function () {
        if (self.index === 0) {
            self.banner.css({"left":-self.BannerWidth*self.total});
            self.index = self.total - 1;
        } else {
            self.index--;
        }
        self.animate();
    });
    self.rightArrow. click(function () {
        if (self.index === self.total + 1) {
            self.banner.css({"left":-self.BannerWidth});
            self.index = 2;
        } else {
            self.index++;
        }
        self.animate();
    });
};

Banner.prototype.listenPageControl = function() {
    var self = this;
    self.pageControl.children("li").each(function (index,obj) {
        $(obj).click(function () {
            self.index = index;
            self.animate();
        })
    })
}

Banner.prototype.run = function() {
    var self = this;
    self.initBanner();
    self.loop();
    self.listenArrowClick();
    self.initPageControl();
    self.listenPageControl();
}

$(function () {
     var banner = new Banner();
     banner.run();
})


