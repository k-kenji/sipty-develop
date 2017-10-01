(function($) {
    $(function() {
        $(window).resize(function(){
            //windowの幅をxに代入
            var w = $(window).width();
            if(w <= 640) {
                $(".header").addClass("none");
                $("#top-head").removeClass("none");
            }
            });
            
        // var $header = $('.header');
        // // Nav Toggle Button
        // $('#nav-toggle').click(function(){
        //     $header.toggleClass('open');
        // });
    });
})(jQuery);