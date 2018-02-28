import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store, { fetchApples } from "../store";
import AppleItem from "./appleitem";

class AllApples extends React.Component {
  constructor(props) {
    super(props);
    this.renderApples = this.renderApples.bind(this);
  }
  componentDidMount() {
    this.props.mountApples();
  }

  renderApples(category) {
    let filteredList = this.props.apples.filter(
      apple => apple.category === category
    );
    return (
      <div>
        <h1>{category} Apples</h1>
        <ul className="apple-list">
          {filteredList.map(apple => (
            <ul key={apple.id}>
              <AppleItem apple={apple} />
            </ul>
          ))}
        </ul>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.props.path === "/greenapples"
          ? this.renderApples("green")
          : this.renderApples("red")}
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    apples: state.apples,
    path: ownProps.match.url
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    mountApples: function() {
      dispatch(fetchApples());
    }
  };
};

const AllApplesContainer = connect(mapStateToProps, mapDispatchToProps)(
  AllApples
);
export default AllApplesContainer;
