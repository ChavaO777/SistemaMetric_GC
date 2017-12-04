export function validate(User, callback){
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:8080/_ah/api/user_api/v1/user/login', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.responseType = 'json';
    xhr.onloadend = () => {
        if (xhr.status === 200 && xhr.response.token) {
            localStorage.setItem('token', xhr.response.token);
            callback({data: xhr.response.token, code: xhr.response.code});
        } else {
            callback({data: 'Datos invalidos', code: xhr.response.code});
        }
    }
    xhr.send(User);
}