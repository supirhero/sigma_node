import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'

import {Input} from './Components.jsx'





class ProfileBasicInformation extends Component {

    render(){
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
            <Input inputName='USER ID' />
            <Input inputName='FULL NAME' />
            <Input inputName='EMAIL ADDRESS' />
            <Input inputName='PHONE NUMBER' />
            <Input inputName='ADDRESS' />                        
            <button style={{marginTop:'62px'}} className='btn-primary'>SAVE</button>
          </div>
        </div>
      </div>


      )
    }

}

function mapStateToProps(state) {
  return {
    // filter: ownProps.location.query.filter
  }
}
export default connect(mapStateToProps)(ProfileBasicInformation)
// export default Login
