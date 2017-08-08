import store from '../reducers/combineReducers.jsx'
import { Link, browserHistory } from 'react-router'
import { push, replace } from 'react-router-redux'

// import {saveAuthentication} from './actions.jsx'
import axios from 'axios'
var compile_mode = process.env.NODE_ENV
const baseURL = "http://45.77.45.126"

export function login() {
  return function (dispatch) {
    return axios({
            method: 'post',
            url: baseURL + "/dev/login/login",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {user_id: 'gina.nufus@sigma.co.id',
                    password: 'S201502162',
                    fpid : '160927084946'
                  }
          }).then(
            res => {
              alert('work');
              // browserHistory.replace('/')
              store.dispatch({type:'POST', data: res})
              if (store.getState().data.data.data.token != undefined) {
                store.dispatch({type:'LOGIN', isloggedin: true})
                store.dispatch(replace('/'))
              }
              else {
                store.dispatch({type:'LOGIN', isloggedin: false})

              }
            }
          )
  }
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}
