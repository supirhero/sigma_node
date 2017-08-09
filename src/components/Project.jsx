import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'


import store from '../reducers/combineReducers.jsx'
import {Divider, TimeSheetTimeButton, PopUp, Input, InputFile, Select, PageLoader} from  './components.jsx'
import { getProjectDetail, pop } from './actions.jsx'


class Project extends Component {
  constructor(){
    super();
    this.state = {
      active : 'Overview'
    };
  }

  componentWillMount(){
    const id = store.getState().data.page.id
    store.dispatch(getProjectDetail(id)).then(
      (res)=>{
        console.log('detail project');
      }
    )
  }

  componentWillUnmount(){
    store.dispatch(pop())
  }

  render(){
    const id = store.getState().data.page.id
    const sidebar = [
      {type:'menu', name : 'Overview', path: `/project/${id}`},
      {type:'menu', name : 'Setting', path: `/project/${id}/setting`},
      {type:'menu', name : 'Activities', path: `/project/${id}/activities`},
      {type:'title', name : 'MANAGE'},
      {type:'menu', name : 'Workplan', path: `/${id}/workplan`},
      {type:'menu', name : 'Team Member', path: `/project/${id}/team-member`},
      {type:'menu', name : 'Doc & Files', path: `/project/${id}/docs-and-files`},
      {type:'menu', name : 'Issues', path: `/project/${id}/issues`},
      {type:'title', name : 'REPORTS'},
      {type:'menu', name : 'SPI & CPI', path: `/project/${id}/spi-and-cpi`},
      {type:'menu', name : 'S-Curve', path: `/project/${id}/s-curve`},
      {type:'menu', name : 'Gantt Chart', path: `/project/${id}/gantt-chart`},
    ]
    return(
      <div className='project'>
          <div className='grid wrap'>
            <div className='unit one-fifth no-gutters'>
              <div className='sidebar'>
              <div className='grid wrap'>
                <div className='unit whole no-gutters'>

                  <PopUp id="updateTimesheet" dividerText="UPDATE TIMESHEET" btnText="UPDATE TIMESHEET"  btnStyle={{padding: '15px 25px'}} btnClass='btn-primary'>
                    <div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <Input inputName="DATE" />
                        </div>
                      </div>
                      <div className="grid wrap narrow">
                        <div className="unit whole">
                          <Input inputName="PROJECT" />
                        </div>
                      </div>

                      <div className="grid wrap narrow">
                        <div className="unit golden-large">
                          <Select
                            inputName="TASK"
                            items={{
                              items: [
                                { title: 'small' },
                                { title: 'medium' },
                              ],
                            }}
                          />
                        </div>
                        <div className="unit golden-small">
                          <Input inputName="WORK HOURS" />

                        </div>
                        <div className="unit golden-large" style={{paddingTop:'0',paddingRight:'0'}}>
                            <InputFile placeholder="choose a file" />
                        </div>
                        <div className="grid wrap narrow">
                          <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                            <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                            <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> ADD </button>
                          </div>
                        </div>
                      </div>
                    </div>
                </PopUp>

                </div>
              </div>
              <div className='grid wrap sidebar'>
                <div className='unit whole '>
                  <ul>
                    {
                      sidebar.map((value, index) => {
                        if (value.type == 'menu') {
                          return(
                            <li key={index}><small className={ this.state.active == value.name ? 'active' : '' } onClick={
                              e => {
                                const name = value.name
                                this.setState({
                                  active : value.name
                                })
                                if (value.name == 'Workplan') {
                                  browserHistory.push(value.path)
                                }
                                else {
                                  browserHistory.replace(value.path)

                                }
                                e.preventDefault()
                              }
                            }>{value.name}</small></li>
                          )
                        }
                        else {
                          return(

                            <li key={index} style={{marginTop:'45px'}}><medium>{value.name}</medium></li>
                          )
                        }

                    })
                  }


                  </ul>


                </div>
              </div>

            </div>
          </div>


        <div className='unit four-fifths'>

          {
            store.getState().data.project ?
            this.props.children:
            <PageLoader></PageLoader>


          }
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
export default connect(mapStateToProps)(Project)
// export default Login
