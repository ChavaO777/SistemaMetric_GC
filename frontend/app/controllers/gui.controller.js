function showNotification(type) {
    var notificationHtml;
    $('.notifications').empty();
    if(type === "success"){
        notificationHtml = `<div class="btn-rectangle btn-green">
                                    <p>Éxito! <i class="fa fa-check" aria-hidden="true"></i></p>
                                </div>`;
    }else{
        notificationHtml = `<div class="btn-rectangle btn-red">
                                    <p>Error <i class="fa fa-times" aria-hidden="true"></i></p>
                                </div>`;
    }
    $('.notifications').append(notificationHtml);
    $('.notifications').css("opacity", "1").delay(800).fadeOut(400);
    $('.notifications').empty();
}