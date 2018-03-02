import React from 'react'
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import SingleApple from './singleapple'
import store, {editOrder, postNewOrder, me, fetchOrder} from '../store'
import { connect } from 'react-redux'

class AppleItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            apples: [],
            userId: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log('ITEM', this.props)
        this.props.me()
    }

    handleClick(event){
        const {postNewOrder, editOrder, activeOrder, user, fetchOrder, apple} = this.props
        const order = {
            userId: user.id,
            appleId: apple.id,
            quantity: 1,
            price: apple.price
        }
        postNewOrder(order)
    }

    render(){
        const apple = this.props.apple;
        return (
           <div>
                <img src = {apple.image}/>
                <NavLink to={`/apples/${apple.id}`}>{apple.name}</NavLink>
                <p>{`$${apple.price}`}</p>
                <button onClick={this.handleClick}>Add to Cart</button>
           </div>
        )}
    }

const mapState = ({user, activeOrder}, ownProps) => {
    console.log(ownProps)
    return {user, activeOrder}
}
const mapDispatch = {editOrder, postNewOrder, me, fetchOrder}

export default connect(mapState, mapDispatch)(AppleItem);