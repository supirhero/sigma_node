import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,Header,Search } from './Components.jsx';


class DatasetCustomer extends Component {
  render() {
    return (
      <div>
        <div className="grid wrap dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
              <div className="table-wrap">
								<div className="unit whole">
									<Header text='Customer' style={{display:'inline-block'}} />
									<Search placeholder='search customer' style={{float:'right',width:'400px'}} />
                </div>
                <div className="unit whole">
                  <Table
                  tableHeader={[{value:'NO'},{value:'ID'},{value:'NAME'},{value:'CODE'},{value:'SAP ID'},{value:'AM'},{value:'ADDRESS'}]}
                  tableData={[{column:[
                    {value:'1'},
                    {value:'4100001'},
                    {value:'PT PATRAKOM TELEKOMUNIKASI'},
                    {value:'PATR'},
                    {value:'4100001'},
                    {value:'-'},
                    {value:'092 Durward Praire'}

                  ]},{
                    column:[
                    {value:'2'},
                    {value:'4100002'},
                    {value:'PT ABC JASAMARGA'},
                    {value:'JSMRG'},
                    {value:'4100002'},
                    {value:'-'},
                    {value:'172 Zelda River'}
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
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
		// filter: ownProps.location.query.filter
  };
}
export default connect(mapStateToProps)(DatasetCustomer);
// export default Login