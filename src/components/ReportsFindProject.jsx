import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select,Search, Input, BarChart, Divider, Meter,TableExample } from './Components.jsx';


class ReportsFindProject extends Component {
  render() {
    return (
			<div>
			 
				<div className="grid wrap">
					<div className="unit one-quarter">
						<div className="card" style={{ padding: '35px' }}>
							<medium>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quos reiciendis a qui assumenda ratione, quas veritatis possimus ex. Error, necessitatibus vero non! Dicta consequatur nulla adipisci eaque magnam, possimus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae suscipit, vitae non facilis totam alias unde a dolor! Modi dolorum nemo alias laborum, quaerat facilis tenetur libero. Cumque vero, neque!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti dolor hic eius repellat amet tempora, odit voluptas sint vel quia possimus aperiam earum minus modi pariatur, ipsam ratione, laboriosam at.</medium>
						</div>
					</div>
					<div className="unit three-quarters">
						<div className="grid wrap">
							<div className="unit whole">
								<Search placeholder='enter project / business unit / project manager / etc name'
									style={{width:'100%', margin:'0'}}
								/>
							</div>
						</div>
						
						{/* MAP THIS */}
						<div className="card" style={{ padding: '20px 35px' }}>
							<div className="grid">
								<div className="unit golden-large">
									<medium>Transaction Based Managed Services 2017</medium>
								</div>
								<div className="unit golden-small">
									<medium style={{float:'right'}}><b>IN PROGRESS (30%)</b></medium>									
								</div>
							</div>							
						</div>
						<div className="card" style={{padding:'10px 35px',margin:'0'}}>
							<div className="unit half">
							 <medium>Customer</medium>
								<medium>PT ABC DEF</medium>
							</div>
							<div className="unit half">
								<div style={{float:'right'}}>								
								<medium style={{float:'right'}}>Value</medium>
								<medium>200.000.000</medium>
								</div>
							</div>
						</div>
						<div className="card" style={{padding:'10px 35px',margin:'0'}}>
							<div className="unit one-third">
							 <medium>Project Manager</medium>
								<medium>Tofan Sofiansah</medium>
							</div>
							<div className="unit two-thirds">
								<div style={{float:'left',marginLeft:'50px'}}>								
									<medium >Schedule Status</medium>
									<medium style={{float:'right'}}>ON SCHEDULE</medium>
								</div>
								<div style={{float:'right'}}>								
									<medium>Budget Status</medium>
									<medium  style={{float:'right'}}>ON BUDGET</medium>
								</div>
							</div>
						</div>
						<div className="card" style={{padding:'10px 35px'}}>
							<div className="unit three-fifths">
								<div className="unit one-third" style={{display:'inline-block'}}>
									<medium className="status">EV</medium> <span className="fa fa-question-circle-o"></span>
									<medium>13346.05</medium>
								</div> 
								 <div className="unit one-third" style={{display:'inline-block'}}>
									<medium className="status">PV</medium> <span className="fa fa-question-circle-o"></span>
									<medium>12717.19</medium>
								</div>
								<div className="unit one-third" style={{display:'inline-block'}}>
									<medium className="status">AC</medium> <span className="fa fa-question-circle-o"></span>
									<medium>12681.02</medium>
								</div>
							</div>
							<div className="unit two-fifths">
								<div className="unit half" style={{display:'inline-block'}}>
									<medium className="status">SPI</medium> <span className="fa fa-question-circle-o"></span>
									<medium>1.05</medium>
								</div>
								<div className="unit half" >
									<medium className="status">CPI</medium> <span className="fa fa-question-circle-o"></span>
									<medium style={{display:'block'}}>1.05</medium>
								</div>
							</div>
						</div>
					<div className="grid wrap">
						<div className="unit whole">
						
						<div className="card" style={{ padding: '20px 35px' }}>
							<div className="grid">
								<div className="unit golden-large">
									<medium>DRC ACTIVITY 2017</medium>
								</div>
								<div className="unit golden-small">
									<medium style={{float:'right'}}><b>DUE IN 3 DAYS (80%)</b></medium>
								</div>
							</div>							
						</div>
						</div>
					</div>
						<div className="grid wrap">
							<div className="unit whole">
								<div className="card" style={{ padding: '20px 35px' }}>
									<div className="grid">
										<div className="unit golden-large">
											<medium>DATA CENTER BTIP - MAKASSAR 2017</medium>
										</div>
										<div className="unit golden-small">
											<medium style={{float:'right'}}><b>COMPLETED (100%)</b></medium>
										</div>
									</div>							
								</div>							
							</div>
						</div>


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
export default connect(mapStateToProps)(ReportsFindProject);
// export default Login
