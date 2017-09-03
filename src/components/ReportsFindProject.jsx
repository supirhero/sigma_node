import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import update from 'react-addons-update';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Search, Input, BarChart, Divider, Meter, TableExample ,Checkbox} from './Components.jsx';
import {reportFindProject, reportSearchProject} from './actions.jsx'


class ReportsFindProject extends Component {
  constructor(){ 
    super(); 
    this.state = { 
        status:[0,0,0,0,0,0],
        schedule:[0,0,0],
        budget:[0,0,0],
        status_flag : true,
        schedule_flag : true,
        budget_flag : true
        
    } 
  } 

  //variable yang akan di send


  componentWillMount(){
    // store.dispatch(reportFindProject([0],[0],[0],[0],[0]))
  }
  render() {
    const status = [
      {label:"not started",value:"1"},
      {label:"in progress",value:"2"},
      {label:"on hold",value:"3"},
      {label:"completed",value:"4"},
      {label:"in planning",value:"5"},
      {label:"cancelled",value:"6"}
    ]

    const schedule= [
      {label:"Schedule Overrun",value:"7"},
      {label:"On Schedule",value:"8"},
      {label:"Ahead Schedule",value:"9"},
    ]

    const budget= [
      {label:"Over Budget",value:"10"},
      {label:"On Budget",value:"11"},
      {label:"Ahead Budget",value:"12"},
    ]

    const status_c = [0,0,0,0,0,0]
    const schedule_c = [0,0,0]
    const budget_c = [0,0,0]
    
    
   


    
    

   

    const state = store.getState()
    const project_list = state.data.project
    
    return (
      
      <div>
        
        <div className="grid wrap">
          <div className="unit one-quarter">
            <div className="card" style={{ padding: '35px' }}>
              <div className="unit whole">
                <large><b>FILTERED BY</b></large>
              </div>
              <div className="unit whole no-gutters">
                <medium><b>Status</b></medium>
              </div> 
              <div className="unit whole no-gutters">
                {
                  status.map((value,index)=>{
                   return <Checkbox id={index} label={value.label} group='status' 
                    onClick={
                      
                      e=>{
                        console.log(this.state,"WWERIRENANRI")
                        this.state.status[index] = this.state.status[index] == 0 ? 1 : 0
                        console.log('STATUS',this.state.status)

                        var flag = true;

                        for(var i = 0; i < this.state.status.length; ++i) {
                          if(this.state.status[i] !== 0) {
                            this.setState({status_flag : false},()=> {
                              this.props.dispatch(reportSearchProject(!this.state.status_flag ? this.state.status : null, !this.state.schedule_flag ? this.state.schedule : null , !this.state.budget_flag ? this.state.budget : null))
                              .then(res=> {
                                this.forceUpdate()
                              })  
                            })
                            break;
                          }
                        } 
                        
                      {/* if(this.state.status[index] == 1) {
                        this.setState({
                          status: update(this.state.status,{[index] : {$set: 0}})
                        }, ()=> { 
                          console.log(this.state.status)
                         console.log("SET TO 0--------")
                          this.props.dispatch(reportSearchProject(this.state.status, this.state.schedule))
                          .then(res=> {
                            this.forceUpdate()
                          })                          
                          // console.log(this.state.status)
                        })
                      }
                      else{
                        this.setState({
                          status: update(this.state.status,{ [index]: {$set: 1}})
                        }, ()=> {
                          console.log(this.state.status)
                         console.log("SET TO 1--------")
                          this.props.dispatch(reportSearchProject(this.state.status, this.state.schedule))
                          .then(res=> {
                            this.forceUpdate()
                          }) 
                        })
                        
                      } */}
                        

                       
                    }}
                  ></Checkbox> 
                  })
                }
            </div>      
            <div className="unit whole no-gutters">
                <medium><b>Schedule</b></medium>
            </div> 
              <div className="unit whole no-gutters">
              
                {
                  schedule.map((value,index)=>{
                   return <Checkbox id={'schedule' + index} label={value.label} group='schedule' 
                    onClick={
                      
                      e=>{

                        this.state.schedule[index] = this.state.schedule[index] == 0 ? 1 : 0
                        console.log('schedule',this.state.schedule)


                        for(var i = 0; i < this.state.schedule.length; ++i) {
                          if(this.state.schedule[i] !== 0) {
                            this.setState({schedule_flag : false}, ()=> {

                              this.props.dispatch(reportSearchProject(!this.state.status_flag ? this.state.status : null, !this.state.schedule_flag ? this.state.schedule : null , !this.state.budget_flag ? this.state.budget : null))
                              .then(res=> {
                                this.forceUpdate()
                              })  
                            })
                            break;
                          }
                        } 

                        {/* console.log(this.state,"WWERIRENANRI") */}
         
                      {/* if(this.state.schedule[index] == 1) {
                        this.setState({
                          schedule: update(this.state.schedule,{[index] : {$set: 0}})
                        }, ()=> { 
                          this.props.dispatch(reportSearchProject(this.state.status, this.state.schedule))
                          .then(res=> {
                            this.forceUpdate()
                          })                          
                          // console.log(this.state.status)
                        })
                      }
                      else{
                        this.setState({
                          schedule: update(this.state.schedule,{ [index]: {$set: 1}})
                        }, ()=> {
                        
                          this.props.dispatch(reportSearchProject(this.state.status, this.state.schedule))
                          .then(res=> {
                            this.forceUpdate()
                          }) 
                        })
                      } */}

                          {/* e.preventDefault() */}
                    }}
                  ></Checkbox>
                  })
                }
                </div>     

                <div className="unit whole no-gutters">
                <medium><b>Budget</b></medium>
            </div> 
              <div className="unit whole no-gutters">
              
                {
                  budget.map((value,index)=>{
                   return <Checkbox id={'budget' + index} label={value.label} group='budget' 
                    onClick={
                      
                      e=>{

                        this.state.budget[index] = this.state.budget[index] == 0 ? 1 : 0
                        console.log('schedule',this.state.schedule)

                        var flag = true;

                        for(var i = 0; i < this.state.budget.length; ++i) {
                          if(this.state.budget[i] !== 0) {
                            this.setState({budget_flag : false}, ()=> {
                              this.props.dispatch(reportSearchProject(!this.state.status_flag ? this.state.status : null, !this.state.schedule_flag ? this.state.schedule : null , !this.state.budget_flag ? this.state.budget : null))
                                .then(res=> {
                                  this.forceUpdate()
                                })  

                            })
                            break;
                          }
                        } 

                     

                        {/* console.log(this.state,"WWERIRENANRI") */}
         
                      {/* if(this.state.schedule[index] == 1) {
                        this.setState({
                          schedule: update(this.state.schedule,{[index] : {$set: 0}})
                        }, ()=> { 
                          this.props.dispatch(reportSearchProject(this.state.status, this.state.schedule))
                          .then(res=> {
                            this.forceUpdate()
                          })                          
                          // console.log(this.state.status)
                        })
                      }
                      else{
                        this.setState({
                          schedule: update(this.state.schedule,{ [index]: {$set: 1}})
                        }, ()=> {
                        
                          this.props.dispatch(reportSearchProject(this.state.status, this.state.schedule))
                          .then(res=> {
                            this.forceUpdate()
                          }) 
                        })
                      } */}

                          {/* e.preventDefault() */}
                    }}
                  ></Checkbox>
                  })
                }
                </div> 
            </div>
          </div>
          <div className="unit three-quarters">
            <div className="grid wrap">
              <div className="unit whole">
                <Search
                  placeholder="enter project / business unit / project manager / etc name"
                  style={{ width: '100%', margin: '0' }}
                />
              </div>
            </div>

            {/* MAP THIS */}
            {
                project_list ?
                project_list.map((value,index)=>{
                  return(
              <div key={index} style={{marginTop:'30px',marginBottom:'30px'}}>
            <div className="card" style={{ padding: '20px 35px' }}>
              <div className="grid">
                <div className="unit golden-large">
                  <medium>{value.PROJECT_NAME}</medium>
                </div>
                <div className="unit golden-small no-gutters">
                  <medium style={{ float: 'right',marginRight:'55px'}}><b>{value.PROJECT_STATUS}<span className='in-progress'> {value.PERCENT ? `${value.PERCENT} %` : null }</span></b>
                    <div className="dropdown"></div>
                  </medium>                 
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '10px 35px', margin: '0' }}>
              <div className="unit half">
                <medium>Customer</medium>
                <medium>{value.CUSTOMER_NAME}</medium>
              </div>
              <div className="unit half">
                <div style={{ float: 'right',marginRight:'55px' }}>
                  <medium style={{ float: 'right'}}>Value</medium>
                  <medium>{value.AMOUNT}</medium>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '10px 35px', margin: '0' }}>
              <div className="unit one-third">
                <medium>Project Manager</medium>
                <medium>{value.PM}</medium>
              </div>
              <div className="unit two-thirds">
                <div style={{ float: 'left', marginLeft: '50px' }}>
                  <medium >Schedule Status</medium>
                  <medium style={{ float: 'right' }}>{value.SCHEDULE_STATUS}</medium>
                </div>
                <div style={{ float: 'right',marginRight:'55px' }}>
                  <medium>Budget Status</medium>
                  <medium style={{ float: 'right' }}>{value.BUDGET_STATUS}</medium>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '10px 35px' }}>
              <div className="unit three-fifths">
                <div className="unit one-third" style={{ display: 'inline-block' }}>
                  <medium className="status">EV</medium> <span className="fa fa-question-circle-o" />
                  <medium>{value.EV}</medium>
                </div>
                <div className="unit one-third" style={{ display: 'inline-block' }}>
                  <medium className="status">PV</medium> <span className="fa fa-question-circle-o" />
                  <medium>{value.PV}</medium>
                </div>
                <div className="unit one-third" style={{ display: 'inline-block' }}>
                  <medium className="status">AC</medium> <span className="fa fa-question-circle-o" />
                  <medium>{value.AC}</medium>
                </div>
              </div>
              <div className="unit two-fifths">
                <div className="unit half" style={{ display: 'inline-block' }}>
                  <medium className="status">SPI</medium> <span className="fa fa-question-circle-o" />
                  <medium>{value.SPI}</medium>
                </div>
                <div className="unit half" >
                  <medium className="status">CPI</medium> <span className="fa fa-question-circle-o" />
                  <medium style={{ display: 'block' }}>{value.CPI}</medium>
                </div>
              </div>
            </div>
                    </div>
          )
          
                            
                          }) : <div></div>
          }




            {/* <div className="container" style={{float:'right'}}>                  
              <button className="arrow"> <b> &lt; </b> </button>
              <button className="pagination"><b>1</b></button>
              <button className="arrow"> <b> &gt; </b> </button>
            </div> */}

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
export default connect(mapStateToProps)(ReportsFindProject);
// export default Login
