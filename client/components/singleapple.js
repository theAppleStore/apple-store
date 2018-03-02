import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store, { fetchAppleById, getAppleById } from "../store";
import AppleItem from "./appleitem";

//not yet set up 
//import Reviews from "./reviews"

class SingleApple extends React.Component{
    constructor(props) {
        super(props);
      }
    componentDidMount() {
        console.log(this.props.match.params.id)
      this.props.fetchAppleById(this.props.match.params.id);
      }
      render(){
        const apple = this.props.apple
        console.log("I am in render", apple)
        return (
            <div>
                <h1>{apple.name} </h1>
                <img src = {apple.image} />
                <p>{apple.description}</p>
                {apple.stock > 0 ? (<p>{apple.stock} in stock</p>) 
                : (<p>Out of Stock</p>) }
            </div>

        )
    }
}

const mapStateToProps = function(state) {
    console.log("i am in map state", state.singleapple)
    
    return {
      apple: state.singleapple,
    };
  };

const mapDispatch = {fetchAppleById}
  
const SingleApplesContainer = connect(mapStateToProps, mapDispatch)(SingleApple);
export default SingleApplesContainer;

// export default SingleApple;

