import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import { BrowserRouter, Route, withRouter, Switch, Redirect } from 'react-router-dom';

import store from './redux/store';
import {
  socket, 
  dispatchAction, 
  socketEmit
} from './redux/actions/common' ;

import { handleMessage } from './util/message.js';

import {
  setOnline, 
  initRoomList
} from './redux/actions/activeList';

import { setUser } from './redux/actions/user';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Index from './pages/Index';
import Alert from './components/common/Alert';

import './assete/scss/common.scss';
import './assete/scss/CSSTransition.scss';

socket.on('new message', data => {
  handleMessage(data);
})

socket.on('offline', data => {
  dispatchAction(setOnline({ ...data, state: false}));
})

socket.on('online', data => {
  dispatchAction(setOnline({ ...data, state: true}));
})

const handleInit = token => {
  socketEmit('auto login', {token})
  .then( data => {
    dispatchAction(setUser( data.user ));
    dispatchAction(initRoomList(data.user._id));
  })
  .catch( err => {window.location.href='/login'; console.log(err)})
}

const handleEnter = () => {
 
  const token = localStorage.getItem('token'),
        user_id = store.getState().user.get('_id');
  if(token){   
    console.log('dddd1')
    if(!user_id) handleInit(token);
    return true;
  }else{
    console.log('dddd2')
    return false;
  }
}




ReactDOM.render(
    <Provider store={ store }>
      <BrowserRouter basename="/">
        <div className = 'App'>
          <Alert/>
          {<Switch>
            <Route path = '/login' component = { Login }/>
            <Route path = '/signUp' component = { SignUp }/>
            <Route path =  '/'  render = {props => (
              handleEnter() 
                ? (<Index {...props}/>) 
                : ( <Redirect to={{ pathname: '/login',state: { from: props.location }}}/>)
            )}
            /> 
          </Switch>}
        </div>    
      </BrowserRouter> 
    </Provider>,
    document.getElementById('root')
);
