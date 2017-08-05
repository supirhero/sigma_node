import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Search, Input, BarChart, Divider, Meter, TableExample } from './Components.jsx';


class ReportsFindProject extends Component {
  render() {
    return (
      <div>

        <div className="grid wrap">
          <div className="unit one-quarter">
            <div className="card" style={{ padding: '35px' }}>
              <div className="unit whole">
                <large>FILTERED BY</large>
              </div>
              <div className="unit whole">
                <medium>Value</medium>
              </div>
              <div className="unit whole">
                <medium>Status</medium>
              </div>
              <div className="unit whole">
                <medium>Budget</medium>
              </div>
            </div>
          </div>
          <div className="unit three-quarters">
            <div className="grid wrap">
              <div className="unit whole">
                <Search
                  placeholder="enter project / business unit / project manager / etc name"
                  style={{ width: '100%', margin: '0' }}
                />
              </div>
            </div>

            {/* MAP THIS */}
            <div className="card" style={{ padding: '20px 35px' }}>
              <div className="grid">
                <div className="unit golden-large">
                  <medium>Transaction Based Managed Services 2017</medium>
                </div>
                <div className="unit golden-small">
                  <medium style={{ float: 'right' }}><b>IN PROGRESS <span className='in-progress'> (30%) </span></b></medium>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '10px 35px', margin: '0' }}>
              <div className="unit half">
                <medium>Customer</medium>
                <medium>PT ABC DEF</medium>
              </div>
              <div className="unit half">
                <div style={{ float: 'right' }}>
                  <medium style={{ float: 'right' }}>Value</medium>
                  <medium>200.000.000</medium>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '10px 35px', margin: '0' }}>
              <div className="unit one-third">
                <medium>Project Manager</medium>
                <medium>Tofan Sofiansah</medium>
              </div>
              <div className="unit two-thirds">
                <div style={{ float: 'left', marginLeft: '50px' }}>
                  <medium >Schedule Status</medium>
                  <medium style={{ float: 'right' }}>ON SCHEDULE</medium>
                </div>
                <div style={{ float: 'right' }}>
                  <medium>Budget Status</medium>
                  <medium style={{ float: 'right' }}>ON BUDGET</medium>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '10px 35px' }}>
              <div className="unit three-fifths">
                <div className="unit one-third" style={{ display: 'inline-block' }}>
                  <medium className="status">EV</medium> <span className="fa fa-question-circle-o" />
                  <medium>13346.05</medium>
                </div>
                <div className="unit one-third" style={{ display: 'inline-block' }}>
                  <medium className="status">PV</medium> <span className="fa fa-question-circle-o" />
                  <medium>12717.19</medium>
                </div>
                <div className="unit one-third" style={{ display: 'inline-block' }}>
                  <medium className="status">AC</medium> <span className="fa fa-question-circle-o" />
                  <medium>12681.02</medium>
                </div>
              </div>
              <div className="unit two-fifths">
                <div className="unit half" style={{ display: 'inline-block' }}>
                  <medium className="status">SPI</medium> <span className="fa fa-question-circle-o" />
                  <medium>1.05</medium>
                </div>
                <div className="unit half" >
                  <medium className="status">CPI</medium> <span className="fa fa-question-circle-o" />
                  <medium style={{ display: 'block' }}>1.05</medium>
                </div>
              </div>
            </div>

            <div className="grid wrap">
              <div className="unit whole">
                <div className="card" style={{ padding: '20px 35px' }}>
                  <div className="grid">
                    <div className="unit golden-large">
                      <medium>DRC ACTIVITY 2017</medium>
                    </div>
                    <div className="unit golden-small">
                      <medium style={{ float: 'right' }}><b>DUE IN 3 DAYS <span className='due-in'> (80%) </span></b></medium>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid wrap">
              <div className="unit whole">
                <div className="card" style={{ padding: '20px 35px' }}>
                  <div className="grid">
                    <div className="unit golden-large">
                      <medium>DATA CENTER BTIP - MAKASSAR 2017</medium>
                    </div>
                    <div className="unit golden-small">
                      <medium style={{ float: 'right' }}><b>COMPLETED <span className="completed"> (100%) </span></b></medium>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid wrap">
              <div className="unit whole">
                <div className="card" style={{ padding: '20px 35px' }}>
                  <div className="grid">
                    <div className="unit golden-large">
                      <medium>Application Development LCM</medium>
                    </div>
                    <div className="unit golden-small">
                      <medium style={{ float: 'right' }}><b>OVERDUE <span className="overdue"> (85%) </span></b></medium>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid wrap">
              <div className="unit whole">
                <div className="card" style={{ padding: '20px 35px' }}>
                  <div className="grid">
                    <div className="unit golden-large">
                      <medium>Infra Activity 2017</medium>
                    </div>
                    <div className="unit golden-small">
                      <medium style={{ float: 'right' }}><b>ON HOLD <span className="on-hold"> (85%) </span></b></medium>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container" style={{float:'right'}}>                  
              <button className="arrow"> <b> &lt; </b> </button>
              <button className="pagination"><b>1</b></button>
              <button className="arrow"> <b> &gt; </b> </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // filter: ownProps.location.query.filter
  };
}
export default connect(mapStateToProps)(ReportsFindProject);
// export default Login
