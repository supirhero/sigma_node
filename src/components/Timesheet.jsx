import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import store from '../reducers/combineReducers.jsx';
import { Divider, TimeSheetTimeButton, PopUp, Select, ReduxSelectNew, Input, ReduxSelect,ReduxInput,PageLoader,datepickerTimesheet } from './components.jsx';
import { Field, reduxForm } from 'redux-form';
import { addTimesheet, viewTimesheet, taskList, pop } from './actions.jsx';
import moment from 'moment';

class Timesheet extends Component {


  onSubmit(props){
    this.props.addTimesheet(props.WP_ID,props.TS_DATE,props.HOUR,props.TS_SUBJECT,props.TS_MESSAGE)
  }

  componentWillMount(){
    const currentDate = moment().format("YYYY-MM-DD");
    const state = store.getState();
    store.dispatch(viewTimesheet(currentDate));
    // store.dispatch(taskList('8790874'));
    const timesheet = state.data.timesheet;
    const auth = state.auth;

  }
  


  componentWillUnmount() {
    store.dispatch(pop());
  }


  render() {
    const { handleSubmit } = this.props;
    const currentDate = moment().format("ddd,MMM DD");
    const state = store.getState();
    const timesheet = state.data;

    // console.log(timesheet.task);
    // function status(){
    //   if (timesheet.user_activities.IS_APPROVED == '1'){
    //     return <b>DITERIMA</b>
    //   } else if (timesheet.user_activities.IS_APPROVED == '-1'){
    //     return <b>BELUM DIKONFIRMASI</b>
    //   } else{
    //     return <b>DITOLAK</b>
    //   }
    //  }

     function pill(value){
      var text = 'PENDING'
      var resubmit = ''
      switch (value) {
        case "0":
        text = "DENIED"
        resubmit = 'RE-SUBMIT TIMESHEET'
        break;
        case "1":
        text = "APPROVED"
        resubmit = ''
        break;
        case "-1":
        text = "WAITING FOR APPROVAL"
        resubmit = ''
        break;
        default:
      }
      return(<div className={className} style={{float:'right'}}>{text}</div>)
      return(<div></div>)
    }


    const auth = state.auth;



  //    if(!timesheet){
  //    return <PageLoader></PageLoader>
  //  }
    return (
      !timesheet.user_project ? <PageLoader></PageLoader>:
      <div>
        <div className="grid wrap">
          <div className="unit whole">
            <Divider
              text="TIMESHEET"
              btnLeftText="Back"
              btnLeftClick={
                  (e) => {
                    browserHistory.goBack();
                    e.preventDefault();
                  }
                }
            />
          </div>
        </div>

        <Tabs>
          <TabList>
            <div className="grid wrap">
              <div className="unit whole" style={{ textAlign: 'center' }}>
                <span className="icon-arrow-left-circle" />
                <div style={{ marginTop: '20px', display: 'inline-block' }}>

                  <Tab style={{ listStyle: 'none', display: 'inline-block', float: 'left' }}><TimeSheetTimeButton  text={currentDate} hours="4 Hours" /></Tab>
                  <Tab style={{ listStyle: 'none', display: 'inline-block', float: 'left' }}><TimeSheetTimeButton text="Sat, Jun 12" hours="DAY OFF" /></Tab>

                  <span className="icon-arrow-right-circle" />
                </div>
              </div>
            </div>
          </TabList>


          <div className="grid wrap">
            <div className="unit whole">
              <PopUp id="addNew" dividerText="UPDATE TIMESHEET" btnClass="btn-primary" btnText="ADD NEW" btnStyle={{ display: 'block', margin: 'auto' }}>
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
                        onChange={

                          (e, value)=>{
                            store.dispatch(taskList(value))

                            // store.dispatch(pop());
                            // e.preventDefault()
                          }
                        }
                        component={ReduxSelectNew}>
                        {
                              timesheet.user_project.map((value,index)=>{
                                return <option key={index} value={value.PROJECT_ID}>{value.PROJECT_NAME}</option>
                              }
                            )
                        }

                        </Field>
                    </div>
                  </div>
                  <div className="grid wrap narrow">
                  <div className="unit three-quarters">
                                      {
                                        timesheet.task ?
                                        <Field
                                        name="WP_ID"
                                        // type="WP_ID"
                                          inputName="TASK"
                                          component={ReduxSelectNew}>
                                              {
                                                timesheet.task.map((value,index)=>{
                                                  return <option key={index} value={value.WP_ID}>{value.TASK_NAME}</option>
                                                }
                                              )
                                              }
                                       </Field>
                                       :
                                        <ReduxSelectNew inputName="TASK">
                                        <options> </options>
                                        </ReduxSelectNew>    
                                      }
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
                          inputName="MESSAGE"
                          name="TS_MESSAGE"
                          // type="TS_MESSAGE"
                          component={ReduxInput}
                        />
                    </div>
                  </div>
                  <div className="grid wrap narrow">
                    <div className="unit whole" style={{ textAlign: 'center' , display:'inline-block' }}>       
                    <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>           
                      <button type="submit" style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW</button>
                    </div>
                  </div>

                </form>
                </div>
              </PopUp>

            </div>
          </div>



          <TabPanel>
            <div className="grid wrap">
              <div className="unit whole" style={{ marginBottom: '42px' }}>
                <Divider text="FRIDAY, AUGUST 11" />
              </div>
            </div>


            <div className="grid wrap">
              <div className="unit whole">
                <div className="card">
                  <div className="person">
                    <div className="person-image" />
                    <div className="person-info">
                      <large>{auth.userdata.user_name}</large>
                      <small>{auth.userdata.profile_name}, {auth.userdata.position}</small>
                    </div>
                  </div>
                </div>
                      {
                        timesheet.user_activities.map((value,index)=>{
                          return(
                            <div key={index}>
                            <div className="card project">
                              <div className="unit one-fifth" style={{width: '79px'}}>
                                <small style={{display:'block'}}>4:55 PM</small>
                              </div>
                                <div className="unit four-fifths">
                              <small className="project-info" >
                                  Project <a>{value.PROJECT_NAME}</a>
                                <p>(<b>{value.HOUR_TOTAL} hours</b>) - {value.WBS_NAME}</p>
                                <p>left a <b>{value.SUBJECT}</b> message</p>
                                <p>{value.MESSAGE}</p>
                                  </small>
                                  <div className="grid wrap" style={{ float: 'right' }}>
                                    <div className="unit whole" >
                                      <medium style={{ display: 'inline-block', marginLeft: '50px' }}>
                                      {

                                        timesheet.user_activities.IS_APPROVED == "1" ? <b>ACCEPTED</b> : <b>WAITING FOR APPROVAL</b>
                                      }
                                      </medium>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })

                      }


              </div>
            </div>

          </TabPanel>

          <TabPanel>
            <div className="grid wrap">
              <div className="unit whole" style={{ marginBottom: '42px' }}>
                <Divider text="SATURDAY, AUGUST 12" />
              </div>
            </div>
            <div className="grid wrap">
              <div className="unit whole">
                <large style={{ textAlign: 'center' }}><b>Enjoy your day-off!! <br /> You don't have to update anything today</b></large>
              </div>
              <div className="unit whole" style={{ margin: 'absolute' }}>
                <img src={require('../img/day-off.png')} style={{ margin: '0 auto', display: 'block' }} />
              </div>
            </div>

          </TabPanel>




        </Tabs>
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
  connect(mapStateToProps, { addTimesheet })(Timesheet),
);
