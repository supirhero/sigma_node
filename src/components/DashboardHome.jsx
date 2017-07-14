import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {Circle, Line} from 'react-progressbar.js'


import store from '../reducers/combineReducers.jsx'




class DashboardHome extends Component {
  render() {
    var state = store.getState()
    console.log(state);
    // var projects = state.data.projects ? state.data.projects : null
    var projects = state.data.projects


    console.log(projects);
    return(
      <div>
      <div className='grid wrap wider'>
        <div className='unit half'>
          <div className='card profile'>
            <div className='margin'>
              <div className='grid'>

                  <div className='unit two-fifths'>
                    <div className='pic-wrapper'>
                    </div>
                  </div>
                  <div className='unit three-fifths'>
                    <large>{state.data.userdata ? state.data.userdata.user_name : '-' }</large>
                    <small>Admin, Project Manager</small>
                    <ul>
                      <li>
                        <a>My Performance</a>
                      </li>
                      <li>
                        <a >My Assigments</a>
                      </li><li>
                        <a>My Recent Activities</a>
                      </li>
                    </ul>

                  </div>
                </div>



            <div>
          </div>
        </div>
        </div>
      </div>
      <div className='unit half'>
        <div className='margin' style={{paddingTop:'20px'}}>
        <div className='grid'>
          <div className='unit half'>
            <large>MY PERFORMANCE</large>
            <small>This month, May</small>
          </div>
          <div className='unit half'>
            <button className='btn-primary' style={{width:'100%'}} onClick={
              e => {
                browserHistory.push('/timesheet')
                e.preventDefault()
              }
            }>TIMESHEET</button>
          </div>
        </div>
        <div className='grid'>
            <div className='unit half'>

              <div className='circle-container'>
                <Circle
                  progress={state.data.datatimesheet ? state.data.datatimesheet.b *0.01 : '-'}
                  initialAnimate={true}
                  text= {state.data.datatimesheet ? state.data.datatimesheet.b : '-'}
                  options={{
                    strokeWidth: 12,
                    color: '#F48165',
                    trailWidth: 12,
                    fontSize: 30,
                    easing: 'easeInOut',
                    duration: 700,
                  }}
                  containerClassName={'circle-bar'}
                  >
                  </Circle>
                  <div className='circle-desc'>
                    <medium>Entry</medium>
                    <small className='status'>{state.data.datatimesheet ? state.data.datatimesheet.status : '-' }</small>
                  </div>
              </div>
            </div>
            <div className='unit half'>
              <div className='circle-container'>
                <Circle
                  progress={state.data.datatimesheet ? state.data.datatimesheet.b *0.01 : '-'}
                  initialAnimate={true}
                  text= {state.data.datatimesheet ? state.data.datatimesheet.b : '-'}
                  options={{
                    strokeWidth: 12,
                    color: '#F48165',
                    trailWidth: 12,
                    fontSize: 30,
                    easing: 'easeInOut',
                    duration: 700,
                  }}
                  containerClassName={'circle-bar'}
                  >
                  </Circle>
                  <div className='circle-desc'>
                    <medium>Utilization</medium>
                    {/* <small className='status'>{state.data.datatimesheet.status_utilization}</small> */}
                  </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div className='grid wrap wider'>
      <div className='unit whole'>
        <div className='divider'>
        </div>
      </div>
    </div>
    <div className='grid wrap '>
      <div className='unit whole'>
        <div className='card search'>
        </div>

      </div>
    </div>
    <div className='projects'>

    </div>
  </div>


  )
  }
}

function mapStateToProps(state) {
  return state
}
export default connect(mapStateToProps)(DashboardHome)
