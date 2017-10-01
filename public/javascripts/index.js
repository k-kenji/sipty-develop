(function($) {
    $(function() {
        $(window).resize(function(){
            //windowの幅をxに代入
            var w = $(window).width();
            // width:640以下であればメニューをdisplaynoneに設定
            if(w <= 640) {
                $(".top-head").removeClass("mobile-none");
            }
            });
    });
})(jQuery);