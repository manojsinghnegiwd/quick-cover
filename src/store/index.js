import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers'

export const history = createHistory()

const middleware = [thunk, routerMiddleware(history)]

const appStore = createStore(rootReducer, applyMiddleware(...middleware))

export default appStore