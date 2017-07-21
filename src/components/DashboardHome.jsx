import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {Circle, Line} from 'react-progressbar.js'

import {Meter} from './Components.jsx'
import store from '../reducers/combineReducers.jsx'




class DashboardHome extends Component {
  render() {
    var state = store.getState()
    console.log(state);
    // var projects = state.data.projects ? state.data.projects : null
    var auth = state.data.auth


    // console.log(projects);
    return(
      <div>
      <div className='grid wrap'>
        <div className='unit half'>
          <div className='card profile'>
              <div className='grid'>

                  <div className='unit two-fifths'>
                    <div className='pic-wrapper'>
                    </div>
                  </div>
                  <div className='unit three-fifths'>
                    <large style={{fontSize:'18px'}}>{auth.userdata ? auth.userdata.user_name : '-'}</large>
                    <small>Admin, Project Manager</small>
                    <ul>
                      <li>
                        <span className='icon-speedometer'>&nbsp;&nbsp;</span>
                        <a onClick={
                          e => {
                            browserHistory.push('/my-performance')
                            e.preventDefault()
                          }
                        }>My Performance</a>
                      </li>
                      <li>
                        <span className='icon-list'>&nbsp;&nbsp;</span>
                        <a onClick={
                          e => {
                            browserHistory.push('/my-assignments')
                            e.preventDefault()
                          }
                        }>My Assigments</a>
                      </li>
                      <li>
                        <span className='icon-clock'>&nbsp;&nbsp;</span>
                        <a>My Recent Activities</a>
                      </li>
                    </ul>

                  </div>
                </div>



            <div>
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


              <Meter
                progress={auth.datatimesheet ? auth.datatimesheet.b *0.01 : '-'}
                text={auth.datatimesheet ? auth.datatimesheet.b : '-'}
                title='Utilization'
                status={auth.datatimesheet.status}
              />
            </div>
            <div className='unit half'>
              <Meter
                progress={auth.datatimesheet ? auth.datatimesheet.b *0.01 : '-'}
                text={auth.datatimesheet ? auth.datatimesheet.b : '-'}
                title='Utilization'
                status={auth.datatimesheet.status_utilization}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
    <div className='grid wrap'>
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
      {
              auth.project.map((value, index) => {
                return(
                  <div key={index}>
                    <div style={{marginBottom: '30px', margin: '20px auto 10px'}} className='grid wrap' key={index}>
                      <div className='unit whole'>
                    <large>Business Unit&nbsp;:&nbsp;&nbsp; <a style={{fontSize:'20px'}}>{value.bu_name}</a></large>

                    <button className='btn-secondary' style={{padding:'15px 22px'}} onClick={e => {
                      browserHistory.push('/new-project')

                    }}><i style={{verticalAlign:'bottom', marginRight:'7px'}} className="material-icons md-18">add</i>NEW PROJECT</button>
                  </div>
                </div>

                    {
                      value.project_list.map((value,index) => {
                        return(
                          <div className='grid wrap' key={index}>
                            <div className='unit whole no-gutters'>
                              <div className='card'>
                                <div className='unit two-fifths'>
                                  <medium className='project-name'>
                                    {value.project_name}
                                  </medium>
                                </div>
                                <div className='unit one-fifth'>
                                  <small style={{fontSize:'15px'}} className='project-status'>
                                    {
                                      value.project_status
                                    }
                                    &nbsp;({value.project_complete}%)
                                  </small>
                                </div>
                                <div className='unit two-fifths'>
                                  <Line
                                    progress={value.project_complete *0.01}
                                    initialAnimate={true}
                                    options={{
                                      strokeWidth: 3,
                                      color: '#F48165',
                                      trailColor:'#EEEEEE',
                                      trailWidth: 12,
                                      fontSize: 30,
                                      easing: 'easeInOut',
                                      duration: 700,
                                    }}
                                    containerClassName={'line-bar'}
                                    >
                                    </Line>
                                  </div>
                                </div>
                              </div>
                            </div>
                        )
                      })
                    }
                  </div>
                )
            })
          }
    </div>
  </div>


  )
  }
}

function mapStateToProps(state) {
  return state
}
export default connect(mapStateToProps)(DashboardHome)
