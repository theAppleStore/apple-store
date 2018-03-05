import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AppleItem from './appleitem'

import store, {fetchCart, me, editOrder, fetchCartApples, fetchApples, fetchUnauthorizedCart} from '../store'

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCart: true
        }
    }

    componentDidMount(){
        if (Object.keys(this.props.user).length){
            this.props.me()
            this.props.fetchCart()
            this.props.fetchCartApples()
        } else {
            this.props.fetchApples()
            this.props.fetchUnauthorizedCart()
        }
    }

    render(){
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
        console.log('APPLES', apples)
        
        let totalAmount = 0;
        let totalQuantity = 0;
        if(Object.keys(this.props.user).length && apples){
            apples.forEach(apple => {
                totalAmount += apple.price*apple.lineItem.quantity;
                if (apple.lineItem){
                totalQuantity += apple.lineItem.quantity;
                }
            })
        } else if (apples[0]) {
            for (let key in order) {
                totalQuantity += order[key]
            }
            apples.forEach(apple => totalAmount += apple.price*order[apple.id])
        }

        return(
            <div>
                <h1>Your Cart</h1>
                <h4>{`Number of Items: ${totalQuantity}`}</h4>
                <h4>{`Total Price: $${totalAmount}`}</h4>
                {apples[0] && apples.map((apple, i, arr) => {
                    let quantity;
                    if(Object.keys(this.props.user).length && apple.lineItem){
                        quantity = apple.lineItem.quantity
                    } else {
                        quantity = order[apple.id]
                    }
                    return(
                        <ul key={apple.id}>
                            <li><AppleItem apple={apple} isCart={this.state.isCart} /></li>
                            <li>{`Quantity: ${quantity}`}</li>
                        </ul>
                    )
                })}
                <button><NavLink to='/checkout'>Continue to Checkout</NavLink></button>
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
  
  const mapDispatch = {fetchCart, me, editOrder, fetchCartApples, fetchApples, fetchUnauthorizedCart}
  
  export default connect(mapState, mapDispatch)(Cart)