import Immutable from 'immutable'

import {
    GROUP_FORM_SHOW,
    SET_LOADING,
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