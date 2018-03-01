import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FIND_ORDER = 'FIND_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

/**
 * INITIAL STATE
 */
const order = {}

/**
 * ACTION CREATORS
 */
const findOrder = foundOrder => ({ type: FIND_ORDER, foundOrder })
const updateOrder = order => ({type: UPDATE_ORDER, order})

/**
 * THUNK CREATORS
 */

export const fetchOrder = (id) =>
  dispatch =>
    axios.get(`/api/orders/${id}`)
      .then(res => 
        dispatch(findOrder(res.data)))
      .catch(err => console.log(err))

export function editOrder(id, changedOrder){
    return function thunk(dispatch){
        return axios.put(`/api/orders/${id}`, changedOrder)
        .then(res => res.data)
        .then(order => {
            dispatch(updateOrder(order));
        })
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
    default:
      return state
  }
}