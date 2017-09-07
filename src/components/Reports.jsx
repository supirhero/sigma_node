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
        <div className="grid wrap reports">
          <div className="unit whole">
            <large> REPORTS </large>
             <div style={{ marginTop: '20px' }}>
           { 
            this.props.state.auth.privilege.report_overview &&
             
              <medium
                style={{ display: 'inline-block' }}
                className="list-pointer"
                onClick={
									(e) => {
                  browserHistory.replace('/reports');
									  }}
              > SPI & CPI </medium>
             }
             { 
              this.props.state.auth.privilege.report_bu_directorat &&
               <medium
                className="heading list-pointer"
                onClick={
                  (e) => {
                  browserHistory.replace('/reports/directorate');
									  }
                }
              > Directorate / BU </medium>
              }
              {
              this.props.state.auth.privilege.report_bu_teammember &&
                
                <medium
              className="heading list-pointer"
              onClick={
                (e) => {
                  browserHistory.replace('/reports/people');
                }
              }
              > Team Member </medium>
              }

              {
              this.props.state.auth.privilege.report_find_project &&
                
                <medium className="heading list-pointer"
              onClick={
                (e) => {
                  browserHistory.replace('/reports/find-project');
                }
              }
              > Find Project </medium>
              }
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
    state
		// filter: ownProps.location.query.filter
  };
}
export default connect(mapStateToProps)(Reports);
// export default Login
