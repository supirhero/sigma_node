import React, {Component} from 'react'

import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'



class DashboardHome extends Component {
  render() {

    return(
      <div className='grid wrap'>
        <div className='unit whole'>
          <div>asdasd</div>
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
export default connect(mapStateToProps)(DashboardHome)
// export default Login
