import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header,Search,PopUp } from './Components.jsx';


class DatasetHoliday extends Component {
  render() {
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
									<PopUp id="createHoliday" dividerText="CREATE HOLIDAY" btnText="ADD NEW" style={{display:'inline-block', marginLeft:'35px'}}>
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
                  tableHeader={[{value:'NO'},{value:'NAME'},{value:'START'},{value:'END'}]}
                  tableData={[{column:[
                    {value:'1'},
                    {value:'Hari Raya Nyepi 1938'},
                    {value:'10 May 2017'},
                    {value:'13 Oct 2017'},                                                       
										]},{column:[
											{value:'2'},
											{value:'Wafat Isa Al-Masih'},
											{value:'06 Nov 2017'},
											{value:'23 Apr 2017'},                                     
										]},{column:[
                    {value:'3'},
                    {value:'Hari Buruh Internasional'},
                    {value:'16 Dec 2017'},
                    {value:'29 Oct 2017'},                 
									]},{column:[
                    {value:'4'},
                    {value:'Tahun Baru 2016'},
                    {value:'08 Apt 2017'},
                    {value:'17 Feb 2017'},                 
									]},{column:[
                    {value:'5'},
                    {value:'Imlek 2567'},
                    {value:'29 Mar 2017'},
                    {value:'21 Feb 2017'},                 
									]},{column:[
                    {value:'6'},
                    {value:'Tahun Baru Masehi'},
                    {value:'2 Feb 2017'},
                    {value:'11 Feb 2017'},                 
									]}
                ]}>
                
                </TableNew>															
								</div>

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
    );
  }
}


function mapStateToProps(state) {
  return {
		// filter: ownProps.location.query.filter
  };
}

export default connect(mapStateToProps)(DatasetHoliday);
// export default Login