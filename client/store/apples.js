import axios from "axios";
//import historyy from "../historyy";

//action type

const GET_APPLES = "GET_APPLES";
const DELETE_APPLE = "DELETE_APPLE";
const ADD_APPLE = "ADD_APPLE";
const UPDATE_APPLE = "UPDATE_APPLE";
const GET_CART_APPLES = "GET_CART_APPLES";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_CART = "UPDATE_CART";

//initial state

const initState = [];

//creators

export const getApples = apples => ({type: GET_APPLES, apples})

export const removeApple = id => ({type: DELETE_APPLE, id})

export const addApple = apple => ({type: ADD_APPLE,apple})

export const editApple = apple => ({type: UPDATE_APPLE, apple})

export const getCartApples = apples => ({type: GET_CART_APPLES, apples})

export const removeFromCart = appleId => ({ type: REMOVE_FROM_CART, appleId });

export const updateCart = apple => ({type: UPDATE_CART, apple})

//thunk

export function fetchApples(category) {
  return function thunk(dispatch) {
    let path = "/api/apples";
    if (category) {
      path = `/api/apples/type/${category}`;
    }
    return axios
      .get(path)
      .then(res => res.data)
      .then(apples => dispatch(getApples(apples)))
      .catch(err => console.log(err));
  };
}

export function deleteApple(id, ownProps) {
  return function thunk(dispatch) {
    return axios
      .delete(`/api/apples/${id}`)
      .then(() => removeAppleAndRedirect(id, ownProps, dispatch))
      .catch(err => console.log(err, "failed to remove apple"));
  };
}

export function postApple(apple, ownProps) {
  return function thunk(dispatch) {
    return axios
      .post("/api/apples", apple)
      .then(res => addAppleAndRedirect(res.data, ownProps, dispatch))
      .catch(err => console.log(err, "failed to post apple"));
  };
}

export function updateApple(apple, ownProps) {
  return function thunk(dispatch) {
    return axios
      .put(`/api/apples/${apple.id}`, apple)
      .then(res => addAppleAndRedirect(res.data, ownProps, dispatch))
      .catch(err => console.log(err, "failed to update apple"));
  };
}

export function fetchCartApples() {
  return function thunk(dispatch) {
    return axios
      .get("/auth/me")
      .then(res => res.data.id)
      .then(id => {
        return axios.get(`/api/orders/${id}`)
      })
      .then(res => res.data)
      .then(orders => orders.find(order => order.status === "Created"))
      .then(order => {
        return axios.get(`/api/orders/single/${order.id}`)
      })
      .then(res => res.data)
      .then(order => dispatch(getCartApples(order.apples)))
      .catch(err => console.log(err));
  };
}

export function deleteFromCart(appleId) {
  return function thunk(dispatch) {
    return axios
      .delete(`/api/cart/${appleId}`)
      .then(res => res.data)
      .then(deletedAppleId => dispatch(removeFromCart(deletedAppleId)))
      .catch(err => console.log(err));
  };
}

export function putCart(appleId, orderId, updatedInfo) {
  console.log(updatedInfo)
  return function thunk(dispatch) {
    return axios
      .put(`/api/cart/${orderId}/apple/${appleId}`, updatedInfo)
      .then(res => res.data)
      .then(updatedLineItem => dispatch(updateCart({ id: updatedLineItem.appleId, quantity: updatedInfo.quantity } )))
      .catch(err => console.log(err));
  };
}


//reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_APPLES:
      return action.apples;
    case DELETE_APPLE:
      return state.filter(apple => apple.id !== action.id);
    case ADD_APPLE:
      return [...state, action.apple];
    case UPDATE_APPLE:
      return [
        ...state.filter(apple => apple.id !== action.apple.id),
        action.apple
      ];
    case GET_CART_APPLES:
      return action.apples;
    case REMOVE_FROM_CART:
      const filtered = state.filter(apple => apple.id !== +action.appleId);
      return filtered;
    case UPDATE_CART:
      return state.map(apple => {
        if (+apple.id === +action.apple.id) {
          let lineItem = Object.assign(
            {}, 
            apple.lineItem, 
            { quantity: action.apple.quantity }
          ) 
          let newApple = Object.assign(
            {}, 
            apple, 
            {lineItem}
          )
          return newApple
        } else {
          return apple
        }
      })
      // const apple = state.find(apple => apple.id === action.appleId);
      // const filteredApples = state.filter(apple => apple.id !== +action.appleId);
      // return filteredApples.concat(apple);
    default:
      return state;
  }
}

//helperFunc
function addAppleAndRedirect(apple, ownProps, dispatch) {
  dispatch(addApple(apple));
  ownProps.history.push(`/apples/${apple.id}`);
}

function removeAppleAndRedirect(id, ownProps, dispatch) {
  dispatch(removeApple(id));
  ownProps.history.push("/apples");
}
