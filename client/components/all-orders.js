import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

import store, {fetchAllOrders} from '../store'

/* COMPONENT */
class AllOrders extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
      orders: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.props.fetchAllOrders()
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value})
  }
  
  render(){
    const orders = this.props.orders.filter(order => {
        let num = order.id.toString();
        return num.match(this.state.inputValue);
    })
    return (
      <div>
        <h2> All Orders </h2>
        <form>
          <h3>Search: 
            <input 
              placeholder="Enter order number" 
              onChange={this.handleChange}
            />
          </h3>
        </form>
        {orders.map(order => 
          (
            <div key={order.id}>
              <NavLink to={`/orders/${order.id}`}> 
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
const mapState = (state) => {
  return {orders: state.orders}
}
const mapProps = {fetchAllOrders}

export default connect(mapState, mapProps)(AllOrders)

