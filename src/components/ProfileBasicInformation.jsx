import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'






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


            </div>
          </div>
          <div className='grid wrap'>
          <div className='unit whole'>
            <h2 className='input-desc'>USER ID</h2>
            <input></input>
            <h2 className='input-desc'>ROLE</h2>
            <input></input>
            <h2 className='input-desc'>FULL NAME</h2>
            <input></input>
            <h2 className='input-desc'>EMAIL ADRESS</h2>
            <input></input>
            <h2 className='input-desc'>PHONE NUMBER</h2>
            <input></input>
            <h2 className='input-desc'>ADDRESS</h2>
            <input></input>
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
