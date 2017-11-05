import Immutable from 'immutable'
import {
  INIT_ACTIVE_LIST,
  ADD_ACTIVE_ITEM,
  SET_ITEM_UNREAD,
  REMOVE_ACTIVE_ITEM
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

// nickname, type
export const setItemUnread = (payload) => {
  return {
    type: SET_ITEM_UNREAD,
    payload: Immutable.fromJS(payload)
  }
}
