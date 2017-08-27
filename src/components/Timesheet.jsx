import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import store from '../reducers/combineReducers.jsx';
import { Divider, required,TimeSheetTimeButton, PopUp, Select,ReduxSelect, Input, ReduxSelectNew,ReduxInput,PageLoader,datepickerTimesheet, maxHours} from './components.jsx';
import { Field, reduxForm } from 'redux-form';
import { addTimesheet, viewTimesheet, taskList, pop,getDay,weekTimesheet } from './actions.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DayPicker from 'react-day-picker';

class Timesheet extends Component {
  constructor(){
    super()
    this.state = {
      click : 1 
    };
  }

  onSubmit(props){
    this.props.addTimesheet(props.PROJECT_ID,props.WP_ID,props.TS_DATE,props.HOUR,props.TS_SUBJECT,props.TS_MESSAGE)
  }

  componentWillMount(){
    const currentDate = moment().format("YYYY-MM-DD");
    const state = store.getState();
    store.dispatch(weekTimesheet(this.state.click)); 
    store.dispatch(viewTimesheet(currentDate));
    const timesheet = state.data.timesheet;
    const auth = state.auth;
    // store.dispatch(getDay(""))
  }




  componentWillUnmount() {
    store.dispatch(pop());
  }




  render() {
    const { handleSubmit } = this.props;
    const currentDate = moment().format("ddd,MMM DD");
    const state = store.getState();
    const timesheet = state.data;
    const weekdays = state.data.weekdays; 
    // const startOfWeek = moment().startOf('week');
    // const endOfWeek = moment().endOf('week');
    // var days = [];
    // var day = startOfWeek;
    // while (day < endOfWeek){
    //   days.push(day.toDate());
    //   day=day.clone().add(1,'d')
    //   console.log(days)
    // }

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

    function status(value) {
      let resubmit = '' ;
      let status = 'PENDING';
      switch (value) {
        case '0':
          status = 'DENIED';
          resubmit = "RE-SUBMIT TIMESHEET"
          break;
        case '1':
          status = 'APPROVED';
          resubmit =  ''
          break;
        case '-1':
          status = 'WAITING FOR APPROVAL';
          resubmit = ''
          break;
        default:
      }
      return(<div style={{float:'right'}}><a style={{marginRight:'20px'}}>{resubmit}</a>{status}</div>)
    }




    const auth = state.auth;


    const handleDayClick = (day, { selected }) => {
      this.setState({
        selectedDay: selected ? undefined : day,
      });
      const selectedDay = moment(day).format('YYYY-MM-DD')
    store.dispatch(viewTimesheet(selectedDay))
    };


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


            <div className="grid wrap">
              <div className="unit whole" style={{ textAlign: 'center' }}>
                <div style={{ marginTop: '20px', display: 'inline-block' }}>
                <div className='unit whole' style={{textAlign:'center'}}> 
                <span className="icon-arrow-left-circle list-pointer" onClick={ 
                  e => { 
                    this.setState({ 
                      click: this.state.click + 1 
                    }); 
                    console.log(this.state.click,"kiri") 
                    e.preventDefault() 
                    store.dispatch(weekTimesheet(this.state.click)) 
                     
                  } 
                }> </span> 
                  <div style={{marginTop:'20px', display:'inline-block'}}> 
                  { 
                    state.data.weekdays ? state.data.weekdays.map((value,index)=>{ 
                      return  <TimeSheetTimeButton text={moment(value.day).format("ddd, MMM D")} hours={value.holiday == false ? `${value.work_hour} Hours` : "Day Off"}  
                      onClick={ 
                        e => { 
                          store.dispatch(viewTimesheet(value.day)) 
                           
                        }} 
                      /> 
                    } 
                  ) : <PageLoader /> 
                  } 
                  <span className="icon-arrow-right-circle list-pointer" onClick={ 
                    e => { 
                      this.setState({ 
                        click: this.state.click - 1 
                      }); 
                      console.log(this.state.click,"kanan") 
                      store.dispatch(weekTimesheet(this.state.click)) 
                      e.preventDefault() 
                    } 
                  } /> 
                  </div> 
                </div> 
                </div>
              </div>
            </div>



          <div className="grid wrap">
            <div className="unit whole">
              <PopUp id="addNew" dividerText="INPUT TIMESHEET" btnClass="btn-primary" btnText="INPUT TIMESHEET" btnStyle={{ display: 'block', margin: 'auto' }}>
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
                        onChange={
                          (e, value)=>{
                            store.dispatch(taskList(value))
                            console.log(value)
                            // store.dispatch(pop());
                            // e.preventDefault()
                          }
                        }
                        component={ReduxSelectNew}
                        // validate={[required]}
                        >
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
                                          component={ReduxSelectNew}
                                          // validate={[required]}
                                          >
                                              {
                                                timesheet.task.map((value,index)=>{
                                                  return <option key={index} value={value.WP_ID}>{value.WBS_NAME}</option>
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
                    <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                      <button type="submit" style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> SUBMIT</button>
                    </div>
                  </div>

                </form>
                </div>
              </PopUp>

            </div>
          </div>




            <div className="grid wrap">
              <div className="unit whole" style={{ marginBottom: '42px' }}>
                <Divider text={timesheet.user_activities[0]?timesheet.user_activities[0].TS_DATE:null} />
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

                                        status(value.IS_APPROVED)
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

        {/*
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
          */}
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
