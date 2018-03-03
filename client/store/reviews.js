import axios from 'axios'
import history from '../history'

//action type

const GET_REVIEW_BY_ASSOCIATION = 'GET_REVIEW_BY_ASSOCIATION'
const ADD_REVIEW_BY_ASSOCIATION = 'ADD_REVIEW_BY_ASSOCIATION'

//initial state

const initState = []

//creators

export function getReviewByAssociation(review) {
   return {
       type: GET_REVIEW_BY_ASSOCIATION,
       review
   }
}

export function addReviewByAssociation(review) {
    return {
        type: ADD_REVIEW_BY_ASSOCIATION,
        review
    }
 }

//thunk

export function fetchReviewByAssociation(id){
    return function thunk(dispatch){
        return axios.get(`/api/reviews/${id}`)
        .then(res => res.data)
        .then(reviews => dispatch(getReviewByAssociation(reviews))
        .catch(err => console.log(err))
    }
}

export function addReviewByAssociation(id){
    return function thunk(dispatch){
        return axios.post(`/api/reviews/${id}`)
        .then(res => res.data)
        .then(reviews => dispatch(addReviewByAssociation(reviews))
        .catch(err => console.log(err))
    }
}

//reducer

export default function reducer (state = initState, action){
    switch (action.type) {
        case GET_REVIEW_BY_ASSOCIATION:
            return action.reviews;
        case ADD_REVIEW_BY_ASSOCIATION:
        return action.reviews;
        default:
            return state
    }
}