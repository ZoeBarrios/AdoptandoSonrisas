import { FILTERS_ACTIONS, SEARCH_ACTIONS } from "./constants";

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

export const adoptionsReducer = (state, action) => {
  switch (action.type) {
    case FILTERS_ACTIONS.SET_REJECTED:
      return { ...state, isCancelled: true, isAccepted: "" };
    case FILTERS_ACTIONS.SET_APPROVED:
      return { ...state, isAccepted: true, isCancelled: false };
    case FILTERS_ACTIONS.SET_PENDING:
      return { ...state, isAccepted: false, isCancelled: false };
    case FILTERS_ACTIONS.RESET:
      return { ...state, isAccepted: "", isCancelled: "" };
    default:
      return state;
  }
};
