import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserHome from "./user-home";
import { NavLink } from "react-router-dom";

/**
 * COMPONENT
 */
const AdminHome = props => {
  const { email } = props;

  console.log('AdminHome rendering')
  return (

    <div>
<h1>ADMIN HOME!!!</h1>
<UserHome />
<div className="add-category">
  <NavLink className="to-edit-category" to="/editcategory">
    <button>Add a category</button>
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
    email: state.user.email
  };
};

export default connect(mapState)(AdminHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};


