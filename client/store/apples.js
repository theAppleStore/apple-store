import axios from 'axios'
import history from '../history'

//action type

const GET_APPLES = 'GET_APPLES'
const GET_CART_APPLES = 'GET_CART_APPLES'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

//initial state

const initState = []

//creators

export function getApples(apples) {
   return {
       type: GET_APPLES,
       apples
   }
}

export function getCartApples(apples){
    return {
        type: GET_CART_APPLES,
        apples
    }
}

const removeFromCart = apple => ({type: REMOVE_FROM_CART, apple})

//thunk

export function fetchApples(category){
    return function thunk(dispatch){
        let path = '/api/apples';
        if(category){
            path = `/api/apples/type/${category}`
        }
        return axios.get(path)
        .then(res => res.data)
        .then(apples => dispatch(getApples(apples)))
        .catch(err => console.log(err))
    }
}

export function fetchCartApples(){
    return function thunk(dispatch){
      axios.get('/auth/me')
      .then(res => res.data.id)
      .then(id => {
        axios.get(`/api/orders/${id}`)
        .then(res => res.data)
        .then(orders => orders.find(order => order.status === 'Created'))
        .then(order => {
            axios.get(`/api/orders/single/${order.id}`)
            .then(res => res.data)
            .then(order => dispatch(getCartApples(order.apples)))
        })
      })
      .catch(err => console.log(err))
    }
  }

  export function deleteFromCart(appleId){
    return function thunk(dispatch){
        axios.delete(`/api/cart/${appleId}`)
        .then(res => res.data)
        .then(deletedApple => dispatch(removeFromCart(deletedApple)))
        .catch(err => console.log(err))
    }
  }

//reducer

export default function reducer (state = initState, action){
    switch (action.type) {
        case GET_APPLES:
            return action.apples
        case GET_CART_APPLES:
            return action.apples
        case REMOVE_FROM_CART:
            const filtered = state.filter(apple => apple.id !== action.apple.id)
            return filtered
        default:
            return state
    }
}

