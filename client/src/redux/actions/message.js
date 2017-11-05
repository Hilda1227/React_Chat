import Immutable from 'immutable'
import { socketEmit } from './common.js'
import {
    GET_HISTORY,
    ADD_MESSAGE_ITEM
} from '../constants/message.js'



export const getHistory = (payload) => (dispatch) =>{
  socketEmit('get history', payload)
  .then(msg => {
    dispatch({
      type:  GET_HISTORY,
      payload: Immutable.fromJS(msg.historys)
    });
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

