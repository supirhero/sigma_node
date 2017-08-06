import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';


class ManageRolesAccess extends Component {
	render() {
			const header = [
			{name:'Roles', path:'/manage'},
			{name:'Access', path:'/manage/access'},
		]
    return (
      <div className="dataset">
				<div className="grid wrap dataset">	
					<div className="unit whole">
						<large> MANAGE ROLE & ACCESS </large>
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

export default ManageRolesAccess;