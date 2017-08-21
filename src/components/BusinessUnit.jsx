import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import {Line} from 'react-progressbar.js';

import {Input ,Divider,Search,PageLoader} from './Components.jsx';
import {changeRoute, getBusinessUnitDetail,pop} from './actions.jsx';

import store from '../reducers/combineReducers.jsx';


class BusinessUnit extends Component {
  componentWillMount(){
    var state = store.getState();
    const id = state.page.business_unit.bu_code
    store.dispatch(getBusinessUnitDetail(id))
  }

  componentWillUnmount() {
    store.dispatch(pop());
  }
  render() {
    var state = store.getState();
    const id = state.page.business_unit.bu_code
    // const id = state.data.page.business_unit.bu_code

      var project = state.project ? state.project : null
    // var project = state.auth.project;
    if(!project){
      return <PageLoader></PageLoader>
    }
    return (
      <div>

        <div className='grid wrap'>
          <div className='unit whole'>
            <Divider
            btnLeftText='BACK'
            text={project.BU_NAME}
            btnLeftClick={
              e => {
                browserHistory.goBack('/')
                e.preventDefault()
              }
            }
            btnRightText='REPORT'
            btnRightClick={
              e => {
                browserHistory.push('/reports')
                e.preventDefault()
              }
            }
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
                <div>
                  <div style={{marginBottom: '30px', margin: '20px auto 10px'}} className='grid wrap'>
                    <div className='unit whole'>
                    <Search placeholder='search business units or project' style={{width:'55%', display:'inline-block'}}></Search>
                        <button className='btn-secondary' style={{padding:'15px 22px'}} onClick={e => {
                          browserHistory.push('/new-project')
                          }}><i style={{verticalAlign:'bottom', marginRight:'7px'}} className="material-icons md-18">add</i>NEW PROJECT</button>
                    </div>
                  </div>

                      {
                        project &&
                        project.map((value,index) => {
                          return(
                            <div className='grid wrap' key={index}>
                              <div className='unit whole no-gutters'>
                                <div className='card' onClick={e=>{
                                  store.dispatch(changeRoute({
                                    type: 'PUSH',
                                    page: {
                                      name: 'project',
                                      id : value.PROJECT_ID
                                    }
                                  }))
                                  e.preventDefault()
                                }}>
                                  <div className='unit two-fifths'>
                                    <medium className='project-name'>
                                      {value.PROJECT_NAME}
                                    </medium>
                                  </div>
                                  <div className='unit one-fifth'>
                                    <small style={{fontSize:'15px'}} className='project-status'>
                                      {
                                        value.project_status
                                      }
                                      &nbsp;({value.PROJECT_COMPLETE}%)
                                    </small>
                                  </div>
                                  <div className='unit two-fifths'>
                                    <Line
                                      progress={value.PROJECT_COMPLETE *0.01}
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
          </div>
      </div>
    );
  }
}






function mapStateToProps(state) {
  return state
}
export default connect(mapStateToProps)(BusinessUnit);
