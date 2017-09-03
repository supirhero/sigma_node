import React, {Component} from 'react'

import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {ReduxInput, required} from './Components.jsx'
import {registerSigma, showNotif} from './actions.jsx'
import {Field, reduxForm} from 'redux-form';


class RegisterSigma extends Component {
  onSubmit(props){
    this.props.registerSigma(props).then(()=> {
      showNotif('Successfully registered Sigma user')
      browserHistory.push('/auth')
    })
  }
  render() {
    const {handleSubmit} = this.props;
    
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className='grid'>
          <div className='unit half'>
            <Field
              inputName="NIK"
              name="V_USER_ID"
              type='input'
              component={ReduxInput}
              validate={[required]}
            />
            <Field
              inputName="FULL NAME"
              name="V_USER_NAME"
              type='input'
              component={ReduxInput}
              validate={[required]}
            />        
          </div>
          <div className='unit half'>
          <Field
              inputName="EMAIL ADDRESS"
              name="V_EMAIL"
              type='input'
              component={ReduxInput}
              validate={[required]}
            />    
            <Field
              inputName="PASSWORD"
              name="V_PASSWORD"
              type='input'
              component={ReduxInput}
              validate={[required]}
            />  
          </div>
        </div>
        <div className='grid'>
          <div className='unit whole'>
            <button className='btn-primary' type ='submit' style={{display:'inline-block'}}>REGISTER</button>
            <medium>Or back to <a onClick={()=> {
                  browserHistory.replace('/auth')
                }}>Login Page</a> </medium>
          </div>

        </div>
      </form>

  )
  }
}


function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps, { registerSigma })
(
  reduxForm({
    form: 'register_sigma',
  })(RegisterSigma));
