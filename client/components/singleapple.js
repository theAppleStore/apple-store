import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store, { fetchAppleById } from "../store";
import AppleItem from "./appleitem";

//not yet set up 
//import Reviews from "./reviews"

class SingleApple extends React.Component{
    constructor(props) {
        super(props);
      }
    componentDidMount() {
      this.props.fetchAppleById(this.props.match.params.id);
      }
      render(){
        const apple = this.props.match.params.id
        console.log(apple)
        return (
            <div>
                <h1>I am rendering, on item {apple}</h1>
                <img src = {apple.image} />
            
            </div>

        )
    }
}

const mapStateToProps = function(state) {
    console.log("i am in map state", state.apple)
    return {
      apple: state.apple,
    };
  };

const mapDispatch = {fetchAppleById}
  
const SingleApplesContainer = connect(mapStateToProps, mapDispatch)(SingleApple);
export default SingleApplesContainer;

// export default SingleApple;

