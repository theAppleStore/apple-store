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
    <div className = "center">
      <h5 className = "text-danger">Admin Privileges Granted</h5>
      <UserHome />
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
