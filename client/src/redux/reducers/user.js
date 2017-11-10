import Immutable from 'immutable'

import {
  SET_USER
} from '../constants/user.js'

const init = Immutable.fromJS({});

const user = (state = init, action) => {
  console.log('这里',action.payload)
  switch( action.type ){
    case SET_USER: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export default user;