$(".media.one").mouseenter(function() {
    $(".media .container img.one").css("opacity", "0.75");
    $(".media .container img.one").css("color", "rgba(0, 0, 0, 0.75)");
    $(".fas.one").css("margin-left", "20px");
});

$(".media.one").mouseleave(function() {
    $(".media .container img.one").css("opacity", "1");
    $(".media .container img.one").css("color", "rgba(0, 0, 0, 1)");
    $(".fas.one").css("margin-left", "10px");
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

$(".media.three").mouseenter(function() {
    $(".media .container img.three").css("opacity", "0.75");
    $(".media .container img.three").css("color", "rgba(0, 0, 0, 0.75)");
    $(".fas.three").css("margin-left", "20px");
});

$(".media.three").mouseleave(function() {
    $(".media .container img.three").css("opacity", "1");
    $(".media .container img.three").css("color", "rgba(0, 0, 0, 1)");
    $(".fas.three").css("margin-left", "10px");
});