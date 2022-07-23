export const SET_CAFES = "SET_CAFES";
export const SET_AREAS = "SET_AREAS";
export const SET_FILTER = "SET_FILTER";

export function setCafes(value) {
  return { type: SET_CAFES, value };
}

export function setAreas(value) {
  return { type: SET_AREAS, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}
