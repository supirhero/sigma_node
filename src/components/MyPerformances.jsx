import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'
import {Divider, Input,Select,Meter, BarChart} from './Components.jsx'






class MyPerformances extends Component {

    render(){
      return(
        <div>
          <div className='grid wrap'>
            <div className='unit whole'>
              <Divider btnLeftText='BACK' text='MY PERFORMANCES' btnLeftClick={
                e => {
                  browserHistory.goBack()
                  e.preventDefault()

                }
              }/>
            </div>
          </div>
          <div className='grid wrap narrow'>
            <div className='unit whole'>
              <div className='card' style={{padding:'35px'}}>
                <div className='grid'>
                  <div className='unit golden-small'>
                    <large>Timesheet</large>

                  </div>
                  <div className='unit golden-large'>
                    <div className='grid'>
                      <div className='unit four-fifths'>
                        <Select 
                          style={{width:'48%', display:'inline-block'}}
                          items={{
                            items : [
                              {title : 'JUN'},
                              {title : 'JUL'}
                            ]
                           }}
                        />
                        <Select 
                          style={{width:'48%', display:'inline-block', float:'right'}}
                          items={{
                            items : [
                              {title : '2017'},
                              {title : '2016'}
                            ]
                           }}
                          />
                      </div>
                      <div className='unit one-fifth'>
                        <button className='btn-primary'style={{padding:'11px 14px'}} ><span className='material-icons' style={{color:'white'}}>search</span></button>

                      </div>
                    </div>
                  </div>
                </div>
                <div className='grid'>
                  <div className='unit one-third'>
                    <Meter
                      progress={35}
                      text='35'
                      title='Entry'
                      status='Normal'
                    />
                  </div>
                  <div className='unit one-third'>
                    <Meter
                      progress={35}
                      text='35'
                      title='Entry'
                      status='Normal'
                    />
                  </div>
                  <div className='unit one-third'>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid wrap narrow'>
            <div className='unit whole'>
              <div className='card' style={{padding:'35px'}}>
                <div className='grid'>
                  <div className='unit golden-small'>
                    <large>User Entry</large>

                  </div>
                  <div className='unit golden-large'>
                    <div className='grid'>
                      <div className='unit four-fifths'>
                        <Select 
                          style={{width:'48%', display:'inline-block', float:'right'}}
                          items={{
                            items : [
                              {title : '2016'},
                              {title : '2017'},
                            ]
                           }}
                        />
                      </div>
                      <div className='unit one-fifth'>
                        <button className='btn-primary'style={{padding:'11px 14px'}} ><span className='material-icons' style={{color:'white'}}>search</span></button>

                      </div>
                    </div>
                  </div>
                </div>
                <div className='grid'>
                  <div className='unit whole'>
                    <BarChart
                      data={[
                        {name: 'Jan', value: 20},
                        {name: 'Feb', value: 10},
                        {name: 'Mar', value: 5},
                        {name: 'Apr', value: 3},
                        {name: 'May', value: 6},
                        {name: 'Jun', value: 8},
                        {name: 'Jul', value: 7},
                        {name: 'Aug', value: 9},
                        {name: 'Sep', value: 12},
                        {name: 'Oct', value: 300},
                        {name: 'Nov', value: 54},
                        {name: 'Des', value: 1}
                      ]}/>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid wrap narrow'>
            <div className='unit whole'>
              <div className='card' style={{padding:'35px'}}>
                <div className='grid'>
                  <div className='unit golden-small'>
                    <large>User Utilization</large>

                  </div>
                  <div className='unit golden-large'>
                    <div className='grid'>
                      <div className='unit four-fifths'>
                        <Select 
                          style={{width:'48%', display:'inline-block', float:'right'}}
                          items={{
                            items : [
                              {title : '2017'},
                              {title : '2016'}
                            ]
                           }}
                        />
                      </div>
                      <div className='unit one-fifth'>
                        <button className='btn-primary'style={{padding:'11px 14px'}} ><span className='material-icons' style={{color:'white'}}>search</span></button>

                      </div>
                    </div>
                  </div>
                </div>
                <div className='grid'>
                  <div className='unit whole'>
                    <BarChart
                      data={[
                        {name: 'Jan', value: 20},
                        {name: 'Feb', value: 10},
                        {name: 'Mar', value: 5},
                        {name: 'Apr', value: 3},
                        {name: 'May', value: 6},
                        {name: 'Jun', value: 8},
                        {name: 'Jul', value: 7},
                        {name: 'Aug', value: 9},
                        {name: 'Sep', value: 12},
                        {name: 'Oct', value: 300},
                        {name: 'Nov', value: 54},
                        {name: 'Des', value: 1}
                      ]}/>

                  </div>
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
    // filter: ownProps.location.query.filter
  }
}
export default connect(mapStateToProps)(MyPerformances)
// export default Login
