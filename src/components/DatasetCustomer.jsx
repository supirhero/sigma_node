import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header,Search,PageLoader,TablePaginationMIS } from './Components.jsx';
import {getDataMasterMIS} from './actions.jsx'
import { Field, reduxForm } from 'redux-form';

class DatasetCustomer extends Component {
  componentWillMount(){
    const user = store.getState().data.user
    store.dispatch(getDataMasterMIS("customer"))
  }
  render() {
    
    // const state = store.getState()
    // const project_type = state.data.project_type

    // if (!project_type){
    //   <PageLoader />
    // }
    
    return (
      <div>
        <div className="grid wrap dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
              <div className="table-wrap">
								<div className="unit whole">
									<Header text='Customer' style={{display:'inline-block'}} />
                </div>
                <div className="unit whole">

                  <TablePaginationMIS
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
                    ]},{
                    column:[
                    {value:'9'},
                    {value:'4100002'},
                    {value:'PT PATRAKOM TELEKOMUNIKASI'},
                    {value:'PATR'},
                    {value:'4100002'},
                    {value:'-'},
                    {value:'172 Zelda River'}
                    ]},{
                    column:[
                    {value:'10'},
                    {value:'4100002'},
                    {value:'PT PATRAKOM TELEKOMUNIKASI'},
                    {value:'PATR'},
                    {value:'4100002'},
                    {value:'-'},
                    {value:'172 Zelda River'}
                    ]}
                  
                
                ]}
                >
                
                </TablePaginationMIS>
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
