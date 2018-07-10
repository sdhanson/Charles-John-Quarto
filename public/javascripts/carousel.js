// links in the grid that is clicked to the modal / carousel media
$(".photo-link").click(function() {
    $(".modal-container img").attr("src", $(this).find("img").attr("src"));
    $(".media-body h2.title").text($(this).find(".photo-overlay .photo-overlay-text .title").text());
    $(".media-body div.location").text($(this).find(".photo-overlay .photo-overlay-text .location").text());
    $(".media-body div.photographer").text($(this).find(".photo-overlay .photo-overlay-text .photographer").text());
    $(".media-body div.description").text($(this).find(".photo-overlay .photo-overlay-text .description").text());
});



$(".album-link").click(function() {
    $(".modal-container img").attr("src", $(this).find("img").attr("src"));
    $(".modal-top-container img").attr("src", $(this).find("img").attr("src"));
    $(".media-body h5.title").text($(this).find(".photo-overlay .photo-overlay-text .title").text());
    $(".media-body a.link").attr("href", $(this).find(".photo-overlay .photo-overlay-text .link").text());
    $(".media-body a.spotify").attr("href", $(this).find(".photo-overlay .photo-overlay-text .spotify").text());

    // MAKE IT SO LINK/SPOTIFY HIDDEN IF THE LINKS DON'T EXIST
    $(".media-body a.link").text('Shop');
    $(".media-body a.spotify").text('Spotify');

    $(".track-container div.songs").html($(this).find(".photo-overlay .photo-overlay-text .songs .length").html());
    $(".media-body div.description").text($(this).find(".photo-overlay .photo-overlay-text .description").text());
});


$("a.no-results").mouseenter(function() {
    $(this).find(".fas").css("margin-left", "20px");
});

$("a.no-results").mouseleave(function() {
    $(this).find(".fas").css("margin-left", "10px");
});