import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAppleById, updateApple, deleteApple } from "../store";

// import store, {fetchUser, updateUser} from '../store'

/* COMPONENT */
class EditApple extends Component {
  constructor(props) {
    super(props);
    const { apple } = props;
    this.state = {
      id: apple.id || "",
      name: apple.name || "",
      image: apple.image || "",
      price: apple.price || "",
      description: apple.description || "",
      stock: apple.stock || "",
      category: apple.category || ""
    };
    this.handleImgInput = this.handleImgInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getApple(id);
  }

  handleImgInput = event => {
    const input = event.target.parentNode.lastChild;
    const currFile = input.files[0];
    const src = window.URL.createObjectURL(currFile);
    this.setState({ ...this.state, image: src });
  };

  handleChange = event => {
    const form = event.target.parentNode;
    this.setState({
      name: form.appleName.value,
      category: form.appleCategory.value,
      price: form.applePrice.value,
      description: form.appleDescription.value,
      stock: form.appleStock.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const updatedApple = this.state;
    this.props.editApple(updatedApple);
  };

  handleDelete = (evt) => {
    console.log('HI HANDLEDELETE', this.state.id)
    this.props.removeApple(this.state.id)
  }

  render() {
    return this.props.isAdmin
      ? this.renderAuthorisedUser()
      : this.renderUnathorizedUser();
  }

  renderUnathorizedUser() {
    return <h2> Unathorized access </h2>;
  }

  renderAuthorisedUser() {
    const { name, image, price, description, stock, category } = this.state;
    return (
      <div>
        <h2> EDIT APPLE </h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="image_uploads">Image (Choose File To Upload): </label>
          <div>
            {image && <img id="appleImage" src={image} />}
            <input
              type="file"
              id="image_uploads"
              name="image_uploads"
              accept=".jpg, .jpeg, .png"
              onChange={this.handleImgInput}
              className="btn btn-primary"
            />
          </div>
          <div className="preview" />

          <h3> Name: </h3>
          <input value={name} name="appleName" onChange={this.handleChange} />
          <h3> Category: </h3>
          <input
            value={category}
            name="appleCategory"
            onChange={this.handleChange}
          />
          <h3> Price: </h3>
          <input value={price} name="applePrice" onChange={this.handleChange} />
          <h3> Description: </h3>
          <input
            value={description}
            name="appleDescription"
            onChange={this.handleChange}
          />
          <h3> Stock: </h3>
          <input value={stock} name="appleStock" onChange={this.handleChange} />
          <button className="btn btn-primary" > Submit </button>
        </form>
        <div>
        <button className="btn btn-primary"  onClick={this.handleDelete}> DELETE THIS APPLE </button>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isAdmin: !!state.user.isAdmin,
    apple: state.singleapple
  };
};
const mapDispatch = (dispatch, ownProps) => {
  return {
    editApple: function(apple) {
      dispatch(updateApple(apple, ownProps));
    },
    getApple: function(id) {
      dispatch(fetchAppleById(id));
    },
    removeApple: function(id) {
      dispatch(deleteApple(id, ownProps))
    }
  };
};

export default connect(mapState, mapDispatch)(EditApple);
