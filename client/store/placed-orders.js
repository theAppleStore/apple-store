import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FIND_USERS_ORDERS = 'FIND_USERS_ORDERS'

/**
 * INITIAL STATE
 */
const usersOrders = []

/**
 * ACTION CREATORS
 */
const findUsersOrders = orders => ({ type: FIND_USERS_ORDERS, orders })

/**
 * THUNK CREATORS
 */

export const fetchUsersOrders = (userId) =>
  dispatch =>
    axios.get(`/api/orders/${userId}`)
      .then(res => dispatch(findUsersOrders(res.data)))
      .catch(err => console.log(err))



/**
 * REDUCER
 */
export default function (state = usersOrders, action) {
  switch (action.type) {
    case FIND_USERS_ORDERS:
      return action.orders
    default:
      return state
  }
}