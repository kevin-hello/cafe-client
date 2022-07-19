import { combineReducers } from "redux";

import { SET_FILTER, SET_CAFES } from "../actions/actions";

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

const cafesApp = combineReducers({
  searchBarFilter,
  cafes,
});

export default cafesApp;
