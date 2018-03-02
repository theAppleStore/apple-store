import React from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import UserHome from "./user-home";

/**
 * COMPONENT
 */
export const AdminHome = props => {
  console.log("ADMIN HOME");
  return (
    <div>
      <h1>ADMIN HOME!!!</h1>
      <UserHome />
      <div className="add-category">
        <NavLink className="to-edit-category" to="/apples-edit">
          <button>Add a category</button>
        </NavLink>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
// const mapState = null;
// export default connect(mapState)(AdminHome);

/**
 * PROP TYPES
 */
