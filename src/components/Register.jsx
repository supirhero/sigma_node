import React, {Component} from 'react'

import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'



class Register extends Component {
  render() {

    return(
      <div className='grid wrap'>
        <div className='unit whole'>
          <div className='card shadow'>
          <div className='padding'>
            <div className='grid'>
              <div className='unit half'>
                <h1>CREATE NEW ACCOUNT</h1>

              </div>
              <div className='unit half'>
                <div className='switch-wrapper'>
                  <button  onClick={
                    e => {
                      browserHistory.push('/register/sigma')
                    }
                  }>SIGMA</button>
                  <button onClick={
                    e => {
                      browserHistory.push('/register/vendor')
                    }
                  }>VENDOR</button>


                </div>
              </div>

            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    </div>


  )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(Register)
// export default Login
