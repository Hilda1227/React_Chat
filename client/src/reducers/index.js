import { combineReducers } from 'redux'

const todos = (todos = [], action) => {
  switch( action.type ){
    case 'ADD_TODO':
      return [
        {
          id: action.id,
          text: action.text,
          finished: false
        },
        ...todos, 
      ]; 
    default:
      return todos;
  }
}

const filter = (filter='ALL_TODOS', action) => {
  if(action.type === 'FILTER_TODOS')
    return action.filter;
  return filter;
}

const msgList = (msgList = [{date:"date",content: 'content',author: 'wangfang'}], action) => {
  if(action.type === 'FETCH_MSGS')
    return action.msgList
  else if(action.type === 'LEAR_MSGLIST')
    return [];
  return msgList
}

const reducers = combineReducers({
    todos,
    filter,
    msgList
}) 

export default reducers