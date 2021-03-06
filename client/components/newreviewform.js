import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store, { me, auth, fetchAppleById, getAppleById, fetchReviewByAssociation, addReviewByAssociation} from "../store";
import AppleItem from "./appleitem";
import {withRouter} from "react-router"
// import { supportsGoWithoutReloadUsingHash } from "../../../.cache/typescript/2.6/node_modules/@types/history/DOMUtils";

class NewReviewForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userId:  null,
            appleId: this.props.match.params.id,
            subjectField: "",
            text: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {   
        const {name, value} = event.target;

        this.setState(() => ({
           [name]: value
        }))
    }
 
    handleSubmit(event) {
        // event.preventDefault();
        const review = this.state
        this.props.addReviewByAssociation(review)
        this.setState({ fireRedirect: true })
    }

    componentDidMount() {
        this.props.fetchReviewByAssociation(this.props.match.params.id)
        this.props.fetchAppleById(this.props.match.params.id);
      }
      render(){
        const user = this.props.user
        const apple = this.props.apple
        const reviews = this.props.reviews
        this.state.userId = user.id
        return (
            <div className = "center">
            <h2 className = "text-success">Tell us what you think about our {apple.name} apples</h2>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input name="subjectField" value={this.state.subjectField} onChange = {this.handleChange}/>
                </label>
                <label>
                    Feedback:
                    <textarea name="text" value={this.state.text} onChange = {this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>

        )
    }
}

const mapStateToProps = function(state) {
    return {
      apple: state.singleapple,
      reviews: state.reviews,
      user: state.user
    };
  };

const mapDispatch = {addReviewByAssociation, fetchAppleById, fetchReviewByAssociation, me, auth}
  
const NewReviewContainer = connect(mapStateToProps, mapDispatch)(withRouter(NewReviewForm));
export default NewReviewContainer;
