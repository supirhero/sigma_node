import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, TimeSheetTimeButton} from  './components.jsx'


class Project extends Component {
    render(){
      const sidebar = [
        {type:'menu', name : 'Overview', path: '/project'},
        {type:'menu', name : 'Setting', path: '/project/setting'},
        {type:'menu', name : 'Activities', path: '/project/activities'},
        {type:'title', name : 'MANAGE'},
        {type:'menu', name : 'Workplan', path: '/workplan'},
        {type:'menu', name : 'Team Member', path: '/project/team-member'},
        {type:'menu', name : 'Doc & Files', path: '/project/docs-and-files'},
        {type:'menu', name : 'Issues', path: '/project/issues'},
        {type:'title', name : 'REPORTS'},
        {type:'menu', name : 'SPI & CPI', path: '/project/spi-and-cpi'},
        {type:'menu', name : 'S-Curve', path: '/project/s-curve'},
        {type:'menu', name : 'Gantt Chart', path: '/project/gantt-chart'},
      ]
      return(
        <div className='project'>



            <div className='grid wrap'>
              <div className='unit one-fifth no-gutters'>
                <div className='sidebar'>
                <div className='grid wrap'>
                  <div className='unit whole no-gutters'>

                    <button className='btn-primary' style={{padding:'16px 25px'}}>UPDATE TIMESHEET</button>
                  </div>
                </div>
                <div className='grid wrap sidebar'>
                  <div className='unit whole '>
                    <ul>
                      {
                        sidebar.map((value, index) => {
                          if (value.type == 'menu') {
                            return(
                              <li key={index}><small onClick={
                                e => {
                                  if (value.name == 'Workplan') {
                                    browserHistory.push(value.path)
                                  }
                                  else {
                                    browserHistory.replace(value.path)

                                  }
                                  e.preventDefault()
                                }
                              }>{value.name}</small></li>
                            )
                          }
                          else {
                            return(

                              <li key={index} style={{marginTop:'45px'}}><medium>{value.name}</medium></li>
                            )
                          }

                      })
                    }


                    </ul>


                  </div>
                </div>

              </div>
            </div>


          <div className='unit four-fifths'>
            {this.props.children}
          </div>
        </div>


        </div>

      )
    }

}

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(Project)
// export default Login
