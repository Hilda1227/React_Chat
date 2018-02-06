import Immutable from 'immutable';
import { socketEmit } from './common.js';
import { setChatting, closeChatting } from './chatting.js';
import { addActiveItem } from './activeList.js';
import { showAlert } from './pageUI.js';

export const joinGroup = (payload) => (dispatch) => {
  return socketEmit('join group', { _id: payload})
    .then(data => {
    dispatch(addActiveItem(data.group));
  })
}
  
export const quitGroup = (payload) => (dispatch) => {
  return socketEmit('quit group', { group_id: payload})
  .then(data => {
    dispatch(removeActiveItem(payload));
    dispatch(closeChatting());
    dispatch(showAlert('已成功退出'))
  })
  .catch(err => dispatch(showAlert(err)))
}

export const block = payload => dispatch => {
  return socketEmit('block', payload)
  .then(data => dispatch(showAlert(data)))
  .catch(err => dispatch(showAlert(err)))
}

export const relieveBlock = payload => dispatch => {
  return socketEmit('relieve block', payload)
  .then(data => dispatch(showAlert(data)))
  .catch(err => dispatch(showAlert(err)))
}

export const removeMember = payload => dispatch => {
  return socketEmit('remove member', payload)
  .then(data => dispatch(showAlert(data)))
  .catch(err => dispatch(showAlert(err)))   
}

