import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Grid } from 'react-redux-grid';
import store from '../reducers/combineReducers.jsx';
// <<<<<<< HEAD
import { Divider, Header, ProjectHeader, PopUp, ReduxInput, ReduxSelectNew, WorkplanRow, PageLoader, datepickerUniversal,datepickerTimesheet ,ReduxInputDisabled,required,ReduxSelect } from './Components.jsx';
import { Field, reduxForm } from 'redux-form';
import { getWorkplanView, addTaskWorkplan, getTaskView, getTaskMemberView ,assignTaskMember} from './actions.jsx';


class ProjectWorkplan extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,

    };
  }
  onSubmit(props) {
    const id = this.props.state.page.id;

    this.props.addTaskWorkplan(id, props);
  }
  componentWillMount() {
    const id = this.props.state.page.id;
    store.dispatch(getWorkplanView(id));
    store.dispatch(getTaskView(id));


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

        <PopUp id="edit" dividerText="EDIT TASK" btnText="UPLOAD FILE" btnClass="btn-primary" btnStyle={{ display: 'block', margin: 'auto' }}>
        <form >
        <div>
          <div className="grid wrap narrow">
            <div className="unit whole">
              <Field
                inputName="NAME"
                name="desc"
                type="input"
                component={ReduxInput}
              />
              {/* <Input inputName="FILE DESCRIPTION" placeholder="max 160 characters" /> */}
            </div>
          </div>
          <div className="grid wrap narrow">
            <div className="unit whole">
            <Field
            inputName="START DATE"
            name="desc"
            type="input"
            component={ReduxSelectNew}
          />
             
            </div>
          
          </div>
          <div className="grid wrap narrow">
            <div className="unit half">
              <Field
              inputName="START DATE"
              name="desc"
              type="input"
              component={datepickerUniversal}
            />
              
            </div>
            <div className="unit half">
            <Field
            inputName="END DATE"
            name="desc"
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
                      <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                      <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} type="submit" className="btn-primary"> ADD </button>
                    </div>
                  </div>


                </div>

              </form>
            </PopUp>

          </div>
          <div className="unit one-third no-gutters">
            <button className="btn-secondary" style={{ width: '200px', display: 'block', margin: 'auto' }} >RE-BASELINE</button>

          </div>
          <div className="unit one-third no-gutters">
            <button
              className="btn-primary"
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
              <div>
                <small>You can upload your project workplan to generate task automatically on PRouDs. Please download the project workplan template <a>here</a></small>
                <Field
                  inputName="WORK HOURS"
                  name="HOUR"
                  inputDesc="max file size is 5 MB allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png"
                  component={ReduxInput}
                />
              </div>
              <div className="btn-wrapper">
                <button className="btn-secondary" style={{ float: 'left', display: 'inline-block' }}>CANCEL</button>
                <button className="btn-primary"style={{ float: 'right', display: 'inline-block' }}>UPLOAD</button>

              </div>

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
                          </tr>
                        </thead>

                        <WorkplanRow data={workplan} />


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
    state,
  };
}
export default reduxForm({
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: 'add_task',
})(
  connect(mapStateToProps, { addTaskWorkplan })(ProjectWorkplan),
);
// export default Login
