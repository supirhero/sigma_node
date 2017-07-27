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
import MyRecentActivities from './MyRecentActivities.jsx'
import MyAssignments from './MyAssignments.jsx'
import BusinessUnit from './BusinessUnit.jsx'
import Reports from './Reports.jsx'
import ReportsOverview from './ReportsOverview.jsx'
import ReportsDirectorate from './ReportsDirectorate.jsx'
import ReportsPeople from './ReportsPeople.jsx'
import ReportsFindProject from './ReportsFindProject.jsx'
import Project from './Project.jsx'
import ProjectOverview from './ProjectOverview.jsx'
import ProjectSetting from './ProjectSetting.jsx'
import ProjectActivities from './ProjectActivities.jsx'
import ProjectTeamMember from './ProjectTeamMember.jsx'
import ProjectWorkplan from './ProjectWorkplan.jsx'
import ProjectDocsAndFiles from './ProjectDocsAndFiles.jsx'
import ProjectIssues from './ProjectIssues.jsx'




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
        <Route path='new-project' component={NewProject}>
        </Route>
        <Route path='my-performance' component={MyPerformances}>
        </Route>
        <Route path='my-assignments' component={MyAssignments}></Route>
        <Route path='business-unit' component={BusinessUnit}></Route>
        <Route path='workplan' component={ProjectWorkplan}></Route>
        <Route path='project' component={Project}>
          <IndexRoute component={ProjectOverview}></IndexRoute>
          <Route path='setting' component={ProjectSetting}></Route>
          <Route path='activities' component={ProjectActivities}></Route>
          <Route path='team-member' component={ProjectTeamMember}></Route>
          <Route path='docs-and-files' component={ProjectDocsAndFiles}></Route>
          <Route path='issues' component={ProjectIssues}></Route>





        </Route>


        <Route path='profile' component={Profile}>
          <IndexRoute component={ProfileBasicInformation}/>
          <Route path='change-password' component={ProfileChangePassword}/>
        </Route>

        <Route path='timesheet' component={Timesheet}></Route>
        <Route path='my-recent-activities' component={MyRecentActivities} />

        <Route path='reports' component={Reports}>
          <Route path='reports-directorate' component={ReportsDirectorate} />
          <Route path='reports-people' component={ReportsPeople} />
          <Route path='find-project' component={ReportsFindProject} />
          <IndexRoute component={ReportsOverview} />
        </Route>





      </Route>

      <Route path='auth' component={Auth}>
        <Route path="register" component={Register}>
          <IndexRoute component={RegisterSigma}/>
          <Route path="vendor" component={RegisterVendor}/>
        </Route>
        <IndexRoute component={Login}/>
      </Route>

    </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
