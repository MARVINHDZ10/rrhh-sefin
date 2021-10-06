import {
  SESSION_USER,
  SESSION_TOKEN
} from "./Types";

export const saveUserSession = (data) => async (dispatch) => {
  try {

    dispatch({
      type: SESSION_USER,
      payload: data,
    });

  } catch (err) {
    return Promise.reject(err);
  }
};

export const saveTokenSession = (data) => async (dispatch) => {
  try {

    dispatch({
      type: SESSION_TOKEN,
      payload: data,
    });

  } catch (err) {
    return Promise.reject(err);
  }
};