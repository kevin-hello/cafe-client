export const SET_CAFES = "SET_CAFES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";

export function setCafes(value) {
  return { type: SET_CAFES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}
