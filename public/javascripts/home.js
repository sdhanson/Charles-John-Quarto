$(document).ready(function() {

        $('.hideme').each( function(i){

            var bottom_of_object = $(this).offset().top + $(this).outerHeight();

            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if( bottom_of_window > bottom_of_object ){
                $(this).addClass("active").fadeIn();
            }
        });
});

$(".loaded-quote").on("mouseenter", function() {
    $("img").attr("src", "images/tree.jpeg");
    $("nav").hide().removeClass("invisible").fadeIn();
    $("#loaded-title").hide().removeClass("invisible").fadeIn();
    $(".loaded-quote").addClass("invisible");
});

$("#loaded-title").on("mouseenter", function() {
    $("#loaded-title").addClass("invisible");
    $(".loaded-quote").removeClass("invisible");
});

$("#loaded-title").on("mouseleave", function() {
    $("#loaded-title").addClass("invisible");
    $(".loaded-quote").removeClass("invisible");
});