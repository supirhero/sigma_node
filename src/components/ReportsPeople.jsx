import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, BarChart, Divider, Meter,Table, TableNew,Header,PageLoader,Menu, MenuSection, MenuItem, MenuHeader } from './Components.jsx';

import {reportPeople} from './actions.jsx'

class ReportsPeople extends Component {
  constructor(){ 
    super(); 
    this.state = { 
      month : 0, 
      year: 0 
    }; 
  } 

  componentWillMount(){
    store.dispatch(reportPeople("6","6","2017"));
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

    const report_people = this.props.state.data.report_people
   
    const tablePeople = report_people ? report_people.map((value,index)=>{
      return {column:[
        {value:value.USER_NAME},
        {value:value.EMAIL},
        {value:value.entry},
        {value:value.status_entry},
        {value:value.utilisasi},
        {value:value.status_utilisasi}
      ]}
    }) : <PageLoader></PageLoader>

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
      !report_people ? <PageLoader/> :
      <div>
        <div className="grid wrap">
          <div className="unit golden-large">
          <Menu
          style={{position:'relative', display:'inline'}}
          menuStyle={{ 
            width:'500px', top:'50px', right:'auto',
            height:'300px', overflow:'scroll'
          
          }}
          triggerInput='true'
          inputStyle={{ width: '100%', display: 'inline-block', float: 'left' }}
          >
            {
              this.props.state.data.list_bu &&

              this.props.state.data.list_bu[0].children.map((value,index)=> {
                console.log('------child' + index, value.BU_NAME)
                return[
                  <MenuHeader style={{paddingLeft: '20px', paddingTop: '15px'}} key={index} title={value.BU_NAME} onClick={e => {
                      console.log('working222')
                      
                      this.setState({bu:value.BU_ID})
                      e.preventDefault()
                    }}>
                    </MenuHeader>,
                    
                      value.children !== null  &&
                      value.children.map((value2,index) => {
                      console.log('child.child' + index,value2.BU_NAME)
                        
                        return(
                          <MenuItem key={index} style={{paddingLeft:'35px', paddingTop:'10px', zIndex:'10'}} title={value2.BU_NAME} onClick={
                            e => {
                              
                              this.setState({bu:value2.BU_ID})
                              
                            }
                          }/>
                         
                       
                        )
                    })
                    
                ]

              }

        
              )
            }

        </Menu>
          </div>
					<div className="unit golden-small">
          <select onClick={this.handleMonthChange.bind(this)} 
          className='select' style={{height:'49px', width:'48%', display:'inline-block'}}> 
          { 
            month.map((value,index) => { 
            return( 
              <option key={index} value={value.number}>{value.name}</option> 

            ) 
          })} 
        </select> 
            
        <select onClick={this.handleYearChange.bind(this)} 
        className='select' style={{height:'49px', width:'48%', display:'inline-block',float:'right'}}> 
        { 
          year.map((value,index) => { 
          return( 
            <option key={index} value={value.year}>{value.year}</option> 

          ) 
        })} 
      </select> 
      <button className="btn-primary" style={{ padding: '11px 14px' }} ><span className="material-icons" style={{ color: 'white' }}  
      onClick={(e)=> { 
        console.log(this.state.month,this.state.year); 
        store.dispatch(reportPeople(this.state.month,this.state.year)) 
        // store.dispatch(myPerformance('1','2017')) 
        e.preventDefault() 
      }}>search</span></button> 
          </div>
				</div>    
				

				<div className="grid wrap">
          <div className="unit whole">
						<div className="card" style={{ padding: '35px' }}>
							<div className="grid wrap">
								<div className="unit half">
								<Header text='Timesheet Report' style={{display:'inline-block'}} />
								</div>
								<div className="unit half">
								<Input style={{width:'100%', display:'inline-block'}} placeholder="Search a name" />
							</div>
							</div>
							<div className="grid wrap">
								<div className="unit whole">
									<TableNew
									tableHeader={[
										{value:'Name'},
										{value:'Email'},
                    {value:'Entry'},
                    {value:'Entry Status'},
                    {value:'Utilization'},
                    {value:'Utilization Status'},
									]} 
									tableData = {tablePeople}>
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
    state
    // filter: ownProps.location.query.filter
  };
}
export default connect(mapStateToProps)(ReportsPeople);
// export default Login
