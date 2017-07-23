import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import {Line} from 'react-progressbar.js';

import {Input ,Divider} from './Components.jsx';
import store from '../reducers/combineReducers.jsx';


class BusinessUnit extends Component {
  render() {
    var state = store.getState();
      // var projects = state.data.projects ? state.data.projects : null
    var auth = state.data.auth;
    return (
      <div>
        
        <div className='grid wrap'>
          <div className='unit whole'>
            <Divider 
            btnLeftText='BACK' 
            text={auth.project.bu_name} 
            btnLeftClick={
              e => {
                browserHistory.goBack()
                e.preventDefault()
              } 
            }
            btnRightText='REPORT'
            />
          </div>
        </div>
              
        <div className="grid wrap">
          <div className="unit whole" >
            <div className="person" style={{textAlign:"center"}}>
            <div className="person-image" style={{margin:"0 auto"}}></div>
            <div className="person-image" style={{margin:"0 auto",marginLeft:"-5px",backgroundColor:"orange"}}></div>
            <div className="person-image" style={{margin:"0 auto",marginLeft:"-5px",backgroundColor:"yellow"}}></div>
            <div className="person-image" style={{margin:"0 auto",marginLeft:"30px"}}> 
              
            </div>
            </div>
          </div>
        </div>

        <div className='projects'>
          {
            auth.project.map((value, index) => {
              return(
                <div key={index}>
                  <div style={{marginBottom: '30px', margin: '20px auto 10px'}} className='grid wrap' key={index}>
                    <div className='unit whole'>
                      <Input style={{width:'55%', display:'inline-block'}} placeholder="search business unit or project">
                      <div className='material-icons' style={{color:'blue'}}>search</div>
                      </Input>
                      
                        <button className='btn-secondary' style={{padding:'15px 22px'}} onClick={e => {
                          browserHistory.push('/new-project')
                          }}><i style={{verticalAlign:'bottom', marginRight:'7px'}} className="material-icons md-18">add</i>NEW PROJECT</button>
                    </div>
                  </div>
                          
                      {
                        value.project_list.map((value,index) => {
                          return(
                            <div className='grid wrap' key={index}>
                              <div className='unit whole no-gutters'>
                                <div className='card'>
                                  <div className='unit two-fifths'>
                                    <medium className='project-name'>
                                      {value.project_name}
                                    </medium>
                                  </div>
                                  <div className='unit one-fifth'>
                                    <small style={{fontSize:'15px'}} className='project-status'>
                                      {
                                        value.project_status
                                      }
                                      &nbsp;({value.project_complete}%)
                                    </small>
                                  </div>
                                  <div className='unit two-fifths'>
                                    <Line
                                      progress={value.project_complete *0.01}
                                      initialAnimate={true}
                                      options={{
                                      strokeWidth: 3,
                                      color: '#F48165',
                                      trailColor:'#EEEEEE',
                                      trailWidth: 12,
                                      fontSize: 30,
                                      easing: 'easeInOut',
                                      duration: 700,
                                      }}
                                      containerClassName={'line-bar'}
                                    >
                                    </Line>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                </div>
              )
            })
          }
          </div>      
      </div>
    );
  }
}






function mapStateToProps(state) {
  return state
}
export default connect(mapStateToProps)(BusinessUnit);



