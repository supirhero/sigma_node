import auth from './authReducer.jsx'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import * as storage from 'redux-storage'


// var initialState = {}
// if (Object.keys(initialState).length === 0) {
//   initialState = {
//     isloggedin : false,
//     bussines_unit : null,
//     datatimesheet : null,
//     userdata : null,
//     projects : null
//   }
// }
// else {
//   load(store).then((newState) => {
//     console.log('Loaded state:', newState)
//     initialState = newState
//   })
//   .catch(() => console.log('Failed to load previous state'));
// }

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  }catch(err) {
    return undefined
  }
}
export const saveState = (state) => {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state',serializedState)
    console.log('changed: ', serializedState);

}
export const data = (state = {}, action) => {
  // state = {
  //   isLoggedIn : false
  // }
  switch (action.type) {
    case 'SESSION':
      saveState(store.getState())

      return Object.assign({}, state, {
        isloggedin: action.isloggedin,
        bussines_unit : action.bussines_unit,
        datatimesheet : action.datatimesheet,
        userdata : action.userdata,
        projects : action.projects
      })

      break;
    default:
    return state
  }
}

const allReducers = combineReducers({
  data : data,
  routing : routerReducer
})
export const store = createStore(allReducers, loadState())
// const reducer = storage.reducer(allReducers);
//
// const middleware = storage.createMiddleware(engine);
// const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
// const store = createStoreWithMiddleware(reducer);
// console.log(load(store));

export default store
