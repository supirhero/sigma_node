import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider} from  './components.jsx'


class Timesheet extends Component {
    render(){
      return(
        <div>

            <div className='grid wrap wider'>
              <div className='unit whole'>
                <Divider text='TIMESHEET' back_text = 'Back' back={
                  e => {
                    browserHistory.goBack()
                    e.preventDefault()
                  }
                }/>
              </div>
            </div>
            <div className='grid wrap wider'>
              <div className='unit whole'>
                <div style={{marginTop:'20px'}}></div>
              </div>
            </div>
            <div className='grid wrap wider'>
              <div className='unit whole'>
                <button style={{margin:'auto', display:'block'}} className='btn-primary'>ADD NEW</button>

              </div>
            </div>
            <div className='grid wrap wider'>
              <div className='unit whole'>
                <Divider text='WEDNESDAY, JUNE 7'/>
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
export default connect(mapStateToProps)(Timesheet)
// export default Login
