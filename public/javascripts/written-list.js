$(".media-body a").mouseenter(function() {
    $(this).find(".fas").css("margin-left", "20px");
    $(this).find(".written-title").css("color", "#b8cef6");
    $(this).find(".written-title").css("opacity", "0.75px");

});

$(".media-body a").mouseleave(function() {
    $(this).find(".fas").css("margin-left", "10px");
    $(this).find(".written-title").css("color", "black");
    $(this).find(".written-title").css("opacity", "1px");
});


$("a.no-results").mouseenter(function() {
    $(this).find(".fas").css("margin-left", "20px");
});

$("a.no-results").mouseleave(function() {
    $(this).find(".fas").css("margin-left", "10px");
});