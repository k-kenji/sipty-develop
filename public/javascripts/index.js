(function($) {
    $(function() {
        $(".menu-trigger").click(function() {
            $(this).toggleClass("active");
            $(".global-nav").toggleClass("open");
            $("nav").removeAttr('id');
        });
    });

    $(window).resize(function() {
        var w = $(window).width();
        if(w <= 640) {
            $("#container").removeClass("container");
            $("#left-container").removeClass("left-container");
            $("#description").removeClass("description");
            // $("div").toggleClass("");
        } else if(w >= 640) {
            $("#container").addClass("container");
            $("#left-container").addClass("left-container");
            $("#description").addClass("description");
        }
    });
})(jQuery);