import Immutable from 'immutable'
import {
  SET_CHATTING ,
  CLOSE_CHATTING
} from '../constants/chatting.js'
  
export const setChatting = (payload) => {
  return {
    type: SET_CHATTING,
    payload
  }
}
export const closeChatting = () => {
  return {
    type: CLOSE_CHATTING,
  }
}
  