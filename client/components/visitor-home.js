import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../store";

/**
 * COMPONENT
 */
export default function VisitorHome() {
    return (
      <div className = "center">
          <div className="categories">

              <NavLink className="category-product" to="/apples/type/green">
                <img name="green" src="/images/category-greenApple.png" />
              </NavLink>



              <NavLink className="category-product" to="/apples/type/red">
                <img name="red" src="/images/category-redApple.png" />
              </NavLink>

          </div>
      </div>
    );
}

