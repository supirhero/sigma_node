 // import auth from './authReducer.jsx'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import thunk from 'redux-thunk';
import jQuery from 'jquery';
import {reducer as reduxForm } from 'redux-form';
import * as storage from 'redux-storage'
import Immutable from 'immutable'
import _ from 'lodash'

// import {getData} from '../components/actions.jsx'
var compile_mode = process.env.NODE_ENV
const base_URL = "http://45.77.45.126"


var initialState = {
  isloggedin : false,
  data: null
}

// if (Object.keys(initialState).length === 0) {
//   initialState = {
//     isloggedin : false,
//     bussines_unit : null,
//     datatimesheet : null,
//     userdata : null,
//     projects : null
//   }
// }
// else {
//   load(store).then((newState) => {
//     console.log('Loaded state:', newState)
//     initialState = newState
//   })
//   .catch(() => console.log('Failed to load previous state'));
// }


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  }catch(err) {
    return undefined
  }
}
export const saveState = (state) => {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state',serializedState)
    // console.log('changed: ', serializedState);

}
var auth = (state = Immutable.List(), action) => {
  switch (action.type) {
    case 'LOGIN_DATA':
      return Object.assign({}, state, action.data.data)
    break;

    case 'LOGIN':
      return Object.assign({}, state, {
        isloggedin: action.isloggedin

      })
    break;

    case 'LOGOUT':
    return Object.assign({}, null, {
      isloggedin: false
    })
      break;
    default:
      return state
  }
}
const page = (state = Immutable.List(), action) => {
  switch (action.type) {
    case 'PUSH':
    return Object.assign({}, state,
      action.page
    )

    case 'POP':
    if (action.name != null) {
      return Object.assign({}, state,{
        [action.name] : null
      })
    }
    else {
      return state
    }
    break;
    default: return state

  }
}
const data = (state = Immutable.List(), action) => {
  const prevState = state;
  // state = {
  console.log('json',action);
  //   isLoggedIn : false
  // }
  if (compile_mode == 'mock') {
    alert('MOCK')
    var endpoint = action.request.url.slice(1).replace(/\//g, '--').split('?')[0]
    var path = '../../mock/' + action.method +  '/' + action.request.api + '/' + endpoint
    var result = require('../../mock/' + action.method +  '/' + action.request.api + '/' + endpoint + '.json')
    // browserHistory.replace('/')

    saveState(store.getState())


    return Object.assign({}, state, {
      isloggedin: true,
      auth : require('../../mock/' + action.method +  '/' + action.request.api + '/' + endpoint)
    })
  }
  else {
    // if(action.loader!= '' || action.loader!= null ||action.loader!= undefined) {
    //   store.dispatch({type: 'LOADER', show: true})
    // }
    switch (action.type) {


      case 'LOGOUT':
      return Object.assign({},state, null)

      case 'API':
        console.log("API CALLED FOR", action.name );
        console.log("APPEND?", action.append );
        // console.log("API DATA", action.data.data);

        if (action.append) {
        return Object.assign({},state,
          action.data.data
        )

        }
        else {
          return Object.assign({},state, action.data.data)
          // return action.data.data
        }

        break;
      default:
      return state
    case 'LOADER':
      jQuery(document).ready(function ($) {
        if (action.show) {
          $('#' + action.loader).css({'display':'block'})

        }
        else {
          $('#' + action.loader).css({'display':'none'})
        }
      })
      return state;

  }
}

}
const appReducer = combineReducers({
  auth,
  data,
  page,
  routing : routerReducer,
  form: reduxForm
})
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}



const routeMiddleware = routerMiddleware(browserHistory)

export const store = createStore(rootReducer, loadState(), applyMiddleware(thunk, routeMiddleware))
// const reducer = storage.reducer(allReducers);
//
// const middleware = storage.createMiddleware(engine);
// const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
// const store = createStoreWithMiddleware(reducer);
// console.log(load(store));

export default store
