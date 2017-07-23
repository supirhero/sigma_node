import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select , Input, BarChart } from './Components.jsx';


class ReportsOverview extends Component {
  render() {
    return (
      <div>
        <div className="grid wrap wider reports">
          <div className="unit whole">
            <div className="card" style={{ padding: '35px' }}>
              <div className="grid wrap">
                <div className="unit half">
                  <large>Monthly Performance</large>
                  <span className="fa fa-bar-chart fa-2x material-icons" style={{ marginLeft: '64px' }} />
                  <span className="fa fa-table fa-2x material-icons" style={{ marginLeft: '30px' }} />
                </div>
                <div className="unit half">
                  <div className="grid">
                    <div className="unit four-fifths">
                      <Select 
                        style={{ width: '48%', display: 'inline-block' }}  
                        items={{
                        items : [
                          {title : 'JANUARY'},
                          {title : 'FEBRUARY'}
                        ]
                      }}
                      />
                      <Select 
                        style={{ width: '48%', display: 'inline-block', float: 'right' }} 
                        items={{
                        items : [
                          {title : '2017'},
                          {title : '2018'}
                        ]
                      }}/>
                    </div>
                    <div className="unit one-fifth">
                      <button className="btn-primary"style={{ padding: '11px 14px' }} ><span className="material-icons" style={{ color: 'white' }}>search</span></button>
                    </div>
                  </div>

                </div>
              </div>
              <div className="grid wrap narrow">
                <div className="unit whole">
                  <BarChart
                    label="SPI Graph"
                    data={[
                        { name: 'BSD', value: 20 },
                        { name: 'CEM', value: 10 },
                        { name: 'CISD', value: 14 },
                        { name: 'DCES', value: 32 },
                        { name: 'FSD', value: 16 },
                        { name: 'GT', value: 4 },
                        { name: 'ITPBS', value: 7 },
                        { name: 'NITSM', value: 9 },
                        { name: 'SMS', value: 12 },
                        { name: 'SSI', value: 40 },
                        { name: 'SP', value: 54 },
												{ name: 'TDMO', value: 20 },
												{ name: 'TBSDMO', value: 23 },
                    ]}
                    
                  />
                </div>
              </div>
              <div className="grid wrap narrow" style={{marginTop:'55px'}}>
                <div className="unit whole">
                  <BarChart
                    label="CPI Graph"
                    data={[
                        { name: 'BSD', value: 20 },
                        { name: 'CEM', value: 10 },
                        { name: 'CISD', value: 14 },
                        { name: 'DCES', value: 32 },
                        { name: 'FSD', value: 16 },
                        { name: 'GT', value: 4 },
                        { name: 'ITPBS', value: 7 },
                        { name: 'NITSM', value: 9 },
                        { name: 'SMS', value: 12 },
                        { name: 'SSI', value: 40 },
                        { name: 'SP', value: 54 },
												{ name: 'TDMO', value: 20 },
												{ name: 'TBSDMO', value: 23 },
                    ]}
                    style={{marginTop:'50px'}}
                  />

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
export default connect(mapStateToProps)(ReportsOverview);
// export default Login
