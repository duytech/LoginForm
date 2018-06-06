import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form  from 'antd/lib/form';
import { Login } from './Components';
import Register from './Components/Register/Register';
import { Route, Link } from 'react-router-dom';

const WrappedLoginForm = Form.create()(Login);
const WrappedRegisterForm = Form.create()(Register);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <button> <Link to="/login">Login</Link> </button>
        <button> <Link to="/register">Register</Link> </button>

        <Route path="/login" component={WrappedLoginForm}></Route>
        <Route path="/register" component={WrappedRegisterForm}></Route>
      </div>
    );
  }
}

export default App;
