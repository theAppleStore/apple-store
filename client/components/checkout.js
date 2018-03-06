import React, {Component} from 'react'
import { connect } from 'react-redux'
import store, {me, updateUser} from '../store'
import { NavLink } from 'react-router-dom'

class Checkout extends Component {
  constructor(props){
      super(props);
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
      this.props.me()
      
  }

  handleChange(event){
      const form = event.target.parentNode
      this.setState({
        firstNameInput: form.firstName.value,
        lastNameInput: form.lastName.value,
        emailInput: form.email.value,
        shippingInput: form.shipping.value,
        phoneInput: form.phone.value
      })
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
    }
    updateUser(userId, updatedUser, history)
  }

  render(){
    const {user} = this.props
    const {firstNameInput, lastNameInput, emailInput, shippingInput, phoneInput} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2> Shipping Information </h2>
          <div>
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
          </div>
          <br></br>
          <h2> Payment Information </h2>              
          <div>
            <h3> Name: </h3>
            <input />
            <h3> Credit Card: </h3>
            <input />
            <h3> Expiration Date: </h3>
            <input />
          </div>
          <br></br>
          <NavLink to="/reviewcart" params={this.state}> 
            <button className="btn btn-warning"> Continue to Review </button> 
          </NavLink>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
    return {
        user: state.user
    }
}

const mapDispatch = {me, updateUser}

export default connect(mapState, mapDispatch)(Checkout)