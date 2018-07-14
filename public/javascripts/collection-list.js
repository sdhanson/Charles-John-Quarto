$(".media a").mouseenter(function() {
    $(this).find(".collection-poem-title").css("color", "#b8cef6");
    $(this).find(".collection-poem-title").css("opacity", "0.75px");

});

$(".media a").mouseleave(function() {
    $(this).find(".collection-poem-title").css("color", "black");
    $(this).find(".collection-poem-title").css("opacity", "1px");
});