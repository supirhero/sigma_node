import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import {createBrowserHistory} from 'history'
import { Router, Route,IndexRoute, browserHistory, Redirect } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'



import MainPage from './MainPage.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Auth from './Auth.jsx'
import RegisterSigma from './RegisterSigma.jsx'
import RegisterVendor from './RegisterVendor.jsx'
import Dashboard from './Dashboard.jsx'
import DashboardHome from './DashboardHome.jsx'
import Profile from './Profile.jsx'
import ProfileBasicInformation from './ProfileBasicInformation.jsx'
import ProfileChangePassword from './ProfileChangePassword.jsx'
import Timesheet from './Timesheet.jsx'
import NewProject from './NewProject.jsx'
import MyPerformances from './MyPerformances.jsx'






import {store, saveState} from '../reducers/combineReducers.jsx'
import '../sass/app.scss'

function requireAuth(nextState, replace) {
   if (!store.getState().data.isloggedin) {
   replace({
   pathname: '/auth',
   state: { nextPathname: nextState.location.pathname }
   })
   }
}

store.subscribe(()=> {
  saveState(store.getState())
})

const history = syncHistoryWithStore(browserHistory, store)

// import Store from '/Store.jsx'
render(
  <Provider store={store}>
    <Router history={history}>
      {/* <Route path="/" component={MainPage}>
        <IndexRoute component={DashboardHome}/>
        <Route path='login' component={Login}/>
        <Route path="register" component={Register}>
          <Route path="sigma" component={RegisterSigma}/>
          <IndexRoute component={RegisterSigma}/>
          <Route path="vendor" component={RegisterVendor}/>
        </Route>
        <Route path='profile' component={Profile}>
          <IndexRoute component={ProfileBasicInformation}/>
        </Route>
      </Route> */}

    <Route path='/' component={MainPage}>
      <Route component={Dashboard} onEnter={requireAuth}>
        <IndexRoute component={DashboardHome}/>
        <Route path='new-project' component={NewProject}></Route>
        <Route path='my-performance' component={MyPerformances}></Route>

        <Route path='profile' component={Profile}>
          <IndexRoute component={ProfileBasicInformation}/>
          <Route path='change-password' component={ProfileChangePassword}/>

        </Route>
      </Route>
      <Route path='auth' component={Auth}>
        <Route path="register" component={Register}>
          <IndexRoute component={RegisterSigma}/>
          <Route path="vendor" component={RegisterVendor}/>
        </Route>
        <IndexRoute component={Login}/>
      </Route>
      <Route path='timesheet' component={Timesheet}></Route>
    </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
