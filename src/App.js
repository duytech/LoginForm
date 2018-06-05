import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form  from 'antd/lib/form';
import Login from './Components/Login/Login';

const WrappedLoginForm = Form.create()(Login);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <WrappedLoginForm></WrappedLoginForm>
      </div>
    );
  }
}

export default App;
