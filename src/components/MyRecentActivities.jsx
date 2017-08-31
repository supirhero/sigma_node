import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import store from '../reducers/combineReducers.jsx';
import { Divider, Input, RadioButton, Select, PageLoader } from './Components.jsx';
import { Line } from 'react-progressbar.js';
import { getMyActivities, pop,resubmitTimesheet} from './actions.jsx';
import moment from 'moment'
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
                <small style={{ fontSize: '12px' }}>{value.submit_date}</small>
                <medium style={{ display: 'inline', marginLeft: '37%' }}>
                {
                value.is_approved == 0 &&
<<<<<<< Updated upstream
                <a style={{marginLeft:'45px'}} onClick={this.onSubmit()}
=======
                <a style={{marginLeft:'45px'}} onClick={e => {
                  store.dispatch(resubmitTimesheet(value.project_id,value.wp,value.ts_date,value.hour_total,value.subject,value.message),()=>{
                    store.dispatch(getMyActivities())
                      
 
                       
                  })
                  
                }}
>>>>>>> Stashed changes
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
    state,
    // filter: ownProps.location.query.filter
  };
}
export default connect(mapStateToProps,{resubmitTimesheet})(MyRecentActivities);
