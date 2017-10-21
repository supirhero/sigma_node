import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import { logout, getNumberNotif,getNotif, changeRoute, markNotifRead } from './actions.jsx'
import store from '../reducers/combineReducers.jsx'
import {Menu, MenuSection, MenuItem, MenuHeader,MenuNotifItem} from './Components.jsx'
import { routerMiddleware, push } from 'react-router-redux'
import moment from 'moment'






class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      active : 'HOME',
      notif_load: false
    };
  }

  componentDidMount() {
    // if (store.getState().dom.popup) {
    //   document.body.style.overflow = 'hidden';
    //   document.body.scrollTop = 0; // For Chrome, Safari and Opera
    // document.documentElement.scrollTop = 0; // For IE and Firefox
    // }
    // console.log('work');
    // console.log(process.env.NODE_ENV);
    this.props.dispatch(getNumberNotif())

    
    
    var compile_mode = process.env.NODE_ENV
    // var compile_mode = (process.env.npm_lifecycle_script.split(' ')[3]).replace('--', '')
    console.log('compiling : ', compile_mode)
    // browserHistory.push('/home')


  }

  

    render(){
      setInterval(()=> {
        this.props.dispatch(getNumberNotif())
      }, 300000);
      const auth = this.props.state.auth
      const alert = this.props.state.alert.alert
      const imageURL = auth.userdata && auth.userdata.image ? 'url(http://prouds.telkomsigma.co.id:8089/sigmadev' + auth.userdata.image +  ')' : null
        
      const color = alert ? alert.color == 'RED' ? '#e7666a' : alert.color == "GREEN" ? '#67e766' : alert.color == 'YELLOW' ? '#e7d866' : '#efefee' : '#efefee'
      return(
                  <div className="unit whole" style={{position:'relative'}}>
                {/* {
                  <div className={alert && alert.show == true ? 'alert-popup shadow active' : 'alert-popup shadow'}
                  style={{backgroundColor: color }}
                  >
                  <small>{alert && alert.message ? alert.message : '' }</small>
                </div>
                } */}

                
                <div className='navbar'>
                  <div className='grid wrap' style={{position:'relative'}}>
                    <div className='unit whole no-gutters'>
                      <div id='prouds-logo'></div>
                      <ul>
                        <li className={ this.state.active == "HOME" ? 'active' : '' }><a onClick={
                          e => {
                            browserHistory.push('/')
                            e.preventDefault()
                            this.setState({active:"HOME"})
                          }} >HOME</a></li>
                        <li className={ this.state.active == "REPORTS" ? 'active' : '' }><a onClick={
                          e => {
                            browserHistory.push('/reports')
                            e.preventDefault()
                            this.setState({active:"REPORTS"})
                          }}>REPORTS</a></li>
                      </ul>
                      <div id='sigma-logo'></div>

                        <Menu style={{display:'inline'}} 
                        triggerStyle={{
                          backgroundImage:imageURL,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        
                        }} 
                        menuStyle={{top:'60'}}
                        triggerClass='profile'>
                          <MenuSection>
                            <MenuHeader title={auth.userdata ? auth.userdata.user_name: null} subTitle={auth.userdata ?auth.userdata.profile_name : null }/>
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
                          {
                            this.props.state.auth.privilege.master_data_access && this.props.state.auth.privilege.manage_role_access &&
                            
                            <MenuSection>
                            <MenuHeader title='ADMIN CONSOLE'/>
                            {
                              this.props.state.auth.privilege.master_data_access &&
                              <MenuItem title='Master Data' onClick={
                              e => {
                                browserHistory.push('/dataset')
                              }
                            }/>}
                            {
                              this.props.state.auth.privilege.manage_role_access &&
                              
                              <MenuItem title='Manage Role & Access' onClick={
                              e => {
                                browserHistory.push('/manage')
                              }
                              }/>}
                          </MenuSection>}
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
                        
                        <Menu style={{display:'inline'}} triggerClass='notif' iconStyle={{
                          fontFamily: 'Open Sans,sans-serif',
                          fontSize: '17px',
                          color: '#fa5962',
                          marginTop: '5px',
                          fontWeight: '700',
                          textAlign: 'center',
                        }}
                        id="notif-menu"
                        notif = {true}
                        menuStyle={{
                          height:'350px', overflow:'scroll'
                        }} 
                        icon={ this.props.state.auth.unread_notif }>
                        
                          <MenuSection >
                            {
                              this.state.notif_load ? 

                              <MenuNotifItem
                              style={{width:'450px', height:'270px'}}
                              >
                              <small className="notif-info">
                                Loading other notifications...
                                </small>
                              </MenuNotifItem>

                              :

                              this.props.state.auth.notif_list == "" ?
                              <MenuNotifItem
                              style={{width:'450px'}}
                              >
                              <small className="notif-info">
                                No notifications
                                </small>
                              </MenuNotifItem>
                              :
                                
                              this.props.state.auth.notif_list &&
                              this.props.state.auth.notif_list.map((value,index)=> (
                                
                                <MenuNotifItem style={{width:'450px'}} key={index} onClick={e => {
                                  this.props.dispatch(markNotifRead(value.notif_id))
                                  store.dispatch(
                                    changeRoute({
                                      type: "PUSH",
                                      page: {
                                        name: "project",
                                        id: value.project_id,
                                        project: {
                                          status: value.project_status,
                                          bu_code: value.bu_code
                                        }
                                      }
                                    })
                                  );
  
                                  e.preventDefault();
                                }}>
                              <div className="person">
                              <div className="person-image" style={{marginLeft:'0',marginBottom:'20px', display:'inline-block'}} />
                              <div className="person-info" style={{position:'inherit', display:'inline-block', width:'84%'}}>
                                <small className="notif-info">
                                  <a>{value.user_name}</a> {value.text}
                                </small>
                                <small style={{marginTop:'8px'}}><i>
                                  {
                                    moment(value.datetime).format('DD MMM YYYY')
                                  
                                  }</i></small>
                              </div>
                            </div>
                            
                            </MenuNotifItem>
                              ))
                              
                            }
                            <MenuNotifItem onClick={ e=> {
                              this.setState({notif_load:true})
                              
                              this.props.dispatch(getNotif(this.props.state.auth.notif_info.load_more)).then( ()=> {
                                this.setState({notif_load:false})
                                
                              })

                              }}>
                              <small className="notif-info">
                                Click to load next
                                </small>
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
                <div className="footer">
                <div className='grid wrap'>
                  <div className='unit whole'>
                    <p>
                    {`© ${moment().format("YYYY")} - Project Management & Resources Delivery System. All rights reserved`} 
                    </p>
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
export default connect(mapStateToProps)(Dashboard)
// export default Login