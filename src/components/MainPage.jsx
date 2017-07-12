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
            if (store.getState().data.isloggedin) {
              return(
                <Dashboard>
                  {this.props.children}
                </Dashboard>
              )
            }
            else {
              return(
                <Auth>
                  {this.props.children}

                </Auth>
              )

            }
          }
    }


}

function mapStateToProps(state) {
  return {
    auth : state.auth
  }
}
export default connect(mapStateToProps)(MainPage)
// export default MainPage
