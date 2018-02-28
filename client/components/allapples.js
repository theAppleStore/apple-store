import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store, { fetchApples, fetchByCategory } from "../store";
import AppleItem from "./appleitem";

class AllApples extends React.Component {
  constructor(props) {
    super(props);
    // this.renderApples = this.renderApples.bind(this);
  }

  componentDidMount() {
    console.log(this.props.match.params.category)
    this.props.mountApples(this.props.match.params.category);
  }

  // renderApples(category) {
  //   let filteredList = this.props.apples.filter(
  //     apple => apple.category === category
  //   );
  //   return (
  //     <div>
  //       <h1>{category} Apples</h1>
  //       <ul className="apple-list">
  //         {filteredList.map(apple => (
  //           <ul key={apple.id}>
  //             <AppleItem apple={apple} />
  //           </ul>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }

  render() {
    // let redOrGreen = this.props.apples.filter(
    //   apple => apple.category === category
    // );
    return (
      <div>
        <ul>
          {this.props.apples.map(apple => {
            <li key={apple.id}><AppleItem apple={apple} /></li>
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    apples: state.apples,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    mountApples: function(category) {
      dispatch(fetchApples(category));
    }, 
    // mountByCategory: function(category) {
    //   dispatch(fetchByCategory(category))
    // }
  };
};

const AllApplesContainer = connect(mapStateToProps, mapDispatchToProps)(
  AllApples
);
export default AllApplesContainer;
