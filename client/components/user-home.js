import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import VisitorHome from './visitor-home';
/**
 * COMPONENT
 */
const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <VisitorHome />
    </div>


  )
}

/**
 * CONTAINER
 */
export const mapState = (state) => {
  return {
    email: state.user.email,
  }
}


export default connect(mapState, null)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
