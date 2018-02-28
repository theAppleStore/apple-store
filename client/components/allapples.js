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
    console.log("HI");
    this.props.mountApples();
  }

  renderApples(category) {
let filteredList;
    if (category === 'all') {
      console.log('RENDER ALL')
      filteredList = this.props.apples
    }
    filteredList = this.props.apples.filter(
      apple => apple.category === category
    );
    console.log('filteredLIst', filteredList)
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
    console.log("ALLAPPLES", this.props);
    return <div>{this.props.currentCategory && this.renderApples(this.props.currentCategory)}</div>;
  }
}

const mapStateToProps = function(state) {
  console.log(state);
  return {
    apples: state.apples,
    currentCategory: state.currentCategory
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
