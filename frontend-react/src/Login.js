import React, { Component } from 'react';
import './css/login.css';
import {BrowserRouter, Link, } from 'react-router-dom';
import User from './models/User.model';
import {validate} from './controllers/user.controller';

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
    validate(user.toJsonString(), (response)=>{
        this.setState({error: response});
    });
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
