import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication ,getListBU,rDirectorat, showNotif, getDirectorateEntry, getDirectorateUtility} from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import {BarChart, Divider, Meter, Header ,Menu, MenuSection, MenuItem, MenuHeader, PageLoader, Select} from './Components.jsx';

class ReportsDirectorate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bu_name: '',
      bu: null,
      year: null,
      year_timesheet: null
    }
  }
  componentWillMount(){
    this.props.dispatch(getListBU())
    this.props.dispatch(rDirectorat("44","2017"))
  }


  render() {
    const state = this.props.state
    const year = [
    { value: '2014' },
    { value: '2015' },
    { value: '2016' },
    { value: '2017' },
    { value: '2018' },
    ]

    const entry =state.data.r_entry_bu?state.data.r_entry_bu.allentry.map((value,index)=>{
      return {name:value.label,value:parseFloat(value.value)}
    }) : null

    const utilization =state.data.r_util_bu?state.data.r_util_bu.allhour.map((value,index)=>{
      return {name:value.label,value:parseFloat(value.value)}
    }) : null

    return (
      !state.data.list_bu ? <PageLoader></PageLoader> :
      <div>
      <div className="grid wrap">
      <div className="unit three-quarters">
						{/* <Select
              style={{ width: '100%', display: 'inline-block', float: 'left' }}
              items={{
                items : [
                {title : 'DIRECTORATE'},
                {title : 'BUSINESS UNIT'}
                ]
							}}/>
           </div> */}

           <Menu
           style={{position:'relative', display:'inline'}}
           menuStyle={{ 
            width:'500px', top:'50px', right:'auto',
            height:'300px', overflow:'scroll'

          }}
          placeholder = "Select Business Unit"
          triggerInput='true'
          defaultValue={this.state.bu_name}
          inputStyle={
            !state.data.list_bu  ?
            {
              float: 'left',
              display: 'inline-block',
              width: '100%',
              backgroundSize: '33px',
              backgroundImage:'url(http://www.xiconeditor.com/image/icons/loading.gif)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right',
            }:
            { width: '100%', display: 'inline-block', float: 'left' }}
            >
            {
              this.props.state.data.list_bu &&

              this.props.state.data.list_bu[0].children.map((value,index)=> {
                return[
                <MenuItem 

                textStyle={{paddingLeft: '20px', paddingTop: '15px', fontWeight: '400'}} key={index} title={value.BU_NAME} 
                onClick={e => {
                  this.setState({bu:value.BU_ID, bu_name: value.BU_NAME })

                  e.preventDefault()
                }}>
                </MenuItem>,

                value.children !== null  &&
                value.children.map((value2,index) => {

                  return(
                    <MenuItem key={index} 
                    style={{paddingLeft:'35px', paddingTop:'10px', zIndex:'10'}} 
                    title={value2.BU_NAME} onClick={
                      e => {
                        this.setState({bu:value2.BU_ID, bu_name: value2.BU_NAME }, ()=> {
                          console.log('BU_NAME',value2.BU_NAME)
                        })

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

            <div className="unit one-quarter">
            <Select
            style={{ width: '60%',float:'left', display: 'inline-block',marginRight:'35px'}}
            onChange={
              e=> {
                this.setState({year:e.target.value})
              }
            }

            >
            <option value=''>choose year</option>
            {
              year.map((value,index)=> (
                <option name="" value={value.value}>{value.value}</option>
                ))
            }
            </Select>

            <button className="btn-primary"style={{ padding: '11px 14px',marginLeft:'5px'}} onClick={
              e=> {
                if((this.state.bu == null || this.state.bu ==  '') && (this.state.year == null || this.state.year == '')) {
                  showNotif('Choose business unit and year', "RED") 

                }
                else if(this.state.year == null || this.state.year == '') {
                  showNotif('Choose year', "RED") 
                }
                else if(this.state.bu == null ||  this.state.bu ==  '') {
                  showNotif('Choose business unit', "RED") 

                }
                else {
                  this.props.dispatch(rDirectorat(this.state.bu,this.state.year))

                }

                e.preventDefault()
              }
            }>
            <span className="material-icons" style={{ color: 'white' }} >search</span>
            </button>
            </div>
            </div>

            <div className="grid wrap">
            <div className="unit whole">
            <Divider text="OVERVIEW" />
            </div>
            </div>

            <div className="grid wrap">
            <div className="unit half">
            <div className="card" style={{ padding: '35px' }}>
            <Header text='Projects' style={{display:'inline-block'}} />
            <div className="grid wrap">
            <div className="unit golden-small">
            <Meter
            progress={state.data.project_dir ? state.data.project_dir.jumlah : null}
            text={state.data.project_dir ? state.data.project_dir.jumlah : null}

            />
            </div>
            <div className="unit golden-large">
            <div className="grid wrap">
            <div className="unit half">
            <medium className="project-value-label completed">Completed</medium>
            <large className="project-value-number completed">{ state.data.project_dir.completed }</large>

            <medium className="project-value-label not-started">Not Started</medium>
            <large className="project-value-number not-started">{ state.data.project_dir.not_started }</large>
            </div>
            <div className="unit half">
            <medium className="project-value-label in-progress"> In Progress</medium>
            <large className="project-value-number in-progress">{ state.data.project_dir.in_progress }</large>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>

            <div className="unit half">
            <div className="card" style={{ padding: '35px' }}>
            <Header text='Finance (IDR)' style={{display:'inline-block'}} />
            <div className="grid wrap">
            <div className="unit half">
            <medium className="project-value-label">Total Project Value</medium>
                {/*  
                  
                  <large className="project-value-number">{state.data.finance && (state.data.finance.total_project_value).replace(/,+|,(?=,+|$)/,'')} </large> 
                */}
                <large className="project-value-number">{state.data.finance.total_project_value} </large> 
            {/*   
            */} 
            <medium className="project-value-label">Invoiced</medium>
            <large className="project-value-number">-</large>
            </div>
            <div className="unit half">
            <medium className="project-value-label"> Revenue</medium>
            <large className="project-value-number">-</large>

            <medium className="project-value-label">Cashed Out</medium>
            <large className="project-value-number">-</large>
            </div>
            </div>
            </div>
            </div>
            </div>


            <div className="grid wrap">
            <div className="unit whole">
            <Divider text="RESOURCES" btnRightText="MORE" />
            </div>
            </div>

            <div className="grid wrap narrow">
            <div className="unit whole">
            <div className="card" style={{ padding: '35px' }}>

            <div className="grid">
            <div className="unit golden-small">
            <Header text='Timesheet' style={{display:'inline-block'}} />

            </div>
            <div className="unit golden-large">
            <div className="grid">
            <div className="unit four-fifths">
            <Select
            style={{ width: '48%', display: 'inline-block', float: 'right' }} 
            onChange={
              e=> {
                this.setState({year_timesheet:e.target.value})
              }
            }
            
            >
            <option value=''>choose year</option>
            {
              year.map((value,index)=> (
                <option name="" value={value.value}>{value.value}</option>
                ))
            }
            </Select>
            </div>
            <div className="unit one-fifth">
            <button className="btn-primary"style={{ padding: '11px 14px' }} ><span className="material-icons" style={{ color: 'white' } }onClick={
              e=> {
                if((this.state.bu == null || this.state.bu ==  '') && (this.state.year_timesheet == null || this.state.year_timesheet == '')) {
                  showNotif('Choose business unit and year', "RED") 

                }
                else if(this.state.year_timesheet == null || this.state.year_timesheet == '') {
                  showNotif('Choose year', "RED") 
                }
                else if(this.state.bu == null ||  this.state.bu ==  '') {
                  showNotif('Choose business unit', "RED") 

                }
                else {

                  this.props.dispatch(getDirectorateEntry(this.state.bu,this.state.year_timesheet))
                  this.props.dispatch(getDirectorateUtility(this.state.bu,this.state.year_timesheet))

                }

                e.preventDefault()
              }
            }>search</span></button>

            </div>
            </div>
            </div>
            </div>
            <div className="grid">
            <div className="unit one-third">
            
            <Meter
            progress={state.data.r_entry_bu && state.data.r_entry_bu.jml_entry * 0.01}
            text={Math.floor(state.data.r_entry_bu && state.data.r_entry_bu.jml_entry)}
            title="Entry"
            status={state.data.r_entry_bu && state.data.r_entry_bu.status}
            />
            </div>
            <div className="unit one-third">
            <Meter
            progress={state.data.r_util_bu && state.data.r_util_bu.jml_util * 0.01}
            text={Math.floor(state.data.r_util_bu && state.data.r_util_bu.jml_util)}
            title="Utilization"

            status={state.data.r_util_bu && state.data.r_util_bu.status_utilization}
            />
            </div>
            <div className="unit one-third" />
            </div>
            </div>
            </div>
            </div>

            <div className='grid wrap narrow'>
            <div className='unit whole'>
            <div className='card' style={{padding:'35px'}}>
            <div className='grid'>
            <div className='unit golden-small'>
            <large>Entry</large>

            </div>
            <div className='unit golden-large'>
            <div className='grid'>
            <div className='unit four-fifths'>


            </div>
            <div className='unit one-fifth'>


            </div>
            </div>
            </div>
            </div>
            <div className='grid'>
            <div className='unit whole'>
            { 
             entry &&
             <BarChart
             data={entry}/>
           }
           </div>
           </div>
           </div>
           </div>
           </div>
           <div className='grid wrap narrow'>
           <div className='unit whole'>
           <div className='card' style={{padding:'35px'}}>
           <div className='grid'>
           <div className='unit golden-small'>
           <large>Utilization</large>

           </div>
           <div className='unit golden-large'>

           </div>
           </div>
           <div className='grid'>
           <div className='unit whole'>
           { 
             utilization &&
             <BarChart
             data={utilization}/>
           }
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
export default connect(mapStateToProps)(ReportsDirectorate);
// export default Login
