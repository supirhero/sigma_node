import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'
import {Divider, Input,Select,Meter, BarChart,PageLoader} from './Components.jsx'
import {myPerformance,pop} from './actions.jsx'





class MyPerformances extends Component {
    constructor(){
      super();
      this.state = {
        month : 0,
        year: 0
      };
    }
    componentWillMount(){
      store.dispatch(myPerformance("8","2017"))
    }

    handleMonthChange (e) {
      this.setState({month: e.target.value});
      console.log(e.target.value);
     }
     handleYearChange (e) {
       this.setState({year: e.target.value});
       console.log(e.target.value);
      }


    render(){
      const month= [
        {name:'JANUARY',number:'1'},
        {name:'FEBRUARY',number:'2'},
        {name:'MARCH',number:'3'},
        {name:'APRIL',number:'4'},
        {name:'MAY',number:'5'},
        {name:'JUNE',number:'6'},
        {name:'JULY',number:'7'},
        {name:'AUGUST',number:'8'},
        {name:'SEPTEMBER',number:'9'},
        {name:'OCTOBER',number:'10'},
        {name:'NOVEMBER',number:'11'},
        {name:'DEECMBER',number:'12'},
      ]

      const year = [
        {year:'2017'},
        {year:'2016'},
        {year:'2015'},
      ]

      function statusCom(){
        if (completeProgress == 100){
           return "COMPLETE"
        } else if (completeProgress < 100){
           return "UNDER"
        } else{
          return "OVER"
        }
       }

       function statusUn(){
        if (underProgress == 100){
           return "COMPLETE"
        } else if (underProgress < 100){
           return "UNDER"
        } else{
          return "OVER"
        }
       }

       const completeProgress = 100;
       const underProgress = 80;

       const state = store.getState();
       const myperformance = state.data;


       return(
        !myperformance ? <PageLoader/>:
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
                        <select onChange={this.handleMonthChange.bind(this)}
                          className='select' style={{height:'49px', width:'48%', display:'inline-block'}}>
                          {
                            month.map((value,index) => {
                            return(
                              <option key={index} value={value.number}>{value.name}</option>

                            )
                          })}
                        </select>
                        <input placeholder='ex. 2017' onChange={this.handleYearChange.bind(this)} style={{width:'48%', display:'inline-block', float:'right'}}></input>
{/*
                        <Input
                          onChange={this.handleYearChange.bind(this)}
                          style={{width:'48%', display:'inline-block', float:'right'}}

                          /> */}
                      </div>
                      <div className='unit one-fifth'>
                        <button className='btn-primary'style={{padding:'11px 14px'}} onClick={(e)=> {
                          store.dispatch(myPerformance(this.state.month,this.state.year))

                          e.preventDefault()
                        }} ><span className='material-icons' style={{color:'white'}}>search</span></button>

                      </div>
                    </div>
                  </div>
                </div>
                <div className='grid'>
                  <div className='unit one-third'>
                  <Meter
                  progress={myperformance ? myperformance.utilization * 0.01 : '-'}
                  text={myperformance ? Math.floor(myperformance.utilization) : '-'}
                  title='Utilization'
                  status={myperformance.status_utilization}
                />

                  </div>
                  <div className='unit one-third'>
                  <Meter
                  progress={myperformance ? myperformance.entry * 0.01 : '-'}
                  text={myperformance ? Math.floor(myperformance.entry) : '-'}
                  title='Entry'
                  status={myperformance.status}
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
