import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew ,Header, Search, PopUp,ReduxSelect,ReduxInput,ReduxInputDisabled,RadioButton } from './Components.jsx';
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
  render() {
    const { handleSubmit } = this.props;
    const BusinessLevel = [
			{name:'Update personal timesheet',field:'update_personal_timesheet'},
      {name:'Access business unit overview',field:'access_business_unit'},
      {name:'Create object',field:'create_object'},
      {name:'Access all projects in business unit',field:'access_all_projects'},
      {name:'Approve timesheet (non-project)',field:'approve_timesheet'},
      {name:'See report overview',field:'see_report_overview'},
      {name:'See resources report',field:'see_resources_report'},
      {name:'Download Report',field:'download_report'},
      {name:'Approve re-baseline',field:'approve_rebaseline'},
    ]

    const ProjectLevel = [
			{name:'Upload and delete workplan',field:'upload_delete_workplan'},
      {name:'Assign Task',field:'assign_task'},
      {name:'Baseline / re-baseline',field:'baseline_rebaseline'},
      {name:'Update progress manually',field:'update_progress_manually'},
      {name:'Approve Timesheet (project)',field:'approve_timesheet'},
      {name:'Edit Project',field:'edit_project'},
      {name:'See Project Report',field:'see_project_report'},
      {name:'Download Report',field:'download_report'},
    ]

    return (
      <div>
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
                        name="description"
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
                            <Field name={value.field} component={RadioButtonGroup}>
                              <RadioButton value="ALL-BU"/>
                            </Field>              
                        </div>
                        <div className="unit one-third">
                            <Field name={value.field} component={RadioButtonGroup}>
                              <RadioButton value="ONLY-BU"/>
                            </Field>              
                        </div>
                        <div className="unit one-third">
                            <Field name={value.field} component={RadioButtonGroup}>
                            <RadioButton value="CAN'T"/>
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
                          <div className="unit one-third" style={{visibility:'hidden'}}>
                            .
                          </div>
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
                              <small className="label">{value.name}</small>
                            </div>
                            <div className="unit half">
                              <div className="unit one-third">
                                  <Field name={value.field} component={RadioButtonGroup}>
                                    <RadioButton value="ALL-BU"/>
                                  </Field>              
                              </div>
                              <div className="unit one-third">
                                  <Field name={value.field} component={RadioButtonGroup}>
                                    <RadioButton value="ONLY-BU"/>
                                  </Field>              
                              </div>
                              <div className="unit one-third">
                                  <Field name={value.field} component={RadioButtonGroup}>
                                  <RadioButton value="CAN'T"/>
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
                          <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW </button>
                        </div>
                      </div>
                    </div>
                  </PopUp>

                  <Search placeholder="search project type" style={{ float: 'right', width: '400px' }} />
                </div>
                <div className="unit whole">
                  <TableNew
                  tableHeader={[{value:'NO'},{value:'NAME'},{value:'DESCRIPTION'}]}
                  tableData={[{column:[
                    {value:'1'},
										{value:'PRouDS'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
                  ]},{column:[
                    {value:'2'},
										{value:'Space Admin'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
                  ]},{column:[
                    {value:'3'},
										{value:'Power User'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
                  ]},{column:[
                    {value:'4'},
										{value:'Team Member'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
                  ]},
                  ]}>
                </TableNew>

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
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: 'addNewRole',
})(
  connect(mapStateToProps, null )(ManageRoles),
);
