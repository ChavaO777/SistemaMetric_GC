function TokenObject() {
    this.token = localStorage.getItem('token');
}

export function listEvents(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', './_ah/api/event_api/v1/event/list', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.responseType = 'json';
    xhr.onloadend = () => {
        if (xhr.status === 200 && xhr.response.code === "1") {
            callback({data: xhr.response.data, code: xhr.response.code});
        } else {
            callback({ data: 'No hay eventos para mostrar', code: xhr.response.code});
        }
    }
    xhr.send(JSON.stringify(new TokenObject()));
}