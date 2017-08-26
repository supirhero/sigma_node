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
import ProjectDocsAndFiles from './ProjectDocsAndFiles.jsx'
import ProjectIssues from './ProjectIssues.jsx'
import ProjectWorkplan from './ProjectWorkplan.jsx'
import ProjectSpiCpi from './ProjectSpiCpi.jsx'
import ProjectSCurve from './ProjectSCurve.jsx'

import Dataset from './Dataset.jsx'
import DatasetUser from './DatasetUser.jsx'
import DatasetCustomer from './DatasetCustomer.jsx'
import DatasetPartner from './DatasetPartner.jsx'
import DatasetHoliday from './DatasetHoliday.jsx'
import DatasetProjectType from './DatasetProjectType.jsx'
import DatasetBU from './DatasetBu.jsx'
import ManageRoleAccess from './ManageRoleAccess.jsx'
import ManageRoles from './ManageRoles.jsx'
import ManageAccess from './ManageAccess.jsx'

import {muiTheme} from './Components.jsx'
import {MuiThemeProvider } from 'material-ui'

import {store, saveState} from '../reducers/combineReducers.jsx'
import '../sass/app.scss'

window.store = store
function requireAuth(nextState, replace) {
   if (!store.getState().auth.isloggedin) {
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
    <MuiThemeProvider muiTheme={muiTheme}>

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
        <Route path=':id/workplan' component={ProjectWorkplan}></Route>
        <Route path='project/:id' component={Project}>
          <IndexRoute component={ProjectOverview}></IndexRoute>
          <Route path='edit-project' component={ProjectSetting}></Route>
          <Route path='activities' component={ProjectActivities}></Route>
          <Route path='team-member' component={ProjectTeamMember}></Route>
          <Route path='docs-and-files' component={ProjectDocsAndFiles}></Route>
          <Route path='issues' component={ProjectIssues}></Route>
          <Route path='workplan' component={ProjectWorkplan}></Route>
          <Route path='spi-and-cpi' component={ProjectSpiCpi}></Route>
          <Route path='s-curve' component={ProjectSCurve}></Route>
          <Route path='spi-and-cpi' component={ProjectSpiCpi}></Route>

        </Route>
        <Route path='profile' component={Profile}>
          <IndexRoute component={ProfileBasicInformation}/>
          <Route path='change-password' component={ProfileChangePassword}/>
        </Route>

        <Route path='timesheet' component={Timesheet}></Route>
        <Route path='my-recent-activities' component={MyRecentActivities} />

        <Route path='reports' component={Reports}>
          <IndexRoute component={ReportsOverview} />
          <Route path='directorate' component={ReportsDirectorate} />
          <Route path='people' component={ReportsPeople} />
          <Route path='find-project' component={ReportsFindProject} />
        </Route>

        <Route path='dataset' component={Dataset}>
          <IndexRoute component={DatasetUser} />
          <Route path='customer' component={DatasetCustomer} />
          <Route path='partner' component={DatasetPartner} />
          <Route path='holiday' component={DatasetHoliday} />
          <Route path='project-type' component={DatasetProjectType} />
          <Route path='bu' component={DatasetBU} />
        </Route>

        <Route path='manage' component={ManageRoleAccess}>
          <IndexRoute component={ManageRoles} />
          <Route path='access' component={ManageAccess} />
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
  </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
