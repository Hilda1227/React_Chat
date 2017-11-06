import Immutable from 'immutable'
import {
  INIT_ACTIVE_LIST,
  ADD_ACTIVE_ITEM,
  UPDATE_ACTIVE_ITEM,
  REMOVE_ACTIVE_ITEM,
  CLEAR_UNREAD,
  SET_ONLINE
} from '../constants/activeList.js'



export const addActiveItem = (payload) => {
  return {
    type: ADD_ACTIVE_ITEM,
    payload: Immutable.fromJS(payload)
  }
}

export const removeActiveItem = (payload) => {
  return {
    type: REMOVE_ACTIVE_ITEM,
    payload: Immutable.fromJS(payload)
  }
}

// nickname, type, lastWord, lastWordTime
export const updateActiveItem = (payload) => {
  return {
    type: UPDATE_ACTIVE_ITEM,
    payload: Immutable.fromJS(payload)
  }
}

// nickname, type
export const clearUnread = (payload) => {
  return {
    type: CLEAR_UNREAD,
    payload: Immutable.fromJS(payload)
  }
}

// _id, nickname
export const setOnline = (payload) => {
  return {
    type: SET_ONLINE,
    payload: Immutable.fromJS(payload)
  }
}
