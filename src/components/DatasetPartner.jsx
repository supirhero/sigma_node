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
                    {value:'2'},
                    {value:'0063001676'},
                    {value:'MOHAMAD SEMBODO'},
                    {value:'GERMAN CENTER LT.5'},                 
                    {value:'419-793-1440'},                                
                  ]},{column:[
                    {value:'3'},
                    {value:'0063001676'},
                    {value:'DRS. MULYADI , MSC'},
                    {value:'JL. SAWA CT VIII NO.94'},                 
                    {value:'070-146-1440'},
                  

                  ]},{column:[
                    {value:'4'},
                    {value:'0063001676'},
                    {value:'Rodney Cunningham'},
                    {value:'55 Dora Shore Suite 790'},                 
                    {value:'208-435-2455'},
                  

                  ]},{column:[
                    {value:'5'},
                    {value:'0063001676'},
                    {value:'Laura Miller'},
                    {value:'297 Pablo Gardens'},                 
                    {value:'578-676-6896'},
                  

                  ]},{column:[
                    {value:'6'},
                    {value:'0063001676'},
                    {value:'Theodore Thornton'},
                    {value:'COMMERCIAL PARK CBD BSD LOT VIII NO'},                 
                    {value:'535-079-2137'},
                  ]},{column:[
                    {value:'7'},
                    {value:'0063001676'},
                    {value:'Jeanette Becker'},
                    {value:'2786 Dorothea View'},                 
                    {value:'535-079-2137'},
                  ]},{column:[
                    {value:'8'},
                    {value:'0063001676'},
                    {value:'Clyde Gordon'},
                    {value:'2722 Immanuel Mall'},                 
                    {value:'395-274-2774'},
                  ]},{column:[
                    {value:'9'},
                    {value:'0063001676'},
                    {value:'Gerald Clayton'},
                    {value:'6533 Illiana Flats Apt. 998'},                 
                    {value:'455-023-2412'},
                  ]},{column:[
                    {value:'10'},
                    {value:'0063001676'},
                    {value:'Mildred Morrison'},
                    {value:'672 Lowell Radial Apt. 249'},                 
                    {value:'535-023-1321'},
                  ]}
                  
                
                ]}
                ></TableNew>                
                </div>
                 <div className="unit whole">
                  <div className="container" style={{float:'left'}}>
                    <small style={{display:'inline-block'}}>show entries</small>
                     <Select 
                          style={{width:'85px', height:'40px',marginLeft:'20px',display:'inline-block'}}
                          items={{
                            items : [
                              {title : '10'},
                              {title : '20'}
                            ]
                           }}
                        />
                  
                  </div>
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