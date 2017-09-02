import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'
import {Divider, Input,Select,Meter, BarChart,PageLoader} from './Components.jsx'
import {myPerformance,pop,myPerformanceUserEntry} from './actions.jsx'

class MyPerformances extends Component {
    constructor(){
      super();
      this.state = {
        month : 1,
        year: 2017
      };
    }

    componentWillMount(){
      store.dispatch(myPerformance(this.state.month,this.state.year)) 
    }

    handleMonthChange (e) {
      this.setState({month: e.target.value});
      console.log(e.target.value);
      e.preventDefault()

     }
     handleYearChange (e) {
       this.setState({year: e.target.value});
       console.log(e.target.value);
       e.preventDefault()

      }


    render(){
      const state = store.getState()
      const month= [
        {name:'JAN',number:'1'},
        {name:'FEB',number:'2'},
        {name:'MAR',number:'3'},
        {name:'APR',number:'4'},
        {name:'MAY',number:'5'},
        {name:'JUN',number:'6'},
        {name:'JUL',number:'7'},
        {name:'AUG',number:'8'},
        {name:'SEP',number:'9'},
        {name:'OCT',number:'10'},
        {name:'NOV',number:'11'},
        {name:'DEC',number:'12'},
      ]
    

  const year = [
    {year:'2017'},
    {year:'2016'},
    {year:'2015'},
    {year:'2014'},
    {year:'2013'},
    {year:'2012'},
  ]

      const data = state.data ? state.data : null
      const allentry =data.allentry?data.allentry.map((value,index)=>{
        return {name:value.label,value:parseFloat(value.value)}
      }) : null
      
      const allhour = data.allhour?data.allhour.map((value,index)=>{
        return {name:value.label,value:parseFloat(value.value)}
      }):null

      
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


       const myperformance = state.data ? state.data : null;


       return(
        !myperformance || !data ? <PageLoader />:
        
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
                        <select onChange={this.handleYearChange.bind(this)} 
                        className='select' style={{height:'49px', width:'48%', display:'inline-block',float:'right'}}> 
                        { 
                          year.map((value,index) => { 
                          return( 
                            <option key={index} value={value.year}>{value.year}</option> 
                
                          ) 
                        })} 
                      </select> 
                       {/* <input placeholder='ex. 2017' onChange={this.handleYearChange.bind(this)} style={{width:'48%', display:'inline-block', float:'right'}}></input>
                        
                        <Input
                          onChange={this.handleYearChange.bind(this)}
                          style={{width:'48%', display:'inline-block', float:'right'}}

                          /> */}
                      </div>
                      <div className='unit one-fifth'>
                        <button className='btn-primary'style={{padding:'11px 14px'}} onClick={(e)=> {
                          console.log(this.state.month,this.state.year);
                          store.dispatch(myPerformance(this.state.month,this.state.year))
                          // store.dispatch(myPerformance('1','2017'))
                          e.preventDefault()
                        }} ><span className='material-icons' style={{color:'white'}}>search</span></button>

                      </div>
                    </div>
                  </div>
                </div>
                <div className='grid'>
                  <div className='unit one-third'>
                  <Meter
                  progress={myperformance ? myperformance.entry * 0.01 : '-'}
                  text={myperformance ? Math.floor(myperformance.entry) : '-'}
                  title='Entry'
                  status={myperformance.status}
                />
                  
                  </div>
                  <div className='unit one-third'>
                  <Meter
                  progress={myperformance ? myperformance.utilization * 0.01 : '-'}
                  text={myperformance ? Math.floor(myperformance.utilization) : '-'}
                  title='Utilization'
                  status={myperformance.status_utilization}
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
                      <select onChange={this.handleYearChange.bind(this)} 
                      className='select' style={{height:'49px', width:'48%', display:'inline-block',float:'right'}}> 
                      { 
                        year.map((value,index) => { 
                        return( 
                          <option key={index} value={value.year}>{value.year}</option> 
              
                        ) 
                      })} 
                    </select> 
                      </div>
                      <div className='unit one-fifth'>
                      <button className='btn-primary'style={{padding:'11px 14px'}} onClick={(e)=> {
                        console.log(this.state.month,this.state.year);
                        store.dispatch(myPerformance(this.state.month,this.state.year))
                        // store.dispatch(myPerformance('1','2017'))
                        e.preventDefault()
                      }} ><span className='material-icons' style={{color:'white'}}>search</span></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='grid'>
                  <div className='unit whole'>
                    <BarChart
                      data={allentry}/>

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
                      data={allhour}/>

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
    state
    // filter: ownProps.location.query.filter
  }
}
export default connect(mapStateToProps)(MyPerformances)
// export default Login
