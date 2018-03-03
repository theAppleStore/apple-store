import axios from "axios";
//import history from "../history";

//action type

const GET_APPLES = "GET_APPLES";
const ADD_APPLE = "ADD_APPLE";

//initial state

const initState = [];

//creators

export function getApples(apples) {
  return {
    type: GET_APPLES,
    apples
  };
}

export function addApple(apple) {
  return {
    type: ADD_APPLE,
    apple
  };
}

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

export function postApple(apple, histor) {
  return function thunk(dispatch) {
    axios
      .post("/api/apples", apple)
      .then(res => addAppleAndRedirect(res.data, histor, dispatch))
      .catch(err => console.log(err, 'did not post apple'));
  };
}

//reducer

export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_APPLES:
      return action.apples;

    case ADD_APPLE:
      return [...state, action.apple];
    default:
      return state;
  }
}


function addAppleAndRedirect(apple, histor, dispatch) {
  console.log('ADDDAPPLE AND REDIRECT', histor.location)
  dispatch(addApple(apple));
  histor.history.push(`/apples/${apple.id}`)
}

