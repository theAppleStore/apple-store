import React, { Component } from "react";
import { connect } from "react-redux";
import { postApple } from "../store";

class AddApple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      price: "",
      description: "",
      stock: "",
      category: ""
    };
    this.handleImgInput = this.handleImgInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleImgInput = event => {  //if I want to change photo more than once pictures all appear on the browser :(
    const input = event.target.parentNode.lastChild;
    const preview = event.target.parentNode.nextSibling;
    const currFile = input.files[0];
    const image = document.createElement("img");
    image.src = window.URL.createObjectURL(currFile);
    preview.appendChild(image);
    const urlStr = image.src.toString();
    this.setState({ ...this.state, image: urlStr });
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
    const newApple = this.state;
    this.props.addApple(newApple);
  };

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
        <h2> ADD APPLE </h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="image_uploads">
              Image (Choose File To Upload):{" "}
            </label>
            <input
              type="file"
              id="image_uploads"
              name="image_uploads"
              accept=".jpg, .jpeg, .png"
              onChange={this.handleImgInput}
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
          <button> Submit </button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isAdmin: !!state.user.isAdmin
  };
};
const mapDispatch = (dispatch, ownProps) => {
  return {
    addApple: function(apple) {
      dispatch(postApple(apple, ownProps));
    }
  };
};

export default connect(mapState, mapDispatch)(AddApple);
