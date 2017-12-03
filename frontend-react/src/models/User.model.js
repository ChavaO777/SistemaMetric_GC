export default class User{
    constructor(email, password){
        this.email = email;
        this.password = password;
    }

    toJsonString(){
        return JSON.stringify(this);
    }
}