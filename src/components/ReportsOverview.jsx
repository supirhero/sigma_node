import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import {Cell} from 'recharts'
import { Select , Input, BarChartSPI,BarChartCPI,BarChart, LineChart, Checkbox, TableNew, Header } from './Components.jsx';
import {myPerformance,pope} from './actions.jsx'

class ReportsOverview extends Component {
  constructor(){
    super();
    this.state = {
      month : 0,
      year: 0
    };
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


  render() {
    const data = [
      { name: 'BSD', value: 0.86 },
      { name: 'CEM', value: 0.36 },
      { name: 'CISD', value: 0.56 },
      { name: 'DCES', value: 0.92 },
      { name: 'FSD', value: 0.25 },
      { name: 'GT', value: 0.84 },
      { name: 'ITPBS', value: 0.85 },
      { name: 'NITSM', value: 0.78 },
      { name: 'SMS', value: 0.69 },
      { name: 'SSI', value: 0.88 },
      { name: 'SP', value: 0.89 },
      { name: 'TBSDMO', value: 0.86 },
  ]

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
    {name:'DEECMBER',number:'12'},
  ]

  const year = [
    {year:'2017'},
    {year:'2016'},
    {year:'2015'},
  ]
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
                      month.map((value,index) => {
                      return(
                        <option key={index} value={value.number}>{value.name}</option>

                      )
                    })}
                  </select>
                     
                  <select onChange={this.handleYearChange.bind(this)}
                  className='select' style={{height:'49px', width:'48%', display:'inline-block',float:'right'}}>
                  {
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
                        store.dispatch(myPerformance(this.state.month,this.state.year))
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
                 ticks={[ 0,0.3,0.6,0.9,1.2,1.5,1.8]}
                 data={data}
                 />
                 
                
                </div>


              <div className="unit whole" style={{marginTop:'50px'}}>
                  <BarChartCPI
                  fill = '#65bdf4'       
                  label="CPI Graph"
                  labelStyle={{padding:'0 40%'}}
                  ticks={[ 0,0.3,0.6,0.9,1.2,1.5,1.8]}
                  data={data}
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
									tableData = {[{column:[                
										
										  {value: 'Banking Solution Delivery'},
										  {value: '9682.73'},
                      {value:'6372.25'},
                      {value:'6748.29'},
                      {value:'1.52'},
                      {value:'1.52'},

										]},{column:[                
										
										  {value: 'Corporate Effectiveness Management'},
										  {value: '1023.73'},
                      {value:'2314.25'},
                      {value:'4381.21'},
                      {value:'0.46'},
                      {value:'0.52'},
										]},{column:[                
										
										  {value: 'Cross-Industry Solution Delivery'},
										  {value: '1014.96'},
                      {value:'4218.23'},
                      {value:'3213.42'},
                      {value:'0.81'},
                      {value:'1.06'},

										]},{column:[                
										
										  {value: 'Data Center Ecosystem Solutions'},
										  {value: '2632.21'},
                      {value:'3212.21'},
                      {value:'4324.25'},
                      {value:'0.74'},
                      {value:'0.8'},

										]},{column:[                
										
										  {value: 'Financial Solution Delivery'},
										  {value: '3213.23'},
                      {value:'5424.13'},
                      {value:'3213.29'},
                      {value:'1.52'},
                      {value:'1.52'},

										]},{column:[                
										
										  {value: 'Graha Telkomsigma'},
										  {value: '9682.73'},
                      {value:'6372.25'},
                      {value:'6748.29'},
                      {value:'1.52'},
                      {value:'1.52'},

										]},{column:[                
										
										  {value: 'IT & Property Business Solution'},
										  {value: '9682.73'},
                      {value:'6372.25'},
                      {value:'6748.29'},
                      {value:'1.52'},
                      {value:'1.52'},

										]},{column:[                
										
										  {value: 'Network & IT Security Management'},
										  {value: '9682.73'},
                      {value:'6372.25'},
                      {value:'6748.29'},
                      {value:'1.52'},
                      {value:'1.52'},

										]},{column:[                
										
										  {value: 'Sigma Metrasys Solution'},
										  {value: '9682.73'},
                      {value:'6372.25'},
                      {value:'6748.29'},
                      {value:'1.52'},
                      {value:'1.52'},

										]},{column:[                
										
										  {value: 'Sigma Solusi Integrasi'},
										  {value: '9682.73'},
                      {value:'6372.25'},
                      {value:'6748.29'},
                      {value:'1.52'},
                      {value:'1.52'},

										]},{column:[                
										
										  {value: 'Signet Pratama'},
										  {value: '9682.73'},
                      {value:'6372.25'},
                      {value:'6748.29'},
                      {value:'1.52'},
                      {value:'1.52'},

										]},{column:[                
										
										  {value: 'Telkom Delivery & MO'},
										  {value: '9682.73'},
                      {value:'6372.25'},
                      {value:'6748.29'},
                      {value:'1.52'},
                      {value:'1.52'},

										]},{column:[                
										
										  {value: 'Telkomsel Business Solution, Delivery & MO'},
										  {value: '9682.73'},
                      {value:'6372.25'},
                      {value:'6748.29'},
                      {value:'1.52'},
                      {value:'1.52'},

										]}
										
									]}>
									</TableNew>
                </div>
              </div>
              </TabPanel>


              </Tabs>

            </div>
          </div>
        </div>

        <div className="grid wrap wider reports" style={{paddingRight:'24px'}} >
          <div className="unit whole" style={{paddingBottom:0}}>
            <div className="card" style={{ padding: '35px' }}>
              <div className="unit whole" style={{paddingLeft:'10px'}}>
                <Header text='Yearly Performance' style={{display:'inline-block'}} />
                <a href="" style={{float:'right'}}>hide advanced filter</a>
              </div>
              <div className="unit whole">
                <medium style={{marginTop:'44px',marginBottom:'10px'}}><b>Working Unit</b></medium>
                <Checkbox id='test1' label='BSD' group='working' />
              </div>
              <div className="unit whole">
                <medium style={{marginTop:'20px',marginBottom:'10px'}}><b>Year</b></medium>
                <div className="unit half">
                  <Select
                          style={{ width: '150px', display: 'inline-block' }}
                          items={{
                          items : [
                            {title : 'JANUARY'},
                            {title : 'FEBRUARY'}
                          ]
                        }}
                        />
                </div>
                <div className="unit half">
                <button style={{marginLeft:'30px', display:'inline-block',float:'right'}} className='btn-primary'>SEARCH</button>
                <button style={{display:'inline-block',float:'right'}} className='btn-primary'>DOWNLOAD</button>
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
                  <LineChart
                    label="SPI HISTORY"
                    data={[
                        { name: 'JAN', BSD: 0.3, FSD: 0.6 , SMS: 1.2 , TDMO: 1.4 , CEM: 0.8 },
                        { name: 'FEB', BSD: 0.5, FSD: 0.3 , SMS: 1.1 , TDMO: 1.8 , CEM: 1.0 },
                        { name: 'MAR', BSD: 0.2, FSD: 0.4 , SMS: 1.1 , TDMO: 1.7 , CEM: 1.2 },
                        { name: 'APR', BSD: 0.3, FSD: 0.9 , SMS: 0.7 , TDMO: 1.4 , CEM: 1.1 },
                        { name: 'MAY', BSD: 0.6, FSD: 1.0 , SMS: 0.8 , TDMO: 1.6 , CEM: 1.2 },
                        { name: 'JUN', BSD: 0.4, FSD: 1.5 , SMS: 0.9 , TDMO: 0.8 , CEM: 1.1 },
                        { name: 'JUL', BSD: 0.6, FSD: 1.2 , SMS: 1.5 , TDMO: 1.0 , CEM: 1.6 },
                        { name: 'AUG', BSD: 0.9, FSD: 1.3 , SMS: 1.8 , TDMO: 0.3 , CEM: 1.5 },
                        { name: 'SEP', BSD: 0.7, FSD: 0.9 , SMS: 1.3 , TDMO: 0.5 , CEM: 1.6 },
                        { name: 'OCT', BSD: 0.8, FSD: 1.0 , SMS: 1.6 , TDMO: 1.0 , CEM: 1.4 },
                        { name: 'NOV', BSD: 0.5, FSD: 0.3 , SMS: 1.7 , TDMO: 0.8 , CEM: 1.1 },
												{ name: 'DEC', BSD: 0.2, FSD: 0.4 , SMS: 1.6 , TDMO: 1.5 , CEM: 1.2 }
                    ]}
                    lines={[{key:'BSD', stroke:'#f8aa27'},
                            {key:'FSD', stroke:'#94dea9'},
                            {key:'SMS', stroke:'#795548'},
                            {key:'TDMO', stroke:'#0099ff'},
                            {key:'CEM', stroke:'#642bb6'},                            													
													]}
                    style={{marginTop:'50px'}}
                  />

                </div>
              </div>

              <div className="grid wrap narrow" style={{marginTop:'55px'}}>
                <div className="unit whole">
                  <LineChart
                    label="CPI HISTORY"
                    data={[
                        { name: 'JAN', BSD: 0.3, FSD: 0.6 , SMS: 1.2 , TDMO: 1.4 , CEM: 0.8 },
                        { name: 'FEB', BSD: 0.5, FSD: 0.3 , SMS: 1.1 , TDMO: 1.8 , CEM: 1.0 },
                        { name: 'MAR', BSD: 0.2, FSD: 0.4 , SMS: 1.1 , TDMO: 1.7 , CEM: 1.2 },
                        { name: 'APR', BSD: 0.3, FSD: 0.9 , SMS: 0.7 , TDMO: 1.4 , CEM: 1.1 },
                        { name: 'MAY', BSD: 0.6, FSD: 1.0 , SMS: 0.8 , TDMO: 1.6 , CEM: 1.2 },
                        { name: 'JUN', BSD: 0.4, FSD: 1.5 , SMS: 0.9 , TDMO: 0.8 , CEM: 1.1 },
                        { name: 'JUL', BSD: 0.6, FSD: 1.2 , SMS: 1.5 , TDMO: 1.0 , CEM: 1.6 },
                        { name: 'AUG', BSD: 0.9, FSD: 1.3 , SMS: 1.8 , TDMO: 0.3 , CEM: 1.5 },
                        { name: 'SEP', BSD: 0.7, FSD: 0.9 , SMS: 1.3 , TDMO: 0.5 , CEM: 1.6 },
                        { name: 'OCT', BSD: 0.8, FSD: 1.0 , SMS: 1.6 , TDMO: 1.0 , CEM: 1.4 },
                        { name: 'NOV', BSD: 0.5, FSD: 0.3 , SMS: 1.7 , TDMO: 0.8 , CEM: 1.1 },
												{ name: 'DEC', BSD: 0.2, FSD: 0.4 , SMS: 1.6 , TDMO: 1.5 , CEM: 1.2 }
                    ]}
                    lines={[{key:'BSD', stroke:'#f8aa27'},
                            {key:'FSD', stroke:'#94dea9'},
                            {key:'SMS', stroke:'#795548'},
                            {key:'TDMO', stroke:'#0099ff'},
                            {key:'CEM', stroke:'#642bb6'},                            													
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
    state
    // filter: ownProps.location.query.filter
  };
}
export default connect(mapStateToProps)(ReportsOverview);
// export default Login
