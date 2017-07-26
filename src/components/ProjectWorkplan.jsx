import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, Header, ProjectHeader} from  './Components.jsx'



class ProjectWorkplan extends Component {
    render(){
      return(
        <div className='project-workplan'>
          <div className='grid wrap'>
            <div className='unit whole'>
              <Divider text='WORKPLAN' btnLeftText='BACK' btnLeftClick={
                e=> {
                  browserHistory.goBack()
                  e.preventDefault()
                }
              }></Divider>
            </div>
          </div>
          <div className='grid wrap narrow'>
            <div className='unit one-third no-gutters'>
              <button className='btn-primary' style={{width:'200px', float:'right'}} >CREATE TASK</button>
            </div>
            <div className='unit one-third no-gutters'>
              <button className='btn-secondary' style={{width:'200px', margin:'auto'}} >RE-BASELINE</button>
            </div>
            <div className='unit one-third no-gutters'>
              <button className='btn-secondary' style={{width:'200px', float:'left'}} >UPLOAD</button>
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
export default connect(mapStateToProps)(ProjectWorkplan)
// export default Login
