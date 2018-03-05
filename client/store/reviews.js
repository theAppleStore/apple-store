import axios from 'axios'
import history from '../history'

//action type

const GET_REVIEW_BY_ASSOCIATION = 'GET_REVIEW_BY_ASSOCIATION'
const ADD_REVIEW_BY_ASSOCIATION = 'ADD_REVIEW_BY_ASSOCIATION'

//initial state

const initState = [];

//creators

export function getReviewByAssociation(review) {
   return {
       type: GET_REVIEW_BY_ASSOCIATION,
       review: review
   };
}

export function setReviewByAssociation(review) {
    return {
        type: ADD_REVIEW_BY_ASSOCIATION,
        review: review
    };
 }

//thunk

export function fetchReviewByAssociation(appleId) {
    return function thunk(dispatch) {
        return axios.get(`/api/reviews/${appleId}`)
        .then(res => res.data)
        .then(reviews => dispatch(getReviewByAssociation(reviews)))
        .catch(err => console.log(err))
    }
}

export function addReviewByAssociation(review) {
    return function thunk(dispatch) {
        return axios.post(`/api/reviews`, review)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
}

//reducer

export default function reducer (state = initState, action){
    console.log(action);
    switch (action.type) {
        case GET_REVIEW_BY_ASSOCIATION:
            return action.review;
        case ADD_REVIEW_BY_ASSOCIATION:
            return action.review;
        default:
            return state;
    }
}