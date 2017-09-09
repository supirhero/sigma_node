import React, {Component} from 'react'

import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {ReduxInput, required, ReduxInputMask} from './Components.jsx'
import {registerVendor, showNotif} from './actions.jsx'
import {Field, reduxForm} from 'redux-form';


class RegisterVendor extends Component {

  onSubmit(props){
    this.props.registerVendor(props).then(()=> {
      showNotif('Successfully registered user')
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
              inputName="FULL NAME"
              name="V_USER_NAME"
              type='input'
              component={ReduxInput}
              validate={[required]}
            />  
            <Field
              inputName="USER ID"
              name="V_USER_ID"
              type='input'
              component={ReduxInput}
              validate={[required]}
            /> 
            <Field
              inputName="EMAIL SUPERVISOR SIGMA"
              name="V_EMAIL_SUP"
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
              component={ReduxInputMask}
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
export default connect(mapStateToProps, { registerVendor })
(
  reduxForm({
    form: 'register_sigma',
  })(RegisterVendor));
