//Story: As a visitor, I want to see a home page that displays a welcome banner and the categories (Red and Green) below, which click to filter list of apples in that category

//Implementation: Create HomePage component and links to the category pages

import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../store";

/**
 * COMPONENT
 */
export function VisitorHome() {
  return (
    <div>
      <div className="banner-welcome">
        <h1>Welcome!</h1>
      </div>

      <div className="categories">
        <NavLink className="category-product" to="/greenapples">
          <img name="green" src="/images/category-greenApple.png" />
        </NavLink>

        <NavLink className="category-product" to="/redapples">
          <img name="red" src="/images/category-redApple.png" />
        </NavLink>
      </div>
    </div>
  );
  // }
}

export default connect(null, null)(VisitorHome);

/**
 * PROP TYPES
 */
