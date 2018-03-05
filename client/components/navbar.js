import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <div>
    <Link to="/">
      <h1>
        <img src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX26650293.jpg" height="55" width="45" />
      THE APPLE STORE
      </h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
        {/* The navbar will show these links after you log in */}
          <Link to={`/${user.id}`}>Home</Link>
          <Link to="/apples"> Apples </Link>
          <Link to="/cart"> Cart </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {
            user.isAdmin 
            ? <div>
              <Link to="/users"> Users </Link>
              <Link to ="/orders"> Orders </Link>
            </div>
            : null 
          }
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/"> Home </Link>
          <Link to="/apples"> Apples </Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart"> Cart </Link>
        </div>
      )}
      
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
