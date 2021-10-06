import {
  SESSION_USER,
  SESSION_TOKEN
} from "../actions/Types";

const initialState = [];

const userReducer = (tutorials = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SESSION_USER:
      return [...tutorials, payload];

    case SESSION_TOKEN:
      return [...tutorials, payload];

    default:
      return tutorials;
  }
};

export default userReducer;