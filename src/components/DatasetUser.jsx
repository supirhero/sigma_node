import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteAuthentication } from './actions.jsx';
import store from '../reducers/combineReducers.jsx';
import { Select, Input, Table,TableNew,Header,Search } from './Components.jsx';


class DatasetUser extends Component {
  render() {
    return (
      <div>
        <div className="grid wrap dataset">
          <div className="unit whole">
            <div className="card" style={{ padding: '15px 35px' }}>
              <div className="unit whole">
                <Header text='User' style={{display:'inline-block'}} />
                <Search placeholder='search user' style={{float:'right',width:'400px'}} />
              </div>
              <div className="unit whole">
                <TableNew
                  tableHeader={[{value:'NO'},{value:'ID'},{value:'NAME'},{value:'EMAIL'},{value:'LAST LOGIN'}]}
                  tableData={[{column:[
                    {value:'1'},
                    {value:'4100001'},
                    {value:'Joshua Howard'},
                    {value:'huel_cora@hotmail.com'},
                    {value:'08 APR 2017'},
                  ]},{
                    column:[
                    {value:'2'},
                    {value:'4100002'},
                    {value:'Luella Perry'},
                    {value:'maya_kutch@hotmail.com'},
                    {value:'09 MAY 2017'}
                    ]},{
                    column:[
                    {value:'3'},
                    {value:'4100002'},
                    {value:'Genevieve Wells '},
                    {value:'maya_kutch@hotmail.com'},
                    {value:'09 MAY 2017'}
                    ]},{
                    column:[
                    {value:'4'},
                    {value:'4100002'},
                    {value:'Eugene Chandler'},
                    {value:'maya_kutch@hotmail.com'},
                    {value:'09 MAY 2017'}
                    ]},{
                    column:[
                    {value:'5'},
                    {value:'4100002'},
                    {value:'Adele Canon'},
                    {value:'maya_kutch@hotmail.com'},
                    {value:'09 MAY 2017'}
                    ]},{
                    column:[
                    {value:'6'},
                    {value:'4100002'},
                    {value:'Maud Berry'},
                    {value:'maya_kutch@hotmail.com'},
                    {value:'09 MAY 2017'}
                    ]},{
                    column:[
                    {value:'7'},
                    {value:'4100002'},
                    {value:'Grace Perez'},
                    {value:'maya_kutch@hotmail.com'},
                    {value:'09 MAY 2017'}
                    ]}
                  ]}>
                </TableNew>                            
              </div>
              <div className="unit whole" style={{float:'right'}}>
                  <button className="arrow"> <b>></b> </button>
                  <button className="pagination"><b>1</b></button>
                  <button className="arrow"> <b>></b> </button>
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
export default connect(mapStateToProps)(DatasetUser);
// export default Login