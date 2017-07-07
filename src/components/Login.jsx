import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'


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
              <form onSubmit={
                e => {
                  axios.post('http://45.77.45.126/dev/login/login', {
                    user_id: 'gina.nufus@sigma.co.id',
                    password: 'S201502162',
                    fpid : '160927084946'
                  })
                  .then(function (response) {
                    alert('work')
                    console.log(response);
                  })
                  .catch(function (error) {
                    alert('fail')

                    console.log(error);
                  });
                  e.preventDefault()

                }
              }>
                <h2 className='input-desc'>USERNAME</h2>
                <input></input>
                <h2 className='input-desc'>PASSWORD</h2>
                <input></input>
                <button type='submit'>SIGN IN</button>
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
