import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store, { fetchApples } from "../store";
import AppleItem from "./appleitem";
import { NavLink } from "react-router-dom";

class AllApples extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('ALl APPLES RENDERING')
    this.props.fetchApples(this.props.match.params.category);
  }

  render() {
    const { apples, isAdmin } = this.props;
    const category = this.props.match.params.category;

    return (
      <div>
        <div className="apple-list">
          {category ? (
            <h1>{`${category[0].toUpperCase() + category.slice(1)} Apples`}</h1>
          ) : (
           <h1 className = "center text-info">Our Current Selection</h1>
          )}
          <ul>
            {apples &&
              apples.map(apple => {
                return (
                  <li key={apple.id}>
                    <AppleItem apple={apple} />
                  </li>
                );
              })}
          </ul>
        </div>
        {isAdmin && (
          <NavLink className="add-apple" to="/apples/edit">
            <button class = "btn btn-primary">Add Apple</button>
          </NavLink>
        )}
  
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    apples: state.apples,
    isAdmin: !!state.user.isAdmin
  };
};

const mapDispatch = { fetchApples };

const AllApplesContainer = connect(mapStateToProps, mapDispatch)(AllApples);
export default AllApplesContainer;

// AllApples.propTypes = {
//   apples: PropTypes.array,
//   isAdmin: PropTypes.boolean
// }
