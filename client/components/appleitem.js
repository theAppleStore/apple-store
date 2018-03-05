import React from 'react'
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import SingleApple from './singleapple'
import store, {editOrder, postNewOrder, me, fetchOrder, deleteFromCart, fetchCart, addUnauthorizedCart, deletefromUnauthorized} from '../store'
import { connect } from 'react-redux'

class AppleItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            apples: [],
            userId: 0
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.me()
    }

    handleClick(event){
        const {postNewOrder, user, apple, addUnauthorizedCart} = this.props
        const order = {
            userId: user.id,
            appleId: apple.id,
            quantity: 1,
            price: apple.price
        }
        if (Object.keys(user).length) {
            postNewOrder(order) 
        }
        else {
            addUnauthorizedCart(order)
        }
    }

    handleDelete(){
        if (Object.keys(this.props.user).length) {
            this.props.deleteFromCart(this.props.apple.id)
        }
        else {
            this.props.deletefromUnauthorized(this.props.apple.id)
        }
    }

    render(){
        const apple = this.props.apple;
        return (
           <div>
                <img src = {apple.image}/>
                <NavLink to={`/apples/${apple.id}`}>{apple.name}</NavLink>
                <p>{`$${apple.price}`}</p>
                {this.props.isCart ? <button onClick={this.handleDelete}>Remove from Cart</button> 
                : <button onClick={this.handleClick}>Add to Cart</button>}
                <br></br>
           </div>
        )}
    }

const mapState = (state, ownProps) => {
    return {
        user: state.user, 
        activeOrder: state.activeOrder}
}
const mapDispatch = {editOrder, postNewOrder, me, fetchOrder, deleteFromCart, fetchCart, addUnauthorizedCart, deletefromUnauthorized}

export default connect(mapState, mapDispatch)(AppleItem);