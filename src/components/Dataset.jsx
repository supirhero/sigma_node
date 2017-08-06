import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';

class Dataset extends Component {
  render() {
		const header = [
			{name:'User', path:'/dataset'},
			{name:'Customer', path:'/dataset/customer'},
			{name:'Partner', path:'/dataset/partner'},
			{name:'Holiday', path:'/dataset/holiday'},
			{name:'Project Type', path:'/dataset/project-type'},
			{name:'BU', path:'/dataset/bu'},
		]

    return (
      <div className="dataset">
				<div className="grid wrap dataset">	
					<div className="unit whole">
						<large> DATASET </large>
						<div style={{ marginTop: '20px' }}>						
              {
								header.map((value,index)=>{
									return(									
									<medium 
										key={index} 
										style={{ display: 'inline-block' }}
										className="heading" 
										onClick={
											(e) => {
											browserHistory.replace(value.path);
											}}>																	
										{value.name}
									</medium>
									)
								})
							}
												
            </div>
					</div>				
				</div>

				<div className="grid wrap dataset">
          <div className="unit whole">
            {this.props.children}
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
export default connect(mapStateToProps)(Dataset);
// export default Login
