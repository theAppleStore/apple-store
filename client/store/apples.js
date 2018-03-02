import axios from 'axios'
import history from '../history'

//action type

const GET_APPLES = 'GET_APPLES'
const GET_CART_APPLES = 'GET_CART_APPLES'

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
  
// export function fetchCartApples(orderId){
//     return function thunk(dispatch){
//         axios.get(`/api/cart/${orderId}`)
//         .then(res => res.data)
//         .then(apples => dispatch(getCartApples(apples)))
//         .catch(err => console.log(err))
//     }
// }

//reducer

export default function reducer (state = initState, action){
    switch (action.type) {
        case GET_APPLES:
            return action.apples
        case GET_CART_APPLES:
            return action.apples
        default:
            return state
    }
}

