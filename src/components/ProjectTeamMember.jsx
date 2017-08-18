import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, Header, ProjectHeader, Input, PageLoader} from  './Components.jsx'
import { getProjectTeamMember, pop } from './actions.jsx'



class ProjectTeamMember extends Component {
  componentDidMount() {
    const id = store.getState().page.id
    store.dispatch(getProjectTeamMember(id))
  }

    render(){
      const appStore = store.getState();
      const projectMember = appStore.data.project_member
      return(
        <div className='project-overview'>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName='Transaction Based Managed Services 2017' sectionName='TEAM MEMBER'/>
            </div>
          </div>
          <div className='grid padding-left'>
            <div className='unit four-fifths'>
              <Input inputName='ADD NEW TEAM MEMBER' placeholder='enter name or email address'>

              </Input>
            </div>
            <div className='unit one-fifth'>
              <button className='btn-primary' style ={{marginTop:'60px'}}>INVITE</button>
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
                projectMember ?
                projectMember.map((value, index) => (
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
