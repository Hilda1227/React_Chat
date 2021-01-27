import Immutable from 'immutable'

import {
  SET_USER,
  CLEAR_USER
} from '../constants/user.js'

const init = Immutable.fromJS({})

const user = (state = init, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.payload
    }
    case CLEAR_USER:
      return init
    default: {
      return state
    }
  }
}

export default user
