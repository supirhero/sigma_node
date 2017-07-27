import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, BarChart, Divider, Meter,Table } from './Components.jsx';


class ReportsPeople extends Component {
  render() {
		
    return (
      <div>
        <div className="grid wrap">
          <div className="unit golden-large">
            <Select
              style={{ width: '100%', display: 'inline-block', float: 'left' }}
              items={{
                items: [
                { title: 'IT OPERATION SERVICES' },
                { title: 'CROSS-INDUSTRY APPLICATIONS SOLUTION' },
                ],
              }}
            />
          </div>
					<div className="unit golden-small">
					<Select
              style={{ width: '30%', display: 'inline-block', float: 'left', marginLeft: '33px' }}
              items={{
                items: [
              { title: 'Jun' },
              { title: 'Jul' },
                ],
              }}
            />
            <Select
              style={{ width: '30%', display: 'inline-block', float: 'left', marginLeft:'33px' }}
              items={{
                items: [
              { title: '2017' },
              { title: '2018' },
                ],
              }}
            />
            <button className="btn-primary"style={{ padding: '11px 14px', marginLeft: '20px', float:'right' }} >
              <span className="material-icons" style={{ color: 'white' }}>search</span>
            </button>
          </div>
				</div>    
				

				<div className="grid wrap">
          <div className="unit whole">
						<div className="card" style={{ padding: '35px' }}>
							<div className="grid wrap">
								<div className="unit half">
								<large>Timesheet Report</large>
								</div>
								<div className="unit half">
								<Input style={{width:'100%', display:'inline-block'}} placeholder="Search a name" />
							</div>
							</div>
							<div className="grid wrap">
								<div className="unit whole">
									<Table
									tableHeader={[
										{value:'Name'},
										{value:'Email'},
                    {value:'Entry'},
                    {value:'Entry Status'},
                    {value:'Utilization'},
                    {value:'Utilization Status'},
									]} 
									tableData = {[
										{
											name: 'Dwi Syifa',
											email: 'dwi.syifa@sigma.co.id',
                      entry:'10',
                      entryStatus:'NORMAL',
                      utilization:'20',
                      utilizationStatus:'NORMAL',

										},
										{
											name : 'Ivan Gita Pribadi',
											email: 'ivan.gita.pribadi@sigma.co.id',
                      entry:'100',
                      entryStatus:'NORMAL',
                      utilization:'20',
                      utilizationStatus:'NORMAL',
										},
										{
											name: 'Paula Cintya',
											email: 'paula.cintya@sigma.co.id',
                      entry:'80',
                      entryStatus:'NORMAL',
                      utilization:'150',
                      utilizationStatus:'NORMAL',
										},
										{
											name: 'Ivan Gita Pribadi',
											email: 'ivan.gita.pribadi@sigma.co.id',
                      entry:'100',
                      entryStatus:'NORMAL',
                      utilization:'20',
                      utilizationStatus:'NORMAL',
										},
										{
											name: 'Ivan Gita Pribadi',
											email: 'ivan.gita.pribadi@sigma.co.id',
                      entry:'100',
                      entryStatus:'NORMAL',
                      utilization:'20',
                      utilizationStatus:'NORMAL',
										},
									]}>
									</Table>
							
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
export default connect(mapStateToProps)(ReportsPeople);
// export default Login
