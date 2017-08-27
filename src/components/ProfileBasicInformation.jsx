



import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Field, reduxForm } from 'redux-form';
import { Input, ReduxInput, ReduxInputDisabled, ReduxDrop} from './Components.jsx';
import {editProfile} from './actions.jsx'


class ProfileBasicInformation extends Component {
  handleInitialize(data) {
    const user_data = store.getState().auth.userdata;

    const initData = {
      USER_ID: user_data.user_id,
      ROLE: user_data.profile_name,
      FULL_NAME: user_data.user_name,
      EMAIL_ADDRESS: user_data.email,
      no_hp: user_data.phone_no,
      address:user_data.address
    };

    this.props.initialize(initData);
  }

  componentWillMount() {
    this.handleInitialize();
  }



  onSubmit(props) {
    store.dispatch(editProfile(props.no_hp,props.address,props.image))
  }


  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="grid wrap">
          <div className="unit one-third">
            <div className="pic-wrapper" />
          </div>
          <div className="unit two-thirds">
            <Field
            inputName="EVIDENCE"
            name="image"
            type='file'
            component = {ReduxDrop}
          />
    
            <small style={{ marginTop: '10px' }}><i>max file size is 1 MB</i></small>
          </div>
        </div>
        <div className="grid wrap">
          <div className="unit whole">
            
              <Field
                inputName="USER ID"
                name="USER_ID"
                type="USER_ID"
                component={ReduxInputDisabled}
              />
              <Field
                inputName="ROLE"
                name="ROLE"
                type="ROLE"
                component={ReduxInputDisabled}
              />
              <Field
                inputName="FULL NAME"
                name="FULL_NAME"
                type="FULL_NAME"
                component={ReduxInputDisabled}
              />
              <Field
                inputName="EMAIL ADDRESS"
                name="EMAIL_ADDRESS"
                type="EMAIL_ADDRESS"
                component={ReduxInputDisabled}
              />
              <Field
                inputName="PHONE NUMBER"
                name="no_hp"
                type="no_hp"
                component={ReduxInput}
              />
              <Field
                inputName="ADDRESS"
                name="address"
                type="address"
                component={ReduxInput}
              />
   

              <button className="btn-primary" type="submit" style={{ display: 'inline-block', marginTop: '30px' }}>SAVE</button>


              </div>
              </div>
              </form>
      </div>


    );
  }

}

function mapStateToProps(state) {
  return {
    state,
    // filter: ownProps.location.query.filter
  };
}

// export default reduxForm({
//   // Must be unique, this will be the name for THIS PARTICULAR FORM
//   form: 'Login',
// })(
//   connect(mapStateToProps, { login })(Login),
// );

export default connect(mapStateToProps, { editProfile })(
  reduxForm({
    form: 'changeBasicInfo',
  })(ProfileBasicInformation));

