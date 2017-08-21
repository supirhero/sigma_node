import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import { Grid } from 'react-redux-grid';
import store from '../reducers/combineReducers.jsx'
// <<<<<<< HEAD
import {Divider, Header, ProjectHeader,PopUp,ReduxInput,ReduxSelectNew, WorkplanRow,PageLoader, ReactDatePicker} from  './Components.jsx'
import { Field, reduxForm } from 'redux-form';
import {getWorkplanView, addTaskWorkplan, getTaskView} from './actions.jsx'



class ProjectWorkplan extends Component {
  constructor(){
    super();
    this.state = {
      clicked : false

    };
  }
  onSubmit(props){
    const id =  this.props.state.page.id

    this.props.addTaskWorkplan(id,props)
  }
    componentWillMount() {
      const id =  this.props.state.page.id
      store.dispatch(getWorkplanView(id))
      store.dispatch(getTaskView(id))


    }
    render(){
      const { handleSubmit } = this.props;

      const workplan = this.props.state.data.workplan
      const workplan_view = this.props.state.data.parent

      const workplan2=[
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
              {
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
            ]
          },
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
                {
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
              <PopUp id='createTask' dividerText='CREATE TASK' btnText='CREATE TASK' btnClass="btn-primary" btnStyle={{width:'200px', float:'right'}}>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                      <div>
                        <div className="grid wrap">
                          <div className="unit whole">
                            <Field
                              inputName="NAME"
                              name="WBS_NAME"
                              type='input'
                              component={ReduxInput}
                            />
                          </div>
                        </div>
                        <div className='grid wrap'>
                          <div className='unit whole'>
                            <Field
                              inputName="PARENT"
                              name="WBS_PARENT_ID"
                              component={ReduxSelectNew}>
                                {
                                  workplan_view &&
                                  workplan_view.map((value,index) => (
                                    <option key={index} value={value.WBS_ID}>{value.WBS_NAME}</option>

                                  ))
                                }
                              </Field>
                          </div>
                        </div>
                        <div className="grid wrap">
                          <div className="unit half">
                            <Field
                              inputName="DATE"
                              name="START_DATE"

                              component={ReactDatePicker}
                            />

                          </div>
                          <div className="unit half">
                            <Field
                              inputName="DATE"
                              name="FINISH_DATE"

                              component={ReactDatePicker}
                            />

                          </div>
                        </div>

                        <div className="grid wrap">
                          <div className='unit whole' style={{textAlign:'center',marginTop:'40px'}}>
                            <button style={{ display:'inline-block', width:'200px'}} className='btn-secondary'> CANCEL </button>
                            <button style={{ display:'inline-block',width:'200px',marginLeft:'40px'}} type='submit' className='btn-primary'> ADD </button>
                          </div>
                        </div>


                      </div>

                    </form>
                  </PopUp>

            </div>
            <div className='unit one-third no-gutters'>
              <button className='btn-secondary' style={{width:'200px', display:'block', margin:'auto'}} >RE-BASELINE</button>

            </div>
            <div className='unit one-third no-gutters'>
              <PopUp id='createTask' dividerText='UPLOAD WORKPLAN' btnText='UPLOAD' btnClass="btn-secondary" btnStyle={{width:'200px', float:'left'}}>
                  <div>
                    <small>You can upload your project workplan to generate task automatically on PRouDs. Please download the project workplan template <a>here</a></small>
                    <Field
                      inputName="WORK HOURS"
                      name="HOUR"
                      inputDesc="max file size is 5 MB allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png"
                      component={ReduxInput}
                    />
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
                    {
                      !workplan ? <PageLoader/> :
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
                      <tbody>
                        <tr onClick={
                          e => {
                              if (this.state.clicked) {
                                this.setState({clicked:false})
                              }
                              else {
                                this.setState({clicked:true})
                              }
                              e.preventDefault()
                            }
                          }>

                          <td  style={{paddingLeft: '20px'}}><span style={{verticalAlign:'middle', fontSize:'16px', color:'black'}} className='material-icons'>{workplan.children.length!=0 && this.state.clicked ? 'expand_more': 'expand_less'}</span>&nbsp;&nbsp;&nbsp;&nbsp;{workplan.WBS_NAME}</td>
                          <td>{workplan.WORK}</td>
                          <td>{workplan.WORK_TOTAL}</td>
                          <td>{workplan.DURATION}</td>
                          <td>{workplan.START_DATE}</td>
                          <td>{workplan.END_DATE}</td>
                          <td>{workplan.WORK_PERCENT_COMPLETE}</td>
                          <td>{workplan.LEAF}</td>
                        </tr>
                      </tbody>
                      {
                        workplan.children.length !=0 && this.state.clicked &&

                        workplan.children.map((value,index) => {
                          return(

                              <WorkplanRow  key={index} data={value}>

                              </WorkplanRow>

                        )
                      })
                    }

                    </table>}
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
    formValues: state.form.add_task,
    state
  }
}
export default reduxForm({
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: 'add_task',
})(
  connect(mapStateToProps, { addTaskWorkplan })(ProjectWorkplan),
);
// export default Login
