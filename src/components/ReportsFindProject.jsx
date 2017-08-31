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
        status:[0,0,0],
        status_fin:[0,0,0],
        
    } 
  } 

  //variable yang akan di send


  componentWillMount(){
    store.dispatch(reportFindProject([3],[6],[2],[2]))
  }
  render() {
    const value = [
      {label:"< 5M",value:"1"},
      {label:"1M - 5M",value:"2"},
      {label:"> 5M",value:"3"}
    ]
    
    

   

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
                <medium><b>Value</b></medium>
              </div> 
              <div className="unit whole no-gutters">

              
                {
                  value.map((value,index)=>{
                   return <Checkbox id={index} label={value.label} group='status' 
                    onChange={
                      
                      e=>{
                        console.log(this.state,"WWERIRENANRI")
                      //  if ( this.state["checkbox"+index] == 1) {
                      //    this.setState({
                      //      ["checkbox" + index] : "0"
                      //    }) 
                      //     this.setState(
                      //      this.state.status.concat({
                      //        status:0
                      //      })
                      //    ) 

                      //  }
                      //  else {
                      //   this.setState({
                      //     ["checkbox" + index] : "1"
                      //   }) 
                      //    this.setState(
                      //     this.state.statu`s.concat({
                      //       status:1
                      //     })
                      //   ) 
                      //  }
                      var arr = []
                      if(this.state.status[index] == 1) {
                        var newstate = this.state.status[index] = 0
                        this.setState({
                          items: update(this.state.status,{ $set:{index: 0}})
                        }, ()=> {
                          console.log(this.state.status)
                          var i = 0;
                          for(i; i<this.state.status.length; i++) {
                            if(this.state.status[i] == 1) {
                              arr.push(i+1)
                            }
                          }
                         console.log(arr)
                          this.props.dispatch(reportSearchProject(arr))
                          
                          // console.log(this.state.status)
                        })
                      }
                      else{
                        var newstate = this.state.status[index] = 1
                        this.setState({
                          items: update(this.state.status,{ $set:{index: 0}})
                        }, ()=> {
                          console.log(this.state.status)
                          
                          var i = 0;
                          for(i; i<this.state.status.length; i++) {
                            if(this.state.status[i] == 1) {
                              arr.push(i+1)
                            }
                          }
                         console.log(arr)
                         
                          this.props.dispatch(reportSearchProject(arr))
                          
                          // this.props.dispatch(reportSearchProject(this.state.status))
                          // console.log(this.state.status)
                        })
                        
                        // this.setState(status[index] = 1)
                      }

                      // const arr = []
                      // this.setState({
                      //   items: update(this.state.status,{ $set:{index: 0}})
                      // }, ()=> {
                        
                        
                      // })
                        
                        
                          

                       
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
          
                            
                          }) : null
          }




            <div className="container" style={{float:'right'}}>                  
              <button className="arrow"> <b> &lt; </b> </button>
              <button className="pagination"><b>1</b></button>
              <button className="arrow"> <b> &gt; </b> </button>
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
export default connect(mapStateToProps)(ReportsFindProject);
// export default Login
