import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, Header, ProjectHeader, LineChart ,TableNew} from  './Components.jsx'



class ProjectSCurve extends Component {
    render(){
      return(
        <div className='project-DocsFiles'>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName='Transaction Based Managed Services 2017' sectionName='S Curve'/>
            </div>
          </div>

          <div className="grid padding-left">
            <div className="unit whole">
              <div className='card' style={{padding:'15px'}}>
                <div className="unit whole">
                    <LineChart
                    data={[
                        { name: 'W2', Target: 0.10, Actual: 0.10  },
                        { name: 'W4', Target: 0.23, Actual: 0.23  },
                        { name: 'W6', Target: 0.35, Actual: 0.35  },
                        { name: 'W8', Target: 0.46, Actual: 0.46  },
                        { name: 'W10', Target: 0.57, Actual: 0.57  },
                        { name: 'W12', Target: 0.66, Actual: 0.60  },
                        { name: 'W14', Target: 0.78, Actual: 0.67  },
                        { name: 'W16', Target: 0.85, Actual: 0.75  },
                        { name: 'W18', Target: 0.90},
                        { name: 'W20', Target: 0.94},
                        { name: 'W22', Target: 0.97},
										]}
										lines={[{key:'Target', stroke:'#65bdf4'},
														{key:'Actual', stroke:'#cf000f'}
													]}
                    style={{marginTop:'50px'}}
                  />
                </div>
                <div className="unit whole">
                 <TableNew
                 tableHeader={[  { value: 'Time Period' },

                          { value: 'PV' },
                          { value: 'AV' }
                        ]}
                        tableData={[
                          {   column : [
                              {value : 'WEEK 1 (APRIL 1 2017 - APRIL 5 2017)'},
                              {value : '100 (5%)'},
                              {value : '100 (5%)'},
                            ]
                          },
                          {  column : [
                              {value : 'WEEK 2 (APRIL 1 2017 - APRIL 5 2017)'},
                              {value : '180 (7%)'},
                              {value : '180 (7%)'},
                            ]
                          }
                        ]}
                      />
                </div>
              </div>
            </div>
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
export default connect(mapStateToProps)(ProjectSCurve)
// export default Login
