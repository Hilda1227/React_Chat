import Immutable from 'immutable';
import { socketEmit } from './common.js';
import { setChatting, closeChatting } from './chatting.js';
import {
  INIT_GROUP_LIST,
  ADD_ACTIVE_ITEM,
  UPDATE_ACTIVE_ITEM,
  REMOVE_ACTIVE_ITEM,
  SET_ACTIVE_ITEM,
  CLEAR_UNREAD,
  SET_ONLINE,
  JOIN_GROUP,
} from '../constants/activeList.js';



export const initRoomList = (payload) => (dispatch) => {
  socketEmit('init groups', {_id: payload})
  .then(data => dispatch({
    type: INIT_GROUP_LIST,
    payload: Immutable.fromJS(data.groups)
  })) 
  .catch(err => console.log(err))
}

export const joinGroup = (payload) => (dispatch) => {
  return socketEmit('join group', { _id: payload})
    .then(data => {
      dispatch(addActiveItem(data.group));
    })
    .catch(err => alert(err))
}

// payload为群组_id
export const quitGroup = (payload) => (dispatch) => {
  return socketEmit('quit group', { group_id: payload})
    .then(data => {
      dispatch(removeActiveItem(payload));
      dispatch(closeChatting());
    })
    .catch(err => alert(err))
}

export const addActiveItem = (payload) => {
  return {
    type: ADD_ACTIVE_ITEM,
    payload: Immutable.fromJS(payload)
  }
}

export const searchAddItem = (payload) => (dispatch) => {
  socketEmit('find user', payload)
  .then(data => {
    dispatch(addActiveItem(Immutable.fromJS({...data.user, type: 'private'})));
    dispatch(setChatting(Immutable.fromJS({
      to: data.user.nickname, type: 'private', 
      avatar: data.user.avatar, _id: data.user._id
    })));
  })
  .catch(err => alert(err));
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

export const setActiveItem = (payload) => {
  return {
    type: SET_ACTIVE_ITEM,
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
