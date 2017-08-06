import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew ,Header, Search, PopUp } from './Components.jsx';


class ManageRoles extends Component {
  render() {
    const BusinessLevel = [
			{name:'Update personal timesheet'},
      {name:'Access business unit overview '},
      {name:'Create object '},
      {name:'Access all projects in business unit'},
      {name:'Approve timesheet (non-project)'},
      {name:'See report overview'},
      {name:'See resources report'},
      {name:'Download Report'},
      {name:'Approve re-baseline'},
    ]

    const ProjectLevel = [
			{name:'Upload and delete workplan'},
      {name:'Assign Task'},
      {name:'Baseline / re-baseline'},
      {name:'Update progress manually'},
      {name:'Approve Timesheet (project)'},
      {name:'Edit Project'},
      {name:'See Project Report'},
      {name:'Download Report'},
		]
    return (
      <div>
        <div className="grid dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
							<div className="table-wrap">

                <div className="unit one-quarter">
                  <Header text="Roles / Type of User" style={{ display: 'inline-block' }} />
								</div>

                <div className="unit three-quarters">
                  <PopUp id="createRole" dividerText="CREATE ROLE" btnText="ADD NEW" btnClass='btn-primary' style={{ display: 'inline-block', marginLeft: '35px' }}>
                    <div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <Input inputName="ROLE NAME" />
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <Input inputName="DESCRIPTION" />
                        </div>
                      </div>

                      <div className="grid wrap narrow pop-container">
                        <div className="unit whole">
                          <small>PRIVILEGES</small>
                        </div>
                      </div>


                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <small>IN BUSINESS UNIT LEVEL</small>
                        </div>
                        <div className="unit half">
                          <div className="unit one-third">
                            <small >ALL BU</small>
                          </div>
                          <div className="unit one-third">
                            <small >ONLY BU</small>
                          </div>
                          <div className="unit one-third">
                            <small >CAN'T</small>
                          </div>
                        </div>
                      </div>

                      {
                        BusinessLevel.map((value,index)=>{
                          return(
                          <div className="grid wrap narrow">
                            <div className="unit half">
                              <small className="label" key={index}>{value.name}</small>
                            </div>
                            <div className="unit half">
                              <div className="unit one-third">
                                <small>box</small>
                              </div>
                              <div className="unit one-third" >
                                <small >box</small>
                              </div>
                              <div className="unit one-third" >
                                <small>box</small>
                              </div>
                            </div>
                          </div>
                          )
                        })
                      }

                      <div className="grid wrap narrow">
                        <div className="unit half">
                          <small>IN PROJECT LEVEL</small>
                        </div>

                        <div className="unit half">
                          <div className="unit one-third" style={{visibility:'hidden'}}>
                            .
                          </div>
                          <div className="unit one-third">
                            <small>CAN</small>
                          </div>
                          <div className="unit one-third">
                            <small>CAN'T</small>
                          </div>
                        </div>
                      </div>

                      {
                        ProjectLevel.map((value,index)=>{
                          return(
                          <div className="grid wrap narrow">
                            <div className="unit half">
                              <small className="label" key={index}>{value.name}</small>
                            </div>
                            <div className="unit half">
                              <div className="unit one-third" style={{visibility:'hidden'}}>
                                .
                              </div>
                              <div className="unit one-third" >
                                <small>box</small>
                              </div>
                              <div className="unit one-third" >
                                <small>box</small>
                              </div>
                            </div>
                          </div>
                          )
                        })
                      }





                      <div className="grid wrap narrow">
                        <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                          <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                          <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW </button>
                        </div>
                      </div>
                    </div>
                  </PopUp>

                  <Search placeholder="search project type" style={{ float: 'right', width: '400px' }} />
                </div>
                <div className="unit whole">
                  <TableNew
                  tableHeader={[{value:'NO'},{value:'NAME'},{value:'DESCRIPTION'}]}
                  tableData={[{column:[
                    {value:'1'},
										{value:'PRouDS'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
                  ]},{column:[
                    {value:'2'},
										{value:'Space Admin'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
                  ]},{column:[
                    {value:'3'},
										{value:'Power User'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
                  ]},{column:[
                    {value:'4'},
										{value:'Team Member'},
										{value:'lorem ipsum dolor sit amet, consectur adi'}
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

export default connect(mapStateToProps)(ManageRoles);
// export default Login
