import Immutable from 'immutable'

import {
  SET_CHATTING,
  CLOSE_CHATTING
} from '../constants/chatting'

const chatting = (state = Immutable.fromJS({}), action) => {
  // console.log(action.payload)
  switch( action.type ){
    case SET_CHATTING:
      return action.payload;
    case CLOSE_CHATTING:
      return {};
    default:
      return state;
  }
}

export default chatting;