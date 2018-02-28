import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store, { fetchApples } from "../store";
import AppleItem from "./appleitem";

//not yet set up 
//import Reviews from "./reviews"

export default class SingleApple extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.renderApples = this.renderApples.bind(this);
    //   }
    //   componentDidMount() {
    //     this.props.mountApples();
    //   }
    render() {
    //     console.log(this.props.apple.name);
    //     const currentApple = this.props.apple
    // }
    return (
        <div>
             {/* <h1>{currentApple.name}</h1>
             <ul>
                 <li>{currentApple.price}</li>
                <li>{currentApple.description}</li>
                 {}
                 <button>Buy</button>
             </ul> */}
        </div>
    )

}

// const mapStateToProps = function(state, ownProps) {
//     return {
//       apples: state.apples,
//       path: ownProps.match.url
//     };
//   };
  
//   const mapDispatchToProps = function(dispatch) {
//     return {
//       mountApples: function() {
//         dispatch(fetchApples());
//       }
//     };
 };