import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header,Search } from './Components.jsx';


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

                  <TableNew
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
                    {value:'PT PATRAKOM TELEKOMUNIKASI'},
                    {value:'PATR'},
                    {value:'4100002'},
                    {value:'-'},
                    {value:'172 Zelda River'}
                    ]},{
                    column:[
                    {value:'3'},
                    {value:'4100002'},
                    {value:'PT PATRAKOM TELEKOMUNIKASI'},
                    {value:'PATR'},
                    {value:'4100002'},
                    {value:'-'},
                    {value:'172 Zelda River'}
                    ]},{
                    column:[
                    {value:'4'},
                    {value:'4100002'},
                    {value:'PT PATRAKOM TELEKOMUNIKASI'},
                    {value:'PATR'},
                    {value:'4100002'},
                    {value:'-'},
                    {value:'172 Zelda River'}
                    ]},{
                    column:[
                    {value:'5'},
                    {value:'4100002'},
                    {value:'PT PATRAKOM TELEKOMUNIKASI'},
                    {value:'PATR'},
                    {value:'4100002'},
                    {value:'-'},
                    {value:'172 Zelda River'}
                    ]},{
                    column:[
                    {value:'6'},
                    {value:'4100002'},
                    {value:'PT PATRAKOM TELEKOMUNIKASI'},
                    {value:'PATR'},
                    {value:'4100002'},
                    {value:'-'},
                    {value:'172 Zelda River'}
                    ]},{
                    column:[
                    {value:'7'},
                    {value:'4100002'},
                    {value:'PT PATRAKOM TELEKOMUNIKASI'},
                    {value:'PATR'},
                    {value:'4100002'},
                    {value:'-'},
                    {value:'172 Zelda River'}
                    ]},{
                    column:[
                    {value:'8'},
                    {value:'4100002'},
                    {value:'PT PATRAKOM TELEKOMUNIKASI'},
                    {value:'PATR'},
                    {value:'4100002'},
                    {value:'-'},
                    {value:'172 Zelda River'}
                    ]}
                  
                
                ]}
                >
                
                </TableNew>

                <div className="unit whole">
                  <div className="container" style={{float:'right'}}>                  
                    <button className="arrow"> <b> &lt; </b> </button>
                    <button className="pagination"><b>1</b></button>
                    <button className="arrow"> <b> &gt; </b> </button>
                  </div>
              </div>
              
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