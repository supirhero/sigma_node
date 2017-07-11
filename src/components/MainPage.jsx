import React, {Component} from 'react'
import {connect} from 'react-redux'
import { createStore } from 'redux'
import { Link, browserHistory } from 'react-router'


import { authenticated } from './Auth.jsx'
import Login from './Login.jsx'
import Auth from './Auth.jsx'

import store from '../reducers/combineReducers.jsx'




class MainPage extends Component {
  componentWillMount() {
    console.log(store.getState());

    if (store.getState().store.isLoggedIn) {
      browserHistory.push('/dashboard')
    }
    else {
      browserHistory.push('/login')

    }
  }
  render() {

      return(
        <div>
              {this.props.children}
        </div>
      )
    }


}

function mapStateToProps(state) {
  return {
    auth : state.auth
  }
}
export default connect(mapStateToProps)(MainPage)
// export default MainPage
