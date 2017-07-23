import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import store from '../reducers/combineReducers.jsx'
import {Divider, Input, RadioButton, Select} from './Components.jsx'
import { Line} from 'react-progressbar.js'

class MyRecentActivities extends Component {
  render() {
    return (
      <div>
        <div className="grid wrap">
          <div className="unit whole">
            <Divider btnLeftText='BACK' style={{marginTop:'0'}} btnLeftClick={ e => {
                browserHistory.goBack()
                e.preventDefault()
              }} text='MY RECENT ACTIVITIES'></Divider>
          </div>
        </div>

        <div className='grid wrap'>
          <div className='unit whole'>
            <h2 style={{marginBottom:'0'}} className='input-desc'>GENERATE REPORT</h2>
          </div>
        </div>

        <div className="grid wrap">
          <div className="unit one-third" >
            <Select style={{width:'100%' , display:'inline-block', float:'left', marginRight:'30px'}} items={{
                  items : [
                    {title : 'JANUARY'},
                    {title : 'FEBRUARY'}
                  ]
                }}></Select>
          </div>
          <div className="unit one-third" >
            <Select style={{width:'100%', display:'inline-block', float:'left'}} items={{
                  items : [
                    {title : '2017'},
                    {title : '2016'}
                  ]
                }}></Select>
          </div>
          <div className="unit one-third" >
            <button className='btn-primary'style={{float:'right' , padding:'15px 90px'}}>PRINT</button>
          </div>
        </div>

        <div className="grid wrap">
          <div className="unit whole">
             <Divider style={{marginTop:'0'}} text='WEDNESDAY, JUNE 7' />
          </div>
        </div>

        <div className="grid wrap">
          <div className="unit whole">

            <div className="card">
              <div className="person">
                <div className="person-image" />
                  <div className="person-info">
                    <large>Kara Gray</large>
                    <small>Admin, Project Manager</small>
                  </div>
              </div>
            </div>

            <div className="card project">
              <small>4:55 PM</small>
              <small className="project-info" >
                Project <a href="">Transaction Based Managed Services 2017</a>
                <p>(<b>4 Hours</b>) - Pengiriman data dana terdebet dan belum terdebet ke mitra</p>
                <p>left a <b>Timesheet UI #1</b> message</p>
                <p>"Ini interface yang lama seperti ini ya"</p>
              </small>
               <div className="grid wrap" style={{float:'right'}}>
                <div className="unit whole" >
                  <medium><b>WAITING FOR APPROVAL</b></medium>
                </div>
              </div>
            </div>

              </div>
        </div>

        <div className="grid wrap">
          <div className="unit whole">
             <Divider style={{marginTop:'0'}} text='TUESDAY , JUNE 6' />
          </div>
        </div>

        <div className="grid wrap">
          <div className="unit whole">
            <div className="card project">

              <div className="grid wrap">
                <div className="unit whole">
                  <medium style={{display:'inline'}}>
                    <a href="">Transaction Based Managed Services 2017</a>
                  </medium>
                  <div className="pill denied" style={{float:'right'}}>DENIED</div>
                </div>

                <small className="project-info" style={{margin:'auto'}}>
                  (<b>4 Hours</b>) - Pengiriman data dana terdebet dan belum terdebet ke mitra
                </small>
              </div>

              <div className="grid wrap">
                <div className="unit whole">
                  <div className="person">
                    <div className="person-image" style={{margin:'auto'}} />
                    <div className="person-info" style={{marginLeft:'46px'}}>
                      <large style={{float:'left'}}><b>Kara Gray</b></large>
                      <small style={{display:'inline'}}>, Project Manager</small>
                    </div>
                  <div style={{display: 'inline-block',marginLeft:'95px',marginTop:'-25px'}}>
                      <small>
                        <b>Timesheet UI #2.</b> "Ini tampilan yang aku improve seperti ini.
                        Tapi seperti yang kubilang kemarin, untuk development timeline nya aku
                        ngikut aja"
                      </small>
                  </div>
                  </div>
                </div>
              </div>
              <div className="grid wrap">
                <div className="unit whole" style={{marginLeft:'95px'}}>
                  <small>Tue,Jun 6 at 4:55 PM via web</small>
                  <medium style={{display:'inline',marginLeft:'37%'}}>
                    <a href="">RE-SUBMIT TIMESHEET</a>
                  </medium>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid wrap">
          <div className="unit whole">
            <div className="card project">

              <div className="grid wrap">
                <div className="unit whole">
                  <medium style={{display:'inline'}}>
                    <a href="">Transaction Based Managed Services 2017</a>
                  </medium>
                  <div className="pill approved" style={{float:'right'}}>APPROVED</div>
                </div>

                <small className="project-info" style={{margin:'auto'}}>
                  (<b>4 Hours</b>) - Pengiriman data dana terdebet dan belum terdebet ke mitra
                </small>
              </div>

              <div className="grid wrap">
                <div className="unit whole">
                  <div className="person">
                    <div className="person-image" style={{margin:'auto'}} />
                    <div className="person-info" style={{marginLeft:'46px'}}>
                      <large style={{float:'left'}}><b>Kara Gray</b></large>
                      <small style={{display:'inline'}}>, Project Manager</small>
                    </div>
                  <div style={{display: 'inline-block',marginLeft:'95px',marginTop:'-25px'}}>
                      <small>
                        <b>Timesheet UI #2.</b> "Ini tampilan yang aku improve seperti ini.
                        Tapi seperti yang kubilang kemarin, untuk development timeline nya aku
                        ngikut aja"
                      </small>
                  </div>
                  </div>
                </div>
              </div>
              <div className="grid wrap">
                <div className="unit whole" style={{marginLeft:'95px'}}>
                  <small>Tue,Jun 6 at 4:55 PM via web</small>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid wrap">
          <div className="unit whole">
            <div className="card project">

              <div className="grid wrap">
                <div className="unit whole">
                  <medium style={{display:'inline'}}>
                    <a href="">Transaction Based Managed Services 2017</a>
                  </medium>
                  <div className="pill pending" style={{float:'right'}}>PENDING</div>
                </div>

                <small className="project-info" style={{margin:'auto'}}>
                  (<b>4 Hours</b>) - Pengiriman data dana terdebet dan belum terdebet ke mitra
                </small>
              </div>

              <div className="grid wrap">
                <div className="unit whole">
                  <div className="person">
                    <div className="person-image" style={{margin:'auto'}} />
                    <div className="person-info" style={{marginLeft:'46px'}}>
                      <large style={{float:'left'}}><b>Kara Gray</b></large>
                      <small style={{display:'inline'}}>, Project Manager</small>
                    </div>
                  <div style={{display: 'inline-block',marginLeft:'95px',marginTop:'-25px'}}>
                      <small>
                        <b>Timesheet UI #2.</b> "Ini tampilan yang aku improve seperti ini.
                        Tapi seperti yang kubilang kemarin, untuk development timeline nya aku
                        ngikut aja"
                      </small>
                  </div>
                  </div>
                </div>
              </div>
              <div className="grid wrap">
                <div className="unit whole" style={{marginLeft:'95px'}}>
                  <small>Tue,Jun 6 at 4:55 PM via web</small>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default MyRecentActivities;
