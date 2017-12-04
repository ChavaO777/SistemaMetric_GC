import React, { Component } from 'react';
import './css/login.css';
import {BrowserRouter, Link, } from 'react-router-dom';
import UserModel from './models/User.model';
import {validate} from './controllers/user.controller';
import Event from './containers/Event.container';

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
    var user = new UserModel();
    user.email = this.state.email;
    user.password = this.state.password;
    validate(user.toJsonString(), (response)=>{
        if(response.code === "1")
            console.log(response.code); // here should redirect
        else
            this.setState({error: response.data});
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

        <Event />
      </div>
    );
  }
}

export default Login;
