import React from 'react'
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import SingleApple from './singleapple'
import store, {editOrder, postNewOrder, me, fetchOrder, deleteFromCart, fetchCart, addUnauthorizedCart, deletefromUnauthorized, putCart, putUnauthorizedCart} from '../store'
import { connect } from 'react-redux'

class AppleItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: 0,
            quantityInput: 1 
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.me()
        console.log(this.props)
    }

    handleClick(event){
        const {postNewOrder, user, apple, addUnauthorizedCart} = this.props
        const order = {
            userId: user.id,
            appleId: apple.id,
            quantity: this.state.quantityInput,
            price: apple.price
        }
        if (Object.keys(user).length) {
            postNewOrder(order) 
        }
        else {
            addUnauthorizedCart(order)
        }
    }

    handleUpdate(){
        let input = +this.state.quantityInput;
        if (this.props.user.id) {
            let appleQuantity = this.props.apple.lineItem.quantity;
            this.props.putCart(this.props.apple.id, this.props.activeOrder.id, {quantity: input})
        } else {
            this.props.putUnauthorizedCart(this.props.apple.id, {quantity: input})
        }
    }

    handleDelete(){
        if (Object.keys(this.props.user).length) {
            this.props.deleteFromCart(this.props.apple.id);
        } else {
            this.props.deletefromUnauthorized(this.props.apple.id);
        }
    }

    handleChange(evt){
        this.setState({quantityInput: evt.target.value})
    }

    render(){
        let quantity;
        const apple = this.props.apple;
        if (Object.keys(this.props.user).length && this.props.apple.lineItem){
            quantity = this.props.apple.lineItem.quantity;
        } else {
            quantity = this.props.activeOrder[apple.id];
        }
        return (
           <div className = "center">
               <NavLink to={`/apples/${apple.id}`} ><h1 className = "text-success">{apple.name}</h1></NavLink>
                <img  src = {apple.image}/>
                <h3 className = "text-muted">{`$${apple.price} each`}</h3>
                    {this.props.isCart ?
                    <div>
                        <p>Quantity: {quantity}</p>
                        <input onChange={this.handleChange} value={this.state.quantityInput} name='quantity' size='2'/>&nbsp;
                        <button onClick={this.handleUpdate} className= "btn btn-primary">Update Cart</button> 
                        <br></br><br></br>
                        <button onClick={this.handleDelete} className= "btn btn-primary">Remove from Cart</button> 
                    </div>
                    : <div>
                        <p>Quantity:</p>
                        <input onChange={this.handleChange} value={this.state.quantityInput} name='quantity' size='2'/>
                        <button onClick={this.handleClick} className= "btn btn-primary">Add to Cart</button>
                    </div>}
                    <br></br>
            </div>
        )}
    }

const mapState = (state, ownProps) => {
    return {
        user: state.user, 
        activeOrder: state.activeOrder}
}
const mapDispatch = {editOrder, postNewOrder, me, fetchOrder, deleteFromCart, fetchCart, addUnauthorizedCart, deletefromUnauthorized, putCart, putUnauthorizedCart}

export default connect(mapState, mapDispatch)(AppleItem);