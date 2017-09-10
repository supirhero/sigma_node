import store from '../reducers/combineReducers.jsx'
import { Link, browserHistory } from 'react-router'
import { push, replace, goBack } from 'react-router-redux'
import moment from 'moment';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// import {saveAuthentication} from './actions.jsx'
import axios from 'axios'
var compile_mode = process.env.NODE_ENV

import fileDownload from 'react-file-download';
// const baseURL = "http://45.77.45.126/dev/"
const baseURL = "http://prouds2.telkomsigma.co.id/prouds-api/"

// const token = store.getState().auth ? store.getState().auth.token : null
const token = cookies.get('token')
const token_string = `?token=${token}`
console.log(token)


axios.interceptors.response.use(undefined, function (error) {
  if(error.response.status && error.response.status === 404) 
  {
    
    showNotif('404 Page not found', 'RED')
    store.dispatch(goBack())
    // ipcRenderer.send('response-unauthenticated');
    return Promise.reject(error);
  }
  else if(error.response.status && error.response.status === 403) 
    {
      console.log('ERROR', error)
      showNotif(error.response.data.message, 'RED')
      store.dispatch(replace('/'))
      // ipcRenderer.send('response-unauthenticated');
      return Promise.reject(error);
    }
  else if(error.response.status && error.response.status === 400) {
    console.log('ERROR', error)
    showNotif(error.response.data.message, 'RED')
    // ipcRenderer.send('response-unauthenticated');
    return Promise.reject(error);
  }
  else if(error.response.status && error.response.status === 401) {
    showNotif(error.response.data.message, 'RED')
    store.dispatch(logout())
    store.dispatch(replace('/auth'))
    
    return Promise.reject(error);
  }
});


export function login(email, password) {
  store.dispatch({type: 'LOAD', name:'login', show: true})
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
              store.dispatch({type: 'LOAD', loader:'login', show: false})
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
                store.dispatch({type: 'LOAD', name:'login', show: false})

                store.dispatch({type:'LOGIN', isloggedin: false})

              }
              return res
            }
          )
          .catch(
            res=>{
              store.dispatch({type: 'LOAD', name:'login', show: false})
              
              store.dispatch({type: 'LOADER', loader:'login-loader', show: false})
              
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
              return res
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


export const getAvailableProjectTeamMember = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}project/availableMember/${id}?token=${token}`,
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

export const assignProjectTeamMember = (id,user_id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}project/projectmemberadd/${id}?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              USER_ID:user_id
            }
          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              // store.dispatch(getAvailableProjectTeamMember(id))
              store.dispatch({type:'API', name: 'project',  data: res, append: true})
              res.data.status == "Error" ? 
              alert("Gagal, User sudah ada di dalam project") : alert("Berhasil menambahkan user ke dalam project"),()=>{
              }
            },
          )
  }
}

export const registerVendor = (props) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}login/doRegistration`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              submit: 'registVendor',
              V_EMAIL_SUP : props.V_EMAIL_SUP,
              V_EMAIL: props.V_EMAIL,
              V_USER_ID: props.V_USER_ID,
              V_USER_NAME:props.V_USER_NAME,
              V_PASSWORD: props.V_PASSWORD,
            }
          }).then(
            res => {
            },
          )
  }
}

export const registerSigma = (props) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}login/doRegistration`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              submit: 'registSigma',
              EMAIL: props.V_EMAIL,
              USER_ID: props.V_USER_ID,
              USERNAME:props.V_USER_NAME,
              PASSWORD: props.V_PASSWORD,
            }
          }).then(
            res => {
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

export const deleteProjectDoc = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}home/deleteprojectdoc/${id}?token=${token}` ,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              doc_id:id
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




export const addDocsAndFiles = (desc,files, id ) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  // console.log("DOCS",data);
  return function(dispatch){
    const formData = new FormData();
    formData.append('desc',desc);
    formData.append('document',files[0])
    return fetch(`${baseURL}home/documentupload/${id}?token=${token}`,{
      method:'POST',
      body:formData
    }).then(
      res => {
        // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
        
        store.dispatch({type:'API', name: 'project', data: res, append:true})


      },
    )
  }
}

export const deleteTask = (wbs_id ) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  // console.log("DOCS",data);
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}task/deleteTask?token=${token}` ,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
              wbs_id: wbs_id
            }

          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              // store.dispatch({type:'API', name: 'project', data: res, append:true})
              return res
            },
          )
  }
}



export const getIssue = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'GET',
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




export const addIssue = (id,SUBJECT,MESSAGE,PRIORITY,file_upload) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  // console.log("DOCS",data);
  return function(dispatch){
    const formData = new FormData();
    formData.append('PROJECT_ID',id);
    formData.append('SUBJECT',SUBJECT);
    formData.append('MESSAGE',MESSAGE);
    formData.append('PRIORITY',PRIORITY);
    formData.append('file_upload',file_upload[0])
    return fetch(`${baseURL}home/addissue/${id}?token=${token}`,{
      method:'POST',
      body:formData
    })
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
              AMOUNT:parseFloat(data.AMOUNT),
              AM_ID:data.AM_ID,
              BU:id2323,
              COGS:data.COGS,
              CUST_ID:data.CUST_ID,
              DESC:data.DESC,
              END_CUST_ID:data.END_CUST_ID,
              ho_operation:data.HO,
              IWO_NO:data.IWO_NO,
              MARGIN:parseFloat(data.MARGIN),
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

export const getBusinessUnitDetail = (id,STATUS,PROJECT_TYPE,EFFORT_TYPE,KEYWORD) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}home/buDetail?token=${token}`,
            data: {
              bu_code: id,
              STATUS,
              PROJECT_TYPE,
              EFFORT_TYPE,
              KEYWORD
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
            AMOUNT:parseFloat(data.AMOUNT),
            AM_ID:data.AM_ID,
            BU:data.BU,
            COGS:data.COGS,
            CUST_ID:data.CUST_ID,
            DESC:data.DESC,
            END_CUST_ID:data.END_CUST_ID,
            HO:data.HO,
            IWO_NO:data.IWO_NO,
            MARGIN:parseFloat(data.MARGIN),
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

export const reportEntryBu = (bu_id,tahun) => {
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}report/r_entry_bu?token=${token}` ,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
             },
             data:{
               bu_id:bu_id,
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


export const reportUtilBu = (bu_id,tahun) => {
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}report/r_util_bu?token=${token}` ,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
             },
             data:{
               bu_id:bu_id,
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

export const reportDownloadFilt2er = (status, schedule, budget) => {
  const formData = new FormData();
  return function (dispatch) {
    const token = cookies.get('token')
    formData.append('status',status)
    formData.append('schedule',schedule)
    formData.append('budget',budget)
    
    
    return fetch(`${baseURL}report/report_filter_download?token=${token}`,{
      method:'GET',
      body:formData,
      headers: {
        Accept: 'application/json',
      },
    }).then(
            res => {
              fileDownload(res,'report.xls' )
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.json());
              // store.dispatch({type:'API', name: 'report', data: res, append:true})

            },
          )
  }

}

export const reportDownloadFilter = (status, schedule, budget, keyword) => {
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}report/report_filter_download?token=${token}` ,
            headers: {
              
              'Content-Type': 'application/x-www-form-urlencoded'
             },
             responseType: "arraybuffer",
             data:{
              // value:props.value,
              status: status,
              schedule: schedule,
              budget: budget,
              keyword:keyword
             }
          }).then(
            res => {
              fileDownload(res.data, 'report.xls' )
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              // store.dispatch({type:'API', name: 'report', data: res, append:true})

            },
          )
  }

}

export const reportSearchProject = (status, schedule, budget, keyword, page, limit) => {
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}report/report_filter?token=${token}` ,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
             },
             data:{
              // value:props.value,
              status: status,
              schedule: schedule,
              budget: budget,
              keyword:keyword,
              page: page,
              limit:limit ? limit : 5,

              
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
              store.dispatch({type:'API', append:true, name: 'project', data: res})

            },
          )
  }
}

export const acceptRebaseline = (id) => {
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}project/accept_rebaseline?token=${token}` ,
            headers: {
              // 'token': {token},
              'Content-Type': 'application/x-www-form-urlencoded',
              // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
            data: {
              project_id: id
            }
       

          }).then(
            res => {
              return res
            },
          )
  }
}

export const denyRebaseline = (id) => {
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}project/deny_rebaseline?token=${token}` ,
            headers: {
              // 'token': {token},
              'Content-Type': 'application/x-www-form-urlencoded',
              // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
            data: {
              project_id: id
            }

          }).then(
            res => {
              return res
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

export function addTaskWorkplan(id,wbs_id,data) {
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}task/createTask?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        PROJECT_ID: id,
        // WBS_ID: wbs_id,
        WBS_NAME: data.WBS_NAME,
        WBS_PARENT_ID: data.WBS_PARENT_ID,
        
        START_DATE: moment(data.START_DATE).format('YYYY-MM-DD'),
        FINISH_DATE: moment(data.FINISH_DATE).format('YYYY-MM-DD')
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

export function getCreateTaskView(id) {
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
        // store.dispatch(viewTimesheet(TS_DATE));


      }
    )
  }
}

export function resubmitTimesheet(props) {
  const currentDate = moment().format("YYYY-MM-DD");
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}timesheet/editTimesheet?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
           PROJECT_ID:props.PROJECT_ID,
           WP_ID:props.WP_ID,
            TS_ID:props.TS_ID,
            TS_DATE:props.TS_DATE,
             HOUR:props.HOUR,
             TS_SUBJECT:props.TS_SUBJECT,
             TS_MESSAGE:props.TS_MESSAGE,
             LATITUDE:'38.898648',
             LONGITUDE:'77.037692'
            }
    }).then(
      (res)=>{
        console.log("ADDTIMESHEET");
        alert('successful')
        // store.dispatch(viewTimesheet(TS_DATE));


      }
    )
  }
}





export function confirmationTimesheet(ts_id,project_id,confirm) {
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}timesheet/confirmationTimesheet?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {ts_id,project_id,confirm}
    }).then(
      (res)=>{
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
    const token = cookies.get('token')
    const formData = new FormData()
    formData.append('project_id',project_id)
    formData.append('document',files[0])
    store.dispatch({type: 'LOAD', name:'upload_workplan', show: true})
    
    return fetch(`${baseURL}task/upload_wbs?token=${token}`,{
      method:'POST',
      body:formData
    }).then(res=> {
      store.dispatch({
        type: 'POPUP',
        name: 'uploadWorkplan',
        data: {
          active: false,
        },
      });
      store.dispatch({type: 'LOAD', name:'upload_workplan', show: false})
      showNotif('Successfully uploaded workplan', 'GREEN') 

      return res
    }).catch(
      res => {
        showNotif('Failed uploading workplan', 'RED') 
        store.dispatch({type: 'LOAD', name:'upload_workplan', show: false})
      
      }
    )
  }
}

export function getTaskMemberView(project_id,wbs_id){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      // url:`${baseURL}/dev/task/workplan_view/${id}?token=${token}`,
      url:`${baseURL}task/assignTaskMember_view?token=${token}`,
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


export function assignTaskMember(props,RP_ID,EMAIL,NAME){

  return function(dispatch){
    return axios({
      method:'POST',
      url:`${baseURL}task/assignTaskMemberProject?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        WBS_ID:props.WBS_ID,
        MEMBER:RP_ID,
        EMAIL:EMAIL,
        NAME:NAME,
        WBS_NAME:props.WBS_NAME,
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'taskMember',  data: res });
      }
    )
  }
}

export function getMyActivities(bulan,tahun){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}home/myactivities?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        bulan,
        tahun
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'myActivity', append: true,  data: res });
      }
    )
  }
}


export function getProjectActivities(id){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'GET',
      url:`${baseURL}home/projectactivities/${id}/?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'project', append: true,  data: res });
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
export function getEditTaskView(wbs_id){
  console.log('VALUEE', wbs_id);
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'GET',
      url:`${baseURL}task/edittask_view/${wbs_id}?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: '', append: true,  data: res });
        return res
      }
    )
  }
}

export function getDirectorateEntry(bu_id, year){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}report/r_entry_bu/?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data : {
        bu_id : bu_id,
        tahun: year
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: '', append: true,  data: res });
        return res
      }
    )
  }
}

export function getDirectorateUtility(bu_id, year){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}report/r_util_bu/?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data : {
        bu_id : bu_id,
        tahun: year
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: '', append: true,  data: res });
        return res
      }
    )
  }
}

export function editTaskAction(id,WBS_ID,data){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}task/edittask_action?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        project_id: id,
        wbs_id: WBS_ID,
        wbs_parent_id: data.PARENT_EDIT,
        wbs_name: data.NAME_EDIT,
        start_date: moment(data.START_DATE_EDIT).format('YYYY-MM-DD'),
        finish_date: moment(data.FINISH_DATE_EDIT).format('YYYY-MM-DD')
        
      }
    }).then(
      (res)=>{
        store.dispatch(getWorkplanView(id));
        return res
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


function showNotification(message) {
  return {
    type:'ALERT',
    show: true,
    message: message
    
  }
}

function hideNotification() {
  return {
    type:'ALERT',
    show: false,
    message: ''
    
  }
}
export function showNotif(message, color) {

  store.dispatch({
    type:'ALERT',
    show: true,
    color: color ,
    message: message
    
  })

  setTimeout(
    function() {
      store.dispatch({
        type:'ALERT',
        show: false,
        message: ''
        
      })

    }
    , 6000);
 
  
}


export function requestRebaseline(id, props, array){
  console.log('PROPSSSSSSS', props)
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}project/rebaseline/${id}?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        array: array,
        project_id: id ,
        evidence: props.evidence ,
        reason: props.reason ,
      }
    }).then(
      (res)=>{
        return res
        // store.dispatch({ type: 'API', name: 'datamaster', append: true,  data: res });
      }
    )
  }
}




export const requestRebaselineFetch = (id,reason,files ) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  // console.log("DOCS",data);
  return function(dispatch){
    const token = cookies.get('token')
    const formData = new FormData();
    // formData.append('array',array);
    formData.append('evidence',files[0])
    formData.append('project_id',id)
    formData.append('reason',reason)
    return fetch(`${baseURL}project/rebaseline/${id}?token=${token}`,{
      method:'POST',
      body:formData
    }).then(
      res => {
        // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
        
        


      },
    )
  }
}


export function getDataMaster(data,keyword){

  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'GET',
      url:`${baseURL}Datamaster/getData/${data}/${keyword}?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'datamaster', append: true,  data: res });
      }
    )
  }
}

export function getDataMasterUser(){
  
    return function(dispatch){
      const token = cookies.get('token')
      return axios({
        method:'GET',
        url:`${baseURL}datamaster/getData/user?token=${token}`,
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
      mode : 'no-cors',
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'datamaster', append: true,  data: res });
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
        HOLIDAY: data.HOLIDAY,
        HOLIDAY:data.HOLIDAY,
        HOLIDAY_START:moment(data.HOLIDAY_START).format('YYYY-MM-DD'),
        HOLIDAY_END:moment(data.HOLIDAY_END).format('YYYY-MM-DD')
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
        HOLIDAY_ID:data.HOLIDAY_ID_EDIT,
        HOLIDAY_START:moment(data.HOLIDAY_START_EDIT).format('YYYY-MM-DD'),
        HOLIDAY_END:moment(data.HOLIDAY_END_EDIT).format('YYYY-MM-DD'),
        HOLIDAY:data.HOLIDAY_EDIT
      }
    }).then(
      (res)=>{
        store.dispatch({ type: 'API', name: 'datamaster', append: true,  data: res });
        return res
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
        // store.dispatch({ type: 'API', name: 'datamaster', append: true,  data: res });
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

export function editBU(data){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}Datamaster/manage/bu/update?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        BU_CODE:data.BU_CODE_EDIT,
        BU_ID:data.BU_PARENT_ID_EDIT,
        BU_NAME:data.BU_NAME_EDIT,
        BU_ALIAS:data.BU_ALIAS_EDIT,
        BU_HEAD:data.BU_HEAD_EDIT
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
// export


export function editProfile(no_hp,address,files){
  return function(dispatch){
    const formData = new FormData();
    formData.append('no_hp',no_hp);
    formData.append('address',address);
    formData.append('image',files ? files[0] : null)
    return fetch(`${baseURL}home/edit_user?token=${token}`,{
      method:'POST',
      body:formData
    }).then(
      (res)=>{
        // store.dispatch(viewTimesheet(TS_DATE));


      }
    )
  }
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


export function baseline(id) {
  const token = cookies.get('token')
    return function (dispatch) {
      return axios({
              method: 'GET',
              url: `${baseURL}project/baseline/${id}?token=${token}`,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(
              res => {
                store.dispatch({type:'API', name: 'project', data: res})
              },
  
            )
    }
  }
  


export function getProfile() {
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}role/getprofile?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          }).then(
            res => {
              store.dispatch({type:'API', name: 'roles', data: res})
            },

          )
  }
}


export function editProfileView(profile_id){
  store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  const token = cookies.get('token')
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}role/editprofile_view?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              profile_id
            }
          }).then(
            res => {
              store.dispatch({type:'API', name: 'roles', data: res})
              return res
            },

          )
  }
}

export function editProfileAction(props){
  store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  const token = cookies.get('token')
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}role/editprofile_action?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              profile_id:props.profile_id,
              role_name:props.role_name,
              role_desc:props.role_desc,
              role_1:props.role_1,
              role_2:props.role_2,
              role_3:props.role_3,
              role_4:props.role_4,
              role_5:props.role_5,
              role_6:props.role_6,
              role_7:props.role_7,
              role_8:props.role_8,
              role_9:props.role_9,
              role_10:props.role_10,
              role_11:props.role_11,
              role_12:props.role_12,
              role_13:props.role_13,
              role_14:props.role_14,
              role_15:props.role_15,
            }
          }).then(
            res => {
              store.dispatch({type:'API', name: 'roles', data: res})
            },

          )
  }
}




export function createProfile(props){
  store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  const token = cookies.get('token')
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}role/createprofile?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              role_name:props.role_name,
              role_desc:props.role_desc,
              role_1:props.role_1,
              role_2:props.role_2,
              role_3:props.role_3,
              role_4:props.role_4,
              role_5:props.role_5,
              role_6:props.role_6,
              role_7:props.role_7,
              role_8:props.role_8,
              role_9:props.role_9,
              role_10:props.role_10,
              role_11:props.role_11,
              role_12:props.role_12,
              role_13:props.role_13,
              role_14:props.role_14,
              role_15:props.role_15,
            }
          }).then(
            res => {
              store.dispatch({type:'API', name: 'roles', data: res})
              
            },

          )
  }
}

export function getUserAccess() {
  store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  const token = cookies.get('token')
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}role/useraccess_view?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          }).then(
            res => {
              store.dispatch({type:'API', name: 'roles', data: res})
            },

          )
  }
}

export function editUserAccess(props) {
  store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  const token = cookies.get('token')
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}role/useraccess_edit?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              user_id:props.user_id,
              prof_id:props.prof_id
            }
          }).then(
            res => {
              store.dispatch({type:'API', name: 'roles', data: res})
            },

          )
  }
}




export function reportFindProject(value,status,schedule,budget) {
  store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  const token = cookies.get('token')
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}report/report_filter?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              value,
              status,
              schedule,
              page
            }
          }).then(
            res => {
              store.dispatch({type:'API', name: 'report', data: res})
            },

          )
  }
}


export function searchHome(KEYWORD,page) {
  store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  const token = cookies.get('token')
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}home/searchhome?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              KEYWORD,
              page
            }
          }).then(
            res => {
              store.dispatch({type:'API', name: 'home', data: res})
            },

          )
  }
}

export function deleteProjectTeamMember(RP_ID){
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}project/ProjectMember_delete?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              member : RP_ID 
            }
          }).then(
            res => {
            },

          )
  }
}

export function getCurrentProgress(wbs_id){
  store.dispatch({type: 'LOADER', loader:'project-loader', show:true})
  const token = cookies.get('token')
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}task/getCurrentProgresTask?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              wbs_id
            }
          }).then(
            res => {
              store.dispatch({type:'API', name: 'task', data: res})
            },

          )
  }
}

export function inviteToBusiness(BU_ID, USER_ID){
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}home/inviteToBusiness?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data:{
              BU_ID : BU_ID,
              USER_ID : USER_ID
            }
          }).then(
            res => {
              return res
            },

          )
  }
}



export function editTaskPercentAction(PROJECT_ID, WBS_ID, props){
  return function(dispatch){
    const token = cookies.get('token')
    return axios({
      method:'POST',
      url:`${baseURL}task/editTaskPercent?token=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        PROJECT_ID,
        WBS_ID,
        WORK_PERCENT_COMPLETE:props.WORK_PERCENT_COMPLETE,
        DESCRIPTION:props.DESCRIPTION
        
      }
    }).then(
      (res)=>{
        return res
        alert('task updated')
      }
    )
  }
}



export const gethistory = (id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}project/history/${id}?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },


          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'history',  data: res, append: true})

            },
          )
  }
}

export const gethistorydetail = (wbs_id) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})

  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'GET',
            url: `${baseURL}project/gethistorydetail/${wbs_id}?token=${token}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },


          }).then(
            res => {
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              store.dispatch({type:'API', name: 'historydetail',  data: res, append: true})

            },
          )
  }
}

export function changePassword(props){ 
  return function(dispatch){ 
    const token = cookies.get('token') 
    return axios({ 
      method:'POST', 
      url:`${baseURL}Datamaster/user/ext/changepassword?token=${token}`, 
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
      data: { 
        user_id : props.USER_ID, 
        password : props.PASSWORD 
      } 
    }).then( 
      (res)=>{ 
        return res 
        alert('password changed') 
      } 
    ) 
  } 
} 

export const reportDownloadPeople = (BU_ID, TAHUN, BULAN) => {
  return function (dispatch) {
    const token = cookies.get('token')
    return axios({
            method: 'POST',
            url: `${baseURL}report/r_people_download?token=${token}` ,
            headers: {
              
              'Content-Type': 'application/x-www-form-urlencoded'
             },
             responseType: "arraybuffer",
             data:{
              BU_ID,
              TAHUN,
              BULAN
             }
          }).then(
            res => {
              fileDownload(res.data, 'Timesheet Report.xls' )
              // store.dispatch({type: 'LOADER', loader:'project-loader', show: false})
              console.log(res.data);
              // store.dispatch({type:'API', name: 'report', data: res, append:true})

            },
          )
  }
}


export const uploadUsers = (files) => {
  // store.dispatch({type: 'LOADER', loader:'project-loader', show: true})
  // console.log("DOCS",data);
  
  return function(dispatch){
    const formData = new FormData();
    const token = cookies.get('token')  
    formData.append('userfile',files[0])
    store.dispatch({type: 'LOAD', name:'uploadUser', show: true})
    return fetch(`${baseURL}Datamaster/upload_users?token=${token}`,{
      method:'POST',
      body:formData
    }).then(
      res => {
        store.dispatch({type: 'LOAD', name:'uploadUser', show: false})
        showNotif('Successfully uploaded user', 'GREEN') 
      },
    )
  }
}
