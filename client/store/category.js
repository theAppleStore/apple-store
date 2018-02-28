import axios from 'axios'
import history from '../history'

//action type


const SET_CURRENT_CATEGORY ='SET_CURRENT_CATEGORY'

//initial state

const initState = {}

//creators


export function setCurrentCategory(category){
    return {
      type:SET_CURRENT_CATEGORY,
      currentCategory: category
    }
}

//thunk

//reducer

export default function reducer (state = initState, action){
    switch (action.type) {
        case SET_CURRENT_CATEGORY:
            return action.currentCategory
        default:
            return state
    }
}

