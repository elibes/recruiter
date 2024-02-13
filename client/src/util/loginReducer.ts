import {
  SET_LOGIN_DETAILS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_ERROR_MESSAGE,
} from './loginActions';

const initialState = {
  username: '',
  password: '',
  userInfo: null,
  error: '',
  isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DETAILS:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
      };
    case LOGIN_SUCCESS:
      return {...state, userInfo: action.payload, isLoggedIn: true, error: ''};
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        userInfo: null,
        isLoggedIn: false,
      };
    case SET_ERROR_MESSAGE:
      return {...state, error: action.payload};
    default:
      return state;
  }
};

export default loginReducer;
