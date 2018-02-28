import axios from 'axios'
import history from '../history'

//action type

const GET_APPLES = 'GET_APPLES'
// const GET_APPLES_BY_CATEGORY = 'GET_APPLES_BY_CATEGORY'

//initial state

const initState = []

//creators

export function getApples(apples) {
   return {
       type: GET_APPLES,
       apples
   }
}

// export function getByCategory(apples){
//     return {
//         type: GET_APPLES_BY_CATEGORY,
//         apples
//     }
// }

//thunk

export function fetchApples(category){
    return function thunk(dispatch){
        let path = '/api/apples';
        if(category){
            path = `/api/apples/type/${category}`
        }
        return axios.get(path)
        .then(res => res.data)
        .then(apples => {
            return dispatch(getApples(apples))
        })
    }
}

// export function fetchByCategory(category){
//     return function thunk(dispatch){
//         return axios.get(`/api/apples/type/${category}`)
//         .then(res => res.data)
//         .then(apples => {
//             dispatch(getByCategory(apples))
//         })
//     }
// }
//reducer

export default function reducer (state = initState, action){
    switch (action.type) {
        case GET_APPLES:
            return action.apples
        // case GET_APPLES_BY_CATEGORY:
        //     return action.apples
        default:
            return state
    }
}

