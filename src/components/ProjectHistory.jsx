import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'

import {Divider, Header,Table, ProjectHeader, Input,TablePaginationHistory,PopUp,handleSubmit,Field,ReduxInputDisabled, PageLoader} from  './Components.jsx'
import { gethistory} from './actions.jsx'
import ReactAutocomplete from 'react-autocomplete'



class ProjectHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      label: '',
      id:''
    }
  }

  componentDidMount() {
    const id = this.props.state.page.id
    // store.dispatch(getProjectTeamMember(id))
    store.dispatch(gethistory(id))
  }

    render(){
      const appStore = this.props.state;
     // const active_member = this.props.state.data.exist
      //const history_list = this.props.state.data.summary ? this.props.state.data.summary.map((value,index)=>{
       //return {id:value.USER_ID , label:value.USER_NAME}
     // }) : []
      return(
        <div className='project-overview'>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName='Transaction Based Managed Services 2017' sectionName='HISTORY'/>
            </div>
          </div>
          
          <div className='grid padding-left'>
            <div className='unit whole'>
              <Divider text='HISTORY'/>
            </div>
          </div>

          <div className='grid padding-left'>
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
              <div className="table-wrap">
              <PopUp id="history" dividerText="TRACKING HISTORY" btnText="ADD NEW" btnClass='btn-primary' style={{ display: 'inline-block', marginLeft: '35px' }}>
      <p>testingg</p>
      </PopUp>
            <TablePaginationHistory
                editPopUp='history'
                tableHeader={[{value:'TASK'},{value:'PROGRESS'},{value:'LAST UPDATE'},{value:'NOTE'},{value:'UPLOADED BY'},{value: null}]}
                tableData={ store.getState().data.summary ? store.getState().data.summary.map((value,index)=>{
                  return {column:[
                    {value:value.WBS_NAME},
                    {value:value.WORK_PERCENT_COMPLETE},
                    {value:value.DATE_CAP},
                    {value:value.DESCRIPTION},
                    {value:value.LAST_UPDATE_BY},
                    
                  ]}
                }):null}>
              </TablePaginationHistory> 
          </div></div></div></div>


        </div>

      )
    }

}

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(ProjectHistory)
