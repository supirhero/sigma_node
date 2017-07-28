import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import store from '../reducers/combineReducers.jsx';
import { Divider, Header, ProjectHeader, Input, BarChart, Table } from './Components.jsx';


class ProjectSpiCpi extends Component {
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
                      <BarChart
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
                      <Table
                        tableHeader={[
													{ value: 'Name' },
													{ value: 'Email' },
													{ value: 'Entry' },
													{ value: 'Entry Status' },
													{ value: 'Utilization' },
													{ value: 'Utilization Status' },
                        ]}
                        tableData={[
                          {
                            name: 'Dwi Syifa',
                            email: 'dwi.syifa@sigma.co.id',
                            entry: '10',
                            entryStatus: 'NORMAL',
                            utilization: '20',
                            utilizationStatus: 'NORMAL',

                          },
                          {
                            name: 'Ivan Gita Pribadi',
                            email: 'ivan.gita.pribadi@sigma.co.id',
                            entry: '100',
                            entryStatus: 'NORMAL',
                            utilization: '20',
                            utilizationStatus: 'NORMAL',
                          },
                          {
                            name: 'Paula Cintya',
                            email: 'paula.cintya@sigma.co.id',
                            entry: '80',
                            entryStatus: 'NORMAL',
                            utilization: '150',
                            utilizationStatus: 'NORMAL',
                          },
                          {
                            name: 'Ivan Gita Pribadi',
                            email: 'ivan.gita.pribadi@sigma.co.id',
                            entry: '100',
                            entryStatus: 'NORMAL',
                            utilization: '20',
                            utilizationStatus: 'NORMAL',
                          },
                          {
                            name: 'Ivan Gita Pribadi',
                            email: 'ivan.gita.pribadi@sigma.co.id',
                            entry: '100',
                            entryStatus: 'NORMAL',
                            utilization: '20',
                            utilizationStatus: 'NORMAL',
                          },
                        ]}
                      />
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="grid padding-left">
                    <div className="unit whole">
                      <BarChart
                        label="CPI Graph"
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
                      <Table
                        tableHeader={[
													{ value: 'Name' },
													{ value: 'Email' },
													{ value: 'Entry' },
													{ value: 'Entry Status' },
													{ value: 'Utilization' },
													{ value: 'Utilization Status' },
                        ]}
                        tableData={[
                          {
                            name: 'Dwi Syifa',
                            email: 'dwi.syifa@sigma.co.id',
                            entry: '10',
                            entryStatus: 'NORMAL',
                            utilization: '20',
                            utilizationStatus: 'NORMAL',

                          },
                          {
                            name: 'Ivan Gita Pribadi',
                            email: 'ivan.gita.pribadi@sigma.co.id',
                            entry: '100',
                            entryStatus: 'NORMAL',
                            utilization: '20',
                            utilizationStatus: 'NORMAL',
                          },
                          {
                            name: 'Paula Cintya',
                            email: 'paula.cintya@sigma.co.id',
                            entry: '80',
                            entryStatus: 'NORMAL',
                            utilization: '150',
                            utilizationStatus: 'NORMAL',
                          },
                          {
                            name: 'Ivan Gita Pribadi',
                            email: 'ivan.gita.pribadi@sigma.co.id',
                            entry: '100',
                            entryStatus: 'NORMAL',
                            utilization: '20',
                            utilizationStatus: 'NORMAL',
                          },
                          {
                            name: 'Ivan Gita Pribadi',
                            email: 'ivan.gita.pribadi@sigma.co.id',
                            entry: '100',
                            entryStatus: 'NORMAL',
                            utilization: '20',
                            utilizationStatus: 'NORMAL',
                          },
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
