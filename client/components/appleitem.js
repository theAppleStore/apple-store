import React from 'react'
import PropTypes from 'prop-types'



export default class AppleItem extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const apple = this.props.apple;
        return (
           <div>
                <img src = {apple.image}/>
                <p>{`$${apple.price}`}</p>
                <button>{apple.name}</button>
           </div>
        )}
    }