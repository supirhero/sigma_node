import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import {Line} from 'react-progressbar.js';

import {Input ,Divider,Search,PageLoader} from './Components.jsx';
import {changeRoute, getBusinessUnitDetail,pop} from './actions.jsx';

import store from '../reducers/combineReducers.jsx';


class BusinessUnit extends Component {
  constructor(){
    super();
    this.state = {
      status : null,
      type: null,
      effort:null,
      search:null
    };
  }

  handleStatusChange(e) {
    // this.setState({status: e.target.value},()=>{
    //   store.dispatch(getBusinessUnitDetail(id,this.state.status))
    // });
    store.dispatch(getBusinessUnitDetail(id,"Project"))
    console.log(e.target.value);
    e.preventDefault()

   }


  componentWillMount(){
    var state = store.getState();
    const id = state.page.business_unit.bu_code
    store.dispatch(getBusinessUnitDetail(id))
  }

  componentWillUnmount() {
    store.dispatch(pop());
  }

  componentWIllUpdate(){
    store.dispatch(getBusinessUnitDetail(id,this.state.status,this.state.type,this.state.effort,this.state.search))
  }

  render() {
    var state = store.getState();
    const id = state.page.business_unit.bu_code
    // const id = state.data.page.business_unit.bu_code
    
      // var projects = state.data.projects ? state.data.projects : null
    var project = state.data.project;
    const projectStatus= [
      {name:'Not Started'},
      {name:'In Progress'},
      {name:'Completed'},
    ]
    
    const projectType= [
      {name:'Project'},
      {name:'Non project'},
    ]

    const typeOfEffort = [
      {name:'Project'},
      {name:'CR'},
      {name:'Manage Operation'},
      {name:'Maintenance'},
      {name:'Manage Service'},
      {name:'Non Project'},
    ]

    if(!project){
      return <PageLoader></PageLoader>
    }
    return (
      <div>
        <div className='grid wrap'>
          <div className='unit whole'>
            <Divider
            btnLeftText='BACK'
            text={project[0] ? project[0].BU_NAME:null}
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
                    <Search placeholder='Search Business Units or Project' style={{width:'490px', display:'inline-block'}}
                    onChange={e=>{
                      this.setState({search:e.target.value},()=>{
                        store.dispatch(getBusinessUnitDetail(id,this.state.status,this.state.type,this.state.effort,this.state.search))
                      })
                      e.preventDefault()
                    }}
                    >

                    </Search>
                        <button className='btn-secondary' style={{padding:'15px 22px'}} onClick={e => {
                          browserHistory.push('/new-project')
                          }}><i style={{verticalAlign:'bottom', marginRight:'7px'}} className="material-icons md-18">add</i>NEW PROJECT</button>
                    </div>
                    <div className="unit whole no-gutters">
                        <select 
                        className='select' style={{height:'49px', width:'150px',marginRight:'10px', display:'inline-block'}}
                        onChange={e=>{
                          this.setState({status:e.target.value},()=>{
                            store.dispatch(getBusinessUnitDetail(id,this.state.status,this.state.type,this.state.effort,this.state.search))
                          })
                          e.preventDefault()
                        }}
                        >
                        <option value="">- Project Status -</option>
                        {
                          projectStatus.map((value,index) => {
                          return(
                            <option key={index} value={value.name}>{value.name}</option>

                          )
                        })}
                      </select>
                      <select 
                      className='select' style={{height:'49px', width:'150px',margin:'0 10px', display:'inline-block'}}
                      onChange={e=>{
                        this.setState({type:e.target.value},()=>{
                          store.dispatch(getBusinessUnitDetail(id,this.state.status,this.state.type,this.state.effort,this.state.search))
                        })
                        e.preventDefault()
                      }}
                      >
                      <option value="">- Project Type -</option>
                      {
                        projectType.map((value,index) => {
                        return(
                          <option key={index} value={value.name}>{value.name}</option>

                        )
                      })}
                    </select>
                    <select 
                    className='select' style={{height:'49px', width:'150px',margin:'0 10px', display:'inline-block'}}
                    onChange={e=>{
                      this.setState({effort:e.target.value},()=>{
                        store.dispatch(getBusinessUnitDetail(id,this.state.status,this.state.type,this.state.effort,this.state.search))
                      })
                      e.preventDefault()
                    }}
                    >
                    <option value="">- Type of Effort -</option>
                    {
                      typeOfEffort.map((value,index) => {
                      return(
                        <option key={index} value={value.name}>{value.name}</option>

                      )
                    })}
                  </select>
                    </div>
                  </div>

                      {
                        project &&
                        project.map((value,index) => {
                          var color= '#F48165'
                          switch (value.PROJECT_STATUS) {
                            case 'In Progress':
  
                              color= '#65BDF4'
                              break;
                            case 'Completed':
                              color= '#42C878'
                              break;
                            case 'Overdue':
                              color='#CB0000'
                              break;
                            case 'On Hold':
                              color = '#777777'
                              break;
                            case 'In Planning':
                              color = '#777777'
                              break;
                            default:
                          }
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
                                        value.PROJECT_STATUS
                                      }
                                      &nbsp;(<large style={{color: color, display:'inline-block', fontSize:'15px'}}>{value.PROJECT_COMPLETE}%</large>)
                                    </small>
                                  </div>
                                  <div className='unit two-fifths'>
                                    <Line
                                      progress={value.PROJECT_COMPLETE *0.01}
                                      initialAnimate={true}
                                      options={{
                                      strokeWidth: 3,
                                      color: color,
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
