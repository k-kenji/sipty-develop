(function($) {
    $(function() {
        var $header = $('.header');
        // Nav Toggle Button
        $('#nav-toggle').click(function(){
            $header.toggleClass('open');
        });
    });
})(jQuery);