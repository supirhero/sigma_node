import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table, Header, Search, PopUp } from './Components.jsx';


class DatasetProjectType extends Component {
  render() {
    return (
      <div>
        <div className="grid dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
							<div className="table-wrap">
							
                <div className="unit one-quarter">
                  <Header text="Project Type" style={{ display: 'inline-block' }} />
								</div>
								
                <div className="unit three-quarters">
                  <PopUp id="createProjectType" dividerText="CREATE PROJECT TYPE" btnText="ADD NEW" style={{ display: 'inline-block', marginLeft: '35px' }}>
                    <div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <Input inputName="NAME" />
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                          <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                          <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW </button>
                        </div>
                      </div>
                    </div>
                  </PopUp>
                  <Search placeholder="search project type" style={{ float: 'right', width: '400px' }} />
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
		// filter: ownProps.location.query.filter
  };
}

export default connect(mapStateToProps)(DatasetProjectType);
// export default Login
