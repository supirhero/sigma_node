import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'






class ProfileBasicInformation extends Component {

    render(){
      return(
            <div className='grid wrap'>
              <div className='unit whole'>
                <div className='pic-wrapper'>
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
