import { combineReducers } from 'redux'
import activeList from './activeList'
import chatting from './chatting'
import message from './message'
import user from './user'
import pageUI from './pageUI'

const reducers = combineReducers({
  user,
  activeList,
  message,
  chatting,
  pageUI
})

export default reducers
