import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew ,Header, Search, PopUp } from './Components.jsx';


class ManageAcess extends Component {
  render() {
    return (
      <div>
        <div className="grid dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
							<div className="table-wrap">							
                <div className="unit whole">
									<Header text='User Access' style={{display:'inline-block'}} />
									<Search placeholder='search customer' style={{float:'right',width:'400px'}} />
                </div>
                <div className="unit whole">
                  <TableNew
                  tableHeader={[{value:'NIK'},{value:'NAME'},{value:'EMAIL'},{value:'ROLE'}]}
                  tableData={[{column:[
                    {value:'12345678'},
										{value:'Helen Santiago'},
										{value:'breitensbarg.jesse@torp.co.uk'},
										{value:'Admin'}
                  ]},{column:[
                    {value:'12345678'},
										{value:'Helen Santiago'},
										{value:'breitensbarg.jesse@torp.co.uk'},
										{value:'Admin'}
                  ]},{column:[
                    {value:'12345678'},
										{value:'Helen Santiago'},
										{value:'breitensbarg.jesse@torp.co.uk'},
										{value:'Admin'}
                  ]},{column:[
                    {value:'12345678'},
										{value:'Helen Santiago'},
										{value:'breitensbarg.jesse@torp.co.uk'},
										{value:'Admin'}
                  ]},{column:[
                    {value:'12345678'},
										{value:'Helen Santiago'},
										{value:'breitensbarg.jesse@torp.co.uk'},
										{value:'Admin'}
                  ]},{column:[
                    {value:'12345678'},
										{value:'Helen Santiago'},
										{value:'breitensbarg.jesse@torp.co.uk'},
										{value:'Admin'}
                  ]},{column:[
                    {value:'12345678'},
										{value:'Helen Santiago'},
										{value:'breitensbarg.jesse@torp.co.uk'},
										{value:'Admin'}
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

export default connect(mapStateToProps)(ManageAcess);
// export default Login
