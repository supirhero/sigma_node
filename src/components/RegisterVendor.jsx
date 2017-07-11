import React, {Component} from 'react'

import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'

class RegisterVendor extends Component {
  render() {

    return(
      <form>
        <div className='grid'>
          <div className='unit half'>
            <h2 className='input-desc'>FULL NAME</h2>
            <input></input>
            <h2 className='input-desc'>USER ID</h2>
            <input></input>
            <h2 className='input-desc'>EMAIL SUPERVISOR SIGMA</h2>
            <input></input>
          </div>
          <div className='unit half'>
            <h2 className='input-desc'>FULL NAME</h2>
            <input></input>
            <h2 className='input-desc'>USER ID</h2>
            <input></input>
          </div>
        </div>
        <div className='grid'>
          <div className='unit whole'>
            <button className='btn-primary' type ='submit'>REGISTER</button>

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
export default connect(mapStateToProps)(RegisterVendor)
