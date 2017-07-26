import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, Header, ProjectHeader, Input} from  './Components.jsx'



class ProjectTeamMember extends Component {
    render(){
      return(
        <div className='project-overview'>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName='Transaction Based Managed Services 2017' sectionName='OVERVIEW'/>
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
              <div className='card' style={{padding:'15px'}}>
                <div className='grid'>
                  <div className='unit two-fifths no-gutters'>
                    <div className='pic-wrapper' style={{height:'35px', width:'35px', display:'inline-block'}}></div>
                    <div style={{display:'inline-block', marginLeft:'17px'}}>
                      <medium style={{fontSize:'15px'}}>Kara Gray</medium>
                      <small style={{fontSize:'15px'}}>Admin, Project Manager</small>
                    </div>
                  </div>
                  <div className='unit one-fifth no-gutters'>
                    <small style={{textAlign:'center', color:'#717171', marginTop:'7px'}}>Leader</small>
                  </div>
                  <div className='unit two-fifths no-gutters'>
                    <medium style={{textAlign:'right', marginTop:'9px'}}>ONLINE &nbsp;&nbsp;&nbsp;&nbsp;<span className='icon-trash' style={{color:'#D62431'}}></span></medium>
                  </div>

                </div>
              </div>
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
