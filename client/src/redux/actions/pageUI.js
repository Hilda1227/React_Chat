import Immutable from 'immutable'

import {
    GROUP_FORM_SHOW,
    SET_LOADING,
    SELECT_LEFT_PANEL,
    TOGGLE_LEFT_PANEL,
    SELECT_RIGHT_PANEL,
    TOGGLE_RIGHT_PANEL,
} from '../constants/pageUI.js'

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