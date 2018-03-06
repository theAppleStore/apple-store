import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AppleItem from './appleitem'

import store, { fetchCart, me, editOrder, fetchCartApples, fetchApples, fetchUnauthorizedCart, postUnauthorizedOrder } from '../store'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCart: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.me()
      .then(userAction => {
        if (Object.keys(userAction.user).length) {
          this.props.fetchCart()
          this.props.fetchCartApples()
        } else {
          this.props.fetchApples()
          this.props.fetchUnauthorizedCart()
        }
      })
  }
  
  handleClick(){
    const {user, order, editOrder, postUnauthorizedOrder} = this.props
    console.log('order', order)
    if (Object.keys(user).length) {
      const updatedOrder = {
        ...order,
        status: 'Processing'
      }
      editOrder(order.id, updatedOrder)
    } else {
      postUnauthorizedOrder(order)
    }
  }

  render() {
    const order = this.props.order;
    const keys = Object.keys(order)
    let date = order.createdAt;
    let apples
    if (Object.keys(this.props.user).length) {
      apples = this.props.apples
    } else {
      apples = []
      keys.forEach(id => {
        let appleObj = this.props.apples.find(apple => +id === apple.id)
        apples.push(appleObj)
      })
    }

    let totalAmount = 0;
    let totalQuantity = 0;
    if (Object.keys(this.props.user).length && apples) {
      apples.forEach(apple => {
        if (apple.lineItem) {
          totalAmount += apple.price * apple.lineItem.quantity;
          totalQuantity += apple.lineItem.quantity;
        }
      })
    } else if (apples[0]) {
      for (let key in order) {
        totalQuantity += order[key]
      }
      apples.forEach(apple => totalAmount += apple.price * order[apple.id])
    }

    return (
      <div className="center">
        <h1 className="text-info">Review Order</h1>
        <h4 className="text-info">{`Number of Items: ${totalQuantity}`}</h4>
        <h4 className="text-info">{`Total Price: $${totalAmount}`}</h4>
        {apples[0] && apples.map((apple, i, arr) => {
          let quantity;
          if (Object.keys(this.props.user).length && apple.lineItem) {
            quantity = apple.lineItem.quantity
          } else {
            quantity = order[apple.id]
          }
          return (
            <ul key={apple.id}>
              <li><AppleItem apple={apple} isCart={this.state.isCart} /></li>
              <li>{`Quantity: ${quantity}`}</li>
            </ul>
          )
        })}
        <NavLink to="/thank-you">
          <button className="btn btn-warning" onClick={this.handleClick}>Submit Order</button>
        </NavLink>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    order: state.activeOrder,
    user: state.user,
    apples: state.apples
  }
}

const mapDispatch = { fetchCart, me, editOrder, fetchCartApples, fetchApples, fetchUnauthorizedCart, postUnauthorizedOrder }

export default connect(mapState, mapDispatch)(Cart)