import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FIND_USER = 'FIND_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const findUser = foundUser => ({ type: FIND_USER, foundUser })
const update = user => ({ type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */

export const fetchUser = (id) =>
  dispatch =>
    axios.get(`/api/users/${id}`)
      .then(res => 
        dispatch(findUser(res.data)))
      .catch(err => console.log(err))

export const updateUser = (user) =>
  dispatch =>
    axios.put(`/api/users/${id}`)
      .then(res =>
        dispatch(update(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case FIND_USER:
      return action.foundUser
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}
