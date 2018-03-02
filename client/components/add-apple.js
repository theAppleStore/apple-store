import React, { Component } from "react";
// import PropTypes from 'prop-types'
import { connect } from "react-redux";
// import {NavLink} from 'react-router-dom'

//import store, {fetchApple, updateApple} from '../store'

class AddApple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgInput: '',
      nameInput: '',
      categoryInput: '',
      priceInput: '',
      descInput: '',
      stockInput: ''
    };
  }
  handleChange = () => {
    console.log("hi");
  };

  handleSubmit = () => {
    console.log("hi");
  };

  render() {
const { imgInput, nameInput, categoryInput, priceInput, descInput, stockInput } = this.state
    console.log("ADD APPPLE");
    return (
      <div>
        <h2> ADD APPLE </h2>
        <form onSubmit={this.handleSubmit}>
          <h3> Image: </h3>
          <input
            value={imgInput}
            name="appleImg"
            onChange={this.handleChange}
          />
          <h3> Name: </h3>
          <input
            value={nameInput}
            name="appleName"
            onChange={this.handleChange}
          />
          <h3> Category: </h3>
          <input
            value={categoryInput}
            name="appleCategory"
            onChange={this.handleChange}
          />
          <h3> Price: </h3>
          <input
            value={priceInput}
            name="applePrice"
            onChange={this.handleChange}
          />
          <h3> Description: </h3>
          <input
            value={descInput}
            name="appleDescription"
            onChange={this.handleChange}
          />
          <h3> Stock: </h3>
          <input
            value={stockInput}
            name="appleStock"
            onChange={this.handleChange}
          />
          <button> Submit </button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {};
};
const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(AddApple);

//onSubmit ->update the input value through dispatch
//need api
