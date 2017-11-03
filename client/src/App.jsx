import React, { Component } from 'react';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Index from './pages/Index'
import { Route, Link } from 'react-router-dom';
import './assete/scss/common.scss'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={ Index }/>
        <Route path="/login" component={ Login }/>
        <Route path="/signUp" component={ SignUp }/>       
      </div>
    );
  }
}

export default App;
