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
              <PopUp id='createTask' dividerText='CREATE TASK' btnText='CREATE TASK' classBtn="btn-primary" style={{width:'200px', float:'right'}}>
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
              <button className='btn-secondary' style={{width:'200px', margin:'auto'}} >RE-BASELINE</button>
            </div>
            <div className='unit one-third no-gutters'>
              <button className='btn-secondary' style={{width:'200px', margin:'left'}} >UPLOAD </button>
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
