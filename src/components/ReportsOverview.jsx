import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import {Cell} from 'recharts'
import { Select , Input, BarChartSPI,BarChartCPI,BarChart, LineChart, Checkbox, TableNew, Header ,PageLoader} from './Components.jsx';
import {reportMonthly,reportYearly,pop} from './actions.jsx'

class ReportsOverview extends Component {
  constructor(){ 
    super(); 
    this.state = { 
      month : 0, 
      year: 0 
    }; 
  } 

  componentWillMount(){
    const r_monthly = store.getState().data.r_monthly
    const r_yearly = store.getState().data.r_yearly
    this.props.reportMonthly("7","2017");
    this.props.reportYearly("2017");
  }
 
  handleMonthChange (e) { 
    this.setState({month: e.target.value}); 
    console.log(e.target.value); 
    e.preventDefault() 
   } 
 
       
   handleYearChange (e) { 
    this.setState({year: e.target.value}); 
    console.log(e.target.value); 
    e.preventDefault() 
   } 

   handleYearlyChange (e) { 
    this.setState({year: e.target.value}); 
    this.props.reportYearly(e.target.value);
    e.preventDefault() 
   } 

  render() {
    const r_monthly = store.getState().data.r_monthly
    const r_yearly_cpi = store.getState().data.r_yearly_cpi
    const r_yearly_spi = store.getState().data.r_yearly_spi
    
  
  const COLORS = ['greem','red']
  const month= [
    {name:'JANUARY',number:'1'},
    {name:'FEBRUARY',number:'2'},
    {name:'MARCH',number:'3'},
    {name:'APRIL',number:'4'},
    {name:'MAY',number:'5'},
    {name:'JUNE',number:'6'},
    {name:'JULY',number:'7'},
    {name:'AUGUST',number:'8'},
    {name:'SEPTEMBER',number:'9'},
    {name:'OCTOBER',number:'10'},
    {name:'NOVEMBER',number:'11'},
    {name:'DECEMBER',number:'12'},
  ]

  const year = [
    {year:'2017'},
    {year:'2016'},
    {year:'2015'},
  ]




  // const spiYearly =r_yearly_spi.map((value,index)=>{
  //   return {name:value.name,BSD:parseFloat(value.BSD),CIA1:parseFloat(value.CIA1),DCES:parseFloat(value.DCES),FSD:parseFloat(value.FSD),ITPS:parseFloat(value.ITPS),SGP:parseFloat(value.SGP),SMS:parseFloat(value.SMS),SSI:parseFloat(value.SSI),TBSDM:parseFloat(value.TBSDM),TKDM:parseFloat(value.TKDM)}
  // }) 

  // const cpiYearly =r_yearly_cpi.map((value,index)=>{
  //   return {name:value.name,BSD:parseFloat(value.BSD),CIA1:parseFloat(value.CIA1),DCES:parseFloat(value.DCES),FSD:parseFloat(value.FSD),ITPS:parseFloat(value.ITPS),SGP:parseFloat(value.SGP),SMS:parseFloat(value.SMS),SSI:parseFloat(value.SSI),TBSDM:parseFloat(value.TBSDM),TKDM:parseFloat(value.TKDM)}
  // }) 


  // const spiMonthlyGraph = r_monthly ? r_monthly.map((value,index)=>{
  //   return {name:value.BU_ALIAS , value:parseFloat(value.SPI)}
  // }) : null


  // const cpiMonthlyGraph = r_monthly ? r_monthly.map((value,index)=>{
  //   return {name:value.BU_ALIAS , value:parseFloat(value.CPI)}
  // }) : null


  const tableMonthly = r_monthly ? r_monthly.map((value,index)=>{
    return {column:[
      {value:value.BU_NAME},
      {value:value.EV},
      {value:value.PV},
      {value:value.AC},
      {value:value.SPI},
      {value:value.CPI}
    ]}
  }) : null

  if (!r_monthly && !r_yearly_cpi && !r_yearly_spi) {
    return <PageLoader />;
  }
  return (
    
      <div>
        <div className="grid wrap wider reports">
          <div className="unit whole">
            <div className="card" style={{ padding: '35px' }}>
              <Tabs>
              <TabList style={{paddingLeft:'0',marginBottom:'57px'}}>
              <div className="grid wrap">
                <div className="unit half">
                  <Header text='Monthly Performance' style={{display:'inline-block'}} />
                  <Tab className="fa fa-bar-chart fa-2x " style={{marginLeft:'20px', color:'#cccccc'}}></Tab>
                  <Tab className="fa fa-table fa-2x " style={{marginLeft:'20px',color:'#cccccc'}}></Tab>
                </div>
                <div className="unit half">
                  <div className="grid">
                    <div className="unit four-fifths">
                    <select onChange={this.handleMonthChange.bind(this)} 
                    className='select' style={{height:'49px', width:'48%', display:'inline-block'}}> 
                    { 
                      month &&
                      month.map((value,index) => { 
                      return( 
                        <option key={index} value={value.number}>{value.name}</option> 
 
                      ) 
                    })} 
                  </select> 
                      
                  <select onChange={this.handleYearChange.bind(this)} 
                  className='select' style={{height:'49px', width:'48%', display:'inline-block',float:'right'}}> 
                  { 
                    year &&
                    year.map((value,index) => { 
                    return( 
                      <option key={index} value={value.year}>{value.year}</option> 
 
                    ) 
                  })} 
                </select> 
                    </div>
                    <div className="unit one-fifth">
                    <button className="btn-primary" style={{ padding: '11px 14px' }} ><span className="material-icons" style={{ color: 'white' }}  
                    onClick={(e)=> { 
                      console.log(this.state.month,this.state.year); 
                      this.props.reportMonthly(this.state.month,this.state.year)
                      // store.dispatch(myPerformance('1','2017')) 
                      e.preventDefault() 
                    }}>search</span></button> 
                    </div>
                  </div>

                </div>
              </div>
              </TabList>

              <TabPanel>
              <div className="grid wrap narrow">
                <div className="unit whole">
                 <BarChartSPI
                fill = '#65bdf4'       
                 label="SPI Graph"
                 labelStyle={{padding:'0 40%'}}
                //  ticks={[ 0,0.3,0.6,0.9,1.2,1.5,1.8]}
                 data={ r_monthly && r_monthly.map((value,index)=>{
                  return {name:value.BU_ALIAS , value:parseFloat(value.SPI)}
                }) 
              }
                 />
                 
                
                </div>


              <div className="unit whole" style={{marginTop:'50px'}}>
                  <BarChartCPI
                  fill = '#65bdf4'       
                  label="CPI Graph"
                  labelStyle={{padding:'0 40%'}}
                  // ticks={[ 0,0.3,0.6,0.9,1.2,1.5,1.8]}
                  data={r_monthly ? r_monthly.map((value,index)=>{
                    return {name:value.BU_ALIAS , value:parseFloat(value.CPI)}
                  }) : null
                }
                  />

                </div>
              </div>
              </TabPanel>

              <TabPanel>
              <div className="grid wrap narrow">
                <div className="unit whole">
                 <TableNew
									tableHeader={[
										{value:'Business Unit Name'},
										{value:'EV'},
                    {value:'PV'},
                    {value:'AC'},
                    {value:'SPI'},
                    {value:'CPI'},
									]} 
									tableData = {tableMonthly}>
             
                  
									</TableNew>
                </div>
              </div>
              </TabPanel>


              </Tabs>

            </div>
          </div>
        </div>

        <div className="grid wrap wider reports" >
          <div className="unit whole" style={{paddingBottom:0}}>
            <div className="card" style={{ padding: '35px' }}>
              <div className="unit whole" style={{paddingLeft:'10px'}}>
                <Header text='Yearly Performance' style={{display:'inline-block'}} />
                <a href="" style={{float:'right',display:'none'}}>hide advanced filter</a>
              </div>
       
              {/* 
              <div className="unit whole">
                <medium style={{marginTop:'44px',marginBottom:'10px'}}><b>Working Unit</b></medium>
                <Checkbox id='test1' label='BSD' group='working' />
              </div>
              */}

              <div className="unit whole">
                <medium style={{marginTop:'20px',marginBottom:'10px'}}><b>Year</b></medium>
                <div className="unit half">
               
                  
              <select onChange={this.handleYearlyChange.bind(this)} 
              className='select' style={{height:'49px', width:'48%', display:'inline-block',float:'left'}}> 
              { 
                year &&
                year.map((value,index) => { 
                return( 
                  <option key={index} value={value.year}>{value.year}</option> 

                ) 
              })} 
            </select> 
                </div>
                <div className="unit half">
               {/* <button className="btn-primary" style={{ padding: '11px 14px' }} ><span className="material-icons" style={{ color: 'white' }}  
                onClick={(e)=> { 
                  console.log(this.state.month,this.state.year); 
                  store.dispatch(reportYearly(this.state.month,this.state.year)) 
                  // store.dispatch(myPerformance('1','2017')) 
                  e.preventDefault() 
                }}>search</span></button> */}
                <button style={{display:'inline-block',float:'right',display:'none'}} className='btn-primary'>DOWNLOAD</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid wrap wider reports" >
          <div className="unit whole" style={{paddingTop:0}}>
            <div className="card" style={{ padding: '35px' }}>
              <div className="grid wrap narrow" style={{marginTop:'55px'}}>
                <div className="unit whole">
                 {
                  !r_yearly_spi ? <PageLoader /> :
                
                  <LineChart
                    label="SPI HISTORY"
                    data=
                    {
                      r_yearly_spi &&
                      r_yearly_spi.map((value,index)=>{
                      return {name:value.name,BSD:parseFloat(value.BSD),CIA1:parseFloat(value.CIA1),DCES:parseFloat(value.DCES),FSD:parseFloat(value.FSD),ITPS:parseFloat(value.ITPS),SGP:parseFloat(value.SGP),SMS:parseFloat(value.SMS),SSI:parseFloat(value.SSI),TBSDM:parseFloat(value.TBSDM),TKDM:parseFloat(value.TKDM)}
                    }) }
                    lines={[{key:'BSD', stroke:'#f8aa27'},
                            {key:'CIA1', stroke:'#94dea9'},
                            {key:'DCES', stroke:'#795548'},
                            {key:'FSD', stroke:'#0099ff'},
                            {key:'ITPS', stroke:'#642bb6'},
                            {key:'SGP', stroke:'#f8aa27'},
                            {key:'SMS', stroke:'#94dea9'},
                            {key:'SSI', stroke:'#795548'},
                            {key:'TBSDM', stroke:'#0099ff'},
                            {key:'TKDM', stroke:'#642bb6'},                              													
													]}
                    style={{marginTop:'50px'}}
                  />
                } 
                </div>
              </div>

              <div className="grid wrap narrow" style={{marginTop:'55px'}}>
                <div className="unit whole">
                  <LineChart
                    label="CPI HISTORY"
                    data={ r_yearly_cpi && r_yearly_cpi.map((value,index)=>{
                      return {name:value.name,BSD:parseFloat(value.BSD),CIA1:parseFloat(value.CIA1),DCES:parseFloat(value.DCES),FSD:parseFloat(value.FSD),ITPS:parseFloat(value.ITPS),SGP:parseFloat(value.SGP),SMS:parseFloat(value.SMS),SSI:parseFloat(value.SSI),TBSDM:parseFloat(value.TBSDM),TKDM:parseFloat(value.TKDM)}
                    }) }
                    lines={[{key:'BSD', stroke:'#f8aa27'},
                    {key:'CIA1', stroke:'#94dea9'},
                    {key:'DCES', stroke:'#795548'},
                    {key:'FSD', stroke:'#0099ff'},
                    {key:'ITPS', stroke:'#642bb6'},
                    {key:'SGP', stroke:'#f8aa27'},
                    {key:'SMS', stroke:'#94dea9'},
                    {key:'SSI', stroke:'#795548'},
                    {key:'TBSDM', stroke:'#0099ff'},
                    {key:'TKDM', stroke:'#642bb6'},                              													
                  ]}
                    style={{marginTop:'50px'}}
                  />

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
    state
  };
}
export default connect(mapStateToProps,{reportMonthly,reportYearly})(ReportsOverview);
// export default Login
