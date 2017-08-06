import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, Header, ProjectHeader, WorkplanTable} from  './Components.jsx'


class ProjectWorkplan extends Component {

    render(){
      const workplan=[
        {
          task: 'Transaction Based Managed Service 2017',
          work: 258,
          work_total: 55328,
          duration: 12,
          start_date: '08 Apr 2017',
          end_date: '23 Apr 2017',
          complete: 0.41,
          resources: '2 people',
          sub: [
            {
              task: 'Working Activity',
              work: 258,
              work_total: 55328,
              duration: 12,
              start_date: '08 Apr 2017',
              end_date: '23 Apr 2017',
              complete: 0.41,
              resources: '2 people',
            },
            {
              task: 'Non Working',
              work: 258,
              work_total: 55328,
              duration: 12,
              start_date: '08 Apr 2017',
              end_date: '23 Apr 2017',
              complete: 0.41,
              resources: '2 people',
            }
          ]
        }
      ]
      return(
        <div className='project-workplan'>
          <div className='grid wrap'>
            <div className='unit whole'>
              <Divider text='WORKPLAN' btnLeftText='BACK' btnLeftClick={
                e=> {
                  browserHistory.goBack()
                  e.preventDefault()
                }
              }></Divider>
            </div>
          </div>
          <div className='grid wrap narrow'>
            <div className='unit one-third no-gutters'>
              <button className='btn-primary' style={{width:'200px', float:'right'}} >CREATE TASK</button>
            </div>
            <div className='unit one-third no-gutters'>
              <button className='btn-secondary' style={{width:'200px', margin:'auto'}} >RE-BASELINE</button>
            </div>
            <div className='unit one-third no-gutters'>
              <button className='btn-secondary' style={{width:'200px', float:'left'}} >UPLOAD</button>
            </div>

          </div>
          <div className='grid wrap'>
            <div className='unit whole'>
              <div className='card' style={{padding:'0'}}>
                {/* <div className='grid wrap'>
                  <div className='unit whole'>
                  </div>
                </div> */}
                <div className='grid wrap'>
                  <div className='unit whole'>
                    <table className='table workplan'>
                      <thead>
                        <Header style={{paddingLeft: '20px'}} text='Project Detail'/>

                        <tr>
                          <th>TASK</th>
                          <th>WORK</th>
                          <th>WORK<br/>TOTAL</th>
                          <th>DURATION<br/>(DAYS)</th>
                          <th>START<br/>DATE</th>
                          <th>END<br/>DATE</th>
                          <th>% WORK<br/>COMPLETE</th>
                          <th>RESOURCES<br/></th>
                        </tr>
                      </thead>
                        <WorkplanTable  data={workplan} >
                        </WorkplanTable>

                    </table>
                  </div>
                </div>
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
  }
}
export default connect(mapStateToProps)(ProjectWorkplan)
// export default Login
