import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserHome from "./user-home";
import { NavLink } from "react-router-dom";

/**
 * COMPONENT
 */
const AdminHome = props => {
  return (
    <div>
      <h1>ADMIN HOME!!!</h1>
      <UserHome />
      <div className="add-category">
        <NavLink className="to-edit-category" to="/edit/category">
          <button>Add a category</button>
        </NavLink>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = null;
export default connect(mapState)(AdminHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
