import store from '../reducers/combineReducers.jsx'
import { Link, browserHistory } from 'react-router'
import { push, replace, goBack } from 'react-router-redux'
import moment from 'moment';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// import {saveAuthentication} from './actions.jsx'
import axios from 'axios'
var compile_mode = process.env.NODE_ENV


// const baseURL = "http://45.77.45.126/dev/"
const baseURL = "http://prouds2.telkomsigma.co.id/prouds-api/"

// const token = store.getState().auth ? store.getState().auth.token : null
const token = cookies.get('token')
const token_string = `?token=${token}`
console.log(token)
export function login(email, password) {

  store.dispatch({type: 'LOADER', loader:'login-loader', show: true})

  return function (dispatch) {
    return axios({
            method: 'POST',
            url:`${baseURL}login/login`,
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
              store.dispatch({type:'API', name: 'home', data: res})


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


  store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  const token = cookies.get('token')
  const token_string = `?token=${token}`
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}home/detailproject/${id}`+token_string,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },


          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              store.dispatch({type:'API', name: 'project', data: res})
            },

          )
  }
}
export function getDashboardView() {

  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}home?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },


          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              store.dispatch({type:'API', name: 'home', data: res})
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
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}home/p_teammember/${id}?token=${token}`,
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
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}home/projectdoc/${id}?token=${token}` ,
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



export const addDocsAndFiles = (desc,files, id ) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  // console.log("DOCS",data);
  return function(dispatch){
    const formData = new FormData();
    formData.append('desc',data.desc);
    formData.append('document',files[0])
    fetch(`${baseURL}home/documentupload/${id}?token=${token}`,{
      method:'POST',
      body:formData
    })
  }
}

export const getIssue = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}home/projectissue/${id}?token=${token}` ,
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




    // const token = cookies.get('token')
    // return axios({
    //   method:'POST',
    //   url:`${baseURL}home/edit_user?token=${token}`,
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   data:{
    //     no_hp:no_hp,
    //     address:address,
    //     image:image,
    //   }
    // }).then(
    //   (res)=>{
    //     store.dispatch({ type: 'API', name: 'profile', append: true,  data: res });
    //   }
    // )


export const addIssue = (data, id ) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}home/addissue/${id}?token=${token}` ,
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


export const addNewProject = (data,id) => {
  console.log('DATA', data);
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  // const iwo = data.IWO_NO2 != undefined || data.IWO_NO2 != null ? data.IWO_NO2 : data.IWO_NO
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}project/addProject_acion?token=${token}` ,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
              ACTUAL_COST:data.ACTUAL_COST,
              AMOUNT:data.AMOUNT,
              AM_ID:data.AM_ID,
              BU:id,
              COGS:data.COGS,
              CUST_ID:data.CUST_ID,
              DESC:data.DESC,
              END_CUST_ID:data.END_CUST_ID,
              ho_operation:data.HO,
              IWO_NO:iwo,
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
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}home/buDetail?token=${token}`,
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
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}iwo/getIwo?token=${token}`,
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
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}iwo/getIwo/${offset}?token=${token}`,
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
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}project/checkiwoused`+token_string,
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
  const token = cookies.get('token')
  return axios({
          method: 'POST',
          url: `${baseURL}project/editProject_action?token=${token}` ,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            PROJECT_ID:id,
            ACTUAL_COST:data.ACTUAL_COST,
            AMOUNT:data.AMOUNT,
            AM_ID:data.AM_ID,
            BU:data.BU,
            COGS:data.COGS,
            CUST_ID:data.CUST_ID,
            DESC:data.DESC,
            END_CUST_ID:data.END_CUST_ID,
            ho_operation:"yes",
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
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}project/editProject_view/${id}?token=${token}`,

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
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}project/addProject_view?token=${token}`,
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
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}project/spi/${id}?token=${token}` ,
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
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}project/cpi/${id}?token=${token}` ,
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



export const reportMonthly = (bulan,tahun) => {
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}report/r_month?token=${token}` ,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
             },
             data:{
               bulan:bulan,
               tahun:tahun
             }
          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'report', data: res, append:true})
            },
          )
  }

}


export const reportYearly = (tahun) => {
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}report/r_yearly/${tahun}?token=${token}` ,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
             }
          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'report', data: res, append:true})
            },
          )
  }

}

export const reportPeople = (BU_ID,BULAN,TAHUN) => {
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}report/r_people?token=${token}` ,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
             },
             data:{
              BU_ID,
              BULAN,
              TAHUN
             }
          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'report', data: res, append:true})

            },
          )
  }

}



export const getSCurve = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  // store.dispatch({type:'API', data: null, append:true})

  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}project/s_curve/${id}?token=${token}` ,
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
    const token = cookies.get('token')
    return axios({
            method: 'post',
            url: `${baseURL}project/checkAM?token=${token}` ,
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
    const token = cookies.get('token')
    return axios({
      method: 'POST',
      url: `${baseURL}timesheet/view?token=${token}`,
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

export function weekTimesheet(click){
  var date = moment()
  date = date.subtract(click*7, 'days');
  date = date.format("YYYY-MM-DD")
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
      method: 'GET',
      url: `${baseURL}home/timesheet/${date}?token=${token}`,
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
  };
}


export function taskList(project_id) {
  console.log('PROJECT_ID',project_id)
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
      method: 'POST',
      url: `${baseURL}timesheet/taskList?token=${token}`,
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
//       url:`${baseURL}timesheet/addTimesheet/`,
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
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}task/createTask?token=${token}`,
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
    const token = cookies.get('token')
    return axios({
      method:'GET',
      url:`${baseURL}task/createTask_view/${id}?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'taskView',  data: res });

        return res

      }
    )
  }
}

export function addTimesheet(PROJECT_ID,WP_ID,TS_DATE,HOUR,TS_SUBJECT,TS_MESSAGE) {
  const currentDate = moment().format("YYYY-MM-DD");
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}timesheet/addTimesheet?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
            PROJECT_ID,
            WP_ID,
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



export function confirmationTimesheet(ts_id,confirm) {
  return function(dispatch){
    const token = cookies.get('token')
    return axios({

      method:'POST',
      url:`${baseURL}timesheet/confirmationTimesheet?token=${token}`,
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

export function getDay(tanggal) {
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'GET',
      url:`${baseURL}home/timesheet/${tanggal}?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        alert('updated')
      }
    )
  }
}

export function myPerformance(bulan,tahun){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}report/myperformances?token=${token}`,
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
    const token = cookies.get('token')
    return axios({
      method:'GET',
      url:`${baseURL}home/myassignment?token=${token}`,
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
//       url:`${baseURL}task/workplan_view/${id}`,
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
    const token = cookies.get('token')
    return axios({
      method:'GET',
      url:`${baseURL}task/workplan_view/${id}?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'myAssignment',  data: res });
        return res
      }
    )
  }
}

export function uploadWorkplan(project_id,files){ 
  return function(dispatch){ 
    const formData = new FormData() 
    formData.append('project_id',project_id) 
    formData.append('document',files[0]) 
    fetch(`${baseURL}task/upload_wbs?token=${token}`,{ 
      method:'POST', 
      body:formData 
    }) 
  } 
} 

export function getTaskMemberView(project_id,wbs_id){
  return function(dispatch){
    return axios({
      method:'POST',
      // url:`${baseURL}/dev/task/workplan_view/${id}?token=${token}`,
      url:`${baseURL}/dev/task/assignTaskMember_view?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        PROJECT_ID:project_id,
        WBS_ID:wbs_id
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'taskMember',  data: res });
        return res
      }
    )
  }
}

export function assignTaskMember(data){
  return function(dispatch){
    return axios({
      method:'POST',
      url:`${baseURL}/dev/task/assignTaskMemberProject?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        WBS_ID:data.WBS_ID,
        MEMBER:data.MEMBER,
        EMAIL:data.EMAIL,
        NAME:data.NAME,
        WBS_NAME:data.WBS_NAME,
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'taskMember',  data: res });
      }
    )
  }
}

export function getMyActivities(){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'GET',
      url:`${baseURL}home/myactivities?token=${token}`,
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
    const token = cookies.get('token')
    return axios({
      method:'GET',
      url:`${baseURL}report/r_list_bu?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'directorate', append: true,  data: res });
      }
    )
  }
}


export function rDirectorat(bu,tahun){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}report/r_directoratbu?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        bu,
        tahun
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'directorate', append: true,  data: res });
      }
    )
  }
}




export function getDataMaster(data){

  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'GET',
      url:`${baseURL}Datamaster/getData/${data}?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'datamaster', append: true,  data: res });
      }
    )
  }
}


export function getDataMasterMIS(data){
  return function(dispatch){
    const token = cookies.get('token')
    return fetch(`http://10.210.20.2/api/index.php/mis/${data}`,{
    }).then(
      function(res){
        store.dispatch({ type: 'API', name: 'datamasterMIS', append: true,  data: res });
        console.log('FETCH', res)
      }
    )
  }
}


export function addHoliday(data){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}Datamaster/manage/holiday/add?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        HOLIDAY:data.HOLIDAY,
        HOLIDAY_START:data.HOLIDAY_START,
        HOLIDAY_END:data.HOLIDAY_END
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'datamaster', append: true,  data: res });
        store.dispatch(getDataMasterMIS("holiday"))
      }
    )
  }
}

export function updateHoliday(data){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}Datamaster/manage/holiday/update?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        HOLIDAY_ID:data.HOLIDAY_ID,
        HOLIDAY_START:data.HOLIDAY_START,
        HOLIDAY_END:data.HOLIDAY_END,
        HOLIDAY:data.HOLIDAY
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'datamaster', append: true,  data: res });
      }
    )
  }
}

export function deleteHoliday(HOLIDAY_ID){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}Datamaster/manage/holiday/delete?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        HOLIDAY_ID:HOLIDAY_ID
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'datamaster', append: true,  data: res });
      }
    )
  }
}


export function addBU(data){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}Datamaster/manage/bu/add?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        BU_CODE:data.BU_CODE,
        BU_PARENT_ID:data.BU_PARENT_ID,
        BU_NAME:data.BU_NAME,
        BU_ALIAS:data.BU_ALIAS,
        BU_HEAD:data.BU_HEAD
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'datamaster', append: true,  data: res });
        store.dispatch(getDataMasterMIS("bu"))
      }
    )
  }
}




// export function addHoliday(data){
//   return function(dispatch){
//     const token = cookies.get('token')
//     return axios({
//       method:'POST',
//       url:`${baseURL}Datamaster/manage/holiday/add?token=${token}`,
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       data:{
//         HOLIDAY:data.HOLIDAY,
//         HOLIDAY_START:data.HOLIDAY_START,
//         HOLIDAY_END:data.HOLIDAY_END
//       }
//     }).then(
//       (res)=>{
//         store.dispatch({ type: 'API', name: 'datamaster', append: true,  data: res });
//       }
//     )
//   }
// }


export function editProfile(no_hp,address,files){
  return function(dispatch){
    const formData = new FormData();
    formData.append('no_hp',no_hp);
    formData.append('address',address);
    formData.append('image',files[0])
    fetch(`${baseURL}home/edit_user?token=${token}`,{
      method:'POST',
      body:formData
    })
  }
}
