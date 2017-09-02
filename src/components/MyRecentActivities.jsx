import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import store from '../reducers/combineReducers.jsx';
import { Divider, Input, RadioButton, Select, PageLoader ,ReduxSelect,ReduxInput,datepickerTimesheet,ReduxSelectNew,PopUp} from './Components.jsx';
import { Line } from 'react-progressbar.js';
import { getMyActivities, pop,resubmitTimesheet,addTimesheet} from './actions.jsx';
import moment from 'moment'
import { Field, reduxForm } from 'redux-form';

class MyRecentActivities extends Component {
  componentWillMount() {
    const myActivity = store.getState().data.activity_timesheet;
    store.dispatch(getMyActivities());
  }

  componentWillUnmount() {
    store.dispatch(pop());
  }

  onSubmit() {
    alert('Please Re-Login to See Updated Profile')
    
    
    
  }
  

  render() {
    const { handleSubmit } = this.props;
    const myActivity = store.getState().data.activity_timesheet;
    if (!myActivity) {
      return <PageLoader />;
    }
    
    function pill(value) {
      let className = 'pill pending';
      let text = 'PENDING';
      switch (value) {
        case '0':
          className = 'pill denied';
          text = 'DENIED';
          break;
        case '1':
          className = 'pill approved';
          text = 'APPROVED';
          break;
        case '-1':
          className = 'pill pending';
          text = 'PENDING';
          break;
        default:
      }
      return (<div className={className} style={{ float: 'right' }}>{text}</div>);
    }

    return (
      <div>
      <PopUp id="addNewTimesheet" dividerText="INPUT TIMESHEET" btnClass="btn-primary" btnText="INPUT TIMESHEET" btnStyle={{ display: 'block', margin: 'auto' }}>
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
              // onChange={
              //   (e, value)=>{
              //     store.dispatch(taskList(value))
              //     console.log(value)
              //     // store.dispatch(pop());
              //     // e.preventDefault()
              //   }
              // }
              component={ReduxSelectNew}
              // validate={[required]}
              >
            <option></option>
   


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
                                >
                                <option></option>
                                
                             </Field>
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
          <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"
          onClick={e=>{
            this.props.dispatch({
              type: 'POPUP',
              name:'addNewTimesheet',
              data: {
                active:false
              }
            })

            e.preventDefault()
          }}> CANCEL </button>
            <button type="submit" style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary" > SUBMIT</button>
          </div>
        </div>

      </form>
      </div>
    </PopUp>
        <div className="grid wrap">
          <div className="unit whole">
            <Divider
              btnLeftText="BACK"
              style={{ marginTop: '0' }}
              btnLeftClick={(e) => {
                browserHistory.push('/');
                e.preventDefault();
              }}
              text="MY RECENT ACTIVITIES"
            />
          </div>
        </div>

    {/*    <div className="grid wrap">
          <div className="unit whole">
            <h2 style={{ marginBottom: '0' }} className="input-desc">GENERATE REPORT</h2>
          </div>
        </div>

        <div className="grid wrap">
          <div className="unit one-third" >
            <Select
              style={{ width: '100%', display: 'inline-block', float: 'left', marginRight: '30px' }}
              items={{
                items: [
                    { title: 'JANUARY' },
                    { title: 'FEBRUARY' },
                ],
              }}
            />
          </div>
          <div className="unit one-third" >
            <Select
              style={{ width: '225px', display: 'inline-block', float: 'right' }}
              items={{
                items: [
                    { title: '2017' },
                    { title: '2016' },
                ],
              }}
            />
          </div>
          <div className="unit one-third" >
            <button className="btn-primary"style={{ float: 'right', padding: '17px 90px' }}>PRINT</button>
          </div>
        </div>
*/} 
     

     

        <div className="grid wrap">
          <div className="unit whole">
            <Divider style={{ marginTop: '0' }} text={moment().format("YYYY-MM-DD")} />
          </div>
        </div>
        {
  myActivity.map((value, index) => (
    <div key={index}>
      <div className="grid wrap">
        <div className="unit whole" style={{ paddingBottom: '0' }}>
          <div className="card project">

            <div className="grid wrap">
              <div className="unit whole">
                <medium style={{ display: 'inline' }}>
                  <a href="" style={{display:'block'}}>{value.project_name}</a>
                </medium>

                {pill(value.is_approved)}

              </div>

              <small className="project-info" style={{ margin: 'auto' }}>
              (<b>{value.hour_total} hours</b>) - {value.wbs_name}
              </small>
            </div>

            <div className="grid wrap">
              <div className="unit whole">
                <div className="person">
                  <div className="person-image" style={{ margin: 'auto' }} />
                  <div className="person-info" style={{ marginLeft: '55px' }}>
                    <medium style={{ float: 'left' }}><b>{value.user_name}</b></medium>
                    <small style={{ display: 'inline' }}>, Project Manager</small>
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '55px', marginTop: '-25px' }}>
                    <small>
                      <b>{value.subject}</b> "{value.message}"
                  </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid wrap">
              <div className="unit whole" style={{ marginLeft: '104px' }}>
                <small style={{ fontSize: '12px' }}>{value.submit_date ? `submitted on : ${(value.submit_date).substr(0,9)} | ${(value.submit_date).substr(10,5)} ${(value.submit_date).substr(26,2)}`:null}</small>
                <medium style={{ display: 'inline', marginLeft: '37%' }}>
                {
                value.is_approved == 0 &&
                <a style={{marginLeft:'45px'}} onClick={e => {
                  this.props.dispatch({
                    type: 'POPUP',
                    name:'addNewTimesheet',
                    data: {
                      active:false
                    }
                  })
                  // store.dispatch(resubmitTimesheet(value.project_id,value.wp,value.ts_date,value.hour_total,value.subject,value.message),()=>{ 
                  //   store.dispatch(getMyActivities()) 
                }}
                >
                RE-SUBMIT TIMESHEET</a>
              }
                </medium>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))

}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
  
    formValues: state.form.AddNewTimesheet,
    state,
    // filter: ownProps.location.query.filter
  };
  }
  
  export default reduxForm({
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: 'AddNewTimesheet',
  })(
  connect(mapStateToProps, { addTimesheet })(MyRecentActivities),
  );
  