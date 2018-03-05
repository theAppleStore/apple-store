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
                if (apple.lineItem){
                totalQuantity += apple.lineItem.quantity;
                }
            })
        }

        return(
            <div className = "center">
                <h1 className = "text-info">Your Cart</h1>
                <h4 className = "text-info">{`Order Date: ${date}`}</h4>
                <h4 className = "text-info">{`Number of Items: ${totalQuantity}`}</h4>
                <h4 className = "text-info">{`Total Price: $${totalAmount}`}</h4>
                {apples && apples.map((apple, i, arr) => {
                    return(
                        <ul key={apple.id}>
                            <li><AppleItem apple={apple} isCart={this.state.isCart} /></li>
                            {
                              apple.lineItem &&
                              <li>{`Quantity: ${apple.lineItem.quantity}`}</li>
                            }
                        </ul>
                    )
                })}
                <button className = "btn btn-warning"><NavLink to='/checkout'>Continue to Checkout</NavLink></button>
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
  
  const mapDispatch = {fetchCart, me, editOrder, fetchCartApples}
  
  export default connect(mapState, mapDispatch)(Cart)