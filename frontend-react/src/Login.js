import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router';
import './css/login.css';
import User from './models/User.model';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    }

    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const id = target.id;
    this.setState({[id]: target.value});
  }

  login(){
    var user = new User();
    user.email = this.state.email;
    user.password = this.state.password;
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:8080/_ah/api/user_api/v1/user/login', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.responseType = 'json';
    xhr.onloadend = ()=>{
        if(xhr.status === 200 && xhr.status.token){
            sessionStorage.setItem('token', xhr.response.token);
            this.setState({error: sessionStorage.getItem('token')});
        }else{
            this.setState({error: "Datos invalidos"});
        }
    }
    xhr.send(user.toJsonString());
  }

  render() {
    return (
      <div className="login">
        <input 
            type="text" 
            value = {this.state.email} 
            id="email" 
            placeholder="Usuario"
            onChange = {this.handleInputChange}
        />
        <input
            type="text" 
            value = {this.state.password} 
            id="password" 
            placeholder="Contraseña"
            onChange = {this.handleInputChange}
        />
        <a onClick={this.login}>Autenticar</a>
        <span>{this.state.error}</span>
      </div>
    );
  }
}

export default Login;
