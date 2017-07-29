import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, Header, ProjectHeader, Input, PopUp, InputFile} from  './Components.jsx'



class ProjectDocsAndFiles extends Component {
    render(){
      return(
        <div className='project-DocsFiles'>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName='Transaction Based Managed Services 2017' sectionName='DOCS & FILES'/>
            </div>
          </div>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <PopUp id="uploadFile" dividerText="UPLOAD FILE" btnText="UPLOAD FILE" style={{ margin: 'auto'}}>
              <div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Input inputName="FILE DESCRIPTION" placeholder="max 160 characters" />
                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <h2 className="input-desc">SELECT FILE</h2>
                    <h2 className="input-desc" style={{margin:'0'}}><i>max file size is 5 MB. allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png</i></h2>
                  </div>
                  <div className="unit whole no-gutters">        
                   <InputFile name="selectFile" />
                  </div>
                </div>
                  <div className="grid wrap narrow">
                    <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                      <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                      <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> UPLOAD </button>
                    </div>
                  </div>
                
              </div>
            </PopUp>
            </div>
          </div>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <Divider text='DOCS & FILES'/>
            </div>
          </div>

          <div className='grid padding-left'>
            <div className='unit whole'>
              <div className='card' style={{padding:'15px'}}>
                <div className='grid'>
                  <div className='unit four-fifths'>
                    <a style={{ display:'inline'}}>Project Timeline.xls</a>
                    <small style={{color:'#717171', display:'inline'}}>&nbsp;uploaded by Kara Gray at June 2, 13:23</small>
                  </div>
                  <div className='unit one-fifth'>
                    <medium style={{textAlign:'right'}}><span className='icon-trash' style={{color:'#D62431'}}></span></medium>
                  </div>
                </div>
                <div className='grid'>
                  <div className='unit whole'>
                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."</small>
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
export default connect(mapStateToProps)(ProjectDocsAndFiles)
// export default Login
