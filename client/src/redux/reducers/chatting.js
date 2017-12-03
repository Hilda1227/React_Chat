import Immutable from 'immutable';

import {
  SET_CHATTING,
  CLOSE_CHATTING
} from '../constants/chatting'

const chatting = (state = Immutable.fromJS({}), action) => {
  switch( action.type ){

    case SET_CHATTING: {
      return Immutable.fromJS(action.payload);
    }
    case CLOSE_CHATTING:{
      return Immutable.fromJS({});
    }
    default: {
      return state;
    }
  }
}

export default chatting;