import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FIND_ALL = 'FIND_ALL';

/**
 * INITIAL STATE
 */
const orders = []

/**
 * ACTION CREATORS
 */
const findAllOrders = found => ({ type: FIND_ALL, found })

/**
 * THUNK CREATORS
 */

export const fetchAllOrders = () =>
  dispatch =>
    axios.get(`/api/orders`)
      .then(res => {
        dispatch(findAllOrders(res.data))
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = orders, action) {
  switch (action.type) {
    case FIND_ALL:
      return action.found
    default:
      return state
  }
}