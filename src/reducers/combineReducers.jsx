import auth from './authReducer.jsx'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'


import * as storage from 'redux-storage'
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
    console.log('changed: ', serializedState);

}
export const dom = (state = {}, action) => {
  console.log('dom', action);
  switch (action.type) {
    case 'POPUP':
      return Object.assign({}, state, {
        id: action.id,
        popup: action.popup
      })
      break;
    default: return state

  }
}
export const data = (state = {}, action) => {
  // state = {
  console.log('json',action);
  //   isLoggedIn : false
  // }
  switch (action.type) {
    case 'API':
      // if (process.env.NODE_ENV == 'mock') {
      //   return Object.assign({}, state, {
      //     isloggedin: action.isloggedin,
      //     bussines_unit : action.bussines_unit,
      //     datatimesheet : action.datatimesheet,
      //     userdata : action.userdata,
      //     projects : action.projects
      //   })
      //
      // }
      // else {
      // console.log('data', data);
      if (compile_mode == 'mock') {
        alert('MOCK')
        var endpoint = action.request.url.slice(1).replace(/\//g, '--').split('?')[0]
        var path = '../../mock/' + action.method +  '/' + action.request.api + '/' + endpoint
        var result = require('../../mock/' + action.method +  '/' + action.request.api + '/' + endpoint + '.json')
        console.log('result', result);
        console.log('path', path);
        // browserHistory.replace('/')

        action.success(result)
        saveState(store.getState())

        return Object.assign({}, state, {
          isloggedin: true,
          auth : require('../../mock/' + action.method +  '/' + action.request.api + '/' + endpoint)
        })
      }
      else {
        alert('API')
          axios({
            method: 'post',
            url: base_URL + action.request.url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: action.request.params
          })
          .then(function(response) {
            saveState(store.getState())

            return Object.assign({}, state, {
              auth : response.data
            })
          })
          .catch(
            function (error) {
              if (action.error) {
                action.error(error)

              }
            })
    }

      break;
    default:
    return state
}

}
const allReducers = combineReducers({
  dom : dom,
  data : data,
  routing : routerReducer
})

export const store = createStore(allReducers, loadState())
// const reducer = storage.reducer(allReducers);
//
// const middleware = storage.createMiddleware(engine);
// const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
// const store = createStoreWithMiddleware(reducer);
// console.log(load(store));

export default store
