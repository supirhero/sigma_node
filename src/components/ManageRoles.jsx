import React, { Component } from 'react';
import { connect,destroy } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication,getProfile,editProfileView ,createProfile, editProfileAction, showNotif} from './actions.jsx';
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
      id : 0,
      search: ""

    };
  }



  componentWillMount(){
    store.dispatch(getProfile(this.state.search))
    // store.dispatch(editProfileView("3"))
  }

  // componentWillUpdate(){
  //   store.dispatch(getProfile())
  // }

  onSubmit(props){
    this.props.dispatch(createProfile(props)).then(
      ()=> {
        showNotif('Successfully created role', 'GREEN')
        
        store.dispatch({
          type: 'POPUP',
          name: 'createRole',
          data: {
            active:false,
          }
        })
        this.props.dispatch(getProfile(this.state.search))
      }
    )

  }

  onSubmitEdit(props){
    this.props.dispatch(editProfileAction(props)).then(
      ()=> {
        showNotif('Successfully edited role', 'GREEN')
        store.dispatch({
          type: 'POPUP',
          name: 'createRole',
          data: {
            active:false,
          }
        })
        this.props.dispatch(getProfile(this.state.search))
      }
    )
  }

  render() {
    const { handleSubmit } = this.props;
    const BusinessLevel = [
      {name:'Admin Console',no:'role_1'},
      {name:'Home-View, & Project Assignment',no:'role_2'},
      {name:'Overview, Listing All Project in BU',no:'role_3'},
      {name:'BU - Invite/Delete Member BU',no:'role_4'},
      {name:'Report BU - Overview (SPI & CPI)',no:'role_5'},
      {name:'Report BU - Directorat / BU',no:'role_6'},
      {name:'Report BU - Team Member',no:'role_7'},
      {name:'Report Project - Find All Project',no:'role_8'},
    ]
    const ProjectLevel=[
      {name:'Project Assignment - Edit Project',no:'role_9'},
      {name:'Project Assignment - Activities Approval',no:'role_10'},
      {name:'Project Assignment - Workplan',field:'upload_delete_workplan',no:'role_11'},
      {name:'Project Assignment - Team Member - Invite / Delete',field:'assign_task',no:'role_12'},
      {name:'Project Assignment - Docs & Files',field:'baseline_rebaseline',no:'role_13'},
      {name:'Project Assignment - Issues',field:'update_progress_manually',no:'role_14'},
      {name:'Project Assignment - Manual Update Activities',field:'approve_timesheet',no:'role_15'},
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
              <button type='submit' style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> EDIT </button>
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

                  
                  <Search placeholder='Search for User' style={{width:'400px', display:'block', float:'right'}}
                  onChange={e=>{
                    this.setState({search:e.target.value},()=>{
                      store.dispatch(getProfile(this.state.search))
                    })
                    e.preventDefault()
                  }}
                  
                   >
            
                  </Search>
                </div>
                <div className="unit whole">
                <TablePaginationRoles
                form='addNewRole'
                editPopUp='editRole'
                tableHeader={[{value:'ID'},{value:'NAME'},{value:'DESCRIPTION'}, {value: null}]}
                tableData={ this.props.state.data.profile ? store.getState().data.profile.map((value,index)=>{
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
