//Story: As a visitor, I want to see a home page that displays a welcome banner and the categories (Red and Green) below, which click to filter list of apples in that category

//Implementation: Create HomePage component and links to the category pages

import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Navbar } from './navbar';

/**
 * COMPONENT
 */
export const VisitorHome = props => {
  //const {} = props;

  return (
    <div>
      <Navbar />
      <div className="banner-welcome">
        <h1>Welcome!</h1>
      </div>

      <div className="categories">
        <NavLink className="category-product" to="/greenApples">
          <img src="/images/category-greenApple.png" />
        </NavLink>
        <NavLink className="category-product" to="/redApples">
          <img src="/images/category-redApple.png" />
        </NavLink>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    //email: state.user.email
  };
};

export default connect(mapState)(VisitorHome);

/**
 * PROP TYPES
 */
VisitorHome.propTypes = {
  //email: PropTypes.string
};
