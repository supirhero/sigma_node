import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, TimeSheetTimeButton} from  './components.jsx'


class MyAssignments extends Component {
    render(){
      return(

        <div>
            <div className='grid wrap'>
              <div className='unit whole'>
                <Divider text='MY ASSIGNMENTS' btnLeftText='BACK' btnLeftClick={
                  e => {
                    browserHistory.goBack()
                    e.preventDefault()
                  }
                }/>
            </div>
          </div>
          {/* MAP THIS */}
          <div className='grid wrap'>
            <div className='unit whole'>
              <large>Business Unit&nbsp;:&nbsp;&nbsp; <a style={{fontSize:'20px'}}>IT Operation Services</a></large>
            </div>
          </div>
          <div className='grid wrap'>
            <div className='unit whole'>
              <div className='card'>
                <medium style={{marginBottom: '30px'}}>Project&nbsp;<a>IT Operation Services</a></medium>
                {/* MAP THIS */}
                <div>
                  <div className='grid' >
                    <div className='unit golden-large no-gutters'>
                      <small>Lorem ipsum dolor sit amet</small>
                    </div>
                    <div className='unit golden-small no-gutters'>
                      <small>June 1 2017 - June 8 2017</small>
                    </div>
                  </div>
                  <div className='grid'>
                    <div className='unit whole no-gutters'>
                      <div className='divider' style={{margin:'15px 0', borderColor:'#F6F6F6'}}></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='grid' >
                    <div className='unit golden-large no-gutters'>
                      <small>Lorem ipsum dolor sit amet</small>
                    </div>
                    <div className='unit golden-small no-gutters'>
                      <small>June 1 2017 - June 8 2017</small>
                    </div>
                  </div>
                  <div className='grid'>
                    <div className='unit whole no-gutters'>
                      <div className='divider' style={{margin:'15px 0', borderColor:'#F6F6F6'}}></div>
                    </div>
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
export default connect(mapStateToProps)(MyAssignments)
// export default Login
