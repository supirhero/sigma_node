import {combineReducers} from 'redux';
import auth from './authReducer.jsx'
import { createStore } from 'redux'


export const allReducers = combineReducers({
  auth : auth
})

export default createStore(allReducers)
