import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header,Search } from './Components.jsx';


class DatasetPartner extends Component {
  render() {
    return (
      <div>
        <div className="grid wrap dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
              <div className="table-wrap">
								<div className="unit whole">
									<Header text='Partner' style={{display:'inline-block'}} />
									<Search placeholder='search partner' style={{float:'right',width:'400px'}} />
                </div>
                <div className="unit whole">
                <TableNew
                  tableHeader={[{value:'NO'},{value:'ID'},{value:'NAME'},{value:'ADDRESS'},{value:'TELEPHONE'}]}
                  tableData={[{column:[
                    {value:'1'},
                    {value:'0063001676'},
                    {value:'PT AARYA KINARI TIRTA'},
                    {value:'COMMERCIAL PARK CBD BSD LOT VIII NO'},                 
                    {value:'535-079-2137'},
                  

                  ]},{column:[
                    {value:'1'},
                    {value:'0063001676'},
                    {value:'MOHAMAD SEMBODO'},
                    {value:'GERMAN CENTER LT.5'},                 
                    {value:'535-079-2137'},                                
                  ]},{column:[
                    {value:'1'},
                    {value:'0063001676'},
                    {value:'PT AARYA KINARI TIRTA'},
                    {value:'COMMERCIAL PARK CBD BSD LOT VIII NO'},                 
                    {value:'535-079-2137'},
                  

                  ]},{column:[
                    {value:'1'},
                    {value:'0063001676'},
                    {value:'PT AARYA KINARI TIRTA'},
                    {value:'COMMERCIAL PARK CBD BSD LOT VIII NO'},                 
                    {value:'535-079-2137'},
                  

                  ]},{column:[
                    {value:'1'},
                    {value:'0063001676'},
                    {value:'PT AARYA KINARI TIRTA'},
                    {value:'COMMERCIAL PARK CBD BSD LOT VIII NO'},                 
                    {value:'535-079-2137'},
                  

                  ]},{column:[
                    {value:'1'},
                    {value:'0063001676'},
                    {value:'PT AARYA KINARI TIRTA'},
                    {value:'COMMERCIAL PARK CBD BSD LOT VIII NO'},                 
                    {value:'535-079-2137'},
                  

                  ]},{column:[
                    {value:'1'},
                    {value:'0063001676'},
                    {value:'PT AARYA KINARI TIRTA'},
                    {value:'COMMERCIAL PARK CBD BSD LOT VIII NO'},                 
                    {value:'535-079-2137'},
                  

                  ]}
                  
                
                ]}
                >
                
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
export default connect(mapStateToProps)(DatasetPartner);
// export default Login