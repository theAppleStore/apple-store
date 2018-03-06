import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import store, {fetchUser} from '../store'

/**
 * COMPONENT
 */
class SingleUser extends Component {
  constructor(props) {
    super(props)
    this.renderAuthorizedUser.bind(this)
    this.renderUnauthorizedUser.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.fetchUser(id);
  }

  render() {
    const {authorizedUser, user} = this.props
    const loggedIn = Object.keys(authorizedUser).length
    const profile = authorizedUser.isAdmin ? user : authorizedUser
    return (
      <div>
      {
        loggedIn 
        ? this.renderAuthorizedUser(profile)
        : this.renderUnauthorizedUser()
      }
      </div>
    )
  }

  renderUnauthorizedUser(){
    return (
      <h2> Unathorized access </h2>
    )
  }

  renderAuthorizedUser(user){
    return (
      <div>
        <h3>{user.firstName} {user.lastName}</h3>
        <h4> Shipping Address: {user.shipping} </h4>
        <h4> Phone Number: {user.phone} </h4>
        <h4> Email: {user.email} </h4>
        <NavLink to={`/users/${user.id}/edit`}> <button className="btn btn-primary"> Edit </button> </NavLink>

        <h3> Orders: </h3>
        {
          user.orders && user.orders.length === 0
            ? <h4> You have no past orders </h4>
            : null
        }
        {user.orders &&
          user.orders.map(order => {
            return (
              <div key={order.id}>
                <NavLink to={`/orders/single/${order.id}`}>
                  <div> Order #{order.id} </div>
                </NavLink>
                <div> Status: {order.status} </div>
                <br></br>
              </div>
            )
          })
        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({userProfile, user}) => ({user: userProfile, authorizedUser: user})
const mapProps = {fetchUser}

export default connect(mapState, mapProps)(SingleUser)

/**
 * PROP TYPES
 */
SingleUser.propTypes = {
  user: PropTypes.object,
  fetchUser: PropTypes.func
}
