import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AppleItem from './appleitem'

import store, {fetchCart, me, editOrder, fetchCartApples} from '../store'

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCart: true
        }
    }

    componentDidMount(){
        this.props.me()
        this.props.fetchCart()
        this.props.fetchCartApples()
    }

    render(){
        const order = this.props.order;
        let date = order.createdAt;
        const apples = this.props.apples;
        let totalAmount = 0;
        let totalQuantity = 0;
        if(date){
            date = order.createdAt.split('T')[0];
        }
        if(apples){
            apples.forEach(apple => {
                totalAmount += apple.price;
                totalQuantity += apple.lineItem.quantity;
            })
        }

        return(
            <div>
                <h1>Your Cart</h1>
                <h4>{`Order Date: ${date}`}</h4>
                <h4>{`Number of Items: ${totalQuantity}`}</h4>
                <h4>{`Total Price: $${totalAmount}`}</h4>
                {apples && apples.map((apple, i, arr) => {
                    return(
                        <ul key={apple.id}>
                            <li><AppleItem apple={apple} isCart={this.state.isCart} /></li>
                            <li>{`Quantity: ${apple.lineItem.quantity}`}</li>
                        </ul>
                    )
                })}
            </div>
        )
    }
}

const mapState = (state) => {
    console.log('HERE', state)
    return {
      order: state.activeOrder,
      user: state.user,
      apples: state.apples
    }
  }
  
  const mapDispatch = {fetchCart, me, editOrder, fetchCartApples}
  
  export default connect(mapState, mapDispatch)(Cart)