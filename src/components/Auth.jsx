import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'


export function saveAuthentication(data) {
  if (typeof(Storage) !== "undefined") {
    localStorage.authentication = JSON.stringify(data)
  }
  else {
    var cookieStorage = require('cookie-storage').CookieStorage
    if (cookieStorage)
      cookieStorage.authentication = JSON.stringify(data)
    else
      console.log('No Web Storage support')
  }
}

export function loadAuthentication() {
  if (typeof(Storage) !== "undefined") {
    return localStorage.authentication ? JSON.parse(localStorage.authentication) : undefined
  }
  else {
    var cookieStorage = require('cookie-storage').CookieStorage
    if (cookieStorage)
      return cookieStorage.authentication ? JSON.parse(cookieStorage.authentication) : undefined
    else
      console.log('No Web Storage support')
    return cookieStorage
  }
}

function deleteAuthentication() {
  if (typeof(Storage) !== "undefined") {
    delete localStorage.authentication
  }
  else {
    var cookieStorage = require('cookie-storage').CookieStorage
    if (cookieStorage)
      delete cookieStorage.authentication
    else
      console.log('No Web Storage support')
  }
}

export function authenticated() {
  var authentication = loadAuthentication()
  if (authentication) {
    var hasAuthentication = authentication.token ? true : false
    return hasAuthentication
  } else {
    return false
  }
}

class Auth extends Component {
  componentWillMount() {
    browserHistory.push('/login')
  }
    render(){
      return(
        <div></div>
      )
    }
}


function mapStateToProps(state) {
  return {
    state
    // filter: ownProps.location.query.filter
  }
}
export default connect(mapStateToProps)(Auth)
