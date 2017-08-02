import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,Header,Search } from './Components.jsx';


class DatasetUser extends Component {
  render() {
    return (
      <div>
        <div className="grid wrap dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
              <div className="unit whole">
                <Header text='User' style={{display:'inline-block'}} />
                <Search placeholder='search user' style={{float:'right',width:'400px'}} />
              </div>
              <div className="unit whole">
                <Table
                  tableHeader={[{value:'NO'},{value:'ID'},{value:'NAME'},{value:'EMAIL'},{value:'LAST LOGIN'}]}
                  tableData={[{column:[
                    {value:'1'},
                    {value:'4100001'},
                    {value:'Joshua Howard'},
                    {value:'huel_cora@hotmail.com'},
                    {value:'08 APR 2017'}

                  ]},{
                    column:[
                    {value:'2'},
                    {value:'4100002'},
                    {value:'Luella Perry'},
                    {value:'maya_kutch@hotmail.com'},
                    {value:'09 MAY 2017'}

                    ]
                  }
                  
                
                ]}
                >
                
                </Table>
              
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
export default connect(mapStateToProps)(DatasetUser);
// export default Login