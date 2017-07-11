import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'





class Dashboard extends Component {
    render(){
      return(
            <div className='grid'>
              <div className='unit whole no-gutters'>
                <div className='navbar'>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <a>HOME</a>
                      <a>REPORTS</a>
                    </div>
                  </div>
                  <button onClick={
                    e => {
                      browserHistory.push('/')

                      store.dispatch(deleteAuthentication())
                    }
                  }></button>
                </div>
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
