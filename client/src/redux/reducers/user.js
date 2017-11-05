import Immutable from 'immutable'

import {
  SET_USER
} from '../constants/user.js'

const init = Immutable.fromJS({
  nickname: 'xxx',
  sex: 'xxx',
  createAt: 'xxx',
  avatar: 'xxx'
});

const user = (state = init, action) => {
  switch( action.type ){
    case SET_USER:
      return Immutable.fromJS(action.payload);
    default:
      return state;
  }
}

export default user;