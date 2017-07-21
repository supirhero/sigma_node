import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, TimeSheetTimeButton} from  './components.jsx'


class Timesheet extends Component {
    render(){
      return(

        <div>
            <div className='grid wrap'>
              <div className='unit whole'>
                <Divider text='TIMESHEET' btnLeftText = 'Back' btnLeftClick={
                  e => {
                    browserHistory.goBack()
                    e.preventDefault()
                  }
                }/>
              </div>
            </div>

            <div className='grid wrap'>
              <div className='unit whole' style={{textAlign:'center'}}>
              <span className="icon-arrow-left-circle" />
                <div style={{marginTop:'20px', display:'inline-block'}}>
                  <TimeSheetTimeButton text="Tue, Jun 6" hours="DAY-OFF"/>
                  <TimeSheetTimeButton text="Wed, Jun 7" hours="4 hours" />
                  <TimeSheetTimeButton text="Thu, Jun 8" hours="-"/>
                  <TimeSheetTimeButton text="Fri, Jun 9" hours="-"/>
                  <TimeSheetTimeButton text="Sat, Jun 10" hours="-"/>
                </div>
                <span className="icon-arrow-right-circle" />
              </div>
            </div>


            <div className='grid wrap'>
              <div className='unit whole'>
                <button style={{margin:'10px auto', display:'block'}} className='btn-primary' onClick={
                  e => {
                    browserHistory.push('/updatesheet')
                    e.preventDefault() }}>
                    ADD NEW
                </button>

              </div>
            </div>
            <div className='grid wrap'>
              <div className='unit whole' style={{marginBottom:'42px'}}>
                <Divider text='WEDNESDAY, JUNE 7' />
              </div>
            </div>
            <div className="grid wrap">
              <div className="unit whole">
                <div className="card">
                  <div className="person">
                    <div className="person-image"></div>
                    <div className="person-info">
                      <large>Kara Gray</large>
                      <small>Admin, Project Manager</small>
                    </div>
                  </div>
                </div>

                <div className="card project">
                    <small>4:55 PM</small>
                    <medium className="project-info">
                      Project <a href="">Transaction Based Managed Services 2017</a>
                    </medium>
                </div>
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
