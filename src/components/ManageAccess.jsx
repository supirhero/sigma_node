import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication , getUserAccess} from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew ,Header, Search, PopUp,TablePaginationUser } from './Components.jsx';


class ManageAcess extends Component {



  componentWillMount(){
    store.dispatch(getUserAccess())
    

  }
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
                <TablePaginationUser
                form='dataset_bu'
                editPopUp='editRole'
                tableHeader={[{value:'NIK'},{value:'NAME'},{value:'EMAIL'},{value: 'ROLE'}]}
                tableData={ this.props.state.data.user_list ? store.getState().data.user_list.map((value,index)=>{
                  return {column:[
                    {value:value.USER_ID},
                    {value:value.USER_NAME},
                    {value:value.EMAIL},
                    {value:value.PROF_NAME},
                    
                  ]}
                }):null}>
              </TablePaginationUser>   
                
                </div>
                 <div className="unit whole">
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
    state
		// filter: ownProps.location.query.filter
  };
}

export default connect(mapStateToProps)(ManageAcess);
// export default Login
