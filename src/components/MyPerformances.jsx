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
              <div className='card' style={{padding:'40px'}}>
                <div className='grid'>
                  <div className='unit golden-small'>
                    <large>Timesheet</large>

                  </div>
                  <div className='unit golden-large'>
                    <Input style={{width:'48%', display:'inline-block'}}/>
                    <Input style={{width:'48%', display:'inline-block', float:'right'}}/>
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
