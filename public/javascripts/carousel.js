// CODE FOR SETTING CAROUSEL IMAGE WHEN IT WAS A CAROUSEL
// $(".photo-link").click(function() {
//     $(".carousel-item.active img").attr("src", $(this).find("img").attr("src"));
// });


$(".photo-link").click(function() {
    $(".modal-container img").attr("src", $(this).find("img").attr("src"));
});

// USE JQUERY TO SET THE TITLE AND DESCRIPTION IF THERE IS ONE
