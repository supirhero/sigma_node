import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header,Search } from './Components.jsx';


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
                <TableNew
                  tableHeader={[{value:'NO'},{value:'ID'},{value:'NAME'},{value:'EMAIL'},{value:'LAST LOGIN'}]}
                  tableData={[{column:[
                    {value:'1'},
                    {value:'4100001'},
                    {value:'Joshua Howard'},
                    {value:'huel_cora@hotmail.com'},
                    {value:'08 Apr 2017'},
                                
                  ]},{
                    column:[
                    {value:'2'},
                    {value:'4100002'},
                    {value:'Luella Perry'},
                    {value:'maya_kutch@hotmail.com'},
                    {value:'28 Nov 2017'}
                    ]},{
                    column:[
                    {value:'3'},
                    {value:'4100003'},
                    {value:'Genevieve Wells '},
                    {value:'genevieve_wells@hotmail.com'},
                    {value:'20 Mar 2017'}
                    ]},{
                    column:[
                    {value:'4'},
                    {value:'4100004'},
                    {value:'Eugene Chandler'},
                    {value:'eugene_chandler@hotmail.com'},
                    {value:'09 May 2017'}
                    ]},{
                    column:[
                    {value:'5'},
                    {value:'4100005'},
                    {value:'Adele Canon'},
                    {value:'adele_canon@hotmail.com'},
                    {value:'04 May 2017'}
                    ]},{
                    column:[
                    {value:'6'},
                    {value:'4100006'},
                    {value:'Maud Berry'},
                    {value:'maud_berry@hotmail.com'},
                    {value:'25 Jun 2017'}
                    ]},{
                    column:[
                    {value:'7'},
                    {value:'4100007'},
                    {value:'Grace Perez'},
                    {value:'grace_perez@hotmail.com'},
                    {value:'02 Feb 2017'}
                    ]},{
                    column:[
                    {value:'8'},
                    {value:'4100007'},
                    {value:'Garreth Welch'},
                    {value:'garreth_welch@hotmail.com'},
                    {value:'03 Feb 2017'}
                    ]},{
                    column:[
                    {value:'9'},
                    {value:'4100007'},
                    {value:'Rebecca Jackson'},
                    {value:'rebecca_jackson@hotmail.com'},
                    {value:'25 Jan 2017'}
                    ]},{
                    column:[
                    {value:'10'},
                    {value:'4100007'},
                    {value:'Isabelle Riley'},
                    {value:'isabelle_riley@hotmail.com'},
                    {value:'29 Mar 2017'}
                    ]}
                  ]}>
                </TableNew>                            
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