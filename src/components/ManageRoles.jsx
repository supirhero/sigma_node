import React, { Component } from 'react';
import { connect,destroy } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication,getProfile,editProfileView ,createProfile, editProfileAction} from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew ,Header, Search, PopUp,ReduxSelect,ReduxInput,ReduxInputDisabled,RadioButton ,TablePaginationRoles} from './Components.jsx';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form';

class ManageRoles extends Component {
  constructor(){
    super();
    this.state = {
      id : 0

    };
  }

  componentWillMount(){
    store.dispatch(getProfile())
    // store.dispatch(editProfileView("3"))
  }

  // componentWillUpdate(){
  //   store.dispatch(getProfile())
  // }

  onSubmit(props){
    alert("New Role Created")
    this.props.dispatch(createProfile(props)).then(
      ()=> {
        
        store.dispatch({
          type: 'POPUP',
          name: 'createRole',
          data: {
            active:false,
          }
        })
        store.dispatch(getProfile())
      }
    )
  
  }

  onSubmitEdit(props){
    alert("Role Updated")
    this.props.dispatch(editProfileAction(props)).then(
      ()=> {
        
        store.dispatch({
          type: 'POPUP',
          name: 'createRole',
          data: {
            active:false,
          }
        })
        store.dispatch(getProfile())
      }
    )
  }

  render() {
    const { handleSubmit } = this.props;
    const BusinessLevel = [
			{name:'Update personal timesheet',field:'update_personal_timesheet',no:'role_1'},
      {name:'Access business unit overview',field:'access_business_unit',no:'role_2'},
      {name:'Create project',field:'create_project',no:'role_3'},
      {name:'Access all projects in business unit',field:'access_all_projects',no:'role_4'},
      {name:'Approve timesheet (non-project)',field:'approve_timesheet',no:'role_5'},
      {name:'See report overview',field:'see_report_overview',no:'role_6'},
      {name:'See resources report',field:'see_resources_report',no:'role_7'},
      {name:'Download Report',field:'download_report',no:'role_8'},
      {name:'Approve re-baseline',field:'approve_rebaseline',no:'role_9'},
    ]

    const ProjectLevel = [
			{name:'Upload and delete workplan',field:'upload_delete_workplan',no:'role_10'},
      {name:'Assign Task',field:'assign_task',no:'role_11'},
      {name:'Baseline / re-baseline',field:'baseline_rebaseline',no:'role_12'},
      {name:'Update progress manually',field:'update_progress_manually',no:'role_13'},
      {name:'Approve Timesheet (project)',field:'approve_timesheet',no:'role_14'},
      {name:'Edit Project',field:'edit_project',no:'role_15'},
      {name:'See Project Report',field:'see_project_report',no:'role_16'},
      {name:'Download Report',field:'download_report_project',no:'role_17'},
    ]

    return (
      <div>
      <PopUp id="editRole" dividerText="EDIT ROLE" btnText="ADD NEW" btnClass='btn-primary' style={{ display: 'inline-block', marginLeft: '35px' }}>
      <form onSubmit={handleSubmit(this.onSubmitEdit.bind(this))}>
        <div>
          <div className="grid wrap narrow">
            <div className="unit whole">
                <Field
                inputName="ROLE NAME"
                name="role_name"
                component={ReduxInputDisabled}
                // validate={[required]}
              />
            </div>
          </div>
          <div className="grid wrap narrow">
            <div className="unit whole">
            <Field
            inputName="DESCRIPTION"
            name="role_desc"
            component={ReduxInputDisabled}
            // validate={[required]}
          />
            </div>
          </div>

          <div className="grid wrap narrow pop-container">
            <div className="unit whole">
              <small>PRIVILEGES</small>
            </div>
          </div>


          <div className="grid wrap narrow">
            <div className="unit half">
              <small>IN BUSINESS UNIT LEVEL</small>
            </div>
            <div className="unit half">
              <div className="unit one-third">
                <small >ALL BU</small>
              </div>
              <div className="unit one-third">
                <small >ONLY BU</small>
              </div>
              <div className="unit one-third">
                <small >CAN'T</small>
              </div>
            </div>
          </div>

  {
      BusinessLevel.map((value,index)=>{
        return(
          <div key={index} className="grid wrap narrow">
          <div className="unit half">
            <small className="label">{value.name}</small>
          </div>
          <div className="unit half">
            <div className="unit one-third">
                <Field name={value.no}  component={RadioButtonGroup}>
                  <RadioButton value="all_bu"/>
                </Field>              
            </div>
            <div className="unit one-third">
                <Field name={value.no}  component={RadioButtonGroup}>
                  <RadioButton value="only_bu"/>
                </Field>              
            </div>
            <div className="unit one-third">
                <Field name={value.no}  component={RadioButtonGroup}>
                <RadioButton value="cant"/>
              </Field>              
          </div>
          </div>
        </div>
        )
      })
  }
          

          <div className="grid wrap narrow">
            <div className="unit half">
              <small>IN PROJECT LEVEL</small>
            </div>

            <div className="unit half">
              <div className="unit one-third">
                <small>CAN</small>
              </div>
              <div className="unit one-third">
                <small>CAN'T</small>
              </div>
            </div>
          </div>

          {
            ProjectLevel.map((value,index)=>{
              return(
                <div className="grid wrap narrow">
                <div className="unit half">
                  <small className="label" key={index} >{value.name}</small>
                </div>
                <div className="unit half">
             
                  <div className="unit one-third">
                      <Field name={value.no} key={index} component={RadioButtonGroup}>
                        <RadioButton value="can"/>
                      </Field>              
                  </div>
                  <div className="unit one-third">
                      <Field name={value.no} key={index} component={RadioButtonGroup}>
                      <RadioButton value="cant"/>
                    </Field>              
                </div>
                </div>
              </div>
              )
            })
          }

          <div className="grid wrap narrow">
            <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
              <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary" onClick={e=> {
                this.props.dispatch({
                    type: 'POPUP',
                    name:'createRole',
                    data: {
                      active:false
                    }
                  })
                e.preventDefault()
                }}> CANCEL </button>
              <button type='submit' style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW </button>
            </div>
          </div>
        </div>
        </form>
      </PopUp>
        <div className="grid dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
							<div className="table-wrap">

                <div className="unit one-quarter">
                  <Header text="Roles / Type of User" style={{ display: 'inline-block' }} />
								</div>

                <div className="unit three-quarters">
                <button className='btn-primary'
                style={{display:'inline-block', margin: 'auto'}}
                onClick={
                e => {
                  console.log('PROPS', this.props);
                  this.props.dispatch({
                    type: 'POPUP',
                    name:'createRole',
                    data: {
                      active:true
                    }
                  })
                  e.preventDefault()
                }
              }
                >
                CREATE ROLE
                
              </button>
                  <PopUp id="createRole" dividerText="CREATE ROLE" btnText="ADD NEW" btnClass='btn-primary' style={{ display: 'inline-block', marginLeft: '35px' }}>
                  <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                            <Field
                            inputName="ROLE NAME"
                            name="role_name"
                            component={ReduxInput}
                            // validate={[required]}
                          />
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                        <Field
                        inputName="DESCRIPTION"
                        name="role_desc"
                        component={ReduxInput}
                        // validate={[required]}
                      />
                        </div>
                      </div>

                      <div className="grid wrap narrow pop-container">
                        <div className="unit whole">
                          <small>PRIVILEGES</small>
                        </div>
                      </div>


                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <small>IN BUSINESS UNIT LEVEL</small>
                        </div>
                        <div className="unit half">
                          <div className="unit one-third">
                            <small >ALL BU</small>
                          </div>
                          <div className="unit one-third">
                            <small >ONLY BU</small>
                          </div>
                          <div className="unit one-third">
                            <small >CAN'T</small>
                          </div>
                        </div>
                      </div>

              {
                  BusinessLevel.map((value,index)=>{
                    return(
                      <div className="grid wrap narrow">
                      <div className="unit half">
                        <small className="label">{value.name}</small>
                      </div>
                      <div className="unit half">
                        <div className="unit one-third">
                            <Field name={value.no} key={index} component={RadioButtonGroup}>
                              <RadioButton value="all_bu"/>
                            </Field>              
                        </div>
                        <div className="unit one-third">
                            <Field name={value.no} key={index} component={RadioButtonGroup}>
                              <RadioButton value="only_bu"/>
                            </Field>              
                        </div>
                        <div className="unit one-third">
                            <Field name={value.no} key={index} component={RadioButtonGroup}>
                            <RadioButton value="cant"/>
                          </Field>              
                      </div>
                      </div>
                    </div>
                    )
                  })
              }
                      

                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <small>IN PROJECT LEVEL</small>
                        </div>

                        <div className="unit half">
                          <div className="unit one-third">
                            <small>CAN</small>
                          </div>
                          <div className="unit one-third">
                            <small>CAN'T</small>
                          </div>
                        </div>
                      </div>

                      {
                        ProjectLevel.map((value,index)=>{
                          return(
                            <div className="grid wrap narrow">
                            <div className="unit half">
                              <small className="label" key={index} >{value.name}</small>
                            </div>
                            <div className="unit half">
                         
                              <div className="unit one-third">
                                  <Field name={value.no} key={index} component={RadioButtonGroup}>
                                    <RadioButton value="can"/>
                                  </Field>              
                              </div>
                              <div className="unit one-third">
                                  <Field name={value.no} key={index} component={RadioButtonGroup}>
                                  <RadioButton value="cant"/>
                                </Field>              
                            </div>
                            </div>
                          </div>
                          )
                        })
                      }

                      <div className="grid wrap narrow">
                        <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                          <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                          <button type='submit' style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW </button>
                        </div>
                      </div>
                    </div>
                    </form>
                  </PopUp>

                  <Search placeholder="search project type" style={{ float: 'right', width: '400px' }} />
                </div>
                <div className="unit whole">
                <TablePaginationRoles
                form='addNewRole'
                editPopUp='editRole'
                tableHeader={[{value:'ID'},{value:'NAME'},{value:'DESCRIPTION'}, {value: null}]}
                tableData={ store.getState().data.profile ? store.getState().data.profile.map((value,index)=>{
                  return {column:[
                    {value:value.PROF_ID},
                    {value:value.PROF_NAME},
                    {value:value.PROF_DESC},
                  ]}
                }):null}>
              </TablePaginationRoles>   
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

    formValues: state.form.addNewRole,
    state,
    // filter: ownProps.location.query.filter
  };
}

export default reduxForm({
  onSubmitSuccess: (res, dispatch) => {
        dispatch(destroy('addNewRole'))
  },
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: 'addNewRole',
})(
  connect(mapStateToProps, {getProfile,editProfileView ,createProfile, editProfileAction} )(ManageRoles),
);
