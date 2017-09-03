
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import store from '../reducers/combineReducers.jsx';
import { Divider, Input, RadioButton, Select, ProjectHeader, PageLoader } from './Components.jsx';
import { Line } from 'react-progressbar.js';
import { getMyActivities, confirmationTimesheet, pop,getProjectActivities,EmptyData } from './actions.jsx';

class ProjectActivities extends Component {
  componentWillMount() {
    const id = store.getState().page.id
    // store.dispatch(getMyActivities());
    store.dispatch(getProjectActivities(id))
    const state = store.getState();
    const project_activity = state.data.project_activities;
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
    const id = store.getState().page.id
    const project_activity = state.data.project_activities;
    if (!project_activity) {
      return <PageLoader />;
    }
    return (
      <div>
      
        <div className="grid wrap padding-left">
          <div className="unit whole">
            <ProjectHeader projectName={this.props.state.data.overview.project_name} sectionName="ACTIVIES" />
          </div>
        </div>
        <div className="grid wrap padding-left">
          <div className="unit whole">
            <Divider style={{ marginTop: '0' }} text={project_activity.ts_date} />
          </div>
        </div>

        <div className="grid wrap padding-left">
          {
          project_activity.map((value, index) => (
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
                        <a href="" style={{display:'block'}}>{value.project_name}</a>
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
                        <small style={{ fontSize: '12px' }}>{`${value.bulan} ${value.tahun} via web`}</small>
                        <medium style={{ display: 'inline', marginLeft: '170px' }}>
                          {
                        value.is_approved === '-1' &&
                        <span>
                          <a onClick={(e) => {
                            store.dispatch(confirmationTimesheet(value.ts_id,value.project_id, "0")).then(
                              ()=>{
                                const id = store.getState().page.id
                                store.dispatch(getProjectActivities(id))
                              }
                            )
                            // e.preventDefault()
                            // console.log(myActivity)
                          }}
                          >DENY</a>
                          <a
                            style={{ marginLeft: '20px' }}
                            onClick={(e) => {
                              store.dispatch(confirmationTimesheet(value.ts_id,value.project_id, "1")).then(
                                ()=>{
                                  const id = store.getState().page.id
                                  store.dispatch(getProjectActivities(id))
                                }
                              )
                            // e.preventDefault()
                            // console.log(myActivity.project_activity.ts_id)
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
