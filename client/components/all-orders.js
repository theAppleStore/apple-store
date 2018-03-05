import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

import store, {fetchAllOrders, fetchUsersOrders} from '../store'

/* COMPONENT */
class AllOrders extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    const userId = this.props.match.params.userId
    if(userId){
      this.props.fetchUsersOrders(userId)
    } else {
      this.props.fetchAllOrders()
    }
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value})
  }
  
  render(){
    const orders = this.props.orders.filter(order => {
        let num = order.id.toString();
        return num.match(this.state.inputValue);
    })
    const userId = this.props.match.params.userId
    return (
      <div>
        {userId ? <h1>Your Past Orders</h1> : <h2> All Orders </h2>}
        <form>
          <h3>Search: 
            <input 
              placeholder="Enter order number" 
              onChange={this.handleChange}
            />
          </h3>
        </form>
        {orders && orders.map(order => 
          (
            <div key={order.id}>
              <NavLink to={`/orders/single/${order.id}`}> 
                 {`Order ID: ${order.id}`} 
              </NavLink>
              <br></br>
            </div>
          )
        )}
      </div>
    )
  }

}

/* CONTAINER */
const mapState = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  if(userId){
    return {orders: state.placedOrders}
  } else {
    return {orders: state.orders}
  }
}
const mapProps = {fetchAllOrders, fetchUsersOrders}

export default connect(mapState, mapProps)(AllOrders)

