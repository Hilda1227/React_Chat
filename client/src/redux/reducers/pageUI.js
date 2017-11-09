import Immutable from 'immutable'
import {
    GROUP_FORM_SHOW
} from '../constants/pageUI.js'

const init = Immutable.fromJS({
  groupFormShow: false
});

const pageUI = (state = init, action) => {
  switch( action.type ){
    case GROUP_FORM_SHOW: {
      return state.set('groupFormShow', action.payload);
    }
    default: {
      return state;
    }
  }
}

export default pageUI;