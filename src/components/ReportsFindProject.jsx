import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Search, Input, BarChart, Divider, Meter, TableExample } from './Components.jsx';
import {reportFindProject} from './actions.jsx'


class ReportsFindProject extends Component {

  componentWillMount(){
    store.dispatch(reportFindProject([3],[6],[2],[2]))
  }
  render() {
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
