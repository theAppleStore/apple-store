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

export function fetchApples(){
    return function thunk(dispatch){
        return axios.get('/api/apples')
        .then(res => res.data)
        .then(apples => {
            console.log("HERE" + apples)
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

