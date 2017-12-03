import React, { Component } from 'react';
import './css/main.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
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
