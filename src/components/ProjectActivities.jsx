
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import store from '../reducers/combineReducers.jsx';
import { Divider, Input, RadioButton, Select, ProjectHeader, PageLoader } from './Components.jsx';
import { Line } from 'react-progressbar.js';
import { getMyActivities, confirmationTimesheet, pop } from './actions.jsx';

class ProjectActivities extends Component {
  componentWillMount() {
    store.dispatch(getMyActivities());
    const state = store.getState();
    const activity_timesheet = state.data.activity_timesheet;
  }

  componentWillUnmount() {
    store.dispatch(pop());
  }

  render() {
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
    const state = store.getState();
    const activity_timesheet = state.data.activity_timesheet;
    if (!activity_timesheet) {
      return <PageLoader />;

    }
    return (
      <div>
        <div className="grid wrap padding-left">
          <div className="unit whole">
            <ProjectHeader projectName="Transaction Based Managed Services 2017" sectionName="ACTIVIES" />
          </div>
        </div>
        <div className="grid wrap padding-left">
          <div className="unit whole">
            <Divider style={{ marginTop: '0' }} text="TUESDAY , JUNE 6" />
          </div>
        </div>

        <div className="grid wrap padding-left">
          {
          activity_timesheet.map((value, index) => (
            <div key={index}>
              <div className="grid wrap">

        {/* <div className="unit whole" style={{ paddingBottom: '0' }}>
                  <div className="card project">

                    <div className="grid wrap">
                      <div className="unit whole">
                        <medium style={{ display: 'inline' }}>
                          <a href="">{value.project_name}</a>
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
                              */}

              <div className="unit whole" style={{paddingBottom:'0'}}>
                <div className="card project">

                  <div className="grid wrap">
                    <div className="unit whole">
                      <medium style={{display:'inline'}}>
                        <a href="">{value.project_name}</a>
                      </medium>

                      {pill(value.is_approved)}

                    </div>

                    <small className="project-info" style={{margin:'auto'}}>
                      (<b>{value.hour_total} hours</b>) - {value.wbs_name}
                    </small>
                  </div>

                  <div className="grid wrap">
                    <div className="unit whole">
                      <div className="person">
                        <div className="person-image" style={{margin:'auto'}} />
                        <div className="person-info" style={{marginLeft:'55px'}}>
                          <medium style={{float:'left'}}><b>{value.user_name}</b></medium>
                          <small style={{display:'inline'}}>, Project Manager</small>
                        </div>
                      <div style={{display: 'inline-block',marginLeft:'55px',marginTop:'-25px'}}>
                          <small>
                            <b>{value.subject}</b> "{value.message}"

                          </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid wrap">
                      <div className="unit whole" style={{ marginLeft: '104px' }}>
                        <small style={{ fontSize: '12px' }}>Tue,Jun 6 at 4:55 PM via web</small>
                        <medium style={{ display: 'inline', marginLeft: '170px' }}>
                          {
                        value.is_approved === '-1' &&
                        <span>
                          <a onClick={(e) => {
                            store.dispatch(confirmationTimesheet(value.ts_id, "0"));
                            // e.preventDefault()
                            // console.log(myActivity)
                          }}
                          >DENY</a>
                          <a
                            style={{ marginLeft: '20px' }}
                            onClick={(e) => {
                              store.dispatch(confirmationTimesheet(value.ts_id, "1"));
                            // e.preventDefault()
                            // console.log(myActivity.activity_timesheet.ts_id)
                            }}
                          >APPROVE</a>
                        </span>
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
export default connect(mapStateToProps)(ProjectActivities);
