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

const reducers = combineReducers({
    todos,
    filter,
    msgList
}) 

export default reducers