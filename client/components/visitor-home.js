//Story: As a visitor, I want to see a home page that displays a welcome banner and the categories (Red and Green) below, which click to filter list of apples in that category

//Implementation: Create HomePage component and links to the category pages

import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store, { fetchApples, setCurrentCategory } from "../store";


/**
 * COMPONENT
 */
export function VisitorHome() {
  // constructor(props) {
  //   super(props);
  //   this.handleClick = this.handleClick.bind(this);
  // }

  // handleClick(evt) {
  //   this.props.setCategory(evt.target.name);
  // }

  // render() {

    return (
      <div>
        <div className="banner-welcome">
          <h1>Welcome!</h1>
        </div>

        <div className="categories">

            <NavLink className="category-product" to="/apples/green">
              <img name="green" src="/images/category-greenApple.png" />
            </NavLink>



            <NavLink className="category-product" to="/apples/red">
              <img name="red" src="/images/category-redApple.png" />
            </NavLink>

        </div>
      </div>
    );
  // }
}

/**
 * CONTAINER
 */

// const mapDispatchToProps = function(dispatch) {
//   return {
//     setCategory: function(category) {
//       dispatch(setCurrentCategory(category));
//     }
//   };
// };

export default connect(null, null)(VisitorHome);

/**
 * PROP TYPES
 */

