import React, {Component} from 'react'

import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {Input} from './Components.jsx'

class RegisterSigma extends Component {
  render() {

    return(
      <form>
        <div className='grid'>
          <div className='unit half'>
            <Input inputName="NIK" />
            <Input inputName="FULL NAME" />          
          </div>
          <div className='unit half'>
            <Input inputName="EMAIL ADDRESS" />
            <Input inputName="PASSWORD" />              
          </div>
        </div>
        <div className='grid'>
          <div className='unit whole'>
            <button className='btn-primary' type ='submit' style={{display:'inline-block'}}>REGISTER</button>
            <medium>Or back to <a onClick={()=> {
                  browserHistory.replace('/auth')
                }}>Login Page</a> </medium>
          </div>

        </div>
      </form>

  )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(RegisterSigma)
