import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'


import store from '../reducers/combineReducers.jsx'
import { Divider, TimeSheetTimeButton, PopUpTimesheet, Select, ReduxSelectNew, Input, ReduxInput,PageLoader,datepickerTimesheet, PopUp } from './Components.jsx';
import { getProjectDetail, pop,addTimesheet } from './actions.jsx'
import { Field, reduxForm } from 'redux-form';

class Project extends Component {
  constructor(){
    super();
    this.state = {
      active : 'Overview'
    };
  }

  onSubmit(props){
    this.props.addTimesheet(props.WP_ID,props.TS_DATE,props.HOUR,props.TS_SUBJECT,props.TS_MESSAGE)
  }

  componentWillMount(){
    const id = this.props.state.page.id
    this.props.dispatch(getProjectDetail(id)).then(
      (res)=>{
        console.log('detail project');
      }
    )

  }

  componentWillUnmount(){
    store.dispatch(pop())
  }

  render(){
    const { handleSubmit } = this.props;
    const id = store.getState().page.id
    const sidebar = [
      {type:'menu', name : 'Overview', path: `/project/${id}`},
      {type:'menu', name : 'Edit Project', path: `/project/${id}/edit-project`},
      {type:'menu', name : 'Activities', path: `/project/${id}/activities`},
      {type:'title', name : 'MANAGE'},
      {type:'menu', name : 'Workplan', path: `/${id}/workplan`},
      {type:'menu', name : 'History', path: `/project/${id}/history`},
      {type:'menu', name : 'Team Member', path: `/project/${id}/team-member`},
      {type:'menu', name : 'Doc & Files', path: `/project/${id}/docs-and-files`},
      {type:'menu', name : 'Issues', path: `/project/${id}/issues`},
      {type:'title', name : 'REPORTS'},
      {type:'menu', name : 'SPI & CPI', path: `/project/${id}/spi-and-cpi`},
      {type:'menu', name : 'S-Curve', path: `/project/${id}/s-curve`},
      // {type:'menu', name : 'Gantt Chart', path: `/project/${id}/gantt-chart`},
    ]
    return(
      <div className='project'>
          <div className='grid wrap'>
            <div className='unit one-fifth no-gutters'>
              <div className='sidebar'>
              <div className='grid wrap'>
                <div className='unit whole no-gutters'>
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
                <PopUpTimesheet id="updateTimesheet" dividerText="UPDATE TIMESHEET" btnClass="btn-primary" btnText="UPDATE TIMESHEET" btnStyle={{ display: 'block', margin: 'auto' }}>
                <div>
                  <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <div className="grid wrap narrow">
                    <div className="unit whole">
                      <Field
                        inputName="DATE"
                        name="TS_DATE"

                        component={datepickerTimesheet}
                      />
                    </div>
                  </div>
                  <div className="grid wrap narrow">
                    <div className="unit whole">
                    <Field
                    inputName="PROJECT NAME"
                    name="PROJECT_ID"
                    type="PROJECT NAME"
                    component={ReduxInput}
                  />
                    </div>
                  </div>
                  <div className="grid wrap narrow">
                  <div className="unit three-quarters">
                  <Field
                  style={{width:'96%'}}
                  inputName="TASK"
                  name="WP_ID"
                  type="WP_ID"
                  component={ReduxInput}
                />
                  </div>

                    <div className="unit one-quarter">
                      <Field
                        inputName="WORK HOURS"
                        name="HOUR"
                        type="HOUR"
                        component={ReduxInput}
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
                      />
                    </div>
                  </div>
                  <div className="grid wrap narrow">
                    <div className="unit whole">
                      <Field
                        style={{marginBottom:'20px'}}
                          inputName="MESSAGE"
                          name="TS_MESSAGE"
                          // type="TS_MESSAGE"
                          component={ReduxInput}
                        />
                    </div>
                  </div>

                  <div className="grid wrap narrow">
                    <div className="unit whole" style={{ textAlign: 'center' }}>
     {/*   <button type="submit" style={{ display: 'inline-block', width: '200px', marginLeft: '40px'}} className="btn-primary"> ADD NEW</button> */}
                    </div>
                  </div>

                </form>
                </div>
              </PopUpTimesheet>

                </div>
              </div>
              <div className='grid wrap sidebar'>
                <div className='unit whole '>
                  <ul>
                    {
                      sidebar.map((value, index) => {
                        if (value.type == 'menu') {
                          return(
                            <li key={index}><small className={ this.state.active == value.name ? 'active' : '' } onClick={
                              e => {
                                const name = value.name
                                this.setState({
                                  active : value.name
                                })
                                if (value.name == 'Workplan') {
                                  browserHistory.push(value.path)
                                }
                                else {
                                  browserHistory.replace(value.path)

                                }
                                e.preventDefault()
                              }
                            }>{value.name}</small></li>
                          )
                        }
                        else {
                          return(

                            <li key={index} style={{marginTop:'45px'}}><medium>{value.name}</medium></li>
                          )
                        }

                    })
                  }


                  </ul>


                </div>
              </div>

            </div>
          </div>


        <div className='unit four-fifths'>

          {
            store.getState().data.overview ?
            this.props.children:
            <PageLoader></PageLoader>


          }
        </div>
      </div>


      </div>

    )
  }

}


function mapStateToProps(state) {
  return {
    formValues: state.form.updateTimesheet,

    state,
    // filter: ownProps.location.query.filter
  };
}

export default reduxForm({
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: 'updateTimesheet',
})(
  connect(mapStateToProps, { addTimesheet })(Project),
);
