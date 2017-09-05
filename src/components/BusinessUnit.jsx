import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import {Line} from 'react-progressbar.js';

import {Input ,Divider,Search,PageLoader} from './Components.jsx';
import {changeRoute, getBusinessUnitDetail,pop, inviteToBusiness, showNotif} from './actions.jsx';
import ReactAutocomplete from 'react-autocomplete'

import store from '../reducers/combineReducers.jsx';


class BusinessUnit extends Component {
  constructor(){
    super();
    this.state = {
      status : null,
      type: null,
      effort:null,
      search:null,
      label: '',
      id:''
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


  render() {
    // var state = this.props.state;
    var state = store.getState();
    
    const id = state.page.business_unit.bu_code
    const available_assign = state.data.nonmember ? state.data.nonmember.map((value,index)=>{
      return {id:value.USER_ID , label:value.USER_NAME}
    }) : []
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

        {/* <div className="grid wrap">
          <div className="unit whole" >
            <div className="person" style={{textAlign:"center"}}>
            <div className="person-image" style={{margin:"0 auto"}}></div>
            <div className="person-image" style={{margin:"0 auto",marginLeft:"-5px",backgroundColor:"orange"}}></div>
            <div className="person-image" style={{margin:"0 auto",marginLeft:"-5px",backgroundColor:"yellow"}}></div>
            <div className="person-image" style={{margin:"0 auto",marginLeft:"30px"}}>
            
            </div>
            </div>
          </div>
        </div> */}

        <div className='projects'>
        <div>
        <div className="grid wrap">
        <div className="unit whole">
        <button className='btn-secondary' style={{padding:'17px 22px', width:'20%', float:'right'}} onClick={e => {
          browserHistory.push('/new-project')
        }}><i style={{verticalAlign:'bottom', marginRight:'7px'}} className="material-icons md-18">add</i>NEW PROJECT</button>
        <Search placeholder='Search Business Units or Project' style={{width:'78%', display:'inline-block'}}
        onChange={e=>{
          this.setState({search:e.target.value},()=>{
            store.dispatch(getBusinessUnitDetail(id,this.state.status,this.state.type,this.state.effort,this.state.search))
          })
          e.preventDefault()
        }}
        >
        </Search>
        </div>
        </div>
        <div style={{marginBottom: '30px'}} className='grid wrap'>
        <div className='unit three-fifths'>
        
        <div>
        <select 
        className='select' style={{height:'49px', width:'33.333%', display:'inline-block'}}
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
          className='select' style={{height:'49px', width:'33.33%', display:'inline-block'}}
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
            className='select' style={{height:'49px', width:'33.333%', display:'inline-block'}}
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
              <div className="unit two-fifths">
              <ReactAutocomplete
              inputProps={{ placeholder: 'Invite to Business Unit' }}
              items={available_assign}
              menuStyle={{
                opacity:'1'

              }}
              getItemValue={(label) => label.label}
              style={{width:'500px',marginTop:'60px'}}
              wrapperProps={{
                style:{width:'82%', zIndex:'3', position:'relative', display:'inline-block'}
              }}
              menuStyle={{
                borderRadius: '3px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                background: 'white',
                padding: '2px 0',
                fontSize: '90%',
                position: 'fixed',
                display:'block',
                cursor:'pointer',
                overflow: 'auto',
                          maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
                        }}
                        shouldItemRender={(item, value) => item.label ? item.label.toLowerCase().indexOf(value.toLowerCase()) > -1 : null}
                        getItemValue={item => item.label}
                        renderItem={(item, highlighted) =>
                          <div className="small-wrap">
                          <small className='small-hover' style={{padding:'6px 0 0 5px'}} key={item.id}>{item.label}</small>  

                          </div>
                        }
                        value={this.state.value}
                        onChange={e => {
                          this.setState({ value: e.target.value })

                        }}
                        onSelect={(id,label) => {
                          console.log('LABELLLL',id)
                          this.setState({ id:label.id})
                          this.setState({label:label.label})
                          this.setState({ value: label.label})
                          
                          // alert(`selected ${this.state.label}`)
                          console.log(id)
                        }}
                        />
                        <button className='btn-primary' style={{padding:'10px 12px', float:'right', display:'inline-block'}} 
                        onClick=
                        {
                          e => {
                            this.props.dispatch(inviteToBusiness(state.data.bu_id,this.state.id)).then(()=>{
                              showNotif('Successfully added member to business unit', 'GREEN')

                              this.props.dispatch(getBusinessUnitDetail(state.page.business_unit.bu_code))

                            })
                          }
                        }>
                        <i className='material-icons'>add</i></button>
                        </div>
                        </div>
                        <div className='grid wrap'>

                        <div className='unit three-fifths ' style={{overflow:'scroll', height:'500px'}}>
                        {
                          !project ? <PageLoader/> :
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
                              <div className='card' style={{marginBottom:'4px'}} onClick={
                                e => {
                                  store.dispatch(changeRoute({
                                    type: 'PUSH',
                                    page: {
                                      name: 'project',
                                      id: value.PROJECT_ID,
                                      project: {
                                        status:value.PROJECT_STATUS,
                                        bu_code: value.BU_CODE
                                      }
                                    }
                                  }))

                                  e.preventDefault()
                                }
                              }>
                              <div className='unit three-fifths'>
                              <medium className='project-name list-pointer'>
                              {value.PROJECT_NAME}
                              </medium>
                              <small style={{fontSize:'15px', marginTop:'11px'}}  className='project-name list-pointer'>
                              ({value.IWO_NO})
                              </small>
                              </div>

                              <div className='unit two-fifths'>
                              <small style={{fontSize:'15px'}} className='project-name'>
                              Type : 
                              {
                                value.PROJECT_TYPE
                              }
                              </small>
                              <small  style={{fontSize:'15px'}} className='project-name'>
                              Effort : {
                                value.EFFORT_TYPE
                              }
                              </small>
                              <small style={{fontSize:'15px', marginBottom:'11px', marginTop:'11px'}} className='project-status'>
                              {
                                value.PROJECT_STATUS
                              }
                              &nbsp;(<large style={{color: color, display:'inline-block', fontSize:'15px'}}>{value.PROJECT_COMPLETE}%</large>)
                              </small>
                              <small style={{fontSize:'15px', marginBottom:'11px', marginTop:'11px'}} className='project-status'>
                              SPI :
                              {
                                value.SPI
                              }
              
                              </small>
                              <small style={{fontSize:'15px', marginBottom:'11px', marginTop:'11px'}} className='project-status'>
                              CPI :
                              {
                                value.CPI
                              }
                              </small>
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
                              
                              
                              )
                          })
}
</div>
<div className="unit two-fifths" style={{overflow:'scroll', height:'500px'}}>
{
  state.data.member ?
  state.data.member.map((value, index) => (

    <div className='card' style={{padding:'15px',marginBottom:'4px'}} key={index}>
    <div className='grid'>
    <div className='unit four-fifths no-gutters'>
    <div className='pic-wrapper' style={{height:'35px', width:'35px', display:'inline-block'}}></div>
    <div style={{display:'inline-block', marginLeft:'17px'}}>
    <medium style={{fontSize:'15px'}}>{value.USER_NAME}</medium>
  {/* <small style={{fontSize:'15px'}}>{value.EMAIL}</small> */}
  </div>
  </div>
                                            {/* <div className='unit one-fifth no-gutters'>
                                              <small style={{textAlign:'center', color:'#717171', marginTop:'7px'}}>{value.USER_TYPE_ID}</small>
                                            </div> */}
                                            <div className='unit one-fifth no-gutters'>
                                          {/* <medium style={{textAlign:'right', marginTop:'9px'}}>ONLINE &nbsp;&nbsp;&nbsp;&nbsp;<span className='icon-trash' style={{color:'#D62431'}}></span></medium> */}

                                        {/* <medium style={{textAlign:'right', marginTop:'9px'}}><span className='icon-trash' style={{color:'#D62431'}}></span></medium> */}
                                        </div>
                                        </div>
                                        </div>

                                        )):

  <PageLoader></PageLoader>
}
</div>
</div>

</div>
</div>
</div>
);
}
}






function mapStateToProps(state) {
  return {state}
}
export default connect(mapStateToProps)(BusinessUnit);
