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
    store.dispatch(getSPI(id))
    store.dispatch(getCPI(id))
  }

  componentWillUnmount() {
    store.dispatch(pop());
  }
  
  
  render() {
    const state = store.getState()
    const overview = state.data.overview ? state.data.overview : null
    
    const spi = state.data.spi ? state.data.spi.map((value,index)=>{
      return {name:value.WEEK , value:parseFloat(value.SPI)}
    }) : null
    
    const cpi = state.data.cpi ? state.data.cpi.map((value,index)=>{
      return {name:value.WEEK , value:parseFloat(value.CPI)}
    }) : null

    // const dataSPI = spi.map((value,index)=>{
    //   return {name:value.Week , value:parseFloat(value.SPI)}
    // })
    
    // const dataCPI = cpi.map((value,index)=>{
    //   return {name:value.Week , value:parseFloat(value.SPI)}
    // })



    const tableSPI = store.getState().data.spi?store.getState().data.spi.map((value,index)=>{
      return {column:[
        {value: `Week ${value.WEEK} ( ${value.STARTDATE} --- ${value.ENDDATE} )`},
        {value:value.EV == null ? '0' : value.EV},
        {value:value.PV == null ? '0' : value.PV},
        {value:value.SPI == null ? '0' : parseFloat(value.SPI).toFixed(2)}
      ]}
    }):null

    const tableCPI = store.getState().data.cpi?store.getState().data.cpi.map((value,index)=>{
      return {column:[
        {value: `Week ${value.Week} ( ${value.STARTDATE} --- ${value.ENDDATE} )`},
        {value:value.EV == null ? '0' : value.EV},
        {value:value.AC == null ? '0' : value.AC},
        {value:value.CPI == null ? '0' : parseFloat(value.CPI).toFixed(2)}
      ]}
    }):null



   
if (!spi && !cpi) {
      return <PageLoader />;
    }
    return (  
      <div className="project-DocsFiles">
        <div className="grid padding-left">
          <div className="unit whole">
            <ProjectHeader projectName={overview.project_name} sectionName="SPI & CPI" />
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
                      <large style={{display:'inline-block'}}>SPI</large>
                      <button style={{float:'right', marginBottom: '10px'}} className='btn-primary'>RECALCULATE</button>
                      
                      <BarChart style={{marginTop:'70px'}} fill= "#D2E5FA"
                        data={spi}
                      />
                    </div>
                    <div className="unit whole">
                    {
                      <TableNew
                        tableHeader={[
													{ value: 'Time Period' },
													{ value: 'EV' },
													{ value: 'PV' },
													{ value: 'SPI' }

                        ]}
                        tableData={tableSPI}
                      />
                      }
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="grid padding-left">
                    <div className="unit whole">
                    <large>CPI</large>
                      <BarChart
                        fill= "#D2E5FA"
                        data={cpi}
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
