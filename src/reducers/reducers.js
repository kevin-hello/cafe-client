import { combineReducers } from "redux";

import { SET_FILTER, SET_CAFES, SET_USER } from "../actions/actions";

function searchBarFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function cafes(state = [], action) {
  switch (action.type) {
    case SET_CAFES:
      return action.value;
    default:
      return state;
  }
}

function user(state = "", action) {
  switch (action.type) {
    case SET_USER:
      return action.value;

    default:
      return state;
  }
}

const cafesApp = combineReducers({
  searchBarFilter,
  cafes,
  user,
});

export default cafesApp;
