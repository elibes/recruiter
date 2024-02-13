export const SET_LOGIN_DETAILS = 'SET_LOGIN_DETAILS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const setLoginDetails = (details: {
  username?: string;
  password?: string;
}) => ({
  type: SET_LOGIN_DETAILS,
  payload: details,
});

export const loginSuccess = (userInfo: {userId: string; role: string}) => ({
  type: LOGIN_SUCCESS,
  payload: userInfo,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const setErrorMessage = (message: string) => ({
  type: SET_ERROR_MESSAGE,
  payload: message,
});
