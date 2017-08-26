import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header,Search ,PageLoader} from './Components.jsx';
import {getDataMaster} from './actions.jsx'

class DatasetUser extends Component {
  componentWillMount(){
    const user = store.getState().data.user
    store.dispatch(getDataMaster("user"))
  }
  render() {
    const state = store.getState()
    const user = state.data.user


    if (!user){
      <PageLoader />
    }
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
                  tableHeader={[{value:'ID'},{value:'NAME'},{value:'EMAIL'},{value:'LAST LOGIN'}]}
                  tableData={user?user.map((value,index)=>{
                    return {column:[
                      {value:value.USER_ID},
                      {value:value.USER_NAME},
                      {value:value.EMAIL},
                      {value:value.LAST_LOGIN}
                    ]}
                  }):null}>
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