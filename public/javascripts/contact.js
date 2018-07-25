$("#contact-submit").on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    ajaxPost();
});

function ajaxPost(){

    // PREPARE FORM DATA
    var formData = {
        firstName : $("#firstName").val(),
        lastName :  $("#lastName").val(),
        phoneNumber : $("#phoneNumber").val(),
        subject :  $("#subject").val(),
        message : $("#message").val(),
    };

    // DO POST
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "/contact",
        data : JSON.stringify(formData),
        dataType : 'json',
        timeout: 5000,
        success : function(data) {
            $(".media-body").html('<div id="contact-success">' +
                ' <h1 class="sent">Message sent!</h1> ' +
                '<a class="contact-link mt-3" title="Contact Charles John Quarto" href="/contact">BACK TO CONTACT FORM</a>' +
                ' </div>');
        },
        error : function(e) {
            $(".media-body").html('<div id="contact-error">' +
                ' <h1 class="error">Uh oh! </h1>' +
                ' <h6>There was an error sending your message. Please try again.</h6> ' +
                '<a class="contact-link mt-3" title="Contact Charles John Quarto" href="/contact">BACK TO CONTACT FORM</a> ' +
                '</div>');
        }
    }).done(resetData());

}

function resetData(){
    $("#firstName").val("");
    $("#lastName").val("");
    $("#phoneNumber").val("");
    $("#subject").val("");
    $("#message").val("");
}