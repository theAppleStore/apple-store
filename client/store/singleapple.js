import axios from 'axios'
import history from '../history'

//action type

const GET_APPLE_BY_ID = 'GET_APPLE_BY_ID'

//initial state

const initState = []

//creators

export function getAppleById(apple) {
   return {
       type: GET_APPLE_BY_ID,
       apple 
   }
}

//thunk

export function fetchAppleById(id){
    return function thunk(dispatch){
        return axios.get(`/api/apples/${id}`)
        .then(res => res.data)
        .then(apple => dispatch(getAppleById(apple)))
        .catch(err => console.log(err))
    }
}

//reducer

export default function reducer (state = initState, action){
    switch (action.type) {
        case GET_APPLE_BY_ID:
            return action.apple;
        default:
            return state
    }
}