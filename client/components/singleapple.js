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
        const user = this.props.user
        const apple = this.props.apple
        const reviews = this.props.reviews
        console.log('here', this.props)
        return (
      
            <div className = "center">
                <h1 className = "text-primary">{apple.name}</h1>
                <img src = {apple.image} />
                <p className = "text-info">{apple.description}</p>
                {apple.stock < 10 && apple.stock > 0 ? <p className = "text-info">Only {apple.stock} in stock, order now</p> 
                : null}
                {apple.stock > 0 ? <button className = "btn btn-primary">Add To Cart</button>
                : <p>Out of Stock</p> }
       <NewReviewForm apple = {apple} reviews = {reviews} user = {user}/>
                 {user.isAdmin ? (<p>Put a navlink here to let admin edit</p>):
                  null}
                   {reviews && reviews.map(review => {
                    return(
                        <div>
                            <ul>
                            <li key={review.id} className = "text-info">{review.text}</li>
                            </ul>
                        </div>
                    )
                })}
               
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


const mapDispatch = {fetchAppleById, fetchReviewByAssociation, me, auth}
  
const SingleApplesContainer = connect(mapStateToProps, mapDispatch)(SingleApple);
export default SingleApplesContainer;

