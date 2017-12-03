export function validate(User, callback){
    let response;
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:8080/_ah/api/user_api/v1/user/login', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.responseType = 'json';
    xhr.onloadend = () => {
        console.log(xhr);
        if (xhr.status === 200 && xhr.response.token) {
            console.log("Correct");
            sessionStorage.setItem('token', xhr.response.token);
            callback(xhr.response.token);
        } else {
            callback('Datos invalidos');
        }
        
    }
    xhr.send(User);
}