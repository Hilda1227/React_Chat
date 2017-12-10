import Immutable from 'immutable';
import { socketEmit } from './common.js';
import {
    GROUP_FORM_SHOW,
    SET_LOADING,
    SELECT_LEFT_PANEL,
    TOGGLE_LEFT_PANEL,
    SELECT_RIGHT_PANEL,
    TOGGLE_RIGHT_PANEL,
    TOGGLE_USER_INFO,
    RESTORE_INIT,
    SHOW_ALERT,
    HIDDEN_ALERT,
} from '../constants/pageUI.js';

// true  or false
export const groupFormShow = payload => {
  return {
    type: GROUP_FORM_SHOW,
    payload 
  }
}
export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload 
  }
}
export const selectLeftPanel = payload => {
  return {
    type: SELECT_LEFT_PANEL,
    payload 
  }
}
export const toggleLeftPanel = () => {
  return {
    type: TOGGLE_LEFT_PANEL
  }
}
export const selectRightPanel = payload => {
  return {
    type: SELECT_RIGHT_PANEL,
    payload 
  }
}
export const toggleRightPanel = () => {
  return {
    type: TOGGLE_RIGHT_PANEL
  }
}
export const toggleUserInfo = () => {
  return {
    type: TOGGLE_USER_INFO
  }
}
export const restoreInit = () => {
  return {
    type: RESTORE_INIT
  }
}

export const showAlert = (payload) => {
  return {
    type: SHOW_ALERT,
    payload
  }
}

export const hiddenAlert = (payload) => {
  return {
    type: HIDDEN_ALERT,
  }
}
