//Story: As a visitor, I want to see a home page that displays a welcome banner and the categories (Red and Green) below, which click to filter list of apples in that category

//Implementation: Create HomePage component and links to the category pages

import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store, { fetchApples } from "../store";
import { setCurrentCategory } from '../store/category';


/**
 * COMPONENT
 */
class VisitorHome extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount() {
    console.log("HI HOME");
    this.props.mountApples();
  }

  handleClick(evt) {
    console.log('CLICKWWWWWWWWWW', evt.target.name)
this.props.setCategory(evt.target.name)
  }

  render() {
    const { apples } = this.props;
    console.log("THIIISSS", apples);
    return (
      <div>
        <div className="banner-welcome">
          <h1>Welcome!</h1>
        </div>

        <div className="categories">
          <div
            onClick={this.handleClick}
            className="category-green"
            name="green"
          >
            <NavLink className="category-product" to="/apples">
              <img name="green" src="/images/category-greenApple.png" />
            </NavLink>
          </div>
          <NavLink
            className="category-product"
            onClick={this.handleClick}
            to="/apples"
          >
            <img name="red" src="/images/category-redApple.png" />
          </NavLink>
        </div>
      </div>
    );
  }
}



/**
 * CONTAINER
 */
const mapStateToProps = function(state) {
  console.log(state);
  return {
    apples: state.apples
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    mountApples: function() {
      dispatch(fetchApples());
    },
    setCategory: function(category) {
dispatch(setCurrentCategory(category))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitorHome);

/**
 * PROP TYPES
 */

VisitorHome.propTypes = {
  //email: PropTypes.string
};
