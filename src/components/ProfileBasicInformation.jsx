import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'
import {Field, reduxForm} from 'redux-form';
import {Input,ReduxInput,ReduxInputDisabled} from './Components.jsx'





class ProfileBasicInformation extends Component {
  handleInitialize(data) {
    const user_data = store.getState().auth.userdata;
    
    const initData = {
      USER_ID: user_data.user_id,
      ROLE: user_data.profile_name,
      FULL_NAME: user_data.user_name,
      EMAIL_ADDRESS:user_data.email      
    };

  this.props.initialize(initData);
}

  componentWillMount(){
    this.handleInitialize()
  }

onSubmit(props){
 alert('profile updated')
}
    render(){
      const {handleSubmit} = this.props;
      return(
        <div>
          <div className='grid wrap'>
            <div className='unit one-third'>
              <div className='pic-wrapper'>
              </div>
            </div>
            <div className='unit two-thirds'>           
              <button className='btn-primary'>UPLOAD NEW PICTURE</button>
              <small style={{marginTop:'10px'}}><i>max file size is 1 MB</i></small>

            </div>
          </div>
          <div className='grid wrap'>
          <div className='unit whole'>
          <form
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
        <Field
          inputName="USER ID"
          name="USER_ID"
          type='USER_ID'
          component={ReduxInputDisabled}
        />
        <Field
        inputName="ROLE"
        name="ROLE"
        type='ROLE'
        component={ReduxInputDisabled}
      />
        <Field
          inputName="FULL NAME"
          name="FULL_NAME"
          type='FULL_NAME'
          component={ReduxInputDisabled}
        />
        <Field
        inputName="EMAIL ADDRESS"
        name="EMAIL_ADDRESS"
        type='EMAIL_ADDRESS'
        component={ReduxInputDisabled}
       />
        <Field
        inputName="PHONE NUMBER"
        name="PHONE_NUMBER"
        type='PHONE_NUMBER'
        component={ReduxInput}
       />
       <Field
       inputName="ADDRESS"
       name="ADDRESS"
       type='ADDRESS'
       component={ReduxInput}
      />
        <button className='btn-primary' type='submit' style={{display:'inline-block',marginTop:'30px'}}>SAVE</button>
  
        

      </form>
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

export default connect(mapStateToProps, { ProfileBasicInformation })
(
  reduxForm({
    form: 'changeBasicInfo',
  })(ProfileBasicInformation));




