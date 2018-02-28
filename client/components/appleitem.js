import React from 'react'
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import SingleApple from './singleapple'

export default class AppleItem extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event){
        console.log("single page view activated", event);
        
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