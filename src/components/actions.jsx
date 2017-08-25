import store from '../reducers/combineReducers.jsx'
import { Link, browserHistory } from 'react-router'
import { push, replace, goBack } from 'react-router-redux'
import moment from 'moment';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// import {saveAuthentication} from './actions.jsx'
import axios from 'axios'
var compile_mode = process.env.NODE_ENV
const baseURL = "http://45.77.45.126"
// const token = store.getState().auth ? store.getState().auth.token : null
const token = cookies.get('token')
const token_string = `?token=${token}`
export function login(email, password) {

  store.dispatch({type: 'LOADER', loader:'login-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'POST',
            url:`${baseURL}/dev/login/login`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {user_id: email,
                    password: password,
                    fpid : '160927084946'
                  }
          }).then(
            res => {
              // browserHistory.replace('/')
              console.log("TOKEN", res);
              cookies.set('token', res.data.token, { path: '/' });
              store.dispatch({type:'LOGIN_DATA', data: res})
              if (store.getState().auth.token != undefined) {
                store.dispatch({type:'LOGIN', isloggedin: true})
                store.dispatch(replace('/'))
              }
              else {
                store.dispatch({type: 'LOADER', loader:'login-loader', show: false})

                store.dispatch({type:'LOGIN', isloggedin: false})

              }
              return res
            }
          )
  }
}

export function getProjectDetail(id) {

  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'GET',
            url: `${baseURL}/dev/home/detailproject/${id}?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },


          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              store.dispatch({type:'API', name: 'project', data: res})
            },

          )
  }
}

export function pop(page) {

    const currentPage= store.getState().data.page ? store.getState().data.page.name : null
    return {
      type: 'POP',
      name : page ? page : currentPage
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
  cookies.remove('token')
  return {
    type: 'LOGOUT'
  }
}


export const getProjectTeamMember = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'GET',
            url: `${baseURL}/dev/home/p_teammember/${id}?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },


          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'project',  data: res, append: true})

            },
          )
  }

}



export const getDocsFiles = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'GET',
            url: `${baseURL}/dev/home/projectdoc/${id}?token=${token}` ,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'project', data: res, append:true})

            },
          )
  }

}

export const addDocsAndFiles = (data, id ) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  console.log("DOCS",data);
  return function (dispatch) {
    return axios({
            method: 'POST',
            url: `${baseURL}/dev/home/documentupload/${id}?token=${token}` ,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

            data: {
              'desc': data.desc,
              'document': data.document

            }

          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              // store.dispatch({type:'API', name: 'project', data: res, append:true})
            },
          )
  }
}

export const getIssue = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'POST',
            url: `${baseURL}/dev/home/projectissue/${id}?token=${token}` ,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },


          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'project', data: res, append:true})

            },
          )
  }

}



export const addIssue = (data, id ) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'POST',
            url: `${baseURL}/dev/home/addissue/${id}?token=${token}` ,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              'PROJECT_ID':id,
              'SUBJECT':data.SUBJECT,
              'MESSAGE':data.MESSAGE,
              'PRIORITY':data.PRIORITY,
              'file_upload':data.file_upload
            }

          }).then(
            res => {
              dispatch(getIssue(id))
              console.log(res.data);
            },
          )
  }
}


export const addNewProject = (data) => {
  console.log('DATA', data);
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'POST',
            url: `${baseURL}/dev/project/addProject_acion?token=${token}` ,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
              ACTUAL_COST:data.ACTUAL_COST,
              AMOUNT:data.AMOUNT,
              AM_ID:data.AM_ID,
              BU:'TMS',
              COGS:data.COGS,
              CUST_ID:data.CUST_ID,
              DESC:data.DESC,
              END_CUST_ID:data.END_CUST_ID,
              // H/O:"yes",
              IWO_NO:data.IWO_NO,
              MARGIN:data.MARGIN,
              OVERHEAD:data.OVERHEAD,
              PM:data.PM,
              PRODUCT_TYPE:data.PRODUCT_TYPE,
              PROJECT_NAME:data.PROJECT_NAME,
              PROJECT_STATUS:data.PROJECT_STATUS,
              PROJECT_TYPE_ID:data.PROJECT_TYPE_ID,
              RELATED:data.RELATED,
              TYPE_OF_EFFORT:data.TYPE_OF_EFFORT,
              TYPE_OF_EXPENSE:data.TYPE_OF_EXPENSE,
              VISIBILITY:data.VISIBILITY
            }
          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              dispatch(goBack())
              console.log("RES",res.data);
              // store.dispatch({type:'API', name: 'project', data: res, append:true})
            },
            req => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log("REQ",req);
              // store.dispatch({type:'API', name: 'project', data: res, append:true})
            },
          )
  }
}

export const getBusinessUnitDetail = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'POST',
            url: `${baseURL}/dev/home/buDetail?token=${token}`,
            data: {
              bu_code: id,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },


          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'business_unit', data: res})

            },
          )
  }

}

export const getIWOEditProject = (offset) => {
  return function (dispatch) {
    return axios({
            method: 'GET',
            url: `${baseURL}/dev/iwo/getIwo/${offset}?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

          }).then(
            res => {
              store.dispatch({type:'API', name: 'project', data: res, append:true})

              console.log(res.data);
              return res

            },
          )
  }

}



export const getIWO = (offset) => {
  return function (dispatch) {
    return axios({
            method: 'GET',
            url: `${baseURL}/dev/iwo/getIwo/${offset}?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },


          }).then(
            res => {
              store.dispatch({type:'API', name: 'new_project', data: res, append: true})

              console.log(res.data);
              return res
            },
          )
  }

}

export const checkIWOUsed = (iwo) => {
  return function (dispatch) {
    return axios({
            method: 'POST',
            url: `${baseURL}/dev/project/checkiwoused`+token_string,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
              IWO_NO: iwo
            }

          }).then(
            res => {

              return res
            },
          )
  }

}


export const editProject = (data, id) => 
// store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

 function (dispatch) {
  return axios({
          method: 'POST',
          url: `${baseURL}/dev/project/editProject_action?token=${token}` ,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            PROJECT_ID:id,
            ACTUAL_COST:data.ACTUAL_COST,
            AMOUNT:data.AMOUNT,
            AM_ID:data.AM_ID,
            BU:'TMS',
            COGS:data.COGS,
            CUST_ID:data.CUST_ID,
            DESC:data.DESC,
            END_CUST_ID:data.END_CUST_ID,
            // H/O:"yes",
            IWO_NO:data.IWO_NO,
            MARGIN:data.MARGIN,
            OVERHEAD:data.OVERHEAD,
            PM:data.PM,
            PRODUCT_TYPE:data.PRODUCT_TYPE,
            PROJECT_NAME:data.PROJECT_NAME,
            PROJECT_STATUS:data.PROJECT_STATUS,
            PROJECT_TYPE_ID:data.PROJECT_TYPE_ID,
            RELATED:data.RELATED,
            TYPE_OF_EFFORT:data.TYPE_OF_EFFORT,
            TYPE_OF_EXPENSE:data.TYPE_OF_EXPENSE,
            VISIBILITY:data.VISIBILITY,
            START:moment(data.START).format('YYYY-MM-DD'),
            END:moment(data.END).format('YYYY-MM-DD')
            

          }
        }).then(
          res => {
            // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
            console.log("RES",res.data);
            // store.dispatch({type:'API', name: 'project', data: res, append:true})
          },
          req => {
            // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
            console.log("REQ",req);
            // store.dispatch({type:'API', name: 'project', data: res, append:true})
          },
        )
};

export const getEditProjectView = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'POST',
            url: `${baseURL}/dev/project/editProject_view/${id}?token=${token}`,

            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
             }
          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'project', append: true, data: res})
              return res
            },
            req => {

            }
          )
  }

}


export const getAddProjectView = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'POST',
            url: `${baseURL}/dev/project/addProject_view?token=${token}`,
            data: {
              bu_code: id,
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
             }

          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'new_project',data: res})
              return res
            },
          )
  }

}

export const getSPI = (id) => {
  return function (dispatch) {
    return axios({
            method: 'GET',
            url: `${baseURL}/dev/project/spi/${id}?token=${token}` ,
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

export const getCPI = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'GET',
            url: `${baseURL}/dev/project/cpi/${id}?token=${token}` ,
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

export const getSCurve = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  // store.dispatch({type:'API', data: null, append:true})

  return function (dispatch) {
    return axios({
            method: 'GET',
            url: `${baseURL}/dev/project/s_curve/${id}?token=${token}` ,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },


          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'project', data: res})

            },
          )
  }
}

export const getAccountManager = (am_id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'post',
            url: `${baseURL}/dev/project/checkAM?token=${token}` ,
            headers: {
              // 'token': {token},
              'Content-Type': 'application/x-www-form-urlencoded',
              // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
            data: {
              AM_ID: am_id
            }

          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', data: res, append:true})

            },
          )
  }
}




export function viewTimesheet(date) {
  // store.dispatch({type: 'LOADER', loader:'login-loader', show: true})
  return function (dispatch) {
    return axios({
      method: 'POST',
      url: `${baseURL}/dev/timesheet/view?token=${token}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {date:date}

    }).then(
            (res) => {
              // alert('timesheed fetched');
              store.dispatch({ type: 'API', name: 'timesheet', data: res });
            },

          )
          .catch(error => {
            if (error.response) {
              alert('error');
            }
          });

  };
}


export function taskList(project_id) {
  console.log('PROJECT_ID',project_id)
  return function (dispatch) {
    return axios({
      method: 'POST',
      url: `${baseURL}/dev/timesheet/taskList?token=${token}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {PROJECT_ID: project_id}

    }).then(
            (res) => {
              alert('fetched tasklist');
              store.dispatch({ type: 'API', name: 'timesheet' ,
                data: res, append: true}
              );
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

export function addTaskWorkplan(id,data) {
  return function(dispatch){
    return axios({
      method:'POST',
      url:`${baseURL}/dev/task/createTask?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        PROJECT_ID: id,
        WBS_NAME: data.WBS_NAME,
        WBS_PARENT_ID: data.WBS_PARENT_ID,
        START_DATE: data.START_DATE,
        FINISH_DATE: data.FINISH_DATE
        }
    }).then(
      (res)=>{
        console.log('ADD TASK SUCCESSFULL', res);
        store.dispatch(getWorkplanView(id))
        return res
        // store.dispatch(viewTimesheet(currentDate));

      }
    )
  }
}

export function getTaskView(id) {
  return function(dispatch){
    return axios({
      method:'GET',
      url:`${baseURL}/dev/task/createTask_view/${id}?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'taskView',  data: res });

        return res

      }
    )
  }
}

export function getEditTaskView(id,data) {
  return function(dispatch){
    return axios({
      method:'GET',
      url:`${baseURL}/dev/task/edittask_view?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'edittaskView',  data: res });

        return res

      }
    )
  }
}

export function editTaskPercent(id) {
  return function(dispatch){
    return axios({
      method:'POST',
      url:`${baseURL}/dev/task/editTaskPercent?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        PROJECT_ID:data.PROJECT_ID,
        WBS_ID:data.WBS_ID,
        WORK_PERCENT_COMPLETE:data.WORK_PERCENT_COMPLETE,
        START_DATE: data.START_DATE,
        FINISH_DATE: data.FINISH_DATE
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'edittask',  data: res });

        return res

      }
    )
  }
}



export function getAssignTaskMemberView(id,data) {
  return function(dispatch){
    return axios({
      method:'POST',
      url:`${baseURL}/dev/task/assignTaskMember_view?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'edittaskView',  data: res });

        return res

      }
    )
  }
}

export function AssignTaskMember(id,data) {
  return function(dispatch){
    return axios({
      method:'POST',
      url:`${baseURL}/dev/task/assignTaskMemberProject/?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },     
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'edittaskView',  data: res });

        return res

      }
    )
  }
}


export function addTimesheet(WP_ID,TS_DATE,HOUR,TS_SUBJECT,TS_MESSAGE) {
  const currentDate = moment().format("YYYY-MM-DD");
  return function(dispatch){
    return axios({
      method:'POST',
      url:`${baseURL}/dev/timesheet/addTimesheet?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: { WP_ID,
              TS_DATE,
             HOUR,
             TS_SUBJECT,
             TS_MESSAGE,
             LATITUDE:'38.898648',
             LONGITUDE:'77.037692'
            }
    }).then(
      (res)=>{
        console.log("ADDTIMESHEET");
        alert('successful')
        store.dispatch(viewTimesheet(TS_DATE));
      }
    )
  }
}

// export function addTimesheet(values) {
//   return function(dispatch){
//     return axios({
//       method:'POST',
//       url:`${baseURL}/dev/timesheet/addTimesheet/`,
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       data: {values}
//     }).then(
//       (res)=>{
//         alert('timesheet updated');
//       }
//     )
//   }
// }



export function confirmationTimesheet(ts_id,confirm) {
  return function(dispatch){
    return axios({
      method:'POST',
      url:`${baseURL}/dev/timesheet/confirmationTimesheet?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {ts_id,confirm}
    }).then(
      (res)=>{
        store.dispatch(getMyActivities());
        alert('updated')
      }
    )
  }
}

export function myPerformance(bulan,tahun){
  return function(dispatch){
    return axios({
      method:'POST',
      url:`${baseURL}/dev/report/myperformances?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {bulan,tahun}
    }).then(
      (res)=>{
        dispatch({ type: 'API', name: 'myPerformance',  data: res });
      }
    )
  }
}

export function getMyAssignment(){
  return function(dispatch){
    return axios({
      method:'GET',
      url:`${baseURL}/dev/home/myassignment?token=${token}`,
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'myAssignment',  data: res });
        console.log(token);
      }
    )
  }
}

// export function getWorkplanView(id){
//   return function(dispatch){
//     return axios({
//       method:'GET',
//       url:`${baseURL}/dev/task/workplan_view/${id}`,
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     }).then(
//       (res)=>{
//         store.dispatch({ type: 'API', name: 'myAssignment',  data: res });
//         return res
//       }
//     )
//   }
// }


export function getWorkplanView(id){
  return function(dispatch){
    return axios({
      method:'GET',
      url:`${baseURL}/dev/task/workplan_view/${id}?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'myAssignment',  data: res });
        return res
      }
    )
  }
}

export function getMyActivities(){
  return function(dispatch){
    return axios({
      method:'GET',
      url:`${baseURL}/dev/home/myactivities?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'myActivity', append: true,  data: res });
      }
    )
  }
}


export function getListBU(){
  return function(dispatch){
    return axios({
      method:'GET',
      url:`${baseURL}/dev/report/r_list_bu?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'directorate', append: true,  data: res });
      }
    )
  }
}



export function getDirectoratBU(bu,tahun){
  return function(dispatch){
    return axios({
      method:'GET',
      url:`${baseURL}/dev/report/r_directoratbu?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        bu: bu,
        tahun:tahun
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'directorate', append: true,  data: res });
      }
    )
  }
}


