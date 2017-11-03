import Immutable from 'immutable'
import {
  INIT_ACTIVE_LIST,
  ADD_ACTIVE_ITEM,
  REMOVE_ACTIVE_ITEM
} from '../constants/activeList.js'


// export const initLINKList = (payload) => {
//   return {
//     type: INIT_LINK_LIST,
//     payload,
//   }
// }
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
