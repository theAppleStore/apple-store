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
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.me()
    }

    handleClick(event, order){
        const {postNewOrder, user, apple, addUnauthorizedCart} = this.props
        // const order = {
        //     userId: user.id,
        //     appleId: apple.id,
        //     quantity: 1,
        //     price: apple.price
        // }
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

    handleChange(evt){
        const {user, apple} = this.props
        const order = {
            userId: user.id,
            appleId: apple.id,
            quantity: evt.target.value,
            price: apple.price
        }
        this.handleClick(null, order)
    }

    render(){
        const apple = this.props.apple;
        return (
           <div className = "center">
               <NavLink to={`/apples/${apple.id}`} ><h1 className = "text-success">{apple.name}</h1></NavLink>
                <img  src = {apple.image}/>
                <h3 className = "text-muted">{`$${apple.price}`}</h3>
                <br></br>
                    {this.props.isCart ?
                    <form>
                        <p>Change Quantity:</p>
                        <input onChange={this.handleChange} name='quantity'/> 
                        <button onClick={this.handleDelete} className= "btn btn-primary">Remove from Cart</button> 
                    </form>
                    : <form>
                        <p>Quantity:</p>
                        <input onChange={this.handleChange} defaultValue='1' name='quantity'/>
                        <button  onClick={this.handleClick} className= "btn btn-primary">Add to Cart</button>
                    </form>}
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