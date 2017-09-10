import React, {Component} from 'react'
import {connect} from 'react-redux'
import { createStore } from 'redux'
import { Link, browserHistory } from 'react-router'


import { authenticated } from './Auth.jsx'
import Login from './Login.jsx'
import Auth from './Auth.jsx'
import { Confirmation } from './Components.jsx'
import { hideNotification } from './actions.jsx'

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
          <div className={this.props.state.alert && alert && alert.show == true ? 'alert-popup shadow active' : 'alert-popup shadow'}
          style={{backgroundColor: color}}
          >
          <div style={{position:'relative'}} >
          <div className="material-icons" style={{color:'white',position:'absolute', top:'-13px', right:'0px', width:'7px', height:'7px'}} onClick={e=> {
            this.props.dispatch(
              {
                type:'ALERT',
                show: false,
                message: ''
                
              }
            )
            e.preventDefault()
            }}>clear</div>
          <small>{alert && alert.message ? alert.message : '' }</small>

          </div>
        </div>
        }
        <Confirmation/>
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
