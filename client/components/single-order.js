import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AppleItem from './appleitem'

import store, {fetchOrder, me, editOrder} from '../store'

class SingleOrder extends Component {
    constructor(props){
        super(props);
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.props.fetchOrder(this.props.match.params.id);
        this.props.me()
    }

    handleChange(evt){
        this.setState({...this.props.order, status: evt.target.value})
    }

    handleSubmit(evt){
        evt.preventDefault();
        const updated = this.state;
        this.props.editOrder(this.props.order.id, updated)
        .then(() => this.props.fetchOrder(this.props.match.params.id))
    }

    render(){
        const order = this.props.order
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
                <h1>{`Order #${order.id}`}</h1>
                {this.props.user.isAdmin ?
                    <div> 
                        <h3>Status: </h3>
                        <form>
                            <select onChange={this.handleChange}>
                                <option value='Completed'>Completed</option>
                                <option value='Processing'>Processing</option>
                                <option value='Created'>Created</option>
                                <option value='Cancelled'>Cancelled</option>
                            </select>
                            <button onClick={this.handleSubmit}>Update</button>
                        </form>
                    </div>
                    : <h3>{`Status: ${order.status}`}</h3> 
                 }
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
      order: state.order,
      user: state.user
    }
  }
  
  const mapProps = {fetchOrder, me, editOrder}
  
  export default connect(mapState, mapProps)(SingleOrder)