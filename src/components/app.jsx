import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'


import MainPage from './MainPage.jsx'
import '../sass/app.scss'
import store from '../reducers/combineReducers.jsx'


// import Store from '/Store.jsx'
render(
  <Provider store={store}>
    <MainPage/>
  </Provider>,
  document.getElementById('app')
)
