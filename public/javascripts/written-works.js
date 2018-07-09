$(".media-body p a").mouseenter(function() {
    $(this).find(".fas").css("margin-left", "20px");

});

$(".media-body p a").mouseleave(function() {
    $(this).find(".fas").css("margin-left", "10px");
});