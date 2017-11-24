import Immutable from 'immutable'
import {
  GROUP_FORM_SHOW,
  SET_LOADING,
  SELECT_LEFT_PANEL,
  TOGGLE_LEFT_PANEL,
} from '../constants/pageUI.js'

const init = Immutable.fromJS({
  groupFormShow: false,
  isLoading: false,
  leftPanelIs: '',
  showLeftPanel: false,
});

const pageUI = (state = init, action) => {
  switch( action.type ){
    case GROUP_FORM_SHOW: {
      return state.set('groupFormShow', action.payload);
    }
    case SET_LOADING: {
      return state.set('isLoading', action.payload);
    }
    case SELECT_LEFT_PANEL: {
      state = state.set('leftPanelIs', action.payload);
      return state.set('showLeftPanel', true);
    }
    case TOGGLE_LEFT_PANEL: {
      return state.get('showLeftPanel') 
        ? state.set('showLeftPanel', false) 
        : state.set('showLeftPanel', true)
    }
    default: {
      return state;
    }
  }
}

export default pageUI;