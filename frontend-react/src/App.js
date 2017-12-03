import React, { Component } from 'react';
import User from './models/User.model';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: 'salvador@orozco.in',
      password: '12345'
    }
  }

  componentWillMount(){
    var user = new User();
    user.email = this.state.email;
    user.password = this.state.password;
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:8080/_ah/api/user_api/v1/user/login', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.responseType = 'json';
    xhr.onloadend = ()=>{
      localStorage.setItem('token', xhr.response.message);
    }
    xhr.send(user.toJsonString());
  }

  render() {
    return (
      <div>
        <p>Tu token es: {localStorage.getItem('token')}</p>
      </div>
    );
  }
}

export default App;
