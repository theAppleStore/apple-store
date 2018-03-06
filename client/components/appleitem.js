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
           <div className = "center" >
           <br></br>
               <NavLink to={`/apples/${apple.id}`} ><h1 className = "text-success">{apple.name}</h1></NavLink>
               <br></br>
                <img  src = {apple.image}/>
                <h3 className = "text-muted">{`$${apple.price}`}</h3>
                <br></br>
                {/* when adding style in the ternary it only renders one apple on apples */}
                {this.props.isCart ? <button onClick={this.handleDelete} className= "btn btn-primary">Remove from Cart</button> 
                : apple.stock > 0 ? <button onClick={this.handleClick} className = "btn btn-primary">Add To Cart</button>
                : <p>Out of Stock</p> }
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