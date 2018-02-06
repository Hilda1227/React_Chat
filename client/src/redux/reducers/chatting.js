import immutable from 'immutable';

import {
  SET_CHATTING,
  CLOSE_CHATTING
} from '../constants/chatting'

let defaultValue = immutable.fromJS({})

const chatting = (state = defaultValue, action) => {
  switch( action.type ){

    case SET_CHATTING: {
      return immutable.fromJS(action.payload);
    }
    case CLOSE_CHATTING:{
      return immutable.fromJS({});
    }
    default: {
      return state;
    }
  }
}

export default chatting;