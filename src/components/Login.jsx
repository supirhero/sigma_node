import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'

import {Input} from './Components.jsx'
import store from '../reducers/combineReducers.jsx'
import {getData, login} from './actions.jsx'


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

                    store.dispatch(login()).then(
                      (res)=>{

                      }
                    )

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
