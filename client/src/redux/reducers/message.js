import Immutable from 'immutable'

import {
  GET_HISTORY,
  ADD_MESSAGE_ITEM
} from '../constants/message.js'

const init = Immutable.fromJS([{
  from: 'xxx',
  avatar: 'xxx',
  content: 'xxx',
  createAt: 'xxx',
  id: 1
}]);

const message = (state = init, action) => {
  switch( action.type ){
    case GET_HISTORY:
      return action.payload;
    case ADD_MESSAGE_ITEM:
      return state.push(action.payload);
    default:
      return state;
  }
}

export default message;