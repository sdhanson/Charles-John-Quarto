$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(".media.right").mouseenter(function() {
    $(this).find(".container img").css("opacity", "0.75");
    $(this).find(".container img").css("color", "rgba(0, 0, 0, 0.75)");
    $(this).find(".fas").css("margin-left", "20px");
});

$(".media.right").mouseleave(function() {
    $(this).find(".container img").css("opacity", "1");
    $(this).find(".container img").css("color", "rgba(0, 0, 0, 1)");
    $(this).find(".fas").css("margin-left", "10px");
});

$(".media.two").mouseenter(function() {
    $(".media .container img.two").css("opacity", "0.75");
    $(".media .container img.two").css("color", "rgba(0, 0, 0, 0.75)");
    $(".fas.two").css("margin-right", "0px");
    $(".text-right-view").css("margin-right", "10px");

});

$(".media.two").mouseleave(function() {
    $(".media .container img.two").css("opacity", "1");
    $(".media .container img.two").css("color", "rgba(0, 0, 0, 1)");
    $(".fas.two").css("margin-right", "10px");
    $(".text-right-view").css("margin-right", "0px");
});

// jQuery(function($) {
//     var h1 = $("div.test-container img").height();
//     var h2 = $("div.test-container-2 img").height();
//     var h3 = $("div.test-container-3 img").height();
//     jQuery("div.test-container img, div.test-container-2 img, div.test-container-3 img").css("width", "500px");
//     $("div.test-container img").css("height", h1);
//     $("div.test-container-2 img").css("height", h2);
//     $("div.test-container-3 img").css("height", h3);
//
//     $( "div" ).scroll(function() {
//         if ($("div.test-container img").isInViewport()) {
//             $("div.test-container img").stop().animate({
//                 height: h1,
//                 width : "100%",
//             }, 50, function() {
//                 if (!($("div.test-container img").isInViewport())) {
//                     $("div.test-container img").css("width", "550px");
//                     $("div.test-container img").css("height", h1);
//                 }
//             });
//         }
//
//         if ($("div.test-container-2 img").isInViewport()) {
//             $("div.test-container-2 img").stop().animate({
//                 height: h2,
//                 width : "100%",
//             }, 50, function() {
//                 if (!($("div.test-container-2 img").isInViewport())) {
//                     $("div.test-container-2 img").css("width", "550px");
//                     $("div.test-container-2 img").css("height", h2);
//                 }
//             });
//         }
//
//         if ($("div.test-container-3 img").isInViewport()) {
//             $("div.test-container-3 img").stop().animate({
//                 height: h3,
//                 width : "100%",
//             }, 50, function() {
//                 if (!($("div.test-container-3 img").isInViewport())) {
//                     $("div.test-container-3 img").css("width", "550px");
//                     $("div.test-container-2 img").css("height", h3);
//                 }
//             });
//         }
//         //
//         // if ($("div.test-container-2 img").isInViewport()) {
//         //     $("div.test-container-2 img").animate({
//         //         height: h2,
//         //         width : "100%",
//         //     }, 1000);
//         // }
//         //
//         // if ($("div.test-container-3 img").isInViewport()) {
//         //     $("div.test-container-3 img").animate({
//         //         height: h3,
//         //         width : "100%",
//         //     }, 1000);
//         // }
//     });
// })(jQuery);

//
// $(".shop").mouseleave(function() {
//     $(this).find(".fas").css("margin-left", "10px");
// });