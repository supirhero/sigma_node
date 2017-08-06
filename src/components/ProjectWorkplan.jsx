import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
// <<<<<<< HEAD
import {Divider, Header, ProjectHeader,PopUp,Input,Select, WorkplanRow} from  './Components.jsx'
// =======
// import {Divider, Header, ProjectHeader,PopUp,Input,Select} from  './Components.jsx'
//
// >>>>>>> master


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
          working_activity: {
                task: 'Working Activity',
                work: 258,
                work_total: 55328,
                duration: 12,
                start_date: '08 Apr 2017',
                end_date: '23 Apr 2017',
                complete: 0.41,
                resources: '2 people',
                sub: [
                  {
                    task: 'Annual Working',
                    work: 258,
                    work_total: 55328,
                    duration: 12,
                    start_date: '08 Apr 2017',
                    end_date: '23 Apr 2017',
                    complete: 0.41,
                    resources: '2 people',
                  },
                  {
                    task: 'Overtime',
                    work: 258,
                    work_total: 55328,
                    duration: 12,
                    start_date: '08 Apr 2017',
                    end_date: '23 Apr 2017',
                    complete: 0.41,
                    resources: '2 people',
                  }
                ]
              },
              non_working_activity: {
                    task: 'Non Working Activity',
                    work: 258,
                    work_total: 55328,
                    duration: 12,
                    start_date: '08 Apr 2017',
                    end_date: '23 Apr 2017',
                    complete: 0.41,
                    resources: '2 people',
                    sub: [
                      {
                        task: 'Annual Leave',
                        work: 258,
                        work_total: 55328,
                        duration: 12,
                        start_date: '08 Apr 2017',
                        end_date: '23 Apr 2017',
                        complete: 0.41,
                        resources: '2 people',
                      },
                      {
                        task: 'Sick Leave',
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
            },
            {
              task: 'Transaction Aptitude 2018',
              work: 258,
              work_total: 55328,
              duration: 12,
              start_date: '08 Apr 2017',
              end_date: '23 Apr 2017',
              complete: 0.41,
              resources: '2 people',
              working_activity: {
                    task: 'Working Activity',
                    work: 258,
                    work_total: 55328,
                    duration: 12,
                    start_date: '08 Apr 2017',
                    end_date: '23 Apr 2017',
                    complete: 0.41,
                    resources: '2 people',
                    sub: [
                      {
                        task: 'Annual Working',
                        work: 258,
                        work_total: 55328,
                        duration: 12,
                        start_date: '08 Apr 2017',
                        end_date: '23 Apr 2017',
                        complete: 0.41,
                        resources: '2 people',
                      },
                      {
                        task: 'Overtime',
                        work: 258,
                        work_total: 55328,
                        duration: 12,
                        start_date: '08 Apr 2017',
                        end_date: '23 Apr 2017',
                        complete: 0.41,
                        resources: '2 people',
                      }
                    ]
                  },
                  non_working_activity: {
                        task: 'Non Working Activity',
                        work: 258,
                        work_total: 55328,
                        duration: 12,
                        start_date: '08 Apr 2017',
                        end_date: '23 Apr 2017',
                        complete: 0.41,
                        resources: '2 people',
                        sub: [
                          {
                            task: 'Annual Leave',
                            work: 258,
                            work_total: 55328,
                            duration: 12,
                            start_date: '08 Apr 2017',
                            end_date: '23 Apr 2017',
                            complete: 0.41,
                            resources: '2 people',
                          },
                          {
                            task: 'Sick Leave',
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
              <PopUp id='createTask' dividerText='CREATE TASK' btnText='CREATE TASK' btnClass="btn-primary" btnStyle={{width:'200px', float:'right'}}>
                    <div>
                      <div className="grid wrap ">
                        <div className="unit whole">
                          <Input inputName='NAME' />
                        </div>
                      </div>
                      <div className='grid wrap '>
                        <div className='unit whole'>
                          <Select inputName='PARENT' items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }} />
                        </div>
                      </div>
                      <div className="grid wrap ">
                        <div className="unit half">
                          <Select inputName='START DATE' style={{width:'96%'}} items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }} />
                        </div>
                        <div className="unit half">
                          <Select inputName='END DATE' style={{width:'96%'}} items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }} />
                        </div>
                      </div>

                      <div className="grid wrap">
                        <div className='unit whole' style={{textAlign:'center',marginTop:'40px'}}>
                          <button style={{ display:'inline-block', width:'200px'}} className='btn-secondary'> CANCEL </button>
                          <button style={{ display:'inline-block',width:'200px',marginLeft:'40px'}} className='btn-primary'> ADD </button>
                        </div>
                      </div>


                    </div>
                  </PopUp>

            </div>
            <div className='unit one-third no-gutters'>
              <button className='btn-secondary' style={{width:'200px', display:'block', margin:'auto'}} >RE-BASELINE</button>

            </div>
            <div className='unit one-third no-gutters'>
              <PopUp id='createTask' dividerText='UPLOAD WORKPLAN' btnText='UPLOAD' btnClass="btn-secondary" btnStyle={{width:'200px', float:'left'}}>
                  <div>
                    <small>You can upload your project workplan to generate task automatically on PRouDs. Please download the project workplan template <a>here</a></small>
                    <Input inputName="SELECT FILE" inputDesc="max file size is 5 MB allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png"></Input>
                  </div>
                      <div className='btn-wrapper'>
                        <button className='btn-secondary' style={{float:'left', display:'inline-block'}}>CANCEL</button>
                        <button className='btn-primary'style={{float:'right', display:'inline-block'}}>UPLOAD</button>

                      </div>

                </PopUp>
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
                        <Header style={{padding: '20px 0 0 20px'}} text='Project Detail'/>

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
                      {
                      workplan.map((value,index) => {
                        return(
                          <WorkplanRow data={value}></WorkplanRow>
                      )
                    })
                  }

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
