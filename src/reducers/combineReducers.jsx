import {combineReducers} from 'redux';
import auth from './authReducer.jsx'
import { createStore } from 'redux'
import { routerReducer } from 'react-router-redux'

const initialState = {
  isLoggedIn : false
}
const store = (state = initialState, action) => {
  // state = {
  //   isLoggedIn : false
  // }
  switch (action.type) {
    case 'SESSION':
      return Object.assign({}, state, { isLoggedIn: action.isLoggedIn })
      break;
    default:
    return state
  }
}

const allReducers = combineReducers({
  store : store,
  routing : routerReducer
})


export default createStore(allReducers)
