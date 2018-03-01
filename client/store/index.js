import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import apples from './apples'
import userProfile from './user-profile'
import order from './order'
import users from './users'
import orders from './orders'
import singleapple from './singleapple'

const reducer = combineReducers({user, apples, userProfile, users, order, orders, singleapple})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './singleapple'
export * from './user'
export * from './apples'
export * from './user-profile'
export * from './order'
export * from './users'
export * from './orders'


