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
                store.dispatch(push('/'))
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

export function getData(data, callback) {
  if (compile_mode == 'mock') {
    alert('getting MOCK');


    console.log('mock', getMock(data, callback));
    var state = {
      type : data.type,
      res : getMock(data, callback)
    }
    return state
  }
  else {
    alert('getting API');
    var state = {
      type : data.type,
      res : getAPI(data, callback)
    }
    return state

  }
}

// export function getMock(data, callback) {
//   // setTimeout(() => {
//     var endpoint = data.request.url.slice(1).replace(/\//g, '--').split('?')[0]
//     // var path = "../../mock/" + endpoint +".json"
//     var path = "../../mock/dev--login--login.json"
//
//     var result = require('../../mock/' + data.method +  '/' + data.request.api + '/' + endpoint)
//     if (callback) {
//       callback(result)
//     }
//     return result
//     // console.log('json', result);
//   // },20)
//
// }
//
//
// export function getAPI(data, callback) {
//   switch (data.method) {
//     case 'POST':
//     axios({
//       method: 'post',
//       url: "http://45.77.45.126/dev/login/login",
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       data: data.request.params
//     }).then(function (response) {
//       if(callback) {
//         callback(response)
//       }
//       return response
//     }).catch(function (error) {
//       console.log(error);
//     });
//       break;
//     case 'GET':
//
//       break;
//     default:
//   }
// }
// export function saveAuthentication(data) {
//   axios({
//     method: 'post',
//     url: "http://45.77.45.126/dev/login/login",
//     params: {
//       user_id: 'gina.nufus@sigma.co.id',
//       password: 'S201502162',
//       fpid : '160927084946'
//     }
//   }).then(function (response) {
//     console.log(response);
//     store.dispatch(saveAuthentication(response.data))
//     browserHistory.push('/')
//   }).catch(function (error) {
//     alert('fail')
//     console.log(error);
//   });
//
//   return {
//     type : 'API',
//     isloggedin : true,
//     bussines_unit : data.bussines_unit,
//     datatimesheet : data.datatimesheet,
//     userdata : data.userdata,
//     projects : data.projects
//   }
// }
// export function deleteAuthentication() {
//   return {
//     type : 'API',
//     isloggedin : false,
//     bussines_unit : null,
//     datatimesheet : null,
//     userdata : null,
//     projects : null
//   }
// }
