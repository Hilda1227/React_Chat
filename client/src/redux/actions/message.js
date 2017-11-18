import Immutable from 'immutable';
import { socketEmit } from './common.js';
import store from '../store';
import { setLoading } from './pageUI';
import {
    INIT_HISTORY,
    ADD_HISTORY,
    ADD_MESSAGE_ITEM
} from '../constants/message.js';



export const initHistory = (payload) => (dispatch) =>{
  return socketEmit(`get ${payload.type} history`, {...payload, timestamp: Date.now()})
  .then(msg => {
    dispatch({
      type:  INIT_HISTORY,
      payload: Immutable.fromJS(msg.historys)
    });
    dispatch(setLoading(false));
  })
  .catch( err => console.log(err) )
}

export const addHistory = (payload) => (dispatch) => {
  let first = store.getState().message.first();
  let timestamp = (first && first.get('createAt')) || Date.now();
  socketEmit(`get ${payload.type} history`, {...payload, timestamp})
  .then(msg => {
    dispatch({
      type:  ADD_HISTORY,
      payload: Immutable.fromJS(msg.historys)
    });
    dispatch(setLoading(false));
  })
  .catch( err => console.log(err) )
}


// from, createAt, content, avatar,id
export const addMessageItem = (payload) =>{
  return {
    type: ADD_MESSAGE_ITEM,
    payload: Immutable.fromJS(payload)
  };
}

