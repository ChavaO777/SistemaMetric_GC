function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function showNotification(type) {
    var notificationHtml;
    $('#notifications').empty();
    if(type === "success"){
        notificationHtml = `<div class="btn-rectangle btn-green">
                                <p>Éxito! <i class="fa fa-check" aria-hidden="true"></i></p>
                            </div>`;
    }else{
        notificationHtml = `<div class="btn-rectangle btn-red">
                                <p>Error <i class="fa fa-times" aria-hidden="true"></i></p>
                            </div>`;
    }
    $('#notifications').css("opacity", "1");
    $('#notifications').html(notificationHtml);
}

function logout(){
    sessionStorage.token = null;
    window.location = '/login';
}