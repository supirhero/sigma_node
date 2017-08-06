import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header, Search, PopUp } from './Components.jsx';


class DatasetProjectType extends Component {
  render() {
    return (
      <div>
        <div className="grid dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
              <div className="table-wrap">

                <div className="unit one-quarter">
                  <Header text="Business Unit" style={{ display: 'inline-block' }} />
                </div>

                <div className="unit three-quarters">
                  <PopUp id="createBusinessUnit" dividerText="CREATE BUSINESS UNIT" btnText="ADD NEW" style={{ display: 'inline-block', marginLeft: '35px' }}>
                    <div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <Input inputName="NAME" />
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <Input inputName="CODE" />
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                           <Select
                        inputName="HEAD"
                        items={{
                          items: [
                              { title: 'TBWS21312' },
                              { title: 'TBWS21312' },
                          ],
                        }}
                      />
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                           <Select
                        inputName="PARENT"
                        items={{
                          items: [
                              { title: 'TBWS21312' },
                              { title: 'TBWS21312' },
                          ],
                        }}
                      />
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                          <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                          <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD NEW </button>
                        </div>
                      </div>
                    </div>
                  </PopUp>
                  <Search placeholder="search project type" style={{ float: 'right', width: '400px' }} />
                </div>
                <div className="unit whole">
                  <TableNew
                  tableHeader={[{value:'LEVEL'},{value:'NAME'},{value:'HEAD'},{value:'   '}]}
                  tableData={[{column:[
                    {value:'1'},
                    {value:'Telkomsigma'},
                    {value:' '},
                    {value:'  '}
                  ]},{column:[
                    {value:'2'},
                    {value:'Business Data Center and Managed Services'},
                    {value:'ANDREUW TH. A.F'},
                     {value:'  '}
                  ]},{column:[
                    {value:'3'},
                    {value:'Business System Integration'},
                    {value:'SYARIF ALI IDRUS'},
                     {value:'  '}
                  ]},{column:[
                    {value:'4'},
                    {value:'Solution Operation'},
                    {value:'ERA KAMALI NASUTION'},
                     {value:'  '}
                  ]},{column:[
                    {value:'5'},
                    {value:'Human Capital & Finance'},
                    {value:'BAKHTIAR ROSYIDI'},
                     {value:'  '}
                  ]},{column:[
                    {value:'6'},
                    {value:'Billing and Collection'},
                    {value:'ANDREUW TH. A.F'},
                     {value:'  '}
                  ]},{column:[
                    {value:'7'},
                    {value:'Financial Accounting'},
                    {value:'NUSIRWAN'},
                     {value:'  '}
                  ]},{column:[
                    {value:'8'},
                    {value:'Human Capital'},
                    {value:'IR. R. ADAM KAMIL KHUSNUN. M'},
                     {value:'  '}
                  ]},{column:[
                    {value:'9'},
                    {value:'Legal & Compliance'},
                    {value:'KURNIAWAN, SH'},
                     {value:'  '}
                  ]},
                  ]}>
                </TableNew>       
                
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

export default connect(mapStateToProps)(DatasetProjectType);
// export default Login
