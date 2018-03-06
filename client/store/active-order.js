import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FIND_ORDER = 'FIND_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';
const ADD_ORDER = 'ADD_ORDER';
const ADD_TO_ORDER = 'ADD_TO_ORDER';

/**
 * INITIAL STATE
 */
const order = {}

/**
 * ACTION CREATORS
 */
const findOrder = foundOrder => ({ type: FIND_ORDER, foundOrder })
const updateOrder = order => ({type: UPDATE_ORDER, order})
const addOrder = newOrder => ({type: ADD_ORDER, newOrder})
const addToOrder = item => ({type: ADD_TO_ORDER, item})
    
/**
 * THUNK CREATORS
 */

export const fetchOrder = (id) =>
  dispatch =>
    axios.get(`/api/orders/single/${id}`)
      .then(res => 
          dispatch(findOrder(res.data)))
      .catch(err => console.log(err))

export function editOrder(id, changedOrder){
    return function thunk(dispatch){
        return axios.put(`/api/orders/single/${id}`, changedOrder)
        .then(res => res.data)
        .then(order => {
            dispatch(updateOrder(order));
        })
        .catch(err => console.log(err))
    }
}

export function postNewOrder(order){
  return function thunk(dispatch){
    return axios.post('/api/orders/new', order)
    .then(res => res.data)
    .then(newOrder => {
      console.log('HELLO!', newOrder)
      return axios.post('/api/cart', Object.assign({}, order, {orderId: newOrder.id}))
      .then(res => res.data)
      .then(lineItem => dispatch(addOrder(newOrder)))
    })
    .catch(err => console.log(err))
  }
}

export function postUnauthorizedOrder(order){
  return function thunk(dispatch){
    return axios.post('/api/cart/neworder', order)
      .then(res => res.data)
      .then(newOrder => dispatch(updateOrder({})))
  }
}

export function addUnauthorizedCart(order){
  return function thunk(dispatch) {
    return axios.post('/api/orders/new', order)
    .then(res => res.data)
    .then(sessionCart => {
      console.log(sessionCart)
      dispatch(addOrder(sessionCart))
    })
    .catch(err => console.log(err))
  }
}

export function fetchCart(){
  return function thunk(dispatch){
    axios.get('/auth/me')
    .then(res => res.data.id)
    .then(id => {
      axios.get(`/api/orders/${id}`)
      .then(res => res.data)
      .then(orders => orders.find(order => order.status === 'Created'))
      .then(foundOrder => dispatch(findOrder(foundOrder)))
    })
    .catch(err => console.log(err))
  }
}

export function fetchUnauthorizedCart(){
  return function thunk(dispatch) {
    axios.get('/api/cart/session')
    .then(res => res.data)
    .then(sessionCart => dispatch(findOrder(sessionCart)))
    .catch(err => console.log(err))
  }
}

export function deletefromUnauthorized(appleId){
  return function thunk(dispatch) {
      return axios
      .delete(`/api/cart/session/${appleId}`)
      .then(res => res.data)
      .then(sessionCart => dispatch(updateOrder(sessionCart)))
      .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (state = order, action) {
  switch (action.type) {
    case FIND_ORDER:
      return action.foundOrder
    case UPDATE_ORDER:
      return action.order
    case ADD_ORDER:
      return action.newOrder
    default:
      return state
  }
}
