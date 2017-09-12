import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import { push, replace, goBack } from 'react-router-redux'

import store from '../reducers/combineReducers.jsx'
import {Divider, TimeSheetTimeButton, Header, ProjectHeader,PopUp,Input,Select, PageLoader} from  './components.jsx'
import {getProjectDetail} from './actions.jsx'
import { Line } from 'react-progressbar.js'


class ProjectOverview extends Component {
  componentWillMount(){
    const id = this.props.state.page.id
    this.props.dispatch(getProjectDetail(id))
  }
    render(){
      const appStore = this.props.state
      const overview = appStore.data.overview ? appStore.data.overview : null
      return(
        !this.props.state.data.overview ? <PageLoader/> :
        <div className='project-overview'>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <ProjectHeader projectName={overview.project_name} sectionName='OVERVIEW'/>
            </div>
          </div>
          <div className='grid padding-left'>
            <div className='unit whole'>
              <Header text='Project Team' style={{marginTop: '17px'}}  center={true}/>
            </div>
          </div>
          <div className='grid padding-left' style={{marginTop:'20px'}}>
            <div className='unit whole'>
              <div className='card'>
                <div className='grid'>
                  <div className='unit whole'>
                    <Header text='Project Detail'/>
                  </div>
                </div>
                <div className='grid'>
                <div className='unit two-fifths'>
                  <medium>Project Name</medium>
                  <a style={{ marginTop: '12px', display:'block'}}>{overview.project_name}</a>
                </div>
                <div className='unit three-fifths'>
                  <medium>Project Manager</medium>
                  <small style={{ marginTop: '12px', display:'block'}}>{overview.pm_name ? overview.pm_name : '-'}</small>
                </div>
              </div>
                <div className='grid'>
                  <div className='unit two-fifths'>
                    <medium>IWO (Internal Work Order)</medium>
                    <a style={{ marginTop: '12px', display:'block'}}>{overview.iwo ? overview.iwo : '-'}</a>
                  </div>
                  <div className='unit three-fifths'>
                    <medium>Business Unit Owner</medium>
                    <a style={{ marginTop: '12px', display:'block'}}>{overview.bu_owner ? overview.bu_owner : '-'}</a>
                  </div>
                </div>
                <div className='grid'>
                  <div className='unit two-fifths'>
                    <medium>Description</medium>
                    <small>{overview.description ? overview.description : '-'}</small>
                  </div>
                  <div className='unit three-fifths'>
                  <medium>Effort Type</medium>
                  <small>{overview.effort_type ? overview.effort_type : '-'}</small>
                </div>
                </div>
                <div className='grid'>
                <div className='unit two-fifths'>
                  <medium>Project Type</medium>
                  <small>{overview.project_type ? overview.project_type : '-'}</small>
                </div>
                <div className='unit three-fifths'>
                <medium>Project Status</medium>
                <small>{overview.project_status ? overview.project_status : '-'}</small>
              </div>

              </div>

              </div>
            </div>
          </div>

          <div className='grid padding-left' style={{marginTop:'17px'}}>
            <div className='unit whole'>
              <div className='card project-workplan'>
                <div className='grid'>
                  <div className='unit whole'>
                    <Header text='Project Workplan Status'/>
                  </div>
                </div>

                <div className='grid'>
                  <div className='unit four-fifths'>
                    <medium style={{display: 'block', marginBottom:'11px'}}>FORM STATUS:&nbsp;<span style={{color:'#65BDF4'}}>DRAFTED</span></medium>
                    <medium style={{display: 'inline-block'}}>COMPLETION:&nbsp;<span style={{color:'#65BDF4'}}>25%</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</medium>

                    <div className='completion-bar' style ={{display:'inline-block'}}>

                      <Line
                        progress={30 *0.01}
                        initialAnimate={true}
                        options={{
                          strokeWidth: 3,
                          color: '#65BDF4',
                          trailColor:'#EEEEEE',
                          trailWidth: 12,
                          fontSize: 30,
                          easing: 'easeInOut',
                          duration: 700,
                        }}
                        containerClassName={'line-bar'}
                        >
                        </Line>
                    </div>
                  </div>
                  <div className=' unit one-fifth no-gutters'>
                    <a onClick={e => {
                      this.props.dispatch(push(`/${this.props.state.page.id}/Workplan`))
                      e.preventDefault()
                    }}>View Workplan</a>
                  </div>

                </div>
                {/* <div className='grid'>
                  <div className='unit half'>
                    <div className='grid tab'>

                      <div className='unit one-third no-gutters'>
                        <small>TO DO</small>
                        <small className='status-total'>6</small>

                      </div>
                      <div className='unit one-third no-gutters'>
                        <small>DOING</small>
                        <small className='status-total'>24</small>
                      </div>
                      <div className='unit one-third no-gutters'>
                        <small>DONE</small>
                        <small className='status-total'>10</small>
                      </div>

                    </div>
                  </div>
                  <div className='unit half'></div>
                </div> */}

                {/* <div className='grid' style={{borderBottom:'2px solid #F6F6F6', paddingBottom: '14px'}}>
                  <div className='unit golden-large'>
                    <small>Lorem ipsum dolor sit amet consc....</small>
                  </div>
                  <div className='unit golden-small'>
                    <small>June 1 2017 - June 8 2017</small>
                  </div>
                </div>
                <div className='grid' style={{borderBottom:'px solid #F6F6F6', paddingBottom: '14px'}}>
                  <div className='unit golden-large'>
                    <small>Lorem ipsum dolor sit amet consc....</small>
                  </div>
                  <div className='unit golden-small'>
                    <small>June 1 2017 - June 8 2017</small>
                  </div>
                </div> */}

              </div>
            {/* <PopUp id="closeProject" dividerText="CLOSE THIS PROJECT" btnClass='btn-primary' btnText="CLOSE THIS PROJECT" style={{ margin: 'auto', float:'right', marginTop:'20px'}}>
              <div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Input inputName="LESSON LEARNT" />
                  </div>
                </div>
                <div className="grid wrap narrow">
                  <div className="unit whole">
                    <Input inputName="CHANGE MANAGEMENT NUMBER" />
                  </div>
                </div>
                  <div className="grid wrap narrow">
                    <div className="unit whole" style={{ textAlign: 'center', marginTop: '30px' }}>
                      <button style={{ display: 'inline-block', width: '200px' }} className="btn-secondary"> CANCEL </button>
                      <button style={{ display: 'inline-block', width: '200px', marginLeft: '40px' }} className="btn-primary"> CLOSE PROJECT </button>
                    </div>
                  </div>

              </div>
            </PopUp> */}

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
export default connect(mapStateToProps)(ProjectOverview)
// export default Login
