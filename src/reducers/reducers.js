import { combineReducers } from "redux";

import { SET_FILTER, SET_CAFES, SET_AREAS } from "../actions/actions";

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

function areas(state = [], action) {
  switch (action.type) {
    case SET_AREAS:
      return action.value;
    default:
      return state;
  }
}

const cafesApp = combineReducers({
  searchBarFilter,
  cafes,
  areas,
});

export default cafesApp;
