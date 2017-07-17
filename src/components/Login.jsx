import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import $ from "jquery";
import { routerMiddleware, push } from 'react-router-redux'


import store from '../reducers/combineReducers.jsx'
import {getData} from './actions.jsx'


class Login extends Component {
    render(){
      return(
        <div className='grid wrap'>
          <div className='unit whole'>
            <div className='card shadow login'>
            <div className='unit two-fifths no-gutters'>
              <div id='picture'></div>
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
                    var data = getData({type:'API', method:'POST', request:{
                      api:'AUTH',
                      url: "/dev/login/login",
                      params: {user_id: 'gina.nufus@sigma.co.id',
                            password: 'S201502162',
                            fpid : '160927084946'}}}, function () {
                              browserHistory.replace('/')

                            })
                    console.log('data', data);
                    store.dispatch(data)
                    // console.log('store last', store.getState());

                    e.preventDefault()
                  }
                }>
                <h2 className='input-desc'>USERNAME</h2>
                <input></input>
                <h2 className='input-desc'>PASSWORD</h2>
                <input></input>
                <button className='btn-primary' type='submit'>SIGN IN</button>
                <a onClick={()=> {
                  // browserHistory.replace('/auth/register')
                }}>Register</a>
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
