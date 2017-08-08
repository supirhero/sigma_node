 import auth from './authReducer.jsx'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import axiosMiddleware from 'redux-axios-middleware';
import * as storage from 'redux-storage'
// import {login} from '../components/actions.jsx'
var compile_mode = process.env.NODE_ENV
const baseURL = "http://45.77.45.126"


var initialState = {
  isloggedin : false,
  data: null
}



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
// export const dom = (state = {}, action) => {
//   console.log('dom', action);
//   switch (action.type) {
//     case 'POPUP':
//       return Object.assign({}, state, {
//         id: action.id,
//         popup: action.popup
//       })
//       break;
//     default: return state
//
//   }
// }
export const data = (state = {}, action) => {
  // state = {
  // console.log('json',action);
  //   isLoggedIn : false
  // }
  if (compile_mode == 'mock') {
    alert('MOCK')
    var endpoint = action.request.url.slice(1).replace(/\//g, '--').split('?')[0]
    var path = '../../mock/' + action.type +  '/' + action.request.api + '/' + endpoint
    var result = require('../../mock/' + action.type +  '/' + action.request.api + '/' + endpoint + '.json')
    // browserHistory.replace('/')

    saveState(store.getState())

    return Object.assign({}, state, {
      isloggedin: true,
      auth : require('../../mock/' + action.type +  '/' + action.request.api + '/' + endpoint)
    })
  }
  else {
    // alert('API')
    switch (action.type) {
      case 'LOGOUT':
        // saveState(store.getState())
        return null
      break;
      case 'POST':
      console.log('DATA', action.data);
      // var data = Object.keys(action.data).map(function(key) {
      //   key = action.data[key];
      //   action.data[key] = action.data[key];
      //   return key;
      // });
        return Object.assign({}, state, {
            data: action.data
        })

        break;
      default:
      return state
  }

    }

}
const allReducers = combineReducers({
  // dom : dom,
  data,
  routing : routerReducer
})

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL: baseURL,
  responseType: 'json'
});

const axiosMiddlewareOptions = {
      interceptors: {
        response: [{
          success: function ({getState, dispatch, getSourceAction}, req) {
            dispatch({type:'POST', data: req})
          },
          error: function ({getState, dispatch, getSourceAction}, error) {
            //...
          }
        }
        ]
      }
  }

export const store = createStore(allReducers, loadState(), applyMiddleware(axiosMiddleware(client, axiosMiddlewareOptions)))

export default store
