import Immutable from 'immutable'

import {
  SET_USER
} from '../constants/user.js'

const init = Immutable.fromJS({});

const user = (state = init, action) => {
  
  switch( action.type ){
    case SET_USER: {
      console.log('这里user',action.payload)
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export default user;