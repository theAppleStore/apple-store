import React from 'react'
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import SingleApple from './singleapple'
import store, {editOrder, postNewOrder, me, fetchOrder, deleteFromCart, fetchCart} from '../store'
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
        const {postNewOrder, user, apple} = this.props
        const order = {
            userId: user.id,
            appleId: apple.id,
            quantity: 1,
            price: apple.price
        }
        postNewOrder(order)
    }

    handleDelete(){
        this.props.deleteFromCart(this.props.apple.id)
        this.props.fetchCart();
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
                : <button  onClick={this.handleClick} className= "btn btn-primary">Add to Cart</button>}
                <br></br>
           </div>
        )}
    }

const mapState = (state, ownProps) => {
    return {
        user: state.user, 
        activeOrder: state.activeOrder}
}
const mapDispatch = {editOrder, postNewOrder, me, fetchOrder, deleteFromCart, fetchCart}

export default connect(mapState, mapDispatch)(AppleItem);