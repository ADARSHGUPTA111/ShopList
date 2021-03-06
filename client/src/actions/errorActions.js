import { GET_ERRORS, CLEAR_ERRORS, GET_ITEMS } from "./types";

// Return errors

export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

//clear errros

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
