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

$(".shop").mouseenter(function() {
    $(this).find(".fas").css("margin-left", "20px");
});

$(".shop").mouseleave(function() {
    $(this).find(".fas").css("margin-left", "10px");
});