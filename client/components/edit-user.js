import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

import store, {fetchUser, updateUser} from '../store'

/* COMPONENT */
class EditProfile extends Component {
  constructor(props){
    super(props)
    const {user} = props
    this.state = {
      firstNameInput: user.firstName || '',
      lastNameInput: user.lastName || '',
      emailInput: user.email || '',
      shippingInput: user.shipping || '',
      phoneInput: user.phone || '', 
      isAdminInput: user.isAdmin || false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount(){
    const {id} = this.props.match.params
    this.props.fetchUser(id)
  }

  handleChange(event){
    const form = event.target.parentNode
    this.setState({
      firstNameInput: form.firstName.value,
      lastNameInput: form.lastName.value,
      emailInput: form.email.value,
      shippingInput: form.shipping.value,
      phoneInput: form.phone.value, 
    })
  }
  
  handleSelect(event){
    let boolean = event.target.value === 'Admin' ? true : false
    this.setState({isAdminInput: boolean})
  }

  handleSubmit(event){
    event.preventDefault()
    const {updateUser, history} = this.props
    const userId = this.props.user.id
    const form = event.target
    const updatedUser = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      shipping: form.shipping.value,
      phone: form.phone.value, 
      isAdmin: this.state.isAdminInput
    }
    updateUser(userId, updatedUser, history)
  }


  render(){
    const {user, authenticatedUser} = this.props
    const {firstNameInput, lastNameInput, emailInput, shippingInput, phoneInput, isAdminInput} = this.state
    const isAdmin = isAdminInput === true ? 'Admin' : 'Regular'
    return (
      <div>
        <h2> Edit Profile </h2>
        <form onSubmit={this.handleSubmit}>
          <h3> First Name: </h3>
          <input
            value={firstNameInput}
            name="firstName"
            onChange={this.handleChange}
          />
          <h3> Last Name: </h3>
          <input
            value={lastNameInput}
            name="lastName"
            onChange={this.handleChange}            
          />
          <h3> Email: </h3>
          <input
            value={emailInput}
            name="email"
            onChange={this.handleChange}
          />
          <h3> Shipping Address: </h3>
          <input
            value={shippingInput}
            name="shipping"
            onChange={this.handleChange}
          />
          <h3> Phone Number: </h3>
          <input
            value={phoneInput}
            name="phone"
            onChange={this.handleChange}
          />
          {
            authenticatedUser.isAdmin 
            ? <h3> User Privileges: 
              <select onChange={this.handleSelect} value={isAdmin}>
                <option> Regular </option>
                <option> Admin </option>
              </select>
            </h3>
            : null
          }
          <button> Submit </button>
        </form>
      </div>
    )
  }
}

/* CONTAINER */

// 'user' refers to the profile of the user we want to look at
// 'authenticatedUser' is the user that is logged in
const mapState = ({userProfile, user}) => ({user: userProfile, authenticatedUser: user})
const mapProps = {fetchUser, updateUser}

export default connect(mapState, mapProps)(EditProfile)


/* PROP TYPES */
EditProfile.propTyeps = {
  user: PropTypes.object,
  authenticatedUser: PropTypes.object,
  fetchUser: PropTypes.func,
  updateUser: PropTypes.func,
}
