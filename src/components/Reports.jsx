import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';


class Reports extends Component {
  render() {
    return (
      <div>
        <div className="grid wrap  reports">
          <div className="unit whole">
            <large> REPORTS </large>
            <div style={{ marginTop: '20px' }}>
              <medium
                style={{ display: 'inline-block' }}
                onClick={
									(e) => {
                  browserHistory.replace('/reports');
									  }}
              > Overview </medium>

              <medium
                className="heading"
                onClick={
                  (e) => {
                  browserHistory.replace('/reports/reports-directorate');
									  }
                }
              > Directorate / BU </medium>
              <medium
              className="heading"
              onClick={
                (e) => {
                  browserHistory.replace('/reports/reports-people');
                }
              }
              > People </medium>
              <medium className="heading"> Find Project </medium>
            </div>
          </div>
        </div>

        <div className="grid wrap  reports">
          <div className="unit whole">
            {this.props.children}
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
export default connect(mapStateToProps)(Reports);
// export default Login
