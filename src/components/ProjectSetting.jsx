import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { push, replace, goBack } from 'react-router-redux'

import store from '../reducers/combineReducers.jsx';
import { Line } from 'react-progressbar.js';
import { Divider, Input, RadioButton, Select, PopUp, ProjectHeader, InputFile, muiTheme, ReduxSelect, ReduxInput, ReduxInputDisabled, PageLoader, datepicker, datepickerUniversal, 
  required, ReduxAutoComplete } from './Components.jsx';
import { Field, reduxForm, load } from 'redux-form';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker,
} from 'redux-form-material-ui';
import { MuiThemeProvider, getMuiTheme, RadioButton as RadioMaterial } from 'material-ui';
import { getEditProjectView, editProject, getIWOEditProject, checkAM, showNotif,getProjectDetail } from './actions.jsx';
import moment from 'moment';


class EditProject extends Component {
  constructor() {
    super()
    this.state={
      loaded: false
    }
  }
  handleInitialize(data, bu_code, id) {
    const initData = {
      IWO_NO: data.iwo_no !== "NONE" ? data.iwo_no : "NONE" ,
      END_CUST_ID: data.cust_end_id,
      AMOUNT: data.amount ? data.amount : 0,
      PROJECT_NAME: data.project_name,
      RELATED: data.related_bu,
      CUST_ID: data.cust_id,
      MARGIN: data.margin ? data.margin : 0,
      BU: data.bu_code,
      DESC: data.project_desc,
      AM_ID: data.am_id,
      PROJECT_TYPE_ID: data.project_type_id,
        // "BU":"IMS",
      PRODUCT_TYPE: data.product_type,
      HO: data.ho_operation ? data.ho_operation : 'yes',
      PM: data.pm_id,
      // AM_ID: 'NONE',
      TYPE_OF_EFFORT: data.type_of_effort ? data.type_of_effort : 6,
      PROJECT_STATUS: (data.project_status).toUpperCase(),
      START: data.schedule_start,
      END: data.schedule_end,
      TYPE_OF_EXPENSE: 'CAPITAL EXPENSE',

    };
    this.setState({loaded:true})
    this.props.initialize(initData);
  }


  componentWillMount() {
    const id = this.props.state.page.id;
    const iwo = this.props.state ? this.props.state : null;
    // this.props.dispatch(getIWOEditProject(30)).then((res2) => {
    //   // this.handleInitialize(res.data.project_setting, res2.data.iwo, res.data.project_business_unit_detail, id);
    // });
    this.props.dispatch(getProjectDetail(id))
    
    this.props.dispatch(getEditProjectView(id)).then(
        (res) => {
          console.log('RES', res);
          
          // const data = this.props.state.data.new_project.business_unit
          // this.props.handleInitialize(res.data.project_setting, res.data.project_business_unit_detail, id)
          this.handleInitialize(res.data.project_setting, res.data.project_business_unit_detail, id);
          // this.setState({
          //   loaded:true
          // })
        },
      );
  }
  onSubmit(props) {
    console.log(props);
    const id = this.props.state.page.id
    const bu_code = store.getState().page.project.bu_code;

    this.props.editProject(props, id, bu_code).then(res=> {
      const id = this.props.state.page.id
      this.props.dispatch(getProjectDetail(id)).then(
        (res)=>{
          console.log('detail project');
        }
      )
      this.props.dispatch(replace(`/project/${id}`))
      this.props.dispatch(showNotif('Successfully edited project', 'GREEN'))
    });
  }

  render() {
    const projectStatus = [
      { value: 'NOT STARTED' },
        { value: 'IN PROGRESS' },
        {value: 'ON HOLD'},
        { value: 'CANCELLED' },
        { value: 'COMPLETED' },
        // {value: 'In Planning'},
        // {value: 'Cancelled'},
    ];
    const { handleSubmit } = this.props;
    const project = this.props.state.data;
    const projectSetting = project.project_setting ? project.project_setting : null;
    const projectManager = project.project_manajer_list ? project.project_manajer_list : null;
    const accountManager = project.account_manager_list ? project.account_manager_list : null;
    const projectEffort = project.type_of_effort ? project.type_of_effort : null;
    const iwo = project.iwolist ? project.iwolist : null;
    const iwo_map = iwo ? iwo.map((value,index)=>{
      return {
        IWO_NO:value.iwo_no, 
        PROJECT_NAME:value.project_name, 
        RELATED_BU:value.related_bu, 
        CUSTOMER_ID:value.customer_id, 
        MARGIN:value.margin,
        END_CUSTOMER: value.end_customer,
        AM_ID: value.account_manager_id,
        AMOUNT: value.amount
      }
     }) : null
    const iwo_no = this.props.state.data.project_setting && (this.props.state.data.project_setting.iwo_no).toUpperCase()
    return (
        !this.state.loaded &&  !this.props.state.data.overview ? <PageLoader/> :
        <div>


          <div className="grid padding-left">
            <div className="unit whole">
              <ProjectHeader projectName={this.props.state.data.overview.project_name} sectionName="EDIT PROJECT" />

            </div>
          </div>
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >

            <div className="grid wrap padding-left">
              <div className="unit whole">

                <div className="grid wrap">
                  <div className="unit whole">
                    <small style={{ textAlign: 'left', marginTop: '20px', display: 'inline-block' }}>IWO</small>

                    <small style={{ textAlign: 'left', marginTop: '20px', display: 'inline-block', marginLeft: '40px' }}>Product</small>

                    <small style={{ textAlign: 'left', marginTop: '20px', display: 'inline-block', marginLeft: '40px' }}>Status</small>

                    <small style={{ textAlign: 'left', marginTop: '20px', display: 'inline-block', marginLeft: '40px' }}>Finance</small>
                  </div>
                </div>
                <Divider text="IWO" />
              </div>
            </div>
            <div className="grid wrap narrow padding-left">
              <div className="unit whole">
              {
              !iwo ? 
                  <Input
                  inputStyle={{
                    backgroundColor:'white',
                    backgroundSize: '33px',
                    backgroundImage:'url(http://www.xiconeditor.com/image/icons/loading.gif)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right',
                    width:'100%'
                  }}
                />
                :
                <Field
                  inputName="IWO NUMBER"
                  name="IWO_NO"
                  forms="edit_project"
                  data={iwo_map}
                  validate={iwo && [required]}
                  component={ReduxAutoComplete}
                  onChange = {(e,value,bla) => console.log("ASDAD")}
                  
                  />
                
                }



                

                <Field
                  inputName="NAME"
                  name="PROJECT_NAME"
                  type="input"
                  validate={required}
                  style={{ width: '100%' }}
                  component={iwo_no !='NONE' ?  ReduxInputDisabled : ReduxInput}
                />
                <Field
                  inputName="BUSINESS UNIT"
                  name="BU"
                  type="BU"
                  style={{ width: '100%' }}
                  component={ReduxInputDisabled}
                />
                <Field
                  inputName="RELATED BUSINESS UNIT"
                  name="RELATED"
                  type="RELATED"
                  style={{ width: '100%' }}
                  component={iwo_no !='NONE' ?  ReduxInputDisabled : ReduxInput}
                />

              </div>
            </div>
            <div className="grid wrap narrow padding-left">
              <div className="unit one-third">
                <Field
                  inputName="CUSTOMER"
                  name="CUST_ID"
                  type="CUST_ID"
                  style={{ width: '88%' }}
                  component={iwo_no !='NONE' ?  ReduxInputDisabled : ReduxInput}
                />
              </div>
              <div className="unit two-thirds">
                <Field
                  inputName="END CUSTOMER"
                  name="END_CUST_ID"
                  type="END_CUST_ID"
                  style={{ width: '100%' }}
                  component={iwo_no !='NONE' ?  ReduxInputDisabled : ReduxInput}
                />
              </div>
            </div>
            <div className="grid wrap narrow padding-left" >
              <div className="unit two-thirds">
                <Field
                  inputName="PROJECT VALUE"
                  name="AMOUNT"
                  type="AMOUNT"
                  style={{ width: '94%' }}
                  component={iwo_no !='NONE' ?  ReduxInputDisabled : ReduxInput}
                />
              </div>
              <div className="unit one-third">
                <Field
                  inputName="MARGIN"
                  name="MARGIN"
                  type="MARGIN"
                  style={{ width: '100%' }}
                  component={iwo_no !='NONE' ?  ReduxInputDisabled : ReduxInput}
                />
              </div>

            </div>
            {/* <div className="grid wrap narrow padding-left">
              <div className="unit whole">
                <small>You have to fill this <a>project charter form</a> because your project value exceed Rp 10 Billion</small>
              </div>
            </div> */}

            <div className="grid wrap narrow padding-left">
              <div className="unit whole">

                <Divider text="PRODUCT" />
              </div>
            </div>
            <div className="grid wrap narrow padding-left">
              <div className="unit whole">
                <Field
                  inputName="DESCRIPTION"
                  name="DESC"
                  type="DESC"
                  style={{ width: '100%' }}
                  component={ReduxInput}
                />
              </div>
            </div>
            <div className="grid wrap narrow padding-left">
              <div className="unit half">
                <div className="grid wrap">
                  {/* <div className='unit half'>
                      <Field className='radio-button' name="PROJECT_TYPE_ID" component="input" type="radio" value="Project" label='PROJECT' />
                    </div>
                    <div className='unit half'>
                      <Field className='radio-button' name="PROJECT_TYPE_ID" component="input" type="radio" value="Non Project" label='NON PROJECT' />

                    </div> */}
                  <h2 className="input-name">PROJECT TYPE</h2>
                  <div className="unit half">

                    <Field name="PROJECT_TYPE_ID" component={RadioButtonGroup}>
                      <RadioButton value="project" label="Project" />
                    </Field>
                  </div>
                  <div className="unit half">
                    <Field name="PROJECT_TYPE_ID" component={RadioButtonGroup}>
                      <RadioButton value="non project" label="Non-project" />
                    </Field>

                  </div>
                  {/* <Field name="projectType" component={RadioButtonGroup}>
                      </Field> */}


                </div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Field
                      inputName="PROJECT MANAGER"
                      name="PM"
                      style={{ width: '96%' }}
                      component={ReduxSelect}
                    >
                      {
                          projectManager &&
                          projectManager.map((value, index) => (
                            <option value={value.user_id} {...this.props.option}>{value.user_name}</option>
                          ))
                        }
                    </Field>

                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Field
                      inputName="TYPE OF EFFORT"
                      name="TYPE_OF_EFFORT"
                      style={{ width: '96%' }}
                      component={ReduxSelect}
                    >
                        <option></option>
                       {
                          this.props.formValues &&
                          this.props.formValues.values &&
                          
                          this.props.formValues.values.PROJECT_TYPE_ID == 'project' ?
                          projectEffort &&
                          projectEffort.map((value, index) => (
                            <option key={index} value={value.value} {...this.props.option}>{value.name}</option>
                          ))
                          :
                          <option value='8' {...this.props.option}>Non Project</option>
                          
                        }
                    </Field>

                  </div>
                </div>
              </div>
              <div className="unit half">
                <div className="grid wrap">
                  <h2 className="input-name">H/O OPERATION</h2>

                  <div className="unit half">
                    <Field name="HO" component={RadioButtonGroup}>
                      <RadioButton value="yes" label="YES" />
                    </Field>
                  </div>
                  <div className="unit half">
                    <Field name="HO" component={RadioButtonGroup}>
                      <RadioButton value="no" label="NO" />
                    </Field>

                  </div>
                </div>
                <div className="grid wrap">
                  <div className="unit whole">
                    <Field
                      inputName="ACCOUNT MANAGER"
                      name="AM_ID"
                      style={{ width: '96%', float: 'right' }}
                      component={ReduxInput}
                    >

                    </Field>

                  </div>
                </div>
                <div className="grid wrap">
                  <div className="unit whole">
                    <Field
                      inputName="PRODUCT TYPE"
                      name="PRODUCT_TYPE"
                      style={{ width: '96%', float: 'right' }}
                      type="input"
                        // style={{width:'100%'}}
                      component={ReduxInput}
                    />
                  </div>
                </div>

              </div>
            </div>
            <div className="grid wrap narrow padding-left">
              <div className="unit whole">
                <Divider text="STATUS" />
              </div>
            </div>
            <div className="grid wrap narrow padding-left">
              <div className="unit whole">
                <Field
                  inputName="PROJECT STATUS"
                  name="PROJECT_STATUS"
                  style={{ width: '100%' }}
                  component={ReduxSelect}
                >

                  {
                      projectStatus.map((value, index) => (
                        <option value={value.value} {...this.props.option}>{value.value}</option>

                      ))
                    }

                </Field>

              </div>
            </div>
            <div className="grid wrap narrow padding-left">
              <div className="unit half">
                <Field
                  inputName="START DATE"
                  name="START"
                  style={{ width: '96%' }}
                  component={ReduxInputDisabled}
                />

              </div>
              <div className="unit half">
                <Field
                  inputName="END DATE"
                  name="END"
                  style={{ width: '96%', float: 'right' }}
                  component={datepickerUniversal}
                >
                  {/* {
                      projectStatus.map((value, index)=> (
                        <option value={value.value} {...this.props.option}>{value.value}</option>
                      ))
                    } */}
                </Field>

              </div>
            </div>
            {/* <div className='grid wrap narrow padding-left'>
                <div className='unit whole'>
                  <h1 className='input-name'>VISIBILITY</h1>
                </div>
              </div>
              <div className='grid wrap narrow padding-left'>
                <div className='unit whole'>
                  <Field name="VISIBILITY" component={RadioButtonGroup}>
                    <RadioButton value="BUSINESS_MEMBER" label='Owning Busniness Member'/>
                  </Field>
                </div>
              </div> */}
            {/* <div className='grid wrap narrow padding-left'>
                <div className='unit whole'>
                  <Field name="VISIBILITY" component={RadioButtonGroup}>
                    <RadioButton value="PROJECT_MEMBER" label='Project Members Only'/>
                  </Field>
                </div>
              </div> */}

            {/* <div className='grid wrap narrow padding-left'>
                <div className='unit whole'>
                  <Divider text='FINANCE'></Divider>
                </div>
              </div>
              <div className='grid wrap narrow padding-left'>
                <div className='unit half'>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Field
                        inputName='TYPE OF EXPENSE'
                        name="TYPE_OF_EXPENSE"
                        style={{width:'96%'}}
                        component={ReduxSelect}
                      >
                        {
                          typeOfExpense.map((value, index)=> (
                            <option value={value.value} {...this.props.option}>{value.value}</option>
                          ))
                        }

                      </Field>

                    </div>
                  </div>
                  <div className='grid wrap narrow padding-left'>
                    <div className='unit whole'>
                      <Field
                        inputName='ACTUAL COST WORK PLAN'
                        name="ACTUAL_COST"
                        style={{width:'96%'}}
                        type="input"
                        // style={{width:'100%'}}
                        component={ReduxInput}
                      />
                    </div>
                  </div>
                </div>
                <div className='unit half'>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Field
                        inputName='PROJECT OVERHEAD'
                        name="OVERHEAD"
                        style={{width:'96%', float:'right'}}
                        type="input"
                        // style={{width:'100%'}}
                        component={ReduxInput}
                      />
                    </div>
                  </div>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Field
                        inputName='COGS'
                        name="COGS"
                        style={{width:'96%', float:'right'}}
                        type="input"
                        // style={{width:'100%'}}
                        component={ReduxInput}
                      />
                    </div>
                  </div>

                </div>
              </div> */}
              {/*
                
                <div className="grid wrap narrow padding-left">
                <div className="unit whole">
                <Divider text="PROJECT CHARTER FORM" />
                </div>
                </div>
              */}
           
           
            




            <div className="grid wrap">
              <div className="unit whole">
                <button type="submit" className="btn-primary" style={{ float: 'right', width: '18%' }}>SAVE</button>
              </div>
            </div>

          </form>

        </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    formValues: state.form.edit_project,

    state,
    // filter: ownProps.location.query.filter
  };
}
// export default connect(mapStateToProps)(NewProject)
export default connect(mapStateToProps, { editProject })(
      reduxForm({
        form: 'edit_project',
      })(EditProject));
// export default Login
