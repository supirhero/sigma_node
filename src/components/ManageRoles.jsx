import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew ,Header, Search, PopUp } from './Components.jsx';


class ManageRoles extends Component {
  render() {
    return (
      <div>
        <div className="grid dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
							<div className="table-wrap">
							
                <div className="unit one-quarter">
                  <Header text="Roles / Type of User" style={{ display: 'inline-block' }} />
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
                <div className="unit whole">
                  <TableNew
                  tableHeader={[{value:'NO'},{value:'NAME'},{value:'DESCRIPTION'}]}
                  tableData={[{column:[
                    {value:'1'},
										{value:'PRouDS'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
                  ]},{column:[
                    {value:'2'},
										{value:'Space Admin'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
                  ]},{column:[
                    {value:'3'},
										{value:'Power User'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
                  ]},{column:[
                    {value:'4'},
										{value:'Team Member'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
                  ]},
                  ]}>
                </TableNew>       
                
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

export default connect(mapStateToProps)(ManageRoles);
// export default Login
