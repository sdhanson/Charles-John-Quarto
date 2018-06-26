// links in the grid that is clicked to the modal / carousel media
$(".photo-link").click(function() {
    $(".modal-container img").attr("src", $(this).find("img").attr("src"));
    $(".media-body h2.title").text($(this).find(".photo-overlay .photo-overlay-text .title").text());
    $(".media-body div.location").text($(this).find(".photo-overlay .photo-overlay-text .location").text());
    $(".media-body div.photographer").text($(this).find(".photo-overlay .photo-overlay-text .photographer").text());
    $(".media-body div.description").text($(this).find(".photo-overlay .photo-overlay-text .description").text());

});

