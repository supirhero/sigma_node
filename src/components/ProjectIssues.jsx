import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, Header, ProjectHeader,PopUp,Input,Select,InputFile} from  './Components.jsx'



class ProjectIssues extends Component {
    render(){
      return(
        <div className='project-DocsFiles'>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName='Transaction Based Managed Services 2017' sectionName='Issues'/>
            </div>
          </div>
          <div className='grid padding-left'>
              <PopUp id="issue" dividerText="REPORT AN ISSUE" btnText="REPORT AN ISSUE" style={{ margin: '0 auto' }}>
              <div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Input inputName="SUBJECT" />
                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Input inputName="MESSAGE" />
                  </div>
                </div>

                <div className="grid wrap narrow">
                  <div className="unit golden-small">
                    <Select
                      inputName="PRIORITY"
                      items={{
                        items: [
                          { title: 'small' },
                          { title: 'medium' },
                        ],
                      }}
                    />
                  </div>
                  <div className="unit golden-large">
                     <h2 className='input-desc'>SUPPORTING DOCUMENT</h2>
                  </div>
                  <div className="unit golden-large" style={{paddingTop:'0',paddingRight:'0'}}>
                      <InputFile placeholder="choose a file" />
                  </div>
                  <div className="grid wrap narrow">
                    <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                      <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                      <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD </button>
                    </div>
                  </div>
                </div>
              </div>
            </PopUp>

            
          </div>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <Divider text='Issues'/>
            </div>
          </div>

          <div className='grid padding-left'>
            <div className='unit whole'>
              <div className='card' style={{padding:'15px'}}>
                <div className='grid'>
                  <div className='unit four-fifths'>
                    <a style={{ display:'inline'}}>ISSUES #1</a>
                    <small style={{color:'#717171', display:'inline'}}>&nbsp;&nbsp;uploaded by Kara Gray at June 2, 13:23</small>
                  </div>
                  <div className='unit one-fifth'>
                    <medium style={{textAlign:'right'}}><span className='icon-options'></span></medium>
                  </div>
                </div>
                <div className='grid'>
                  <div className='unit whole'>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."</small>
                  </div>
                </div>
                <div className='grid'>
                  <div className='unit half'>
                    <medium>PRIORITY: MEDIUM</medium>
                  </div>
                  <div className='unit half'>
                    <medium style={{textAlign:'right'}}>NOT RESOLVED</medium>

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
export default connect(mapStateToProps)(ProjectIssues)
// export default Login
