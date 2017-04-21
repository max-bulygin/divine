//=require ../third-party/jquery/dist/jquery.min.js
//=require ../third-party/owl.carousel/dist/owl.carousel.min.js
//=require ../third-party/scrollreveal/dist/scrollreveal.min.js
//=require ../third-party/backgroundVideo/dist/backgroundVideo.js
//=require ../third-party/parallax/deploy/jquery.parallax.min.js

// MENU

var $menuToggle = $('#menu_toggle');
var $menu = $('#main_menu');
var $menuCloseDesk = $('.close_menu');

$menuToggle.on('click', function () {
    $menu.addClass('active');
});

$menuCloseDesk.on('click', function () {
    $menu.removeClass('active');
});

var $mainChild = $('.main .child');
var $mainParent = $('.main .parent');
var $cloneChild = $('.clone .child');
var $trigger = $mainChild.parent();
$trigger.attr('data-expandable', 'true');

if (matchMedia) {
    var mq = window.matchMedia("(min-width: 1200px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
}

// media query change
var doneOnce;

function WidthChange(mq) {
    if (mq.matches) {
        // window width is at least 1200px
        if(!doneOnce) {
            doneOnce = true;
            $mainChild.children().clone().appendTo($cloneChild);
        }

    } else {

        $trigger.on('click', function(){
            $(this).parent().addClass("inactive");
        });

        $('#back').on('click', function(e){
            e.stopPropagation();
            $mainParent.removeClass("inactive");
        });

        // $(document).on("click", function(event){
        //     if($menuToggle !== event.target && !$menuToggle.has(event.target).length){
        //         $menu.removeClass('active');
        //     }
        // });
    }

}

var $searchOpen = $('#search_toggle');
var $searchClose = $('#search_close');
var $formSearch = $('#head_search');

$searchOpen.on('click', function () {
    $formSearch.toggleClass('active').animate({top: '122px'});
});

$searchClose.on('click', function () {
    $formSearch.toggleClass('active').animate({top: '-9999px'});
});

// DESTINATIONS

$( document ).ready(function() {
    var owl = $('.dest');
    owl.owlCarousel({
        loop: true,
        center: true,
        stagePadding: 12,
        autoplay: false,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            980: {
                items: 3
            },
            1400: {
                items: 5
            }
        }
    });

// Change bg for section

    $destBg = $('.dest_bg');

    function revealBg() {
        $imgSrc = $('.owl-item.center img').attr('src');
        $destBg.css('background-image', 'url("' + $imgSrc + '")');
    }

    owl.on('initialized.owl.carousel', revealBg());
    owl.on('translated.owl.carousel', revealBg);

// Control hover slide change

    var $right = $('.hover_control_right');
    var $left = $('.hover_control_left');
    var intID;

    $right.on('mouseover', function () {
        intID = setInterval(function () {
            owl.trigger('next.owl.carousel', [300]);
        }, 1000);
    });

    function stop(int) {
        clearInterval(int);
    }

    $right.on('mouseout', function () {
        stop(intID);
    });

    $left.on('mouseover', function () {
        intID = setInterval(function () {
            owl.trigger('prev.owl.carousel', [300]);
        }, 1000);
    });
    $left.on('mouseout', function () {
        stop(intID);
    });

// RENT VILLAS

    var $rent = $('.non_loop_rent');

    $rent.owlCarousel({
        items: 1,
        loop: false,
        margin: 10,
        responsive: {
            640: {
                items: 2,
                autoWidth: true
            },
            1200: {
                items: 1,
                autoWidth: true,
                margin: 40
            }
        },
        onInitialized: rentCallback,
        onTranslated: updNumRent
    });

    var $rentPrev = $('#rentPrev');
    var $rentNext = $('#rentNext');
    var $rentAllNum = $('#rentAllNum');
    var $rentCurNum = $('#rentCurNum');

    function rentCallback(event) {
        $( document ).ready(function () {
            $rentAllNum.text(' / ' + event.item.count + ' villas');
            $rentCurNum.text(event.item.index + 1);
        })
    }

    function updNumRent(event) {
        $( document ).ready(function () {
            $rentCurNum.text(event.item.index + 1);
        })
    }

    $rentPrev.on('click', function () {
        $rent.trigger('prev.owl.carousel', [300]);
    });

    $rentNext.on('click', function () {
        $rent.trigger('next.owl.carousel', [300]);
    });


// BUY VILLAS

    var $buy = $('.non_loop_buy');

    $buy.owlCarousel({
        items: 1,
        loop: false,
        margin: 10,
        rtl: true,
        responsive: {
            640: {
                items: 2,
                autoWidth: true
            },
            1200: {
                items: 1,
                autoWidth: true,
                margin: 40
            }
        },
        onInitialized: buyCallback,
        onTranslated: updNum
    });

    var $buyPrev = $('#buyPrev');
    var $buyNext = $('#buyNext');
    var $buyAllNum = $('#buyAllNum');
    var $buyCurNum = $('#buyCurNum');

    function buyCallback(event) {
        $( document ).ready(function () {
            $buyAllNum.text(' / ' + event.item.count + ' villas');
            $buyCurNum.text(event.item.index + 1);
        })
    }

    function updNum(event) {
        $( document ).ready(function () {
            $buyCurNum.text(event.item.index + 1);
        })
    }

    $buyPrev.on('click', function () {
        $buy.trigger('prev.owl.carousel', [300]);
    });

    $buyNext.on('click', function () {
        $buy.trigger('next.owl.carousel', [300]);
    });
});



// SCROLLREVEAL

window.sr = ScrollReveal({
    viewFactor: 0.8,
    duration: 500,
    delay: 300,
    reset: true
});
sr.reveal('h2');
sr.reveal('#reasons li');
sr.reveal('.wf', {delay:200, viewFactor: 0.2});
sr.reveal('.city', {delay:400});
sr.reveal('.mountain');
sr.reveal('.ski');
sr.reveal('.first_rent', {
    origin: 'right',
    distance: '300px',
    delay: 0,
    viewFactor: 0.2
});
sr.reveal('.first_buy', {
    origin: 'left',
    distance: '300px',
    delay: 0,
    viewFactor: 0.2
});

// PARALLAX

// $('#destinations').parallax();
$('.more_links').parallax('enable');

// VIDEO PARALLAX

var backgroundVideo = new BackgroundVideo('.bv-video', {
    src: [
        'video/night.mp4',
        'video/night.webm'
    ]
});

// DROPDOWN

$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select_hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select_styled"></div>');

    var $styledSelect = $this.next('div.select_styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select_options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');
    var $disabled = $list.children('li[rel="disabled"]');

    $styledSelect.not($disabled).click(function(e) {
        e.stopPropagation();
        $('div.select_styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select_options').hide();
        });
        $(this).toggleClass('active').next('ul.select_options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        if ($(this).text() === $disabled.text()) return;
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});
