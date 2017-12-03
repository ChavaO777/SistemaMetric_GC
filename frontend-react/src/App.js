import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: 'salvador@orozco.in',
      password: '12345',
      token: []
    }
  }

  componentDidMount(){
    let formattedData = `{"email":"${this.state.email}","password":"${this.state.password}"}`;
    console.log(formattedData);
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:8080/_ah/api/user_api/v1/user/login', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.responseType = 'json';
    xhr.onloadend = ()=>{
      this.setState({token: xhr.response.message});
    }
    xhr.send(formattedData);
  }

  render() {
    return (
      <div>
        <p>Tu token es: {this.state.token}</p>
      </div>
    );
  }
}

export default App;
