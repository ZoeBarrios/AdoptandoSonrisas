import { SEARCH_ACTIONS } from "./constants";

export const INITIAL_SEARCH_STATE = {
  page: 1,
  size: "",
  genre: "",
  age: "",
  limit: 6,
};

export const searchReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_ACTIONS.SET_PAGE:
      return { ...state, page: payload };
    case SEARCH_ACTIONS.SET_SIZE:
      return { ...state, size: payload, page: 1 };
    case SEARCH_ACTIONS.SET_GENRE:
      return { ...state, genre: payload, page: 1 };
    case SEARCH_ACTIONS.SET_AGE:
      return { ...state, age: payload, page: 1 };
    case SEARCH_ACTIONS.RESTART:
      return INITIAL_SEARCH_STATE;
    default:
      return state;
  }
};
