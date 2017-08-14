import store from '../reducers/combineReducers.jsx'
import { Link, browserHistory } from 'react-router'
import { push, replace } from 'react-router-redux'
import moment from 'moment';

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
              store.dispatch({type:'API', name: 'login', data: res, append: false})
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

  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

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
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              store.dispatch({type:'API', name: 'project', data: res})

            },

          )
  }
}

export function pop() {

    const currentPage= store.getState().data.page ? store.getState().data.page.name : null
    return {
      type: 'POP',
      name : currentPage
    }

}

export function changeRoute(params) {
  switch (params.type) {
    case 'PUSH':
      var id = params.page.id ? '/' + params.page.id : ''
      store.dispatch(push(`/${params.page.name}${id}`))
      break;
    case 'REPLACE':
      store.dispatch(replace(params.path))
      break;
    default:
  }
  return {
    type: params.type,
    page: params.page
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
              store.dispatch({type:'API', name: 'project', append: true, data: res})

            },
          )
  }

}


export const getDocsFiles = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'GET',
            url: `${baseURL}/dev/test/projectdoc/${id}` ,
            headers: {
              // 'token': '369e1dc5052347b7f5118cdc66f34fdd',
              'Content-Type': 'application/x-www-form-urlencoded'
             }

          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'project', data: res, append:true})

            },
          )
  }

}

export const getBusinessUnitDetail = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'GET',
            url: `${baseURL}/dev/test/buDetail/`,
            data: {
              bu_code: id,
            },
            headers: {
              // 'token': '369e1dc5052347b7f5118cdc66f34fdd',
              'Content-Type': 'application/x-www-form-urlencoded'
             }

          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'business_unit', data: res})

            },
          )
  }

}



export function viewTimesheet(date) {
  store.dispatch({type: 'LOADER', loader:'login-loader', show: true})
  return function (dispatch) {
    return axios({
      method: 'POST',
      url: `${baseURL}/dev/timesheettest/view/`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {date:date}

    }).then(
            (res) => {
              // alert('timesheed fetched');
              store.dispatch({ type: 'API', name: 'timesheet', append: true, data: res });
            },

          );
  };
}


export function taskList(project_id) {
  console.log('PROJECT_ID',project_id)
  return function (dispatch) {
    return axios({
      method: 'POST',
      url: `${baseURL}/dev/timesheettest/taskList/`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {PROJECT_ID: project_id}

    }).then(
            (res) => {
              // alert('fetched tasklist');
              store.dispatch({ type: 'API', name: 'timesheet', append: true, data: res });
            },

          );
  };
}


// export function addTimesheet(TS_DATE,HOUR,TS_SUBJECT,TS_MESSAGE,WP_ID) {
//   return function(dispatch){
//     return axios({
//       method:'POST',
//       url:`${baseURL}/dev/timesheet/addTimesheet/`,
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       data: {TS_DATE: TS_DATE,
//                     HOUR: HOUR,
//                     WP_ID:WP_ID,
//                     TS_SUBJECT : TS_SUBJECT,
//                     TS_MESSAGE:TS_MESSAGE
//                   }
//     }).then(
//       (res)=>{
//         alert('timesheet updated');
//       }
//     )
//   }
// }

export function addTimesheet(WP_ID,TS_DATE,HOUR,TS_SUBJECT,TS_MESSAGE) {
   const currentDate = moment().format("YYYY-MM-DD");
  return function(dispatch){
    return axios({
      method:'POST',
      url:`${baseURL}/dev/timesheettest/addTimesheet/`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {WP_ID: WP_ID,
             TS_DATE: TS_DATE,
             HOUR:HOUR,
             TS_SUBJECT:TS_SUBJECT,
             TS_MESSAGE:TS_MESSAGE,
             LATITUDE:'38.898648',
             LONGITUDE:'77.037692'
            }
    }).then(
      (res)=>{
        console.log("ADDTIMESHEET");
        store.dispatch(viewTimesheet(currentDate));

      }
    )
  }
}

// export function addTimesheet(values) {
//   return function(dispatch){
//     return axios({
//       method:'POST',
//       url:`${baseURL}/dev/timesheettest/addTimesheet/`,
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       data: {values}
//     }).then(
//       (res)=>{
//         alert('timesheet updated');
//       }
//     )
//   }
// }



export function confirmationTimesheet(TS_ID,confirm) {
   const currentDate = moment().format("YYYY-MM-DD");
  return function(dispatch){
    return axios({
      method:'POST',
      url:`${baseURL}/dev/timesheettest/confirmationTimesheet/`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {TS_ID:TS_ID,
            confirm:confirm
            }
    }).then(
      (res)=>{
        store.dispatch(viewTimesheet(currentDate));
      }
    )
  }
}
