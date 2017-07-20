import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'
import {Divider, Input} from './Components.jsx'






class MyPerformances extends Component {

    render(){
      return(
        <div>
          <div className='grid wrap'>
            <div className='unit whole'>
              <Divider btnLeftText='BACK' text='MY PERFORMANCES'/>
            </div>
          </div>
          <div className='grid wrap'>
            <div className='unit whole'>
              <div className='card'>
                <div className='grid'>
                  <div className='unit golden-small'>
                    <large>Timesheet</large>
                    <Input/>
                    <Input/>
                      
                  </div>
                  <div className='unit golden-large'>
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
    // filter: ownProps.location.query.filter
  }
}
export default connect(mapStateToProps)(MyPerformances)
// export default Login
