(function ($) {

    //Tabs
    $('ul.tab-list > li > a').on('click',function () {
       if(!$(this).hasClass('active')){
           $('.tab-item').removeClass('active');
           $(this).parent().addClass('active');
           $(this).parent().find('.navbar-nav > li > a').removeClass('active');
           $(this).parent().find('.navbar-nav > li > a').first().addClass('active');
           var $id = $(this).attr('href');
           $('.tab-content').removeClass('active');
           $($id).addClass('active');
       }
    });

    //OnePage Scroll
    $(window).on("scroll", function () {
        var scrollPos = $(document).scrollTop();
        $(".onepage-navigation").each(function () {
            var $this = $(this);
            $this.find("li > a").each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.offset().top - 200 <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
                    $this.find("li > a").removeClass("active");
                    currLink.addClass("active");
                }
            });
        });
    });

}(jQuery));