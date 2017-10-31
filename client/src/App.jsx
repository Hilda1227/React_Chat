import React, { Component } from 'react';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Route, Link } from 'react-router-dom';
import './assete/scss/common.scss'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" component={ Login }/>
        <Route path="/signUp" component={ SignUp }/>       
      </div>
    );
  }
}

export default App;
