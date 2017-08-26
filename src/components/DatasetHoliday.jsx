import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header,Search,PopUp ,PageLoader} from './Components.jsx';
import {getDataMaster,manageHoliday} from './actions.jsx'
import { routerMiddleware, push } from 'react-router-redux'
import {Field, reduxForm} from 'redux-form';

class DatasetHoliday extends Component {
  componentWillMount(){
    const state = store.getState()
    const holiday = state.data.holiday
    // const holiday = store.getState().data.holiday
    store.dispatch(getDataMaster("holiday"))
  }

  render() {
    const state = store.getState()
    const holiday = state.data.holiday


    if (!holiday){
      <PageLoader />
    }
    
    return (
      <div>
        <div className="grid dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
							<div className="table-wrap">
								
								<div className="unit one-quarter">
									<Header text='Holiday' style={{display:'inline-block'}} />
								</div>

                <div className="unit three-quarters">
									<PopUp id="createHoliday" dividerText="CREATE HOLIDAY" btnClass='btn-primary' btnText="ADD NEW" style={{display:'inline-block', marginLeft:'35px'}}>
										<div>
											<div className="grid wrap narrow">
												<div className="unit whole">
													<Input inputName="HOLIDAY" />
												</div>
											</div>
											<div className="grid wrap narrow">
												<div className="unit whole">
													<Input inputName="START DATE" />
												</div>
											</div>
											<div className="grid wrap narrow">
												<div className="unit whole">
													<Input inputName="END DATE" />
												</div>
											</div>
												<div className="grid wrap narrow">
													<div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
														<button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
														<button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW </button>
													</div>
												</div>
										</div>
									</PopUp>
									<Search placeholder='search holiday' style={{float:'right',width:'400px'}} />
								</div>

								<div className="unit whole">
									 <TableNew
                  tableHeader={[{value:'NAME'},{value:'START'},{value:'END'}]}
                  tableData={holiday?holiday.map((value,index)=>{
                    return {column:[
                      {value:value.HOLIDAY},
                      {value:value.HOLIDAY_START},
                      {value:value.HOLIDAY_END},
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
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
		// filter: ownProps.location.query.filter
  };
}

export default connect(mapStateToProps,{getDataMaster})(DatasetHoliday);
// export default Login