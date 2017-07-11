import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'

import store from '../reducers/combineReducers.jsx'




class DashboardHome extends Component {
  render() {
    var state = store.getState()
    console.log(state);
    return(
      <div className='grid wrap wider'>
        <div className='unit half'>
          <div className='card profile'>
            <div className='margin'>
              <div className='grid'>

                  <div className='unit half'>
                    <div className='pic-wrapper'>
                    </div>
                  </div>
                  <div className='unit half'>
                    <large>{state.data.userdata.user_name}</large>
                    <medium>Admin, Project Manager</medium>
                  </div>
                </div>


            <div>
          </div>
        </div>
        </div>
      </div>
      <div className='unit half'>
        <div className='margin'>
        <div className='grid'>
          <div className='unit half'>
            <large>MY PERFORMANCE</large>
            <medium>This month, May</medium>
          </div>
          <div className='unit half'>
            <button className='btn-primary'>TIMESHEET</button>
          </div>
        </div>
        </div>

      </div>
    </div>


  )
  }
}

function mapStateToProps(state) {
  return state
}
export default connect(mapStateToProps)(DashboardHome)
