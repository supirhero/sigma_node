import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'






class Dashboard extends Component {

    render(){
      return(
            <div className='grid wrap profile'>
              <div className='unit one-quarter'>
                  <div className='sidebar'>
                    <large>EDIT YOUR PROFILE</large>
                    <medium>Basic Information</medium>
                    <medium>Change Password</medium>
                  </div>


              </div>
              <div className='unit three-quarters'>
                {this.props.children}
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
export default connect(mapStateToProps)(Dashboard)
// export default Login
