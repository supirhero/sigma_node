import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'


import MainPage from './MainPage.jsx'
import '../sass/app.scss'
import allReducers from '../reducers/combineReducers.jsx'
const store = createStore(allReducers)


// import Store from '/Store.jsx'
render(
  <Provider store={store}>
    <MainPage/>
  </Provider>,
  document.getElementById('app')
)
