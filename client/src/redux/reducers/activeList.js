import immutable from 'immutable'
import {
  INIT_GROUP_LIST,
  ADD_ACTIVE_ITEM,
  REMOVE_ACTIVE_ITEM,
  UPDATE_ACTIVE_ITEM,
  SET_ACTIVE_ITEM,
  CLEAR_UNREAD,
  SET_ONLINE
} from '../constants/activeList'

const findItem = (state, id) => {
  return state.findKey((value) => (
    value.get('_id') === id
  ))
}

const activeList = (state = immutable.fromJS([]), action) => {
  switch (action.type) {
    case ADD_ACTIVE_ITEM: {
      if (findItem(state, action.payload.get('_id')) == undefined) {
        return state.push(action.payload)
      }
    }

    case REMOVE_ACTIVE_ITEM: {
      const index = findItem(state, action.payload)
      return state.delete(index)
    }

    case UPDATE_ACTIVE_ITEM: {
      const index = findItem(state, action.payload.get('_id'))
      if (typeof index !== 'undefined') {
        if (!action.payload.get('curRoom')) {
          const unread = state.get(index).get('unread') || 0
          const newactive = state.get(index).merge(action.payload.set('unread', unread + 1))
          return state.set(index, newactive)
        }
        return state.set(index, state.get(index).merge(action.payload))
      }
      return state
    };

    case SET_ACTIVE_ITEM: {
      const index = findItem(state, action.payload.get('_id'))
      if (typeof index !== 'undefined') {
        return state.set(index, state.get(index).merge(action.payload))
      }
      return state
    };

    case CLEAR_UNREAD: {
      const index = findItem(state, action.payload.get('_id'))
      const newactive = state.get(index).set('unread', 0)
      return state.set(index, newactive)
    };

    case SET_ONLINE: {
      const index = findItem(state, action.payload.get('_id'))
      if (typeof index !== 'undefined') {
        const newactive = state.get(index).set('onlineState', action.payload.get('state'))
        return state.set(index, newactive)
      }
      return state
    };

    case INIT_GROUP_LIST: {
      return action.payload
    };
    default: {
      return state
    }
  }
}

export default activeList
