import store from '../reducers/combineReducers.jsx'
import { Link, browserHistory } from 'react-router'
import { push, replace } from 'react-router-redux'

// import {saveAuthentication} from './actions.jsx'
import axios from 'axios'
var compile_mode = process.env.NODE_ENV
const baseURL = "http://45.77.45.126"

export function login(email, password) {

  store.dispatch({type: 'LOADER', loader:'login-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'POST',
            url: baseURL + "/dev/login/login",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {user_id: email,
                    password: password,
                    fpid : '160927084946'
                  }
          }).then(
            res => {
              // browserHistory.replace('/')
              store.dispatch({type:'API', name: 'login', data: res})
              if (store.getState().data.login.token != undefined) {
                store.dispatch({type:'LOGIN', isloggedin: true})
                store.dispatch(replace('/'))
              }
              else {
                store.dispatch({type: 'LOADER', loader:'login-loader', show: false})

                store.dispatch({type:'LOGIN', isloggedin: false})

              }
            }
          )
  }
}

export function getProjectDetail(id) {

  store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'GET',
            url: baseURL + "/dev/test/detailproject/" + id,
            headers: {
              // 'token': '369e1dc5052347b7f5118cdc66f34fdd',
              'Content-Type': 'application/x-www-form-urlencoded'
             }

          }).then(
            res => {
              store.dispatch({type: 'LOADER', loader:'project-loader', show: false})

              store.dispatch({type:'API', name: 'project', data: res})

            },

          )
  }
}

export function pop(name) {
  return {
    type: 'POP',
    name : name
  }
}

export function changeRoute(params) {
  store.dispatch(replace(params.path))
  return {
    type: 'PUSH',
    page: params.data
  }
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}

export const getProjectTeamMember = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'GET',
            url: `${baseURL}/dev/test/p_teammember/${id}` ,
            headers: {
              // 'token': '369e1dc5052347b7f5118cdc66f34fdd',
              'Content-Type': 'application/x-www-form-urlencoded'
             }

          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'project', data: res})

            },

          )
  }

}



export const addTimesheet = (values) => {
  const config = {
    headers:
    { 'token':store.getState().data.data.data.token,'Content-Type': 'application/x-www-form-urlencoded',},
  }
  return function(dispatch){
    axios
      .post(`${baseURL}/dev/timesheet/addTimesheet/`,values,config)
      .then(res=> dispatch ({type:'API',payload:res}))
  }
}
