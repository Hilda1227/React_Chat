import Immutable from 'immutable'

import {
  INIT_HISTORY,
  ADD_HISTORY,
  ADD_MESSAGE_ITEM
} from '../constants/message.js'

const init = Immutable.fromJS([]);

const message = (state = init, action) => {
  switch( action.type ){

    case INIT_HISTORY: {
      return action.payload;
    }
    case ADD_HISTORY: {
      return action.payload.concat(state);
    }
    case ADD_MESSAGE_ITEM: {
      return state.push(action.payload);
    }
    default: {
      return state;
    }
  }
}

export default message;