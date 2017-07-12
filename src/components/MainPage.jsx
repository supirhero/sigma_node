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
    console.log(store.getState());
    

  }

  render() {

          {
            return this.props.children
          }
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
