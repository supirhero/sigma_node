import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import store from '../reducers/combineReducers.jsx';
import { Divider, TimeSheetTimeButton, PopUp, Select, Input } from './components.jsx';


class Timesheet extends Component {
  render() {
    return (

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
            <span className="icon-arrow-left-circle" />
            <div style={{ marginTop: '20px', display: 'inline-block' }}>
              <TimeSheetTimeButton text="Tue, Jun 6" hours="DAY-OFF" />
              <TimeSheetTimeButton text="Wed, Jun 7" hours="4 hours" />
              <TimeSheetTimeButton text="Thu, Jun 8" hours="-" />
              <TimeSheetTimeButton text="Fri, Jun 9" hours="-" />
              <TimeSheetTimeButton text="Sat, Jun 10" hours="-" />
              <span className="icon-arrow-right-circle" />
            </div>
          </div>
        </div>


        <div className="grid wrap">
          <div className="unit whole">
            <PopUp id="addNew" dividerText="UPDATE TIMESHEET" btnText="ADD NEW" style={{ textAlign: 'center' }}>
              <div >
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Input inputName="DATE" />
                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Select
                      inputName="PROJECT"
                      items={{
                        items: [
                              { title: 'TBWS21312' },
                              { title: 'TBWS21312' },
                        ],
                      }}
                    />
                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit three-quarters">
                    <Select
                      inputName="TASK"
                      items={{
                        items: [
                              { title: 'TBWS21312' },
                              { title: 'TBWS21312' },
                        ],
                      }}
                    />
                  </div>
                  <div className="unit one-quarter">
                    <Input inputName="WORK HOURS" />
                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Input inputName="SUBJECT" />
                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Input inputName="MESSAGE" />
                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit whole" style={{ textAlign: 'center' }}>
                    <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                    <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW</button>
                  </div>
                </div>


              </div>
            </PopUp>

          </div>
        </div>
        <div className="grid wrap">
          <div className="unit whole" style={{ marginBottom: '42px' }}>
            <Divider text="WEDNESDAY, JUNE 7" />
          </div>
        </div>
        <div className="grid wrap">
          <div className="unit whole">
            <div className="card">
              <div className="person">
                <div className="person-image" />
                <div className="person-info">
                  <large>Kara Gray</large>
                  <small>Admin, Project Manager</small>
                </div>
              </div>
            </div>

            <div className="card project">
              <small>4:55 PM</small>
              <small className="project-info" >
                Project <a href="">Transaction Based Managed Services 2017</a>
                <p>(<b>4 Hours</b>) - Pengiriman data dana terdebet dan belum terdebet ke mitra</p>
                <p>left a <b>Timesheet UI #1</b> message</p>
                <p>"Ini interface yang lama seperti ini ya"</p>
              </small>
              <div className="grid wrap" style={{ float: 'right' }}>
                <div className="unit whole" >
                  <medium><b>WAITING FOR APPROVAL</b></medium>
                </div>
              </div>
            </div>
          </div>
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
export default connect(mapStateToProps)(Timesheet);
// export default Login
