import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {logout} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'
import {Menu, MenuSection, MenuItem, MenuHeader,MenuNotifItem} from './Components.jsx'
import { routerMiddleware, push } from 'react-router-redux'







class Dashboard extends Component {
  componentDidMount() {
    // if (store.getState().dom.popup) {
    //   document.body.style.overflow = 'hidden';
    //   document.body.scrollTop = 0; // For Chrome, Safari and Opera
    // document.documentElement.scrollTop = 0; // For IE and Firefox
    // }
    // console.log('work');
    // console.log(process.env.NODE_ENV);
    var compile_mode = process.env.NODE_ENV
    // var compile_mode = (process.env.npm_lifecycle_script.split(' ')[3]).replace('--', '')
    console.log('compiling : ', compile_mode)
    // browserHistory.push('/home')


  }

    render(){
      const alert = this.props.state.alert.alert
      const state = store.getState()
      // const color = alert && alert.color == 'RED' ? '#e7666a' : alert.color == 'GREEN' ? '#67e766' : alert.color == 'YELLOW' ? '#e7d866' : '#efefee'
      return(
                  <div className="unit whole" style={{position:'relative'}}>
                {
                  <div className={alert && alert.show == true ? 'alert-popup shadow active' : 'alert-popup shadow'}
                  
                  >
                  <small>{alert && alert.message ? alert.message : '' }</small>
                </div>
                }

                
                <div className='navbar'>
                  <div className='grid wrap' style={{position:'relative'}}>
                    <div className='unit whole no-gutters'>
                      <div id='prouds-logo'></div>
                      <ul>
                        <li><a onClick={
                          e => {
                            browserHistory.push('/')
                            e.preventDefault()
                          }}>HOME</a></li>
                        <li><a onClick={
                          e => {
                            browserHistory.push('/reports')
                            e.preventDefault()
                          }}>REPORTS</a></li>
                      </ul>
                      <div id='sigma-logo'></div>

                        <Menu style={{display:'inline'}} triggerStyle={{backgroundImage:'url(http://prouds2.telkomsigma.co.id/prouds-api' + this.props.state.auth.userdata.image +  ')'}} triggerClass='profile'>
                          <MenuSection>
                            <MenuHeader title={state.auth.userdata.user_name} />
                            <MenuItem title='Home' onClick={
                              e => {
                                browserHistory.push('/')
                              }

                            }/>
                            <MenuItem title='Profile' onClick={
                              e => {
                                browserHistory.push('/profile')
                              }
                            }/>
                          </MenuSection>
                          <MenuSection>
                            <MenuHeader title='ADMIN CONSOLE'/>
                            <MenuItem title='Master Data' onClick={
                              e => {
                                browserHistory.push('/dataset')
                              }
                            }/>
                            <MenuItem title='Manage Role & Access' onClick={
                              e => {
                                browserHistory.push('/manage')
                              }
                              }/>
                          </MenuSection>
                          <MenuSection>
                            <MenuItem onClick={
                              e => {
                                console.log('work');
                                browserHistory.replace('/auth')
                                //
                                store.dispatch(logout())
                                e.preventDefault()
                              }
                            } title='LogOut'/>
                          </MenuSection>

                        </Menu>

                        <Menu style={{display:'inline'}} triggerClass='notif'>
                        <MenuSection>
                          <MenuNotifItem onClick={
                            e => {
                              browserHistory.push('/project/activities')
                            }}>
                            <div className="person">
                            <div className="person-image" style={{marginLeft:'0',marginBottom:'20px'}} />
                            <div className="person-info" style={{position:'inherit'}}>
                              <small className="notif-info">
                                <a>Denise Becker</a> has updated timesheet <br/>
                                You need to approve it
                              </small>
                              <small><i>1h ago</i></small>

                            </div>
                          </div>
                          </MenuNotifItem>

                        </MenuSection>


                      </Menu>

                    </div>
                  </div>

                  {/* <button onClick={
                    e => {
                      browserHistory.push('/')

                      store.dispatch(deleteAuthentication())
                    }
                  }></button> */}
                </div>
                {this.props.children}
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
export default connect(mapStateToProps)(Dashboard)
// export default Login
