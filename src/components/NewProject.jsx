import React, {Component} from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import { Line} from 'react-progressbar.js'
import {Field, reduxForm} from 'redux-form';
// import { pop } from 'react-router-redux'

import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'

import {MuiThemeProvider, getMuiTheme, RadioButton as RadioMaterial } from 'material-ui'

import {addNewProject, getAddProjectView, pop, getIWO, getAccountManager, } from './actions.jsx'
import store from '../reducers/combineReducers.jsx'
import {Divider, Input, RadioButton, Select, PopUp, ReduxInput, muiTheme, ReduxSelect, ReduxInputDisabled, InputFile, PageLoader, required, datepickerUniversal, isIWOUsed, ReduxInputAsync} from './Components.jsx'



class NewProject extends Component {
  constructor(){
    super();
    this.state = {
      iwo_index : 0

    };
  }

  handleInitialize(data) {
    const initData = {
      "IWO_AVAILABLE": 'true',

      "IWO_NO": null,
      // "END_CUST_ID": iwo[0].END_CUSTOMER,
      // "AMOUNT": iwo[0].AMOUNT,
      // "PROJECT_NAME": iwo[0].PROJECT_NAME,
      // "RELATED": iwo[0].RELATED_BU,
      // "CUST_ID": iwo[0].CUSTOMER_ID,
      // "MARGIN": iwo[0].MARGIN,
      "BU": data.BU_NAME,
      // // "PM": 'NONE',
      // // "AM_ID": 'NONE',
      // // "TYPE_OF_EFFORT": 'NONE',
      // "PROJECT_STATUS": 'NOT STARTED',
      "H/O": 'yes',
      "PROJECT_TYPE_ID": 'project',
      //
      // // "START": '2017-1-1',
      // // "END": '2017-1-1',
      // "TYPE_OF_EXPENSE": 'CAPITAL EXPENSE',
    };

  this.props.initialize(initData);
}

  componentWillMount(){
    // store.dispatch(getIWO(30)).then(()=> {
    //
    // })
    const state = store.getState()
    const id = this.props.state.page ? this.props.state.page.new_project.bu_code : null
    const iwo = this.props.state.page ? this.props.state.page.new_project.iwo : null

    const err = store.dispatch(getAddProjectView(id)).then(
      (res) => {
        this.handleInitialize(res.data.business_unit);
        console.log("VIEW", res);
        // const data = this.props.state.data.business_unit
        // store.dispatch(getIWO(30)).then((res2)=> {
        //   // this.handleInitialize(res.data.business_unit,res2.data.iwo);
        //   console.log("IWO", res2);
        //
        // })

      }
    )
    store.dispatch(getIWO(30)).then((res2)=> {
      // this.handleInitialize(res.data.business_unit,res2.data.iwo);
      console.log("IWO", res2);

    })

    console.log("ERORRRRRRR",err);


  }
  componentWillUnmount(){
    store.dispatch(pop('new_project'))

  }
  onSubmit(props){
    alert("submitted")
    this.props.addNewProject(props)
  }
    render(){
      // const projectSetting = this.props.state.data.project.project_setting
      const projectManager = this.props.state.data.project_manager
      // const accountManager = this.props.state.data.project.account_manager_list
      const new_project = this.props.state.data
      const iwo = new_project.iwo ? new_project.iwo : false
      const form_values = this.props.formValues  ? this.props.formValues.values : false



      const {handleSubmit} = this.props;

      const projectStatus = [
        {value: 'Not Started'},
        {value: 'In Progress'},
        // {value: 'On Hold'},
        {value: 'Cancel'},
        {value: 'Complete'},
        // {value: 'In Planning'},
        // {value: 'Cancelled'},
      ]
      const typeOfEffort = [
        {value: 'Project'},
        {value: 'CR'},
        {value: 'Manage'},
        {value: 'Operation'},
        {value: 'Maintenance'},
        {value: 'Manage Service'},
        {value: 'Non Project'},
      ]
      const typeOfExpense = [
        {value: 'Capital Expense'},
        {value: 'Current Expense'},
        {value: 'Dedutible Expense'},
      ]

      return(

        !iwo && !projectManager && !form_values ? <PageLoader/> :
        <div>

          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}

            >
          <div className='grid wrap narrow'>
            <div className='unit whole'>
              <Divider btnLeftText='BACK' style={{marginTop:'0'}} btnLeftClick={ e => {
                browserHistory.goBack()
                e.preventDefault()

              }} text='CREATE NEW PROJECT'></Divider>
              <div className='grid wrap'>
                <div className='unit one-quarter'>
                  <medium style={{textAlign:'center', marginTop:'20px'}}>IWO</medium>
                </div>
                <div className='unit one-quarter'>
                  <medium style={{textAlign:'center', marginTop:'20px'}}>PRODUCT</medium>
                </div>
                <div className='unit one-quarter'>
                  <medium style={{textAlign:'center', marginTop:'20px'}}>STATUS</medium>
                </div>
                <div className='unit one-quarter'>
                  <medium style={{textAlign:'center', marginTop:'20px'}}>FINANCE</medium>
                </div>
              </div>
              <Divider text='IWO'></Divider>
            </div>
          </div>
          <div className='grid wrap narrow'>

              <div className='unit whole'>
                <h2 className='input-name'>IWO AVAILABLE?</h2>

                  <div className='grid'>
                    <div className='unit one-third'>
                      <Field name="IWO_AVAILABLE"
                       component={RadioButtonGroup}>
                        <RadioButton value='true' label="Yes"/>
                      </Field>
                    </div>
                    <div className='unit two-thirds'>
                      <Field name="IWO_AVAILABLE" component={RadioButtonGroup} onChange={(e,value)=>{
                        var fields = [
                          {
                            field: 'IWO_NO',
                            value: ''
                          },
                          {
                            field: 'AMOUNT',
                            value: ''
                          },
                          {
                            field: 'PROJECT_NAME',
                            value: ''
                          },
                          {
                            field: 'RELATED',
                            value: ''
                          },
                          {
                            field: 'CUST_ID',
                            value: ''
                          }
                          ,
                          {
                            field: 'MARGIN',
                            value: ''
                          },
                          {
                            field: 'END_CUST_ID',
                            value: ''
                          }
                        ]

                        fields.map((value, index) => {
                          this.props.change(
                            value.field, value.value
                          )

                        })

                        }}
                        >
                        <RadioButton value='false' label="No"/>
                      </Field>
                    </div>
                  </div>


              </div>
            </div>
              <div className= 'grid wrap narrow'>
              <div className='unit whole'>

                {
                  form_values &&
                  form_values.IWO_AVAILABLE == 'false'  ?

                  <Field
                    inputName="IWO NUMBER"
                    name="IWO_NO"
                    type='input'
                    style={{width:'100%'}}
                    // asyncValidate= {isIWOUsed()}
                    component={ReduxInputAsync}
                    validate={[required]}

                    // }}
                  >
                </Field>
                  :


                  <Field
                  inputName="IWO NUMBER"
                  name="IWO_NO"
                  component={ReduxSelect}
                  validate={[required]}

                  onChange={(e,value)=> {
                    // store.dispatch(getAccountManager(res2.data))
                    if (value != '' ) {
                      var iwo_no = this.props.formValues.values.IWO_NO
                      var i = _.findIndex(iwo, { 'IWO_NO' : value});
                      var arr =iwo[i]
                      store.dispatch(getAccountManager(arr.ACCOUNT_MANAGER_ID))
                      var fields = [
                        {
                          field: 'AMOUNT',
                          value: arr.AMOUNT
                        },
                        {
                          field: 'PROJECT_NAME',
                          value: arr.PROJECT_NAME
                        },
                        {
                          field: 'RELATED',
                          value: arr.RELATED_BU
                        },
                        {
                          field: 'CUST_ID',
                          value: arr.CUSTOMER_ID
                        }
                        ,
                        {
                          field: 'MARGIN',
                          value: arr.MARGIN
                        },
                        {
                          field: 'END_CUST_ID',
                          value: arr.END_CUSTOMER
                        }
                      ]

                      fields.map((value, index) => {
                        this.props.change(
                          value.field, value.value
                        )

                      })
                    }

                    // e.preventDefault()
                  }}
                  // onChange={(event, index, value)=>{
                  //
                  //   // alert(this.state.iwo_index)
                  // }}
                >
                  <option value='' >Select IWO</option>

                  {
                    iwo &&
                    iwo.map((value, index) => (
                      <option key ={index} am_id={value.ACCOUNT_MANAGER_ID} value={value.IWO_NO} {...this.props.option}>{value.IWO_NO}</option>

                    ))
                  }
                </Field>
              }

                <Field
                  inputName="NAME"
                  name="PROJECT_NAME"
                  type='input'
                  style={{width:'100%'}}
                  component={form_values && form_values.IWO_AVAILABLE == 'true'  ? ReduxInputDisabled : ReduxInput}
                  validate={[required]}
                >

                </Field>
                <Field
                  inputName="BUSINESS UNIT"
                  name="BU"
                  type="BU"
                  style={{width:'100%'}}
                  // component={form_values.IWO_AVAILABLE == 'true'  ? ReduxInputDisabled : ReduxInput}
                  component={ReduxInputDisabled}
                  validate={[required]}

                />
                <Field
                  inputName="RELATED BUSINESS UNIT"
                  name="RELATED"
                  type="RELATED"
                  style={{width:'100%'}}
                  component={form_values && form_values.IWO_AVAILABLE == 'true' ? ReduxInputDisabled : ReduxInput}
                  validate={required}

                />

              </div>
              </div>
              <div className='grid wrap narrow'>
                <div className='unit one-third'>
                  <Field
                    inputName="CUSTOMER"
                    name="CUST_ID"
                    type="CUST_ID"
                    style={{width:'88%'}}
                    component={form_values && form_values.IWO_AVAILABLE == 'true'  ? ReduxInputDisabled : ReduxInput}
                    validate={[required]}

                  />
                </div>
                <div className='unit two-thirds'>
                  <Field
                    inputName="END CUSTOMER"
                    name="END_CUST_ID"
                    type="END_CUST_ID"
                    style={{width:'100%'}}
                    component={form_values && form_values.IWO_AVAILABLE == 'true'  ? ReduxInputDisabled : ReduxInput}
                    validate={[required]}

                  />
                </div>
              </div>
              <div className='grid wrap narrow'>
                <div className='unit two-thirds'>
                  <Field
                    inputName="PROJECT VALUE"
                    name="AMOUNT"
                    type="AMOUNT"
                    style={{width:'94%'}}
                    component={form_values && form_values.IWO_AVAILABLE == 'true'  ? ReduxInputDisabled : ReduxInput}
                    validate={[required]}

                  />
                </div>
                <div className='unit one-third'>
                  <Field
                    inputName="MARGIN"
                    name="MARGIN"
                    type="MARGIN"
                    style={{width:'100%'}}
                    component={form_values && form_values.IWO_AVAILABLE == 'true'  ? ReduxInputDisabled : ReduxInput}
                    validate={[required]}

                  />
                </div>

              </div>
              <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <small>You have to fill this <a>project charter form</a> because your project value exceed Rp 10 Billion</small>
                </div>
              </div>

              <div className='grid wrap narrow'>
                <div className='unit whole'>

                  <Divider text='PRODUCT'></Divider>
                </div>
              </div>
              <div className= 'grid wrap narrow'>
              <div className='unit whole'>
                <Field
                  inputName="DESCRIPTION"
                  name="DESC"
                  type="DESC"
                  style={{width:'100%'}}
                  validate={[required]}
                  component={ReduxInput}
                />
              </div>
              </div>
              <div className='grid wrap narrow'>
                <div className='unit half'>
                  <div className='grid wrap'>
                    {/* <div className='unit half'>
                      <Field className='radio-button' name="PROJECT_TYPE_ID" component="input" type="radio" value="Project" label='PROJECT' />
                    </div>
                    <div className='unit half'>
                      <Field className='radio-button' name="PROJECT_TYPE_ID" component="input" type="radio" value="Non Project" label='NON PROJECT' />

                    </div> */}
                    <h2 className='input-name'>PROJECT TYPE</h2>
                    <div className='unit half'>

                      <Field name="PROJECT_TYPE_ID" component={RadioButtonGroup}>
                        <RadioButton value="project" label="Project"/>
                      </Field>
                    </div>
                    <div className='unit half'>
                      <Field name="PROJECT_TYPE_ID" component={RadioButtonGroup}>
                        <RadioButton value="non project" label="Non-project"/>
                      </Field>

                    </div>
                      {/* <Field name="projectType" component={RadioButtonGroup}>
                      </Field> */}


                  </div>
                  <div className='grid wrap narrow'>
                    <div className='unit whole'>
                      <Field
                        inputName="PROJECT MANAGER"
                        name="PM"
                        style={{width:'96%'}}
                        component={ReduxSelect}
                      >
                        <option value=''>Select Project Manager</option>

                        {
                          projectManager.map((value, index)=> (
                            <option key={index} value={value.USER_ID} {...this.props.option}>{value.USER_NAME}</option>
                          ))
                        }
                      </Field>

                    </div>
                  </div>
                  <div className='grid wrap narrow'>
                    <div className='unit whole'>
                      <Field
                        inputName="TYPE OF EFFORT"
                        name="TYPE_OF_EFFORT"
                        style={{width:'96%'}}
                        component={ReduxSelect}
                        validate={[required]}

                      >
                        <option value='' >Select type of effort</option>

                        {
                          typeOfEffort.map((value, index)=> (
                            <option key={index} value={value.value} {...this.props.option}>{value.value}</option>
                          ))
                        }
                      </Field>

                    </div>
                  </div>
                </div>
                <div className='unit half'>
                  <div className='grid wrap'>
                    <h2 className='input-name'>H/O OPERATION</h2>

                    <div className='unit half'>
                      <Field name="H/O" component={RadioButtonGroup}>
                        <RadioButton value="yes" label="YES"/>
                      </Field>
                    </div>
                    <div className='unit half'>
                      <Field name="H/O" component={RadioButtonGroup}>
                        <RadioButton value="no" label="NO"/>
                      </Field>

                    </div>
                  </div>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Field
                        inputName="ACCOUNT MANAGER"
                        name="AM_ID"
                        style={{width:'96%', float:'right'}}
                        component={ReduxSelect}>
                        <option value='' >Select Account Manager</option>

                           <option value={this.props.state.data.username != null ? this.props.state.data.username: null }> {this.props.state.data.username } </option>
                       {/*
                          this.props.state.data.AM_ID &&
                          this.props.state.data.AM_ID.map((value, index)=> (
                            <option value={value.value} {...this.props.option}>{value.value}</option>
                          ))
                   */}
                      </Field>

                    </div>
                  </div>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <Field
                        inputName='PRODUCT TYPE'
                        name="PRODUCT_TYPE"
                        style={{width:'96%', float:'right'}}
                        type="input"
                        // style={{width:'100%'}}
                        validate={[required]}
                        component={ReduxInput}
                      />
                    </div>
                  </div>

                </div>
              </div>
              <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <Divider text='STATUS'></Divider>
                </div>
              </div>
              <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <Field
                    inputName='PROJECT STATUS'
                    name="PROJECT_STATUS"
                    style={{width:'100%'}}
                    component={ReduxInputDisabled}
                  >
                    {/* {
                      projectStatus.map((value, index)=> (
                        <option value={value.value} {...this.props.option}>{value.value}</option>

                      ))
                    } */}

                  </Field>

                </div>
              </div>
              <div className='grid wrap narrow'>
                <div className='unit half'>
                  <Field
                    inputName='START DATE'
                    name="START"
                    style={{width:'96%'}}
                    component={datepickerUniversal}
                    validate={[required]}
                  >
                  </Field>

                </div>
                <div className='unit half'>
                  <Field
                    inputName='END DATE'
                    name="END"
                    style={{width:'100%', float:'right'}}
                    component={datepickerUniversal}
                    validate={[required]}

                  >
                  </Field>

                </div>
              </div>
              {/* <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <h1 className='input-name'>VISIBILITY</h1>
                </div>
              </div>
              <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <Field name="VISIBILITY" component={RadioButtonGroup}>
                    <RadioButton value="BUSINESS_MEMBER" label='Owning Busniness Member'/>
                  </Field>
                </div>
              </div> */}
              {/* <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <Field name="VISIBILITY" component={RadioButtonGroup}>
                    <RadioButton value="PROJECT_MEMBER" label='Project Members Only'/>
                  </Field>
                </div>
              </div> */}

              {/* <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <Divider text='FINANCE'></Divider>
                </div>
              </div>
              <div className='grid wrap narrow'>
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
                  <div className='grid wrap narrow'>
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
              <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <Divider text='PROJECT CHARTER FORM'></Divider>
                </div>
              </div>
              <div className='grid wrap narrow'>
                <div className='unit three-quarters'>
                  <medium style={{display: 'block', marginBottom:'11px'}}>FORM STATUS:&nbsp;<span style={{color:'#65BDF4'}}>DRAFTED</span></medium>
                  <medium style={{display: 'inline-block'}}>COMPLETION:&nbsp;<span style={{color:'#65BDF4'}}>25%</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</medium>

                  <div className='completion-bar' style ={{display:'inline-block'}}>

                    <Line
                      progress={30 *0.01}
                      initialAnimate={true}
                      options={{
                        strokeWidth: 3,
                        color: '#65BDF4',
                        trailColor:'#EEEEEE',
                        trailWidth: 12,
                        fontSize: 30,
                        easing: 'easeInOut',
                        duration: 700,
                      }}
                      containerClassName={'line-bar'}
                      >
                      </Line>
                  </div>

                </div>
                <div className='unit one-quarter'>
                  {/* <button className='btn-primary' onClick={
                    e => {
                      store.dispatch({
                        type : 'POPUP',
                        id : 'form',
                        popup : true
                      })
                      e.preventDefault()
                    }
                  }>COMPLETE FORM</button> */}
                  {/* <PopUp id='complete' dividerText='PROJECT CHARTER FORM' btnClass='btn-primary' btnStyle={{padding:'15px 19px'}} btnText='COMPLETE FORM'>
                    <div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='PROJECT NAME' ></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit half'>
                          <Input inputName='IWO'></Input>
                        </div>
                        <div className='unit half'>
                          <Input inputName='PROJECT MANAGER'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit half'>
                          <Input inputName='CLIENT'></Input>
                        </div>
                        <div className='unit half'>
                          <Input inputName='END CUSTOMER'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit half'>
                          <Input inputName='WU DELIVERY'></Input>
                        </div>
                        <div className='unit half'>
                          <Input inputName='WU RELATED'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='PROJECT VALUE'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit half'>
                          <Select inputName='PROJECT START DATE' items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }}></Select>
                        </div>
                        <div className='unit half'>
                          <Select inputName='PROJECT END DATE' items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }}></Select>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <div className='divider' style={{margin:'15px 0', borderColor:'#cccccc'}}></div>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='PROJECT DESCRIPTION'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='SCOPE OF WORK' placeholder='Uraian terkait pekerjaan yang akan dideliver (hardware/software/services, dll)'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='CONSTRAINTS' placeholder='Sebutkan constraints (keterbatasan kondisi) yang ada di dalam project' ></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='ASSUMPTIONS' placeholder='Sebutkan asumsi-asumsi yang digunakan untuk menjalankan project'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='RISKS' placeholder='Sebutkan resiko-resiko yang mungkin terjadi di dalam project'></Input>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName='DELIVERABLES' placeholder='Dokumen yang harus dideliver untuk penyelesaian project'></Input>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <div className='divider' style={{margin:'15px 0', borderColor:'#cccccc'}}></div>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <h2 className= "input-name">MILESTONES</h2>
                        </div>
                        <div className="unit whole" style={{paddingLeft:'0', paddingTop:'0'}}>
                          <h2 className= "input-desc"><i>Tahapan penting dan tanggal penting dalam project</i></h2>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <Input inputName='DATE' style={{width:'40%', display:'inline-block'}} ></Input>
                          <Input inputName='MILESTONE' style={{width:'54%',display:'inline-block',marginLeft:'20px'}} ></Input>
                        </div>
                        <div className="unit half">
                          <Input inputName='DESCRIPTION' style={{width:'70%',display:'inline-block'}}></Input>
                      </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <Input style={{width:'40%', display:'inline-block'}} ></Input>
                          <Input style={{width:'54%',display:'inline-block',marginLeft:'20px'}} ></Input>
                        </div>
                        <div className="unit half">
                          <Input style={{width:'70%',display:'inline-block'}}></Input>
                          <button className='btn-primary' style={{padding:'11px 14px',float:'right'}} ><span className="fa fa-trash fa-2x" style={{color:'white'}}></span></button>
                      </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <button className='btn-primary' style={{padding:'16px 25px',marginTop:'5px'}}>ADD MILESTONES</button>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <div className='divider' style={{margin:'15px 0', borderColor:'#cccccc'}}></div>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <h2 className= "input-name">ROLES AND RESPONSIBILITIES</h2>
                        </div>
                        <div className="unit whole" style={{paddingLeft:'0', paddingTop:'0'}}>
                          <h2 className= "input-desc"><i>Daftar role and responsibilities tim member </i></h2>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <Input inputName='NAME' style={{width:'40%', display:'inline-block'}} ></Input>
                          <Input inputName='ROLES' style={{width:'54%',display:'inline-block',marginLeft:'20px'}} ></Input>
                        </div>
                        <div className="unit half">
                          <Input inputName='RESPONSIBILITIES' style={{width:'70%',display:'inline-block'}}></Input>
                      </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <Input style={{width:'40%', display:'inline-block'}} ></Input>
                          <Input style={{width:'54%',display:'inline-block',marginLeft:'20px'}} ></Input>
                        </div>
                        <div className="unit half">
                          <Input style={{width:'70%',display:'inline-block'}}></Input>
                          <button className='btn-primary' style={{padding:'11px 14px',float:'right'}} ><span className="fa fa-trash fa-2x" style={{color:'white'}}></span></button>
                      </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <button className='btn-primary' style={{padding:'16px 25px',marginTop:'5px'}}>ADD ROLES AND RESPONSIBILITIES</button>
                        </div>
                      </div>
                      <div className='grid wrap narrow'>
                        <div className='unit whole'>
                          <Input inputName="PROJECT MANAGER'S RESPONSIBILITIES" placeholder='Uraian tanggung jawab PM'style={{width:'80%'}}></Input>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <div className='divider' style={{margin:'15px 0', borderColor:'#cccccc'}}></div>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <h2 className='input-desc'>SUPPORTING DOCUMENT</h2>
                          <h2 className='input-desc'><i>You can attach one of these documents (Proposal, SPK/Contract, IWO, Change Management, Service Request, Others). If you want to add 2 or more, you can upload the compressed file (.zip). Max file size is 5 MB. allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png</i></h2>
                        </div>
                        <div className="unit whole no-gutters">
                          <InputFile placeholder="Select file from your computer"/>
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className='unit whole' style={{textAlign:'center',marginTop:'50px'}}>
                          <button style={{ display:'inline-block', width:'200px'}} className='btn-secondary'> CLOSE </button>
                          <button style={{ display:'inline-block',width:'200px',marginLeft:'40px'}} className='btn-primary'> PRINT </button>
                        </div>
                      </div>



                    </div>

                  </PopUp> */}
                </div>


              </div>
              <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <div className='btn-wrapper'>
                    <button className='btn-secondary' style={{display:'inline-block'}} onClick={
                      e => {
                        browserHistory.push('/')
                        e.preventDefault()
                      }
                    }>CANCEL</button>
                    <button className='btn-primary' type='submit' style={{float:'right', display:'inline-block'}}>CREATE PROJECT</button>

                  </div>

                </div>
              </div>

            </form>


            </div>
      )
    }

}

function mapStateToProps(state) {
  return {
    formValues : state.form.add_project,
    state
    // filter: ownProps.location.query.filter
  }
}

export default connect(mapStateToProps, { addNewProject })
    (
      reduxForm({
        form: 'add_project',
        // isIWOUsed,
        // validate,
        // asyncBlurFields: [ 'IWO_NO' ],
      })(NewProject));
// export default connect(mapStateToProps)(NewProject)
// export default Login
