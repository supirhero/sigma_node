import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, Header, ProjectHeader,PopUp,Input,Select} from  './Components.jsx'



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
              <PopUp id='createTask' dividerText='CREATE TASK' btnText='CREATE TASK' btnClass="btn-primary" btnStyle={{width:'200px', float:'right'}}>
                    <div>
                      <div className="grid wrap ">
                        <div className="unit whole">
                          <Input inputName='NAME' />
                        </div>
                      </div>
                      <div className='grid wrap '>
                        <div className='unit whole'>
                          <Select inputName='PARENT' items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }} />
                        </div>
                      </div>
                      <div className="grid wrap ">
                        <div className="unit half">
                          <Select inputName='START DATE' style={{width:'96%'}} items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }} />
                        </div>
                        <div className="unit half">
                          <Select inputName='END DATE' style={{width:'96%'}} items={{
                            items : [
                              {title : 'TBWS21312'},
                              {title : 'TBWS21312'}
                            ]
                          }} />
                        </div>
                      </div>

                      <div className="grid wrap">
                        <div className='unit whole' style={{textAlign:'center',marginTop:'40px'}}>
                          <button style={{ display:'inline-block', width:'200px'}} className='btn-secondary'> CANCEL </button>
                          <button style={{ display:'inline-block',width:'200px',marginLeft:'40px'}} className='btn-primary'> ADD </button>
                        </div>
                      </div>


                    </div>
                  </PopUp>

            </div>
            <div className='unit one-third no-gutters'>
              <button className='btn-secondary' style={{width:'200px', display:'block', margin:'auto'}} >RE-BASELINE</button>

            </div>
            <div className='unit one-third no-gutters'>
              <PopUp id='createTask' dividerText='UPLOAD WORKPLAN' btnText='UPLOAD' btnClass="btn-secondary" btnStyle={{width:'200px', float:'left'}}>
                  <div>
                    <small>You can upload your project workplan to generate task automatically on PRouDs. Please download the project workplan template <a>here</a></small>
                    <Input inputName="SELECT FILE" inputDesc="max file size is 5 MB allowed file: .zip, .doc, .docs, .docx, .xls, .pdf, .xlsx, .jpg, .jpeg, .png"></Input>
                  </div>
                      <div className='btn-wrapper'>
                        <button className='btn-secondary' style={{float:'left', display:'inline-block'}}>CANCEL</button>
                        <button className='btn-primary'style={{float:'right', display:'inline-block'}}>UPLOAD</button>

                      </div>

                </PopUp>
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
