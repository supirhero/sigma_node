import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import store from '../reducers/combineReducers.jsx';
import { Divider, Input, RadioButton, Select, PageLoader ,ReduxSelectNew,ReduxSelect,ReduxInput,datepickerUniversal,PopUp} from './Components.jsx';
import { Line } from 'react-progressbar.js';
import { getMyActivities, pop,resubmitTimesheet,addTimesheet,taskList,viewTimesheet} from './actions.jsx';
import moment from 'moment'
import { Field, reduxForm,initialize } from 'redux-form';

class MyRecentActivities extends Component {
  constructor(){
    super();
    this.state = {
      month : null,
      year: null,
      month_name:"September"
    };
  }

  componentWillMount() {
    const myActivity = store.getState().data.activity_timesheet;
    store.dispatch(getMyActivities());
    store.dispatch(viewTimesheet())
    
  }

  componentWillUnmount() {
    store.dispatch(pop());
  }




  onSubmit(props){
    // alert("Timesheet Resubmi")
    this.props.dispatch(resubmitTimesheet(props)).then(
      ()=> {
        store.dispatch({
          type: 'POPUP',
          name: 'resubmitTimesheet',
          data: {
            active:false,
          }
        })
        store.dispatch(getMyActivities(this.state.month,this.state.year))
      }
    )
  
  }


  
handleMonthChange (e) {
  this.setState({month: e.target.value})
  console.log(e.target.value);
  e.preventDefault()

 }
 handleYearChange (e) {
   this.setState({year: e.target.value});
   console.log(e.target.value);
   e.preventDefault()

  }


  render() {
    const { handleSubmit } = this.props;
    const myActivity = store.getState().data.activity_timesheet;
    if (!myActivity) {
      return <PageLoader />;
    }
    const month= [
      {name:'January',number:'1'},
      {name:'February',number:'2'},
      {name:'March',number:'3'},
      {name:'April',number:'4'},
      {name:'May',number:'5'},
      {name:'June',number:'6'},
      {name:'July',number:'7'},
      {name:'August',number:'8'},
      {name:'September',number:'9'},
      {name:'October',number:'10'},
      {name:'November',number:'11'},
      {name:'December',number:'12'},
    ]
  

const year = [
  {year:'2017'},
  {year:'2016'},
  {year:'2015'},
  {year:'2014'},
  {year:'2013'},
  {year:'2012'},
]
    
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
      <PopUp id="resubmitTimesheet" dividerText="RESUBMIT TIMESHEET" btnClass="btn-primary" btnText="INPUT TIMESHEET" btnStyle={{ display: 'block', margin: 'auto' }}>
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="grid wrap narrow">
          <div className="unit whole">
            <Field
              inputName="DATE"
              name="TS_DATE"
              component={datepickerUniversal}
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
              store.getState().data.user_project.map((value,index)=>{
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
          store.getState().data.task ?
          <Field
          name="WP_ID"                                        
            inputName="TASK"
            component={ReduxSelect}
            // validate={[required]}
            >
            <option></option>
                {
                  store.getState().data.task.map((value,index)=>{
                    return <option key={index} value={value.WP_ID}>{value.WBS_NAME}</option>
                  }
                )
                }
         </Field>
         :
          <Field 
            name="WP_ID"                                        
          
          inputName="TASK"
          component={ReduxSelect}
          
          >
          <options> </options>
          </Field>
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
          <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"
          onClick={e=>{
            this.props.dispatch({
              type: 'POPUP',
              name:'resubmitTimesheet',
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
<div className='unit golden-large'>
<div className='grid'>
  <div className='unit four-fifths'>
    <select onChange={this.handleMonthChange.bind(this)}
      className='select' style={{height:'49px', width:'250px',marginLeft:'230px' ,display:'inline-block'}}>
        <option>Choose Month</option>
      {
        month.map((value,index) => {
        return(
          <option key={index} value={value.number}>{value.name}</option>

        )
      })}
    </select>
    <select onChange={this.handleYearChange.bind(this)} 
    className='select' style={{height:'49px', width:'250px',marginRight:'300px',display:'inline-block',float:'right'}}> 
    <option>Choose Year</option>
    { 
      year.map((value,index) => { 
      return( 
        <option key={index} value={value.year}>{value.year}</option> 

      ) 
    })} 
  </select> 
   {/* <input placeholder='ex. 2017' onChange={this.handleYearChange.bind(this)} style={{width:'48%', display:'inline-block', float:'right'}}></input>
    
    <Input
      onChange={this.handleYearChange.bind(this)}
      style={{width:'48%', display:'inline-block', float:'right'}}

      /> */}
  </div>
  <div className='unit one-fifth'>
    <button className='btn-primary'style={{padding:'11px 14px'}} onClick={(e)=> {
      console.log(this.state.month,this.state.year);
      store.dispatch(getMyActivities(this.state.month,this.state.year))
      this.setState({month_name:e.target.value})
      // store.dispatch(myPerformance('1','2017'))
      e.preventDefault()
    }} ><span className='material-icons' style={{color:'white'}}>search</span></button>

  </div>
</div>
</div>

     

        <div className="grid wrap">
          <div className="unit whole">
            <Divider style={{ marginTop: '0' }} text={this.state.month_name} />
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
                <small style={{ fontSize: '12px' }}>{value.submit_date ? `submitted on : ${moment((value.submit_date).substr(0,9)).format('DD-MMM-YYYY')} | ${(value.submit_date).substr(10,5)} ${(value.submit_date).substr(26,2)}`:null}</small>
                <br />
                <br />
                
  {/*  <small style={{ fontSize: '12px' }}>{value.ts_date ? `submitted for : ${(value.ts_date)}` : null}</small> */}
               <small style={{ fontSize: '12px' }}>{value.ts_date ? `submitted for : ${moment(value.ts_date).format('DD-MMM-YYYY')}` : null}</small> 
                <medium style={{ display: 'inline', marginLeft: '37%' }}>
                {
                value.is_approved == 0 &&
                <a style={{marginLeft:'45px'}} onClick={e => {
                 
                  this.props.initialize(
                    {
                      TS_DATE: value.ts_date,
                      TS_ID:value.ts_id,
                      PROJECT_ID: value.project_id,
                      WP_ID: value.wp,
                      HOUR: value.hour_total,
                      TS_SUBJECT: value.subject,
                      TS_MESSAGE: value.message,
                    }
                   )
                   this.props.dispatch({
                    type: 'POPUP',
                    name:'resubmitTimesheet',
                    data: {
                      active:true
                    }
                  })
                  e.preventDefault()
                  
              
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
  
    formValues: state.form.resubmitTimesheet,
    state,
    // filter: ownProps.location.query.filter
  };
  }
  
  export default reduxForm({
  // Must be unique, this will be the name for THIS PARTICULAR FORM
  form: 'resubmitTimesheet',
  })(
  connect(mapStateToProps, { addTimesheet })(MyRecentActivities),
  );
  