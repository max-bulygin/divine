//=require ../third-party/jquery/dist/jquery.min.js
//=require ../third-party/owl.carousel/dist/owl.carousel.min.js
//=require ../third-party/scrollreveal/dist/scrollreveal.min.js
//=require ../third-party/vidbg/vidbg.min.js
//=require ../third-party/parallax/deploy/jquery.parallax.min.js

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
    }
});

var $rentPrev = $('#rentPrev');
var $rentNext = $('#rentNext');

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
    }
});

var $buyPrev = $('#buyPrev');
var $buyNext = $('#buyNext');


$buyPrev.on('click', function () {
    $buy.trigger('prev.owl.carousel', [300]);
});

$buyNext.on('click', function () {
    $buy.trigger('next.owl.carousel', [300]);
});

// SCROLLREVEAL

window.sr = ScrollReveal({
    viewFactor: 0.8,
    duration: 500,
    delay: 300
});
sr.reveal('h2');
sr.reveal('#reasons li');
sr.reveal('.wf', {delay:200, viewFactor: 0.2});
sr.reveal('.city', {delay:400});
sr.reveal('.mountain');
sr.reveal('.ski');

// PARALLAX

$('#destinations').parallax();
