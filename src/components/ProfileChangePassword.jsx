import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'

import {Input} from './Components.jsx'





class ProfileChangePassword extends Component {

    render(){
      return(
            <div className='grid wrap '>
              <div className='unit whole'>
               <Input inputName='OLD PASSWORD' />
               <Input inputName='NEW PASSWORD' />
               <Input inputName='CONFIRM PASSWORD' />
                <button style={{marginTop :'50px'}} className='btn-primary' type='submit'>CHANGE PASSWORD</button>
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
export default connect(mapStateToProps)(ProfileChangePassword)
// export default Login
