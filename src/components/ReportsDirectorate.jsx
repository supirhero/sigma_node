import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, BarChart, Divider } from './Components.jsx';


class ReportsDirectorate extends Component {
  render() {
    return (
			<div>
				<div className="grid wrap">
					<div className="unit golden-large">
						<Select 
              style={{ width: '100%', display: 'inline-block', float: 'left' }} 
              items={{
                items : [
                {title : 'DIRECTORATE'},
                {title : 'BUSINESS UNIT'}
                ]
							}}/>
					</div>
					<div className="unit golden-small">
						<Select 
              style={{ width: '50%', display: 'inline-block', float: 'left',marginLeft:'33%' }} 
              items={{
              items : [
              {title : '2017'},
              {title : '2018'}
                ]
							}}/>
						<button className="btn-primary"style={{ padding: '11px 14px',marginLeft:'20px' }} >
						<span className="material-icons" style={{ color: 'white' }}>search</span>
						</button>
						</div>
				</div>

				<div className="grid wrap">
					<div className="unit whole">
						<Divider  text='OVERVIEW' />
					</div>
				</div>





			</div> 
    );
  }
}

function mapStateToProps(state) {
  return {
    // filter: ownProps.location.query.filter
  };
}
export default connect(mapStateToProps)(ReportsDirectorate);
// export default Login
