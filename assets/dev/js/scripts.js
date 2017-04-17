//=require ../third-party/jquery/dist/jquery.min.js
//=require ../third-party/owl.carousel/dist/owl.carousel.min.js
//=require ../third-party/scrollreveal/dist/scrollreveal.min.js
//=require ../third-party/vidbg/vidbg.min.js
//=require ../third-party/AniJS/dist/anijs-min.js

var owl = $('.dest');
owl.owlCarousel({
    loop:true,
    center:true,
    stagePadding: 12,
    autoplay:false,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    dots: false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        980:{
            items:3
        },
        1400:{
            items:5
        }
    }
});

var $right = $('.hover_control_right');
var $left = $('.hover_control_left');
var intID;

$right.on('mouseover',function(){
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

$left.on('mouseover',function(){
    intID = setInterval(function () {
        owl.trigger('prev.owl.carousel', [300]);
    }, 1000);
});
$left.on('mouseout',function(){
    stop(intID);
});

$('.non_loop_rent').owlCarousel({
    items:1,
    loop:false,
    margin:10,
    responsive: {
        640:{
            items:2,
            autoWidth: true
        }
    }
});

$('.non_loop_buy').owlCarousel({
    items:1,
    loop:false,
    margin:10,
    rtl: true,
    responsive: {
        640:{
            items:2,
            autoWidth: true
        },
        1200:{
            items:1,
            autoWidth: true
        }
    }
});