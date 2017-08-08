import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'

import {Input} from './Components.jsx'
import store from '../reducers/combineReducers.jsx'
import {login} from './actions.jsx'


class Login extends Component {
    render(){
      return(
        <div className='grid wrap'>
          <div className='unit whole'>
            <div className='card shadow login' style={{padding:'0'}}>
            <div className='unit two-fifths no-gutters' style={{height:'100%'}}>
              <span style={{position:'relative'}}>
                <div id='picture'>
                  <img src={require('../img/ProuDS-logo-clean.png')} id='prouds-logo-big'/>
                  <small>Project Management &</small>
                  <small>Resource Delivery System</small>
                </div>
              </span>
            </div>
            <div className='unit three-fifths'>
              <div className='margin'>
                <large>SIGN IN</large>
                <form onSubmit={
                  e => {
                  //   axios.get('http://45.77.45.126/dev/home/detailproject/345'
                  // )
                  // .then(function (response) {
                  //   console.log(response);
                  // })
                  // .catch(function (error) {
                  //   console.log(error);
                  // });
                    // axios.post("http://45.77.45.126/dev/login/login", {
                    //   user_id: 'gina.nufus@sigma.co.id',
                    //   password: 'S201502162',
                    //   fpid : '160927084946'
                    // })
                    // .then(function (response) {
                    //   alert('work')
                    //   console.log(response);
                    // })
                    // .catch(function (error) {
                    //   alert('fail')
                    //
                    //   console.log(error);
                    // });
                      // axios({
                      //   method: 'post',
                      //   url: "http://45.77.45.126/dev/login/login",
                      //   params: {
                      //     user_id: 'gina.nufus@sigma.co.id',
                      //     password: 'S201502162',
                      //     fpid : '160927084946'
                      //   }
                      // }).then(function (response) {
                      //   console.log(response);
                      //   store.dispatch(saveAuthentication(response.data))
                      //   browserHistory.push('/')
                      // }).catch(function (error) {
                      //   alert('fail')
                      //   console.log(error);
                      // });
                    // $.post("http://45.77.45.126/dev/login/login",
                    //   {
                    //       user_id: 'gina.nufus@sigma.co.id',
                    //       password: 'S201502162',
                    //       fpid : '160927084946'
                    //   },
                    //   function(data, status){
                    //     alert('work')
                    //     console.log(data);
                    //   });
                    // var data = getData({type:'API', method:'POST', type:'AUTH', request:{
                    //   url: "/dev/login/login",
                    //   params: {user_id: 'gina.nufus@sigma.co.id',
                    //         password: 'S201502162',
                    //         fpid : '160927084946'}
                    // }})
                    // var data = getData()
                    // console.log('data', data);

                    // axios({
                    //   method: 'POST',
                    //   url: base_URL + action.request.url,
                    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    //   data: action.request.params
                    // })
                    // .then(function(response) {
                    //   console.log('response',response);
                    //   saveState(store.getState())
                    //   return Object.assign({}, state, {
                    //     response
                    //   })
                    // })
                    // .catch(
                    //   function (error) {
                    //     if (action.error) {
                    //       action.error(error)
                    //
                    //     }
                    //   })
                    // store.dispatch({type:'POST', request:{
                    //   api:'AUTH',
                    //   url: "/dev/login/login",
                    //   params: {user_id: 'gina.nufus@sigma.co.id',
                    //         password: 'S201502162',
                    //         fpid : '160927084946'}
                    //       }})
                    store.dispatch(login())

                    // console.log('store last', store.getState());

                    e.preventDefault()
                  }
                }>

                <Input inputName='USERNAME' />
                <Input inputName='PASSWORD' />
                <button className='btn-primary' type='submit' style={{display:'inline-block',marginTop:'30px'}}>LOG IN</button>
                <medium>Or <a onClick={()=> {
                  browserHistory.replace('/auth/register')
                }}>Register</a> </medium>
                <medium style={{marginTop:'67px',marginLeft:'40px'}}><a>download Mobile PRouDS</a></medium>

              </form>

            </div>
          </div>
          </div>
        </div>
      </div>

      )
    }

}

function mapStateToProps(state) {
  return {
    state
    // filter: ownProps.location.query.filter
  }
}
export default connect(mapStateToProps)(Login)
// export default Login
