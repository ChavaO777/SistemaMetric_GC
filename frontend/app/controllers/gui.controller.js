function showNotification(type) {
    var notificationHtml = `<div id="notifications" class="btn-rectangle btn-green">
                                <p>Éxito! <i class="fa fa-check" aria-hidden="true"></i></p>
                            </div>`;
    $('body').append(notificationHtml);
}