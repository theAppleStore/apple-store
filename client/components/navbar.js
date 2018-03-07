import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <div>
    <div className = "navbar-dark bg-primary">
    <Link to="/">
      <h1>
        <img src="/images/logo.png" height="55" width="45" />
      THE APPLE STORE
      </h1>
    </Link>
    </div>
    <nav className = "navbar-dark bg-dark">
      {isLoggedIn ? (
        <div>
        {/* The navbar will show these links after you log in */}
          <Link to={`/${user.id}`}><h2>Home</h2></Link>
          <Link to="/apples"><h2>Apples</h2> </Link>
          <Link to={`/users/${user.id}`}><h2>Profile</h2></Link>
          <Link to="/cart"><h2>Cart</h2></Link>
          <a href="#" onClick={handleClick}>
            <h2>Logout</h2>
          </a>
          {
            user.isAdmin 
            ? <div>
              <Link to="/users"><h3>Users</h3> </Link>
              <Link to ="/orders"><h3>Orders</h3> </Link>
            </div>
            : null 
          }
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/"><h2>Home</h2></Link>
          <Link to="/apples"><h2>Apples</h2></Link>
          <Link to="/login"><h2>Login</h2></Link>
          <Link to="/signup"><h2>Sign Up</h2></Link>
          <Link to="/cart"><h2>Cart</h2></Link>
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
