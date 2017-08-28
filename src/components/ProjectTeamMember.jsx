import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, Header, ProjectHeader, Input, PageLoader} from  './Components.jsx'
import { getProjectTeamMember, getAvailableProjectTeamMember ,assignProjectTeamMember,pop } from './actions.jsx'
import ReactAutocomplete from 'react-autocomplete'


class ProjectTeamMember extends Component {
  constructor (props) {
    super(props)
    this.state = {
      label: '',
      id:''
    }
  }

  componentDidMount() {
    const id = store.getState().page.id
    // store.dispatch(getProjectTeamMember(id))
    store.dispatch(getAvailableProjectTeamMember(id))
  }

    render(){
      const appStore = store.getState();
      const active_member = store.getState().data.project_team
      const available_assign = store.getState().data.data ? store.getState().data.data.map((value,index)=>{
       return {id:value.USER_ID , label:value.USER_NAME}
      }) : null
      return(
        <div className='project-overview'>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName='Transaction Based Managed Services 2017' sectionName='TEAM MEMBER'/>
            </div>
          </div>
          <div className='grid padding-left'>
            <div className='unit four-fifths'>

            <ReactAutocomplete
            menuStyle={{
              opacity:'1'

            }}
            getItemValue={(label) => label.label}
            style={{width:'500px',marginTop:'60px'}}
            items={available_assign}
            wrapperProps={{width:'899px'}}
            menuStyle={{
              borderRadius: '3px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 5)',
              padding: '2px 0',
              fontSize: '90%',
              position: 'fixed',
              overflow: 'auto',
              maxHeight: '50%',
              cursor:'pointer',
              display:'block'
            }}
            shouldItemRender={(label, value) => label.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            // shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={item => item.id}
            renderItem={(item, highlighted) =>
              <small key={item.id}>{item.label}</small>  
            }
            value={this.state.value}
            onChange={e => {
              this.setState({ value: e.target.value })
           
          }}
            onSelect={(id,label) => {
              this.setState({ id:id})
              this.setState({label:label})
              // alert(`selected ${this.state.label}`)
              console.log(id)
          }}
          />

       
            </div>
            <div className='unit one-fifth'>
              <button className='btn-primary' style ={{marginTop:'60px'}}
                onClick=
                {
                  e => {
                    store.dispatch(assignProjectTeamMember(store.getState().page.id,this.state.id))
                    store.dispatch(getAvailableProjectTeamMember(id)) 
                  }
                }
              >INVITE</button>
            </div>
          </div>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <Divider text='ACTIVE MEMBERS'/>
            </div>
          </div>

          <div className='grid padding-left'>
            <div className='unit whole'>
              {
                active_member ?
                active_member.map((value, index) => (
                  <div className='card' style={{padding:'15px'}} key={index}>
                    <div className='grid'>
                      <div className='unit three-fifths no-gutters'>
                        <div className='pic-wrapper' style={{height:'35px', width:'35px', display:'inline-block'}}></div>
                        <div style={{display:'inline-block', marginLeft:'17px'}}>
                          <medium style={{fontSize:'15px'}}>{value.user_name}</medium>
                          <small style={{fontSize:'15px'}}>{value.email}</small>
                        </div>
                      </div>
                      <div className='unit one-fifth no-gutters'>
                        <small style={{textAlign:'center', color:'#717171', marginTop:'7px'}}>{value.prof_name}</small>
                      </div>
                      <div className='unit one-fifth no-gutters'>
                        <medium style={{textAlign:'right', marginTop:'9px'}}>ONLINE &nbsp;&nbsp;&nbsp;&nbsp;<span className='icon-trash' style={{color:'#D62431'}}></span></medium>
                      </div>
                    </div>
                  </div>

                )):

                <PageLoader></PageLoader>
              }

            </div>
          </div>


        </div>

      )
    }

}

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(ProjectTeamMember)
// export default Login
