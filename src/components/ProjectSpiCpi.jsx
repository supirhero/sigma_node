import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import store from '../reducers/combineReducers.jsx';
import { Divider, Header, ProjectHeader, Input, BarChart, Table, InputFile, TableNew,PageLoader } from './Components.jsx';
import {pop,getSPI,getCPI} from './actions.jsx'



class ProjectSpiCpi extends Component {
  componentWillMount(){
    const id = store.getState().page.id
    store.dispatch(getSPI(id))
    store.dispatch(getCPI(id))
  }
  
  

  render() {
    return (
      <div className="project-DocsFiles">
        <div className="grid padding-left">
          <div className="unit whole">
            <ProjectHeader projectName="Transaction Based Managed Services 2017" sectionName="SPI & CPI" />
          </div>
        </div>
        <Tabs>
          <TabList>
            <Tab style={{ listStyle: 'none', display: 'inline-block' }}><Header text="SPI" /></Tab>
            <Tab style={{ listStyle: 'none', display: 'inline-block', marginLeft: '50px' }}><Header text="CPI" /></Tab>
          </TabList>
          <div className="grid padding-left">
            <div className="unit whole">
              <div className="card" style={{ padding: '35px' }}>
                <TabPanel>
                  <div className="grid padding-left">
                    <div className="unit whole">
                      <BarChart fill= "#D2E5FA"
                        data={[
													{ name: 'W2', value: 20 },
													{ name: 'W4', value: 10 },
													{ name: 'W6', value: 14 },
													{ name: 'W8', value: 32 },
													{ name: 'W10', value: 16 },
													{ name: 'W12', value: 4 },
													{ name: 'W14', value: 7 },
													{ name: 'W16', value: 9 },
													{ name: 'W18', value: 12 },
													{ name: 'W20', value: 40 },
													{ name: 'W22', value: 54 },
                        ]}
                      />
                    </div>
                    <div className="unit whole">
                      <TableNew
                        tableHeader={[
													{ value: 'Time Period' },
													{ value: 'EV' },
													{ value: 'PV' },
													{ value: 'SPI' }

                        ]}
                        tableData={[
                          {
                            column : [
                              {value : 'WEEK 1 (APRIL 1 2017 - APRIL 5 2017)'},
                              {value : '102'},
                              {value : '112'},
                              {value : '0.92'},
                            ]
                          },
                          {
                            column : [
                              {value : 'WEEK 2 (APRIL 1 2017 - APRIL 5 2017)'},
                              {value : '104'},
                              {value : '152'},
                              {value : '0.12'},
                            ]
                          }
                        ]}
                      />
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="grid padding-left">
                    <div className="unit whole">
                      <BarChart
                        fill= "#D2E5FA"
                        data={[
													{ name: 'W2', value: 54 },
													{ name: 'W4', value: 40 },
													{ name: 'W6', value: 12 },
													{ name: 'W8', value: 9 },
													{ name: 'W10', value: 7 },
													{ name: 'W12', value: 4 },
													{ name: 'W14', value: 16 },
													{ name: 'W16', value: 32 },
													{ name: 'W18', value: 14 },
													{ name: 'W20', value: 10 },
													{ name: 'W22', value: 20 },
                        ]}
                      />
                    </div>

                    <div className="unit whole">
                      <TableNew
                        tableHeader={[
													{ value: 'Time Period' },
													{ value: 'EV' },
													{ value: 'AC' },
													{ value: 'CPI' }
                        ]}
                        tableData={[
                          {
                            column : [
                              {value : 'WEEK 1 (APRIL 1 2017 - APRIL 5 2017)'},
                              {value : '102'},
                              {value : '112'},
                              {value : '0.92'},
                            ]
                          },
                          {
                            column : [
                              {value : 'WEEK 2 (APRIL 1 2017 - APRIL 5 2017)'},
                              {value : '104'},
                              {value : '152'},
                              {value : '0.12'},
                            ]
                          }
                        ]}
                      />
                    </div>
                  </div>
                </TabPanel>
              </div>
            </div>
          </div>
        </Tabs>
      </div>

    );
  }

}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(ProjectSpiCpi);
// export default Login
