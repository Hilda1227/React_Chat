import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk'

import store from './redux/store'
import App from './App';
import reducers from './redux/reducers'
import { socket, dispatchAction } from './redux/actions/common' 

import {  addMessageItem } from './redux/actions/message'
import { setItemUnread } from './redux/actions/activeList'

socket.on('new message', data => {
  if(data.from === store.getState().chatting.get('to')){
    dispatchAction(addMessageItem(data))
  }else{
    dispatchAction(setItemUnread({nickname: data.nickname, type: 'private'}))
  }
})



ReactDOM.render(
    <Provider store={ store }>
      <BrowserRouter basename="/">
        <Route path='/' component={ App }/>          
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
