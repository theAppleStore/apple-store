import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AppleItem from './appleitem'

import store, {fetchCart, me, editOrder} from '../store'

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        this.props.me()
        .then(user => this.props.fetchCart(user.id))
    }

    render(){
        const order = this.props.order;
        let date = order.createdAt;
        const apples = order.apples;
        let totalAmount = 0;
        let totalQuantity = 0;
        if(date){
            date = order.createdAt.split('T')[0];
        }
        if(apples){
            order.apples.forEach(apple => {
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
                {order.apples && order.apples.map((apple, i, arr) => {
                    return(
                        <ul key={apple.id}>
                            <li><AppleItem apple={apple} /></li>
                            <li>{`Quantity: ${apple.lineItem.quantity}`}</li>
                        </ul>
                    )
                })}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      order: state.activeOrder,
      user: state.user
    }
  }
  
  const mapProps = {fetchCart, me, editOrder}
  
  export default connect(mapState, mapProps)(Cart)