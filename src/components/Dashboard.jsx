import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'


class Dashboard extends Component {
    render(){
      return(
            <div className='grid'>
              <div className='unit whole no-gutters'>
                <div className='navbar'>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <a>HOME</a>
                      <a>REPORTS</a>
                    </div>
                  </div>

                </div>
                {this.props.children}
              </div>


            </div>
      )
    }

}

function mapStateToProps(state) {
  return {
    // filter: ownProps.location.query.filter
  }
}
export default connect(mapStateToProps)(Dashboard)
// export default Login
