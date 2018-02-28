import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

import store, {fetchUser} from '../store'

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
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit(event){
    event.preventDefault()
    const userId = this.props.user.id
    const form = event.target
    const updatedUser = {
      firstNameInput: form.firstName.value,
      lastNameInput: form.lastName.value,
      emailInput: form.email.value,
      shippingInput: form.shipping.value,
      phoneInput: form.phone.value, 
    }

  }

  render(){
    const {user} = this.props
    const {firstNameInput, lastNameInput, emailInput, shippingInput, phoneInput} = this.state
    return (
      <div>
        <h2> Edit Profile </h2>
        <form onSubmit={this.handleSubmit}>
          <h3> First Name: </h3>
          <textarea
            value={firstNameInput}
            name="firstName"
            onChange={this.handleChange}
          />
          <h3> Last Name: </h3>
          <textarea
            value={lastNameInput}
            name="lastName"
            onChange={this.handleChange}            
          />
          <h3> Email: </h3>
          <textarea
            value={emailInput}
            name="email"
            onChange={this.handleChange}
          />
          <h3> Shipping Address: </h3>
          <textarea
            value={shippingInput}
            name="shipping"
            onChange={this.handleChange}
          />
          <h3> Phone Number: </h3>
          <textarea
            value={phoneInput}
            name="phone"
            onChange={this.handleChange}
          />
          <br></br>
          <button> Submit </button>
        </form>
      </div>
    )
  }
}

/* CONTAINER */


/* PROP TYPES */
const mapState = ({userProfile, user}) => ({user: userProfile, authenticatedUser: user})
const mapProps = {fetchUser}

export default connect(mapState, mapProps)(EditProfile)