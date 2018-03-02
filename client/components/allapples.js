import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store, { fetchApples } from "../store";
import AppleItem from "./appleitem";

class AllApples extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchApples(this.props.match.params.category);
  }

  render() {
    const apples = this.props.apples;
    const category = this.props.match.params.category;
    return (
      <div>
        {category ? <h1>{`${category[0].toUpperCase() + category.slice(1)} Apples`}</h1> : <h1>All Apples</h1>}
          {apples && apples.map(apple => {
            return(
              <div>
                <ul>
                  <li key={apple.id}><AppleItem apple={apple} /></li>
                </ul>
              </div>
            )
          })}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    apples: state.apples
  };
};

const mapDispatch = {fetchApples}

const AllApplesContainer = connect(mapStateToProps, mapDispatch)(AllApples);
export default AllApplesContainer;
