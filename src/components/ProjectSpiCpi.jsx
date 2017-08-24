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
    const state = store.getState()
    const id = store.getState().page.id
    const spi = state.data.spi ? state.data.spi : null
    const cpi = state.data.cpi ? state.data.cpi : null
    store.dispatch(getSPI(6992115))
    store.dispatch(getCPI(6992115))
  }
  
  
  render() {
    const state = store.getState()
    const spi = state.data.spi ? state.data.spi : null
    const cpi = state.data.cpi ? state.data.cpi : null
    const dataSPI = spi.map((value,index)=>{
      return {name:value.Week , value:parseFloat(value.SPI)}
    })
    const dataCPI = cpi.map((value,index)=>{
      return {name:value.Week , value:parseFloat(value.SPI)}
    })



    const tableSPI = spi.map((value,index)=>{
      return {column:[
        {value: `Week ${value.Week} ( ${value.startdate} --- ${value.enddate} )`},
        {value:value.EV == null ? '0' : value.EV},
        {value:value.PV == null ? '0' : value.PV},
        {value:value.SPI == null ? '0' : parseFloat(value.SPI).toFixed(2)}
      ]}
    })

    const tableCPI = cpi.map((value,index)=>{
      return {column:[
        {value: `Week ${value.Week} ( ${value.startdate} --- ${value.enddate} )`},
        {value:value.EV == null ? '0' : value.EV},
        {value:value.PV == null ? '0' : value.PV},
        {value:value.SPI == null ? '0' : parseFloat(value.SPI).toFixed(2)}
      ]}
    })



   

    return (  
      !spi && !cpi ? <PageLoader /> :
      <div className="project-DocsFiles">
        <div className="grid padding-left">
          <div className="unit whole">
            <ProjectHeader projectName="Transaction Based Managed Services 2017" sectionName="SPI & CPI" />
          </div>
        </div>
        <Tabs>
          <TabList>
            <Tab style={{ listStyle: 'none', display: 'inline-block' }}><Header text="SPI" className="list-pointer" /></Tab>
            <Tab style={{ listStyle: 'none', display: 'inline-block', marginLeft: '50px' }}><Header text="CPI" className="list-pointer" /></Tab>
          </TabList>
          <div className="grid padding-left">
            <div className="unit whole">
              <div className="card" style={{ padding: '35px' }}>
                <TabPanel>
                  <div className="grid padding-left">
                    <div className="unit whole">
                      <BarChart fill= "#D2E5FA"
                        data={dataSPI}
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
                        tableData={tableSPI}
                      />
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="grid padding-left">
                    <div className="unit whole">
                      <BarChart
                        fill= "#D2E5FA"
                        data={dataCPI}
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
                        tableData={tableCPI}
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
