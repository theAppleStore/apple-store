import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'


export default class AppleItem extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const apple = this.props.apple;
        return (
           <div>
                <img src = {apple.image}/>
                <NavLink to={`/apples/${apple.id}`}>{apple.name}</NavLink>
                <p>{`$${apple.price}`}</p>
           </div>
        )}
    }