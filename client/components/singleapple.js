import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store, { me, auth, fetchAppleById, getAppleById, fetchReviewByAssociation} from "../store";
import AppleItem from "./appleitem";
import { NavLink, Route } from "react-router-dom";
import NewReviewForm from "./newreviewform"


class SingleApple extends React.Component{
    constructor(props) {
        super(props);
      }

    componentDidMount() {
        this.props.fetchReviewByAssociation(this.props.match.params.id)
        this.props.fetchAppleById(this.props.match.params.id);
      }
      render(){
        const appleId = this.props.appleId;
        const path = `/apples/${appleId}/edit`;
        const user = this.props.user
        const apple = this.props.apple
        const reviews = this.props.reviews
<<<<<<< HEAD
=======
        const reviewName = this.props.reviews.user
        
>>>>>>> master
        return (
      
            <div className = "center">
                <AppleItem apple = {apple} />
                <p className = "text-info">{apple.description}</p>
                {apple.stock < 10 && apple.stock > 0 ? <p className = "text-info">Only {apple.stock} in stock, order now</p> 
                : null}
                { reviews.length ? <h2 className = "top-padding text-primary"> What People are saying </h2> : null}
                   {reviews && reviews.map(review => {
                    return(
                        <div key={review.id}>
                            <ul>
                            <li> {review.user.firstName} said</li>
                            <li className = "text-info">{review.subjectField}</li>
                            <li className = "text-info">{review.text}</li>
                            </ul>
                        </div>
                    )
                })}
                <NewReviewForm apple = {apple} reviews = {reviews} user = {user}/>
               {user.isAdmin ? (  <NavLink className="add-apple" to={path}>
    <button className="btn btn-primary">Edit Apple</button>
    </NavLink>):
                  null}
            </div>

        )
    }
}
const mapStateToProps = function(state) {
  return {
    apple: state.singleapple,
    appleId: state.singleapple.id,
    reviews: state.reviews,
    user: state.user
  };
};
const mapDispatch = {fetchAppleById, fetchReviewByAssociation, me, auth}
  
const SingleApplesContainer = connect(mapStateToProps, mapDispatch)(SingleApple);
export default SingleApplesContainer;

