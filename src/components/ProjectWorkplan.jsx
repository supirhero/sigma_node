import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Grid } from 'react-redux-grid';
import moment from 'moment';

import store from '../reducers/combineReducers.jsx';

import { Divider, Header, ProjectHeader, PopUp, ReduxInput, ReduxSelectNew, WorkplanRow, PageLoader, datepickerUniversal,datepickerTimesheet ,ReduxInputDisabled,required,ReduxSelect,ReduxUploadWorkplan, Menu, MenuItem, MenuSection, } from './Components.jsx';


import { Field, reduxForm } from 'redux-form';
import { getWorkplanView, addTaskWorkplan, getTaskView, getTaskMemberView ,assignTaskMember,uploadWorkplan, getEditTaskView, editTaskAction, requestRebaseline} from './actions.jsx';


class ProjectWorkplan extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      WBS_id: '',
      array: {
        new_task :[],
        modified_task:[]
      }
    };
  }

  handleInitialize(data) {
    this.props.initialize(data ? data : null)
  }

  menu(value) {
    var padding =(value.LEVEL * 20).toString()

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
      <td style={{position:'relative', paddingRight:'10px'}} >

      {
        value.LEAF == 1 &&
        // React.cloneElement(this.props.children, { data: value })
          <Menu menuStyle={{top:'41', right:'10', width:'200px'}} style={{display:'inline'}} triggerClass='material-icons' triggerStyle={{fontSize:'17px', color:'#fa5962'}} icon='more_horiz'>
            <MenuSection>
              <MenuItem title='Add Timesheet' onClick={e => {

                this.handleInitialize({
                  TS_DATE: value.START_DATE,
                  PROJECT_ID: value.PROJECT_ID,
                  WBS_NAME: this.props.state.data.workplan.WBS_NAME,
                  WP_ID: value.WBS_ID,
                  TASK: value.WBS_NAME,

                  HOUR: value.WORK ? value.WORK : 0,
                  TS_SUBJECT: value.SUBJECT ? value.SUBJECT : 'none',
                  TS_MESSAGE: value.MESSAGE ? value.MESSAGE : 'none'
                })
                this.props.dispatch({
                  type: 'POPUP',
                  name:'addTimesheetWorkplan',
                  data: {
                    active:true
                  }
                })
                // this.setState({value: value}, ()=> {
                //   })
                // })

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
                  name:'assign_task',
                  data: {
                    active:true
                  }
                })
                const id = this.props.state.page.id;

                this.props.dispatch(getTaskMemberView(id,this.state.WBS_id))

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
      <td style={{position:'relative'}} >
        {
          value.REBASELINE == 'yes' &&
          <i className='material-icons' style={{color:'#cf000f'}}>error</i>}
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
    this.props.addTaskWorkplan(id, this.state.WBS_id,props).then(res=> {
      this.props.dispatch({
        type: 'POPUP',
        name:'addTimesheetWorkplan',
        data: {
          active:false
        }
      })
      var newState = this.state.array.new_task.concat(
        {
          project_id: id,
          wbs_name: props.WBS_NAME,
          wbs_parent_id: props.WBS_PARENT_ID,
          start_date: props.START_DATE,
          finish_date: props.FINISH_DATE
        }
      )
      // Object.assign({},this.state.array, )
      // console.log('BEFORE STATE', newState)
      // this.setState({array : {
      //   modified_task: this.state.array.modified_task,
      //   new_task : newState}
      // }, ()=>{
      //   console.log('AFTER STATE', this.state)
      // })
    });
  }
  onSubmitRebaseline(props){
    alert('blaa')
    var id = this.props.state.page.id
    this.props.requestRebaseline(id,props, JSON.stringify(this.state.array)).then(res=> {
      this.props.dispatch({
        type: 'POPUP',
        name: 'request_rebaseline',
        data: {
          active: false,
        },
      });
    })
    
  }
  onSubmitWorkplan(props){
    const id = this.props.state.page.id
    this.props.uploadWorkplan(id,props.document)
  }
  onSubmitEditTask(props){
    const id = this.props.state.page.id
    this.props.editTaskAction(id,this.state.WBS_id,props).then(res=>{
      var newState = this.state.array.modified_task.concat(
        {
          project_id: id,
          wbs_id: this.state.WBS_id,
          wbs_parent_id: props.PARENT_EDIT,
          wbs_name: props.NAME_EDIT,
          start_date: props.START_DATE_EDIT,
          finish_date: props.FINISH_DATE_EDIT
        }
      )
      // console.log('BEFORE STATE', newState)
      // this.setState({array : {
      //   new_task: this.state.array.new_task,
      //   modified_task : newState}
      // }, ()=>{
      //   console.log('AFTER STATE', this.state)
      // })

      
      this.props.dispatch({
        type: 'POPUP',
        name:'edit_task',
        data: {
          active:false
        }
      })
    })
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


    return (
      <div className="project-workplan">
        <div className="grid wrap narrow">
          <div className="unit whole">
        <PopUp id="addTimesheetWorkplan" dividerText="UPDATE TIMESHEET" btnText="UPLOAD FILE" btnClass="btn-primary" btnStyle={{ display: 'block', margin: 'auto' }}>
          <form >
          <div className="grid wrap narrow">
          <div className="unit whole">
            <Field
              inputName="DATE"
              name="TS_DATE"
              component={datepickerUniversal}
              // validate={[required]}
            />
          </div>
        </div>
        <div className="grid wrap narrow">
          <div className="unit whole">
            <Field
              inputName="PROJECT NAME"
              name="WBS_NAME"
              component={ReduxInputDisabled}
              // validate={[required]}
              >
              </Field>
          </div>
        </div>
        <div className="grid wrap narrow">
        <div className="unit three-quarters">
        <Field
        name="TASK"

          inputName="TASK"
          component={ReduxInputDisabled}
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
            <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW</button>
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
        <PopUp id="request_rebaseline" dividerText="RE-BASELINE" btnText="UPLOAD FILE" btnClass="btn-primary" btnStyle={{ display: 'block', margin: 'auto' }}>
          {
            !this.props.state.data.detail_task && !this.props.state.data.parent ? <PageLoader/> :
            <form onSubmit={handleSubmit(this.onSubmitRebaseline.bind(this))}>
            <div className="grid wrap narrow">
              <div className="unit whole">
                
              <h2 className='input-name'>SELECT EVIDENCE</h2>
                <div className="grid wrap">
                  <Field
                  style={{width:'100%'}}
                  inputName="SELECT FILE"
                  name="evidence"
                  component={ReduxUploadWorkplan}
                  />
                  </div>
                <Field
                  inputName="REASON"
                  name="reason"
                  type="input"
                  component={ReduxInput}
                />
           
              <button style={{display:'inline-block', marginTop: '30px', padding:'15px 65px'}} className='btn-secondary' onClick={e=>{
                this.props.dispatch({
                  type: 'POPUP',
                  name: 'request_rebaseline',
                  data: {
                    active: false,
                  },
                });
                e.preventDefault()
              }}>CLOSE</button>
              <button type='submit' style={{display:'inline-block', marginTop: '30px', padding:'15px 65px'}} className='btn-secondary' 
              >REQUEST</button>
              </div>
            </div>
            </form>
          }

        </PopUp>
          </div>
        </div>

        <PopUp id="assign_task" dividerText="ASSIGN TASK" btnText="UPLOAD FILE" btnClass="btn-primary" btnStyle={{ display: 'block', margin: 'auto' }}>
          {
            !this.props.state.data.available_to_assign && !this.props.state.data.task_name ? <PageLoader/> :

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
                <div className="unit one-fifth">
                  <small style={{ display: 'inline-block', float: 'left' }}>WORKLOAD</small>
                </div>
                <div className="unit four-fifths">
                  <small style={{ display: 'inline-block', float: 'left' }}>RESOURCES</small>
                </div>
              </div>
              {
                this.props.state.data.available_to_assign.map((value,index)=> (
                  <div className="grid wrap narrow">
                    <div className="unit one-fifth">
                      <medium style={{ display: 'inline-block', float: 'left' }}>60%</medium>
                    </div>
                    <div className="unit four-fifths">
                      <div className="unit two-fifths">
                        <medium style={{ display: 'inline-block', float: 'left' }}>{value.USER_NAME}</medium>
                      </div>
                      <div className="unit two-fifths">
                        <small style={{ display: 'inline-block', float: 'left' }}>{value.EMAIL}</small>
                      </div>
                      <div className="unit one-fifth">
                        <h2 className="input-desc" style={{ display: 'inline-block', float: 'left', textAlign:'center' }}><i  style={{color:'#D62431'}} className='icon-trash'></i></h2>
                      </div>
                    </div>
                  </div>

                ))
              }

              <div className="grid wrap narrow">
                <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                  <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                  <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> UPLOAD </button>
                </div>
              </div>

            </div>
          </form>
}
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
            <button className="btn-secondary" style={{ width: '200px', display: 'block', margin: 'auto' }} onClick={e=> {
                this.props.dispatch({
                  type: 'POPUP',
                  name: 'request_rebaseline',
                  data: {
                    active: true,
                  },
                });
              
            }}>RE-BASELINE</button>

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
              <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"
              onClick={e=>{
                this.props.dispatch({
                  type: 'POPUP',
                  name:'uploadWorkplan',
                  data: {
                    active:false
                  }
                })

                e.preventDefault()
              }}> CANCEL </button>
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
  connect(mapStateToProps, { addTaskWorkplan,uploadWorkplan,editTaskAction, requestRebaseline })(ProjectWorkplan),
);
// export default Login
