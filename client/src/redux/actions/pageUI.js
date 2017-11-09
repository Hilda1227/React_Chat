import Immutable from 'immutable'

import {
    GROUP_FORM_SHOW
} from '../constants/pageUI.js'

// true  or false
export  const groupFormShow = payload => {
  return {
    type: GROUP_FORM_SHOW,
    payload 
  }
}