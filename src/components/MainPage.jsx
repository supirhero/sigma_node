import React, {Component} from 'react'
import {connect} from 'react-redux'
import { createStore } from 'redux'

import { authenticated } from './Auth.jsx'
import Login from './Login.jsx'
import {allReducers} from '../reducers/combineReducers.jsx'

const Store = createStore(allReducers)



class MainPage extends Component {
  render() {
    if (authenticated()) {
      return(
        <div>dsfsd</div>
      )
    }
    else {
      return(
        <div  className="grid wrap">
          <Login></Login>

        </div>
      )
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
