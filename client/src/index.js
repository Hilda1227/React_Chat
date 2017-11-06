import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
import { BrowserRouter, Route, BrowserHistory } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk'

import store from './redux/store'
import App from './App';
import reducers from './redux/reducers'
import { socket, dispatchAction, socketEmit } from './redux/actions/common' 

import {  addMessageItem } from './redux/actions/message'
import { updateActiveItem } from './redux/actions/activeList'
import { setUser } from './redux/actions/user'

socket.on('new message', data => {
  if(data.from === store.getState().chatting.get('to')){
    dispatchAction(addMessageItem(data))
  }else{
    dispatchAction(updateActiveItem({
      nickname: data.from, 
      type: 'private',
      lastWord:  data.content,
      lastWordTime: data.createAt
    }))
  }
})

socketEmit('auto login', {token: localStorage.getItem('token')})
.then( data => dispatchAction(setUser( data.user )))
.catch( err => {console.log(err), BrowserHistory.push('/login')})


ReactDOM.render(
    <Provider store={ store }>
      <BrowserRouter basename="/">
        <Route path='/' component={ App }/>          
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
