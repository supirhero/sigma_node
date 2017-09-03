import React, {Component} from 'react'
import {connect} from 'react-redux'
import { createStore } from 'redux'
import { Link, browserHistory } from 'react-router'


import { authenticated } from './Auth.jsx'
import Login from './Login.jsx'
import Auth from './Auth.jsx'

import store from '../reducers/combineReducers.jsx'
import Dashboard from './Dashboard.jsx'





class MainPage extends Component {
  componentDidMount() {
    // console.log(store.getState());
  }

  render() {
    const alert = this.props.state.alert.alert
    
    const color = alert ? alert.color == 'RED' ? '#e7666a' : alert.color == "GREEN" ? '#67e766' : alert.color == 'YELLOW' ? '#e7d866' : '#efefee' : '#efefee'
    
    return(
      <div>
        {
          <div className={alert && alert.show == true ? 'alert-popup shadow active' : 'alert-popup shadow'}
          style={{backgroundColor: color }}
          >
          <small>{alert && alert.message ? alert.message : '' }</small>
        </div>
        }
      {
        this.props.children
      }

      </div>
    )
}


}

function mapStateToProps(state) {
  return {
    // auth : state.auth
    state
  }
}
export default connect(mapStateToProps)(MainPage)
// export default MainPage
