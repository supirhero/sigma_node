import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'
import {deleteAuthentication} from './actions.jsx'
import store from '../reducers/combineReducers.jsx'
import {Menu, MenuSection, MenuItem, MenuHeader} from './Components.jsx'
import { routerMiddleware, push } from 'react-router-redux'







class Dashboard extends Component {
  componentDidMount() {
    // console.log('work');
    // console.log(process.env.NODE_ENV);
    var compile_mode = process.env.NODE_ENV
    // var compile_mode = (process.env.npm_lifecycle_script.split(' ')[3]).replace('--', '')
    console.log('compiling : ', compile_mode)
    // browserHistory.push('/home')


  }

    render(){
      return(
              <div>
                <div className='navbar'>
                  <div className='grid wrap'>
                    <div className='unit whole'>
                      <a>HOME</a>
                      <a>REPORTS</a>
                        <Menu>
                          <MenuSection>
                            <MenuHeader title='Kara Cray' subTitle='@karagay'/>
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
                            <MenuItem title='Master Data'/>
                            <MenuItem title='Manage Role & Access'/>
                          </MenuSection>
                          <MenuSection>
                            <MenuItem onClick={
                              e => {
                                console.log('work');
                                browserHistory.replace('/auth')
                                //
                                store.dispatch(deleteAuthentication())
                                e.preventDefault()
                              }
                            } title='LogOut'/>
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
    // filter: ownProps.location.query.filter
  }
}
export default connect(mapStateToProps)(Dashboard)
// export default Login
