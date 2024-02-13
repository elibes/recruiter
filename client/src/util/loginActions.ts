export const SET_LOGIN_DETAILS = 'SET_LOGIN_DETAILS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const setLoginDetails = (username, password) => ({
  type: SET_LOGIN_DETAILS,
  payload: {username, password},
});

export const loginSuccess = userInfo => ({
  type: LOGIN_SUCCESS,
  payload: userInfo,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const setErrorMessage = message => ({
  type: SET_ERROR_MESSAGE,
  payload: message,
});
