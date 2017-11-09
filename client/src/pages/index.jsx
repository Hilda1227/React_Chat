import React, {Component} from 'react';
import {  BrowserRouter as Router, Route,Link, NavLink, Switch, Redirect } from 'react-router-dom';
import Layout from '../containers/chat/Layout'
import Group from '../containers/group/Group'
import '../assete/scss/Index.scss'


const Index = ({ match })  =>  { 
    return (
      <div className = 'index'>
        <ul className = 'nav-bar'>
          <li><NavLink to = '/chat' id ='chat' activeClassName="active" ></NavLink></li>
          <li><NavLink to = '/group' id = 'group' activeClassName="active" ></NavLink></li>
          <li><NavLink to = '/set' id = 'set' activeClassName="active" ></NavLink></li>
        </ul>
        <Switch>
          
          <Route path= '/chat' component={ Layout }/>
          <Route path= '/group' component={ Group }/>
        </Switch>
      </div>
    );
}

export default Index;
