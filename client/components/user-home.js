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
      <h1 className = "text-primary center">Welcome, {email}</h1>
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
