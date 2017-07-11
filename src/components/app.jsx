import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import {createBrowserHistory} from 'history'
import { Router, Route,IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'



import MainPage from './MainPage.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Auth from './Auth.jsx'
import RegisterSigma from './RegisterSigma.jsx'
import RegisterVendor from './RegisterVendor.jsx'
import Dashboard from './Dashboard.jsx'
import DashboardHome from './DashboardHome.jsx'
import {store, saveState} from '../reducers/combineReducers.jsx'
import '../sass/app.scss'







store.subscribe(()=> {
  saveState(store.getState())
})

const history = syncHistoryWithStore(browserHistory, store)

// import Store from '/Store.jsx'
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MainPage}>
        <Route path="register" component={Register}>
          <Route path="sigma" component={RegisterSigma}/>
          <Route path="vendor" component={RegisterVendor}/>
        </Route>
          <IndexRoute component={DashboardHome}/>




      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
