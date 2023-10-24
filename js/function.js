(function ($) {

    'use strict'

    $(document).ready(function () {

        /* ===================================
            Loading Timeout
        ====================================== */

        setTimeout(function(){
            $('.preloader-wrapper').fadeOut();
        }, 2000);

        /* ===================================
            Page Transition
        ====================================== */
        let pt = $('.subpages');
        pt[0] && PageTransitions.init({menu: 'ul.navbar-nav'})

    });

    /* ===================================
            Counter
        ====================================== */
        $('.count').each(function () {
            $(this).appear(function () {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        });

    /* ===================================
            Progress Bar
      ====================================== */
    $('.progress-item').each(function () {
        $(this).appear(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).find('.progress-bar-count').text()
            }, {
                duration: 3000,
                easing: 'swing',
                step: function (now) {
                    $(this).find('.progress-bar-count').text(Math.ceil(now));
                    $(this).find('.progress-bar-fill').css('width',Math.ceil(now) + '%');
                }
            });
        });
    });

    //Accordion
    $('.accordion-classic-list-item').on('click',function () {
        if(!$(this).hasClass('active')){
            var $this = $(this);
            $this.find('.accordion-classic-item-content').slideDown(300);
            $this.siblings().find('.accordion-classic-item-content').slideUp(300);
            $this.addClass('active');
            setTimeout(function () {
                $this.siblings().removeClass('active');
            },300);
        }
    });


    //Service Slider
    const serviceSlider = new Swiper('.service-slider', {
        loop: false,
        pagination: false,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            prevEl: '.service-section .slider-remote-arrow-prev',
            nextEl: '.service-section .slider-remote-arrow-next'
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 3,
            },
        }
    });

    //Testimonial Slider
    const testimonialSlider = new Swiper('.testimonial-slider', {
        loop: false,
        pagination: false,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            prevEl: '.testimonial-section .slider-remote-arrow-prev',
            nextEl: '.testimonial-section .slider-remote-arrow-next'
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 3,
            },
        }
    });

    //Contact Form
    $("#submit-btn").on('click', function (e) {
        e.preventDefault();
        //disable submit button on click
        $("#submit-btn").attr("disabled", "disabled");
        $("#submit-btn span").text('Sending');

        var user_name = $('input[name=userName]').val();
        var user_email = $('input[name=userEmail]').val();
        var user_subject = $('input[name=userSubject]').val();
        var user_phone = $('input[name=userPhone]').val();
        var user_message = $('textarea[name=userMessage]').val();

        //simple validation at client's end
        var post_data, output;
        var proceed = true;

        if (user_name === "" || user_email === "" || user_message === "" ) {
            proceed = false;
        }

        if (proceed) {

            post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userSubject': user_subject,
                'userPhone': user_phone,
                'userMessage': user_message
            };

            //Ajax post data to server
            $.post('vendor/contact-mailer.php', post_data, function (response) {

                //load json data from server and output message
                if (response.type === 'error') {
                    output = '<div class="alert alert-danger">' + response.text + '</div>';
                } else {
                    output = '<div class="alert alert-success">' + response.text + '</div>';

                    //reset values in all input fields
                    $('.contact-form input').val('');
                    $('.contact-form textarea').val('');
                }

                $("#result").hide().html(output).slideDown();

                // enable submit button on action done
                $("#submit-btn").removeAttr("disabled");
                $("#submit-btn span").text('Send Me Quotes');

            }, 'json');

        }
        else {
            output = '<div class="alert alert-danger">Please provide the missing fields.</div>';
            $("#result").hide().html(output).slideDown();

            // enable submit button on action done
            $("#submit-btn").removeAttr("disabled");
            $("#submit-btn span").text('Send Me Quotes');
        }

    });


    /* ===================================
       Side Menu
   ====================================== */
    if ($(".sidebar-menu-toggle").length) {
        $(".sidebar-menu-toggle").on("click", function () {
            $(".sidebar-menu-toggle").toggleClass("active");
            $(".side-menu-wrapper").toggleClass("side-menu-active"), $(".overlay").fadeToggle(300);
        });
        $(".overlay").on("click", function () {
            $(".sidebar-menu-toggle").removeClass("active");
            $(".side-menu-wrapper").removeClass("side-menu-active"), $(this).fadeOut(300)
        });
    }

    /* ===================================
     Typewrite Effect
     ====================================== */

    $('.typing-effect').each(function () {
       let text = $(this).data('type-text');
        new Typed($(this)[0], {
            strings: text.split(','),
            typeSpeed: 60,
            backSpeed: 30,
            loop: true
        });
    });

    /* ===================================
           Text Entrance Animation
        ====================================== */

    $('.swift-up-text').each(function () {
        var _this = $(this);
        var words = _this.text().split(' ');
        _this.html('');
        words.forEach( (el, index) => {
            words[index] = `<span><i>${words[index]}</i></span>`;
        });
        _this.html(words.join(' '));
        var children = _this.find('span > i');
        children.each(function (index) {
            $(this).css({'animation-delay': index++ * .2 + 's'});
        });
    });

    $('section:not(.pt-page) .swift-up-text').each(function () {
        $(this).appear(function () {
            $(this).find('span').css({'display':'inline-block'});
        });
    });


    /* ===================================
      Animated Cursor
   ====================================== */

    if ($("#animated-cursor").length) {

        var hide_cursor = $(".hide-cursor");
        var increase_cursor = $("a,.increase-cursor,button,.hero-fun-fact,.hero-fun-factor-circle");

        var e = {x: 0, y: 0}, t = {x: 0, y: 0}, n = .25, o = !1, a =    document.getElementById("cursor");
        TweenLite.set(a, {xPercent: -50, yPercent: -50}), document.addEventListener("mousemove", function (t) {
            a.style.display = 'block';
            var n = window.pageYOffset || document.documentElement.scrollTop;
            e.x = t.pageX, e.y = t.pageY - n
        }), TweenLite.ticker.addEventListener("tick", function () {
            o || (t.x += (e.x - t.x) * n, t.y += (e.y - t.y) * n, TweenLite.set(a, {x: t.x, y: t.y}))
        }),hide_cursor.mouseenter(function (e) {
                TweenMax.to("#cursor", .2, {borderWidth: "1px", scale: 0, opacity: 0})
        }),hide_cursor.mouseleave(function (e) {
            TweenMax.to("#cursor", .3, {borderWidth: "2px", scale: 1, opacity: 1})
        }),increase_cursor.mouseenter(function (e) {
            TweenMax.to("#cursor", .2, {
                borderWidth: "0px",
                scale: 2,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                opacity: .15
            })
        }),increase_cursor.mouseleave(function (e) {
            TweenMax.to("#cursor", .3, {
                borderWidth: "2px",
                scale: 1,
                backgroundColor: "rgba(255, 255, 255, 0)",
                opacity: 1
            })
        })

    }

    /* ===================================
          Theme Option
       ====================================== */

    var theme_option_markup = `<div class="theme-option-wrapper">
        <button class="theme-option-toggle">
            <i class="lni lni-cog" aria-hidden="true"></i>
        </button>
        <div class="theme-option-menu">
            <h4 class="title">Colors</h4>
            <ul class="theme-option-color-list">
                <li class="active" data-color="#e6e4bf" style="background-color:#e6e4bf;"></li>
                <li data-color="#C7E6BF" style="background-color:#C7E6BF;"></li>
                <li data-color="#C0BFE6" style="background-color:#C0BFE6;"></li>
                <li data-color="#28e98c" style="background-color:#28e98c;"></li>
                <li data-color="#fe6f1d" style="background-color:#fe6f1d;"></li>
                <li data-color="#e4af12" style="background-color:#e4af12;"></li>
                <li data-color="#c0c0c0" style="background-color:#c0c0c0;"></li>
                <li data-color="#ff99cc" style="background-color:#ff99cc;"></li>
                <li data-color="#75c9e9" style="background-color:#75c9e9;"></li>
            </ul>
        </div>
    </div>`;

    $('body').append(theme_option_markup);

    $('.theme-option-toggle').on('click',function (e) {
        e.preventDefault();
        $('.theme-option-wrapper').toggleClass('active');
    });

    $('.theme-option-color-list > li').on('click',function (e) {
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        let color = $(this).data('color');
        $('body').css({"--modernfolio-primary-color": color});
    });


}(jQuery));