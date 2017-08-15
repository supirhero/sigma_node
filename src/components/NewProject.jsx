import React, {Component} from 'react'
import { connect } from 'react-redux'
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

import {addNewProject, getProjectView, pop} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'
import {Divider, Input, RadioButton, Select, PopUp, ReduxInput, muiTheme, ReduxSelect} from './Components.jsx'



class NewProject extends Component {
  handleInitialize() {
  const initData = {
    "IWO_NO": 'NONE',
    "PM": 'NONE',
    "AM_ID": 'NONE',
    "TYPE_OF_EFFORT": 'NONE',
    "PROJECT_STATUS": 'NOT STARTED',
    // "START": '2017-1-1',
    // "END": '2017-1-1',
    "TYPE_OF_EXPENSE": 'CAPITAL EXPENSE',
  };

  this.props.initialize(initData);
}
  componentDidMount(){
    this.handleInitialize();
    const state = store.getState()
    const id = state.data.page.new_project.bu_code
    store.dispatch(getProjectView(id))
  }
  componentWillUnmount(){
    store.dispatch(pop())
  }
  onSubmit(props){
    alert(props)
    this.props.addNewProject(props)
  }
    render(){
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
      const typeOfExpense = [
        {value: 'Capital Expense'},
        {value: 'Current Expense'},
        {value: 'Dedutible Expense'},
      ]
      return(
        <div>
          <MuiThemeProvider muiTheme={muiTheme}>

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
              <div className= 'grid wrap narrow'>
              <div className='unit whole'>
                <Field
                  inputName="IWO NUMBER"
                  name="IWO_NO"
                  component={ReduxSelect}

                >
                  {
                    projectStatus.map((value, index)=> (
                      <option value={value.value} {...this.props.option}>{value.value}</option>

                    ))
                  }
                </Field>

                <Field
                  inputName="NAME"
                  name="PROJECT_NAME"
                  type='input'
                  style={{width:'100%'}}
                  component={ReduxInput}
                />
                <Field
                  inputName="BUSINESS UNIT"
                  name="BU"
                  type="BU"
                  style={{width:'100%'}}
                  component={ReduxInput}
                />
                <Field
                  inputName="RELATED BUSINESS UNIT"
                  name="RELATED"
                  type="RELATED"
                  style={{width:'100%'}}
                  component={ReduxInput}
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
                    component={ReduxInput}
                  />
                </div>
                <div className='unit two-thirds'>
                  <Field
                    inputName="END CUSTOMER"
                    name="END_CUST_ID"
                    type="END_CUST_ID"
                    style={{width:'100%'}}
                    component={ReduxInput}
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
                    component={ReduxInput}
                  />
                </div>
                <div className='unit one-third'>
                  <Field
                    inputName="MARGIN"
                    name="MARGIN"
                    type="MARGIN"
                    style={{width:'100%'}}
                    component={ReduxInput}
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
                        {
                          projectStatus.map((value, index)=> (
                            <option value={value.value} {...this.props.option}>{value.value}</option>
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

                      >
                        {
                          projectStatus.map((value, index)=> (
                            <option value={value.value} {...this.props.option}>{value.value}</option>
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
                        component={ReduxSelect}
                      >
                        {
                          projectStatus.map((value, index)=> (
                            <option value={value.value} {...this.props.option}>{value.value}</option>
                          ))
                        }
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
                    component={ReduxSelect}
                  >
                    {
                      projectStatus.map((value, index)=> (
                        <option value={value.value} {...this.props.option}>{value.value}</option>

                      ))
                    }

                  </Field>

                </div>
              </div>
              {/* <div className='grid wrap narrow'>
                <div className='unit half'>
                  <Field
                    inputName='START DATE'
                    name="START"
                    style={{width:'96%'}}
                    component={ReduxSelect}
                  >
                    {
                      projectStatus.map((value, index)=> (
                        <option value={value.value} {...this.props.option}>{value.value}</option>
                      ))
                    }
                  </Field>

                </div>
                <div className='unit half'>
                  <Field
                    inputName='END DATE'
                    name="END"
                    style={{width:'96%', float:'right'}}
                    component={ReduxSelect}
                  >
                    {
                      projectStatus.map((value, index)=> (
                        <option value={value.value} {...this.props.option}>{value.value}</option>
                      ))
                    }
                  </Field>

                </div>
              </div> */}
              <div className='grid wrap narrow'>
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
              </div>
              <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <Field name="VISIBILITY" component={RadioButtonGroup}>
                    <RadioButton value="PROJECT_MEMBER" label='Project Members Only'/>
                  </Field>
                </div>
              </div>

              <div className='grid wrap narrow'>
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
              </div>
              <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <Divider text='PROJECT CHARTER FORM'></Divider>
                </div>
              </div>
              <div className='grid wrap narrow'>
                <div className='unit three-quarters'>
                  <large style={{display: 'block', marginBottom:'11px'}}>FORM STATUS:&nbsp;<span style={{color:'#65BDF4'}}>DRAFTED</span></large>
                  <large style={{display: 'inline-block'}}>COMPLETION:&nbsp;<span style={{color:'#65BDF4'}}>25%</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</large>

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
                  <PopUp id='complete' dividerText='PROJECT CHARTER FORM' btnClass='btn-primary' btnText='COMPLETE FORM'>
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
                          <Select inputName='WU DELIVERY' items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }}></Select>
                        </div>
                        <div className='unit half'>
                          <Select inputName='WU RELATED' items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }}></Select>
                        </div>
                      </div>


                    </div>

                  </PopUp>
                </div>


              </div>
              <div className='grid wrap narrow'>
                <div className='unit whole'>
                  <div className='btn-wrapper'>
                    <button className='btn-secondary' style={{display:'inline-block'}}>CANCEL</button>
                    <button className='btn-primary' type='submit' style={{float:'right', display:'inline-block'}}>CREATE PROJECT</button>

                  </div>

                </div>
              </div>

            </form>
          </MuiThemeProvider>

            </div>
      )
    }

}

function mapStateToProps(state) {
  return {
    state
    // filter: ownProps.location.query.filter
  }
}

export default connect(mapStateToProps, { addNewProject })
    (
      reduxForm({
        form: 'add_project',
      })(NewProject));
// export default connect(mapStateToProps)(NewProject)
// export default Login
