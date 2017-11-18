import Immutable from 'immutable'
import {
  GROUP_FORM_SHOW,
  SET_LOADING
} from '../constants/pageUI.js'

const init = Immutable.fromJS({
  groupFormShow: false,
  isLoading: false
});

const pageUI = (state = init, action) => {
  switch( action.type ){
    case GROUP_FORM_SHOW: {
      return state.set('groupFormShow', action.payload);
    }
    case SET_LOADING: {
      return state.set('isLoading', action.payload);
    }
    default: {
      return state;
    }
  }
}

export default pageUI;