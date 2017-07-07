import React from 'react'
import { connect } from 'react-redux'

export const Login = ({store}) => {
    return(
      <div className='card'>
        <div className='grid'>
          <div className='unit two-fifths no-gutters'>
            <div id='picture'></div>
          </div>
          <div className='unit three-fifths'>
            <div className='padding'>
              <h1>SIGN IN</h1>
              <form>
                <h2 className='input-desc'>USERNAME</h2>
                <input></input>
                <h2 className='input-desc'>PASSWORD</h2>
                <input></input>
                <button>SIGN IN</button>
              </form>

            </div>
          </div>
        </div>

      </div>
    )
}

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(Login)
// export default Login
