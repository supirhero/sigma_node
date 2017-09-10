import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import store from '../reducers/combineReducers.jsx';
import { Divider, required,TimeSheetTimeButton, PopUp, ReduxSelect,Select,ReduxInput,PageLoader,datepickerTimesheet} from './components.jsx';
import { Field, reduxForm ,initialize} from 'redux-form';
import { addTimesheet, viewTimesheet, taskList, pop,weekTimesheet } from './actions.jsx';
import moment from 'moment';


class Timesheet extends Component {
  constructor(){
    super()
    this.state = {
      jumlah : 0 ,
      holiday: null,
      selected:moment().format("YYYY-MM-DD"),
      datepicker: null, 
     
      
      

      
    };
  }


  handleInitialize() {
    const initData = {
      TS_DATE: this.state.datepicker,
    };
    this.props.initialize(initData);
    
  }


  onSubmit(props){
    this.props.addTimesheet(props.PROJECT_ID,props.WP_ID,props.TS_DATE,props.HOUR,props.TS_SUBJECT,props.TS_MESSAGE)
    .then(
      (res)=>{
        store.dispatch(viewTimesheet(this.state.selected))
        this.props.dispatch({
          type: 'POPUP',
          name:'addNewTimesheet',
          data: {
            active:false
          }
        })
        resetForm()
        
        // res.preventDefault()
        // console.log("closed")
      }
      
    )
  }


  componentWillMount(){
    const currentDate = moment().format("YYYY-MM-DD");
    const state = store.getState();
    store.dispatch(weekTimesheet(this.state.click)); 
    store.dispatch(viewTimesheet(currentDate));
    const timesheet = state.data.timesheet;
    const auth = state.auth;
    console.log(this.state.tomorrow)
    
  }

componentDidUpdate(){
  e=>{
  store.dispatch(viewTimesheet(this.state.selected))
  e.preventDefault()
}
}



  componentWillUnmount() {
    store.dispatch(pop());
  }




  render() {
    const { handleSubmit,resetForm } = this.props;
    const currentDate = moment().format("ddd,MMM DD");
    const state = store.getState();
    const timesheet = state.data;
    const weekdays = state.data.weekdays; 
    const format = "YYYY-MM-DD";

    const yesterday = moment().subtract(100,'years').format("YYYY-MM-DD")
    const today = moment().add(1,'days').format("YYYY-MM-DD")
    

    function status(value) {
      let resubmit = '' ;
      let status = 'PENDING';
      switch (value) {
        case '0':
          status = 'DENIED';
          resubmit = ""
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
    



  //    if(!timesheet){
  //    return <PageLoader></PageLoader>
  //  }
    return (
      !timesheet.user_project ? <PageLoader></PageLoader> :
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
                      jumlah: this.state.jumlah + 1
                    },()=>{
                      store.dispatch(weekTimesheet(this.state.jumlah))
                      // console.log(this.state.jumlah)
                    }); 
                    // console.log(this.state.jumlah," kiri") 
                    e.preventDefault() 
                     
                     
                  } 
                }> </span> 
                  <div style={{marginTop:'20px', display:'inline-block'}}> 
                  { 
                    state.data.weekdays ? state.data.weekdays.map((value,index)=>{ 
                      return  <TimeSheetTimeButton text={moment(value.day).format("ddd, MMM D")} hours={value.holiday == false ? `${value.work_hour} Hours` : "Day Off"}  
                      onClick={ 
                        e => { 
                          store.dispatch(viewTimesheet(value.day))
                          value.holiday == true ?  this.setState({
                            holiday : true
                          }) : this.setState({
                            holiday : false
                          },()=>{
                            moment(value.day).isBetween(yesterday,today) ?
                            this.setState({
                              selected:value.day,
                              datepicker:value.day
                            },()=>{
                              this.handleInitialize()
                              console.log(this.state.datepicker)
                            }) : alert("Timesheet submission in the future is not allowed! ")
                          })
                        }
                      } 
                      /> 
                    } 
                  ) : <PageLoader /> 
                  } 
                  <span className="icon-arrow-right-circle list-pointer" onClick={ 
                    e => { 
                      this.setState({ 
                        jumlah: this.state.jumlah - 1
                      },()=>{
                        store.dispatch(weekTimesheet(this.state.jumlah))
                        // console.log(this.state.jumlah)
                      }); 
                       
                      
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
            <button className='btn-primary'
            style={{display:'block', margin: 'auto'}}
            onClick={
            e => {
              console.log('PROPS', this.props);
              this.props.dispatch({
                type: 'POPUP',
                name:'addNewTimesheet',
                data: {
                  active:true
                }
              })
              e.preventDefault()
            }
          }
            >
            INPUT TIMESHEET
            
          </button>
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
                        onChange={
                          (e, value)=>{
                            store.dispatch(taskList(value))
                            console.log(value)
                            // store.dispatch(pop());
                            // e.preventDefault()
                          }
                        }
                        component={ReduxSelect}
                        // validate={[required]}
                        >
                      <option></option>
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
                                          inputName="TASK"
                                          component={ReduxSelect}
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
                                        <Select inputName="TASK">
                                        <options> </options>
                                        </Select>
                                      }
                                      </div>

                    <div className="unit one-quarter">
                      <Field
                        inputName="WORK HOURS"
                        name="HOUR"
                        type="HOUR"
                        component={ReduxInput}
                        validate={[required]}
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

            </div>
          </div>



          <div className="grid wrap">
            <div className="unit whole" style={{ marginBottom: '42px' }}>
              
              <Divider text={this.state.selected} />
            </div>
          </div>

          { 
            
            this.state.user_activities !== [] ?  
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
                                <div className="unit whole">
                              <small className="project-info" >
                                  Project <a>{value.PROJECT_NAME}</a>
                                <p>(<b>{value.HOUR_TOTAL} hours</b>) - {value.WBS_NAME}</p>
                                <p>left a <b>{value.SUBJECT}</b> message</p>
                                <p>{value.MESSAGE}</p>                                
                                <small style={{ fontSize: '12px' }}>{value.SUBMIT_DATE ? `submitted on : ${moment((value.SUBMIT_DATE).substr(0,9)).format('DD-MMM-YYYY')} | ${(value.SUBMIT_DATE).substr(10,5)} ${(value.SUBMIT_DATE).substr(26,2)}`:null}</small>
                                <br />
                                <br />
                                <small style={{ fontSize: '12px' }}>{value.TS_DATE ? `submitted for : ${moment(value.TS_DATE).format('DD-MMM-YYYY')}` : null}</small> 
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
            </div> : 
            <div>
            
                <div className="grid wrap">
                  <div className="unit whole">
                    <large style={{ textAlign: 'center' }}><b>Enjoy your day-off!! <br /> You don't have to update anything today</b></large>
                  </div>
                  <div className="unit whole" style={{ margin: 'absolute' }}>
                    <img src={require('../img/day-off.png')} style={{ margin: '0 auto', display: 'block' }} />
                  </div>
                </div>
                </div>
        
        
        
        
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
connect(mapStateToProps, { addTimesheet })(Timesheet),
);
