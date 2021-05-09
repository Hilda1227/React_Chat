import Immutable from 'immutable'
import {
  INIT_HISTORY,
  ADD_HISTORY,
  ADD_MESSAGE_ITEM,
  SET_STATUS,
  SET_FILE_SRC
} from '../constants/message.js'

const init = Immutable.fromJS([])

const message = (state = init, action) => {
  switch (action.type) {
    case INIT_HISTORY: {
      return action.payload
    }
    case ADD_HISTORY: {
      return action.payload.concat(state)
    }
    case ADD_MESSAGE_ITEM: {
      return state.push(action.payload)
    }
    case SET_STATUS: {
      const key = state.findLastKey(item => item.get('_id') == action.payload.id)
      return state.setIn([key, 'status'], action.payload.status)
    }
    case SET_FILE_SRC: {
      const key = state.findLastKey(item => item.get('_id') == action.payload._id)
      const content = JSON.parse(state.getIn([key, 'content']))
      content.src = action.payload.src
      return state.setIn([key, 'content'], JSON.stringify(content))
    }
    default: {
      return state
    }
  }
}

export default message
