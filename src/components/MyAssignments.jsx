import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, TimeSheetTimeButton,PageLoader} from  './components.jsx'
import {getMyAssignment,pop,viewTimesheet} from './actions.jsx'

class MyAssignments extends Component {
 
  componentWillMount(){
    const myAssignment = store.getState().data.myAssignment
    store.dispatch(getMyAssignment())

  }


  componentWillUnmount() {
    store.dispatch(pop());
  }
    render(){
      const state = store.getState();
      const myAssignment = state.data.myAssignment;
      if(!myAssignment){
        return <PageLoader></PageLoader>
      }
      return(

        <div>
            <div className='grid wrap'>
              <div className='unit whole'>
                <Divider text='MY ASSIGNMENTS' btnLeftText='BACK' btnLeftClick={
                  e => {
                    browserHistory.goBack()
                    e.preventDefault()
                  }
                }/>
            </div>
          </div>
          {/* MAP THIS */}
          {
            myAssignment.assignment.map((value,index)=>{
              return (
              <div key={index}>
              
              
            
          
          <div className='grid wrap'>
            <div className='unit whole'>
              <large>Business Unit&nbsp;:&nbsp;&nbsp; <a style={{fontSize:'20px'}}>{value.bu_name}</a></large>
            </div>
          </div>
          <div className='grid wrap'>
            <div className='unit whole'>
              <div className='card'>
              {
                value.project_detail.map((value,index)=>{
                  return(
                    <div key={index}>
                    
                    
                <medium style={{marginBottom: '30px'}}>Project&nbsp;<a>{value.project_name}</a></medium>
                {/* MAP THIS */}
                {
                  value.assignment_list.map((value,index)=>{
                    return(
                      <div key={index}>
                     
                        <div>
                          <div className='grid' >
                            <div className='unit golden-large no-gutters'>
                              <small>{value.wbs_name}</small>
                            </div>
                            <div className='unit golden-small no-gutters'>
                              <small>{value.start_date}  -  {value.finish_date}</small>
                            </div>
                          </div>
                          <div className='grid'>
                            <div className='unit whole no-gutters'>
                              <div className='divider' style={{margin:'15px 0', borderColor:'#F6F6F6'}}></div>
                            </div>
                          </div>
                        </div>

                </div>
              )
            })

          }
               

                </div>
              )
            })
          }
              </div> 
            </div>
          </div>
          </div>
          )
        }
      )
  }


      </div>

      )
    }

}

function mapStateToProps(state) {
  return {
    state
  }
}
export default connect(mapStateToProps)(MyAssignments)
// export default Login
