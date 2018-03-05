import axios from "axios";
//import historyy from "../historyy";

//action type

const GET_APPLES = "GET_APPLES";
const DELETE_APPLE = "DELETE_APPLE";
const ADD_APPLE = "ADD_APPLE";
const UPDATE_APPLE = "UPDATE_APPLE";
const GET_CART_APPLES = "GET_CART_APPLES";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

//initial state

const initState = [];

//creators

export function getApples(apples) {
  return {
    type: GET_APPLES,
    apples
  };
}

export function removeApple(id) {
  return {
    type: DELETE_APPLE,
    id
  };
}

export function addApple(apple) {
  return {
    type: ADD_APPLE,
    apple
  };
}

export function editApple(apple) {
  return {
    type: UPDATE_APPLE,
    apple
  };
}

export function getCartApples(apples) {
  return {
    type: GET_CART_APPLES,
    apples
  };
}

const removeFromCart = apple => ({ type: REMOVE_FROM_CART, apple });

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
    axios
      .delete(`/api/apples/${id}`)
      .then(() => removeAppleAndRedirect(id, ownProps, dispatch))
      .catch(err => console.log(err, "failed to remove apple"));
  };
}

export function postApple(apple, ownProps) {
  return function thunk(dispatch) {
    axios
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
    axios
      .get("/auth/me")
      .then(res => res.data.id)
      .then(id => {
        axios
          .get(`/api/orders/${id}`)
          .then(res => res.data)
          .then(orders => orders.find(order => order.status === "Created"))
          .then(order => {
            axios
              .get(`/api/orders/single/${order.id}`)
              .then(res => res.data)
              .then(order => dispatch(getCartApples(order.apples)));
          });
      })
      .catch(err => console.log(err));
  };
}

export function deleteFromCart(appleId) {
  return function thunk(dispatch) {
    axios
      .delete(`/api/cart/${appleId}`)
      .then(res => res.data)
      .then(deletedApple => dispatch(removeFromCart(deletedApple)))
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
      const filtered = state.filter(apple => apple.id !== action.apple.id);
      return filtered;
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
