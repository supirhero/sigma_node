import {combineReducers} from 'redux';
import auth from './authReducer.jsx'

export const allReducers = combineReducers({
  auth : auth
})

export default allReducers
