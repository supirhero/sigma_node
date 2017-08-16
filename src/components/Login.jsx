import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'
import {Field, reduxForm} from 'redux-form';


import store from '../reducers/combineReducers.jsx'
import {getData, login} from './actions.jsx'
import {Input, LoaderLogin, ReduxInput} from './Components.jsx'



class Login extends Component {
    onSubmit(props){
      this.props.login(props.username, props.password).then(res => {
      })
    }

    render(){
      const {handleSubmit} = this.props;

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
                <LoaderLogin id='login-loader'>
                <div className='unit three-fifths'>
                  <div className='margin'>
                    <large>SIGN IN</large>
                    <form
                      onSubmit={handleSubmit(this.onSubmit.bind(this))}
                    //   onSubmit={
                    //   e => {
                    //     store.dispatch(login()).then(
                    //       (res)=>{
                    //
                    //
                    //       }
                    //     )
                    //     // console.log('store last', store.getState());
                    //     e.preventDefault()
                    //   }
                    // }
                    >
                    <Field
                      inputName="USERNAME"
                      name="username"
                      type='username'
                      component={ReduxInput}
                    />
                    <Field
                      inputName="PASSWORD"
                      name="password"
                      type='password'
                      component={ReduxInput}
                    />
                    <button className='btn-primary' type='submit' style={{display:'inline-block',marginTop:'30px'}}>LOG IN</button>
                    <medium>or <a onClick={()=> {
                      browserHistory.replace('/auth/register')
                    }}>Register</a> </medium>
                    <medium style={{marginTop:'67px',marginLeft:'40px'}}><a>download Mobile PRouDS</a></medium>

                  </form>

                </div>
              </div>
            </LoaderLogin>
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

// export default reduxForm({
//   // Must be unique, this will be the name for THIS PARTICULAR FORM
//   form: 'Login',
// })(
//   connect(mapStateToProps, { login })(Login),
// );

export default connect(mapStateToProps, { login })
(
  reduxForm({
    form: 'Login',
  })(Login));

// export default Login
