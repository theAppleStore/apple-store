import axios from 'axios'
import history from '../history'

//action type

const GET_APPLES = 'GET_APPLES'

//initial state

const initState = []

//creators

export function getApples(apples) {
   return {
       type: GET_APPLES,
       apples
   }
}

//thunk

export function fetchApples(category){
    return function thunk(dispatch){
        let path = '/api/apples';
        if(category){
            path = `/api/apples/${category}`
        }
        return axios.get(path)
        .then(res => res.data)
        .then(apples => {
            dispatch(getApples(apples))
        })
    }
}

//reducer

export default function reducer (state = initState, action){
    switch (action.type) {
        case GET_APPLES:
            return action.apples
        default:
            return state
    }
}

