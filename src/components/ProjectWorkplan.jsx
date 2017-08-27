import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Grid } from 'react-redux-grid';

import store from '../reducers/combineReducers.jsx';

import { Divider, Header, ProjectHeader, PopUp, ReduxInput, ReduxSelectNew, WorkplanRow, PageLoader, datepickerUniversal,datepickerTimesheet ,ReduxInputDisabled,required,ReduxSelect,ReduxUploadWorkplan, Menu, MenuItem, MenuSection } from './Components.jsx';


import { Field, reduxForm } from 'redux-form';
import { getWorkplanView, addTaskWorkplan, getTaskView, getTaskMemberView ,assignTaskMember,uploadWorkplan, getEditTaskView, editTaskAction} from './actions.jsx';


class ProjectWorkplan extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      WBS_id: ''
    };
  }

  handleInitialize(data) {
    this.props.initialize(data ? data : null)
  }

  menu(value) {
    var padding =(value.LEVEL * 20 + 20).toString()

    return(
      <tr onClick={
        e => {
          var key = (value.WBS_ID).toString()
          if (this.state[key]) {
            this.setState({[key]:false})
          }
          else {
            this.setState({[key]:true})
          }
          e.preventDefault()
        }
      }>

      <td style={{overflow:'visible', width:'410px'}}>
        <div style={{paddingLeft: padding+'px', wordBreak:'break-word', paddingRight:'15px'}}>
          {/* <div style={{width:'200px', overflow:'hidden'}}> */}
          <span style={{verticalAlign:'middle', fontSize:'16px', color:'black'}} className='material-icons'>
            {value.children.length!=0 ? this.state[(value.WBS_ID).toString()] ? 'expand_more': 'expand_less' : ""}
          </span>&nbsp;&nbsp;&nbsp;&nbsp;{value.WBS_NAME}
          {/* </div> */}

        </div>
        </td>
      <td>{value.WORK}</td>
      <td>{value.WORK_TOTAL}</td>
      <td>{value.DURATION}</td>
      <td>{value.START_DATE}</td>
      <td>{value.FINISH_DATE}</td>
      <td>{Math.round(value.WORK_PERCENT_COMPLETE * 100)/100}%</td>
      <td>{value.RESOURCE_WBS} people</td>
      <td style={{position:'relative', paddingRight:'20px'}} >
      {
        value.LEAF == 1 &&
        // React.cloneElement(this.props.children, { data: value })
          <Menu menuStyle={{top:'41', right:'10', width:'200px'}} style={{display:'inline'}} triggerClass='material-icons' triggerStyle={{fontSize:'17px', color:'#fa5962'}} icon='more_horiz'>
            <MenuSection>
              <MenuItem title='Add Timesheet' onClick={e => {
                this.props.dispatch({
                  type: 'POPUP',
                  name:'addTimesheetWorkplan',
                  data: {
                    active:true
                  }
                })

                e.preventDefault()
              }}/>
              <MenuItem title='Manual Update' onClick={e => {
                this.props.dispatch({
                  type: 'POPUP',
                  name:'manualUpdate',
                  data: {
                    active:true
                  }
                })

                e.preventDefault()
              }}/>
              <MenuItem title='Edit' onClick={e => {
                this.props.dispatch(getEditTaskView(value.WBS_ID)).then(
                  res => {
                    this.setState({WBS_id: value.WBS_ID})
                    this.props.dispatch({
                      type: 'POPUP',
                      name:'edit_task',
                      data: {
                        active:true,
                      }
                    })
                    console.log('POPUP',res);
                    this.handleInitialize({
                      NAME_EDIT : res.data.detail_task[0].WBS_NAME,
                      PARENT_EDIT: res.data.detail_task[0].WBS_PARENT_ID,
                      START_DATE_EDIT: res.data.detail_task[0].START_DATE,
                      FINISH_DATE_EDIT: res.data.detail_task[0].FINISH_DATE,
                    })


                  }
                )


                e.preventDefault()
              }}/>
              <MenuItem title='Assign' onClick={e => {
                this.props.dispatch({
                  type: 'POPUP',
                  name:'assign',
                  data: {
                    active:true
                  }
                })

                e.preventDefault()
              }}/>

              <MenuItem title='Delete' onClick={e => {
                // this.props.dispatch()
                this.props.dispatch({
                  type: 'POPUP',
                  name:'delete',
                  data: {
                    active:true
                  }
                })

                e.preventDefault()
              }}/>



            </MenuSection>

          </Menu>

      }

      </td>

    </tr>
    )
  }
  renderRow(value){
    return(
      value.children.map((value,index)=> [

        this.menu(value),

        this.state[(value.WBS_ID).toString()] && this.state[(value.WBS_ID).toString()] !=false &&
        this.renderRow(value)

      ])
    )
  }


  onSubmit(props) {
    const id = this.props.state.page.id;
    this.props.addTaskWorkplan(id, props);
  }

  onSubmitWorkplan(props){
    const id = this.props.state.page.id
    this.props.uploadWorkplan(id,props.document)
  }
  onSubmitEditTask(props){
    const id = this.props.state.page.id
    this.props.editTaskAction(id,this.state.WBS_id,props)
  }

  componentWillMount() {
    const id = this.props.state.page.id;
    this.props.dispatch(getWorkplanView(id));
    this.props.dispatch(getTaskView(id));
  }

  render() {
    const { handleSubmit } = this.props;

    const workplan = this.props.state.data.workplan;
    const workplan_view = this.props.state.data.parent;

    const workplan2 = [
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
              },
            ],
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
              },
            ],
          },
        ],
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
              },
            ],
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
              },
            ],
          },
        ],
      },

    ];
    return (
      <div className="project-workplan">
        <PopUp id="addTimesheetWorkplan" dividerText="UPDATE TIMESHEET" btnText="UPLOAD FILE" btnClass="btn-primary" btnStyle={{ display: 'block', margin: 'auto' }}>
          <form >
          <div className="grid wrap narrow">
          <div className="unit whole">
            <Field
              inputName="DATE"
              name="TS_DATE"
              component={datepickerTimesheet}
              // validate={[required]}
            />
          </div>
        </div>
        <div className="grid wrap narrow">
          <div className="unit whole">
            <Field
              inputName="PROJECT NAME"
              name="PROJECT_ID"
              component={ReduxSelectNew}
              // validate={[required]}
              >
              </Field>
          </div>
        </div>
        <div className="grid wrap narrow">
        <div className="unit three-quarters">
        <Field
        name="WP_ID"

          inputName="TASK"
          component={ReduxSelectNew}
          // validate={[required]}
          />
          </div>

          <div className="unit one-quarter">
            <Field
              inputName="WORK HOURS"
              name="HOUR"
              type="HOUR"
              component={ReduxInput}
              // validate={[required]}
            />
          </div>
        </div>
        <div className="grid wrap narrow">
          <div className="unit whole">
            <Field
              inputName="SUBJECT"
              name="TS_SUBJECT"
              type="TS_SUBJECT"
              component={ReduxInput}
              // validate={[required]}
            />
          </div>
        </div>
        <div className="grid wrap narrow">
          <div className="unit whole">
            <Field
                inputName="MESSAGE"
                name="TS_MESSAGE"
                // type="TS_MESSAGE"
                component={ReduxInput}
                // validate={[required]}
              />
          </div>
        </div>
        <div className="grid wrap narrow">
          <div className="unit whole" style={{ textAlign: 'center' , display:'inline-block' }}>
          <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary" onClick={
            e => {
              browserHistory.push('/')
              e.preventDefault()
            }
          }> CANCEL </button>
            <button type="submit" style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW</button>
          </div>
        </div>

          </form>

        </PopUp>

        <PopUp id="manualUpdate" dividerText="TASK PROGRESS" btnText="UPLOAD FILE" btnClass="btn-primary" btnStyle={{ display: 'block', margin: 'auto' }}>
          <form >
          <div>
            <div className="grid wrap narrow">
              <div className="unit whole">
                <Field
                  inputName="TASK"
                  name="desc"
                  type="input"
                  component={ReduxInputDisabled}
                />
                {/* <Input inputName="FILE DESCRIPTION" placeholder="max 160 characters" /> */}
              </div>
            </div>
            <div className="grid wrap narrow">
              <div className="unit one-third">
               <h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>RESOURCES</h2>
              </div>

              <div className="unit two-thirds">
                <div className="one-third" style={{display:'inline-block'}}><h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>WORK</h2></div>
                <div className="one-third" style={{display:'inline-block'}}><h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>WORK TOTAL</h2></div>
                <div className="one-third" style={{display:'inline-block'}}><h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>% COMPLETE</h2></div>

              </div>
            </div>

            <div className="grid wrap narrow">
              <div className="unit one-third">
                <h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}><b>Kara Gray</b></h2>
              </div>

              <div className="unit two-thirds">
                  <div className="one-third" style={{display:'inline-block'}}><h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>13</h2></div>
                  <div className="one-third" style={{display:'inline-block'}}><h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>2371</h2></div>
                  <div className="one-third" style={{display:'inline-block'}}><h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>0.54%</h2></div>
              </div>
            </div>

            <div className="grid wrap narrow">
              <div className="unit whole no-gutters">
                <h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>Manual Update</h2>
              </div>
              <div className="unit whole no-gutters">
                <h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>Project manager or leader can update progress of a task manually. The work timesheet will be recorded as admin</h2>
              </div>
            </div>


            <div className="grid wrap narrow">
            <div className="unit one-third">
              <h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}><b>Admin</b></h2>
            </div>


            <div className="unit two-thirds">
                <div className="one-third" style={{display:'inline-block'}}><h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>0</h2></div>
                <div className="one-third" style={{display:'inline-block'}}><h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>3929</h2></div>
                <div className="one-third" style={{display:'inline-block'}}><h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>0.58%</h2></div>
            </div>
          </div>


            <div className="grid wrap narrow">
              <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> SAVE </button>
              </div>
            </div>

          </div>
        </form>
        </PopUp>

        <PopUp id="edit_task" dividerText="EDIT TASK" btnText="UPLOAD FILE" btnClass="btn-primary" btnStyle={{ display: 'block', margin: 'auto' }}>
          {
            !this.props.state.data.detail_task && !this.props.state.data.parent ? <PageLoader/> :
            <form onSubmit={handleSubmit(this.onSubmitEditTask.bind(this))}>

        <div>
          <div className="grid wrap narrow">
            <div className="unit whole">
              <Field
                inputName="NAME"
                name="NAME_EDIT"
                type="input"
                component={ReduxInput}
              />
              {/* <Input inputName="FILE DESCRIPTION" placeholder="max 160 characters" /> */}
            </div>
          </div>
          <div className="grid wrap narrow">
            <div className="unit whole">
            <Field
            inputName="PARENT"
            name="PARENT_EDIT"
            type="input"
            component={ReduxSelectNew}
          >
            {

              this.props.state.data.parent.map((value, index) => (
                <option key={index} value={value.WBS_ID}>{value.WBS_NAME}</option>

              ))
            }
          </Field>

            </div>

          </div>
          <div className="grid wrap narrow">
            <div className="unit half">
              <Field
              inputName="START DATE"
              name="START_DATE_EDIT"
              type="input"
              component={datepickerUniversal}
            />

            </div>
            <div className="unit half">
            <Field
            inputName="END DATE"
            name="FINISH_DATE_EDIT"
            type="input"
            component={datepickerUniversal}
          />
            </div>


        </div>

          <div className="grid wrap narrow">
            <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
              <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
              <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> SAVE </button>
            </div>
          </div>

        </div>
      </form>
    }

        </PopUp>
        <PopUp id="assign" dividerText="ASSIGN TASK" btnText="UPLOAD FILE" btnClass="btn-primary" btnStyle={{ display: 'block', margin: 'auto' }}>
          <form >
            <div>
              <div className="grid wrap narrow">
                <div className="unit whole">
                  <Field
                    inputName="TASK"
                    name="desc"
                    type="input"
                    component={ReduxInputDisabled}
                  />

                  {/* <Input inputName="FILE DESCRIPTION" placeholder="max 160 characters" /> */}
                </div>
              </div>
              <div className="grid wrap narrow">
                <div className="unit three-fifths">
                  <Field
                    inputName="ASSIGNED TO"
                    name="desc"
                    type="input"
                    component={ReduxInput}
                  />
                </div>

                <div className="unit two-fifths">
                  <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px', marginTop: '60px', float:'right' }} className="btn-primary"> ADD </button>

                </div>
              </div>
              <div className="grid wrap narrow">
                <div className="unit one-quarter">
                  <h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>WORKLOAD</h2>
                </div>
                <div className="unit three-quarters">
                  <h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>RESOURCES</h2>
                </div>
              </div>
              <div className="grid wrap narrow">
                <div className="unit one-quarter">
                  <h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>60%</h2>
                </div>
                <div className="unit three-quarters">
                  <div className="unit one-third">
                    <h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>Kara Gray</h2>
                  </div>
                  <div className="unit one-third">
                    <h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>karagray@gmail.com</h2>
                  </div>
                <div className="unit one-third">
                    <h2 className="input-desc" style={{ display: 'inline-block', float: 'left' }}>icon</h2>
                  </div>
                </div>
              </div>

              <div className="grid wrap narrow">
                <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                  <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                  <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> UPLOAD </button>
                </div>
              </div>

            </div>
          </form>

        </PopUp>
        <div className="grid wrap">
          <div className="unit whole">
            <Divider
              text="WORKPLAN"
              btnLeftText="BACK"
              btnLeftClick={
                (e) => {
                  browserHistory.goBack();
                  e.preventDefault();
                }
              }
            />
          </div>
        </div>
        <div className="grid wrap narrow">
          <div className="unit one-third no-gutters">
            <button
              className="btn-primary"
              style={{ width: '200px', float: 'right' }}
              onClick={
                (e) => {
                  console.log('PROPS', this.props);
                  this.props.dispatch({
                    type: 'POPUP',
                    name: 'createTask',
                    data: {
                      active: true,
                    },
                  });
                  e.preventDefault();
                }
              }
            >CREATE TASK</button>
            {
            <PopUp id="createTask" dividerText="CREATE TASK" btnText="CREATE TASK" btnClass="btn-primary" btnStyle={{ width: '200px', float: 'right' }}>
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div>
                  <div className="grid wrap">
                    <div className="unit whole">
                      <Field
                        inputName="NAME"
                        name="WBS_NAME"
                        type="input"
                        component={ReduxInput}
                      />
                    </div>
                  </div>
                  <div className="grid wrap">
                    <div className="unit whole">
                      <Field
                        inputName="PARENT"
                        name="WBS_PARENT_ID"
                        component={ReduxSelectNew}
                      >
                        <option />
                        {
                          workplan_view &&
                          workplan_view.map((value, index) => (
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

                        component={datepickerUniversal}
                      />

                    </div>
                    <div className="unit half">
                      <Field
                        inputName="DATE"
                        name="FINISH_DATE"

                        component={datepickerUniversal}
                      />
                    </div>
                  </div>

                  <div className="grid wrap">
                    <div className="unit whole" style={{ textAlign: 'center', marginTop: '40px' }}>
                      <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"
                        onClick={e=>{
                          this.props.dispatch({
                            type: 'POPUP',
                            name:'createTask',
                            data: {
                              active:false
                            }
                          })

                          e.preventDefault()
                        }}> CANCEL </button>
                      <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} type="submit" className="btn-primary"> ADD </button>
                    </div>
                  </div>


                </div>

              </form>
            </PopUp>
}
          </div>
          <div className="unit one-third no-gutters">
            <button className="btn-secondary" style={{ width: '200px', display: 'block', margin: 'auto' }} >RE-BASELINE</button>

          </div>
          <div className="unit one-third no-gutters">
            <button
              className="btn-secondary"
              style={{ width: '200px', float: 'left' }}
              onClick={
                (e) => {
                  console.log('PROPS', this.props);
                  this.props.dispatch({
                    type: 'POPUP',
                    name: 'uploadWorkplan',
                    data: {
                      active: true,
                    },
                  });
                  e.preventDefault();
                }
              }
            >UPLOAD</button>
            <PopUp id="uploadWorkplan" dividerText="UPLOAD WORKPLAN" btnText="UPLOAD" btnClass="btn-secondary" btnStyle={{ width: '200px', float: 'left' }}>
            <form onSubmit={handleSubmit(this.onSubmitWorkplan.bind(this))}>
              <div>
              <h2 className='input-desc'>You can upload your project workplan to generate task automatically on PRouDS. Please download the project workplan template <a>here</a></h2>
              <h2 className='input-desc'><i>SELECT FILE</i></h2>
              {/*  <h2 className='input-desc'><i>You can attach one of these documents (Proposal, SPK/Contract, IWO, Change Management, Service Request, Others). If you want to add 2 or more, you can upload the compressed file (.zip). Max file size is 5 MB. allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png</i></h2>  */}
              <h2 className='input-desc'><i>max file size is 5 MB. allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png</i></h2>
              <div className="grid wrap">
              <Field
              inputName="SELECT FILE"
              name="document"
              component={ReduxUploadWorkplan}
              />
              </div>
              </div>
              <div className="btn-wrapper">
                <button className="btn-secondary" style={{ float: 'left', display: 'inline-block' }}>CANCEL</button>
                <button type="submit" className="btn-primary"style={{ float: 'right', display: 'inline-block' }}>UPLOAD</button>

              </div>

              </form>
            </PopUp>
          </div>

        </div>
        <div className="grid wrap">
          <div className="unit whole">
            <div className="card" style={{ padding: '0', overflow: 'visible' }}>
              {/* <div className='grid wrap'>
                  <div className='unit whole'>
                  </div>
                </div> */}
              <div className="grid wrap">
                <div className="unit whole">
                  {
                      !workplan ? <PageLoader /> :
                      <table className="table workplan" >
                        <thead>
                          <Header style={{ padding: '20px 0 0 20px' }} text="Project Detail" />

                          <tr>
                            <th>TASK</th>
                            <th>WORK</th>
                            <th>WORK<br />TOTAL</th>
                            <th>DURATION<br />(DAYS)</th>
                            <th>START<br />DATE</th>
                            <th>END<br />DATE</th>
                            <th>% WORK<br />COMPLETE</th>
                            <th>RESOURCES<br /></th>
                            <th></th>

                          </tr>
                        </thead>

                        <tbody>

                          {
                            this.menu(workplan)

                          }
                          {
                            workplan.children.length !=0 && this.state[(workplan.WBS_ID).toString()] &&
                            this.renderRow(workplan)
                          }
                        </tbody>


                      </table>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

}

function mapStateToProps(state) {
  return {
    formValues: state.form.add_task,
    formValues: state.form.upload_workplan,
    state,
  };
}
export default reduxForm({
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: 'add_task',
  form: 'upload_workplan'
})(
  connect(mapStateToProps, { addTaskWorkplan,uploadWorkplan,editTaskAction })(ProjectWorkplan),
);
// export default Login
