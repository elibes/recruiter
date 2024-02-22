import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  emailReducer,
  firstnameReducer,
  lastnameReducer,
  passwordReducer,
  personalNumberReducer,
  userNameReducer,
  loginReducer,
  validateLoginReducer,
  validateRegistrationReducer,
  passwordConfirmReducer,
  registerReducer,
  errorReducer,
} from './userReducers';
import {loginModel} from '../model/loginModel';
import {registrationModel} from '../model/RegistrationModel';

interface UserState {
  userName: string;
  password: string;
  passwordConfirm: string;
  firstname: string;
  lastname: string;
  email: string;
  personalNumber: string;
  userInfo: {userId: string; role: string} | null;
  error: string[];
  backendError: string[];
  isLoggedIn: boolean;
  resultMsg: string;
}

const initialState: UserState = {
  userName: '',
  password: '',
  passwordConfirm: '',
  firstname: '',
  lastname: '',
  email: '',
  personalNumber: '',
  userInfo: null,
  error: [],
  backendError: [],
  isLoggedIn: false,
  resultMsg: '',
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: userNameReducer,
    setPassword: passwordReducer,
    setPasswordConfirm: passwordConfirmReducer,
    setFirstname: firstnameReducer,
    setLastname: lastnameReducer,
    setEmail: emailReducer,
    setPersonalNumber: personalNumberReducer,
    validateLogin: validateLoginReducer,
    validateRegistration: validateRegistrationReducer,
    setBackendError: errorReducer,
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, loginReducer)
      .addCase(register.fulfilled, registerReducer);
  },
});

export const login = createAsyncThunk('user/login', async (arg, {getState}) => {
  const state = getState() as {user: UserState};
  if (state.user.error.length === 0) {
    return await loginModel(state.user.userName, state.user.password);
  } else return false;
});

export const register = createAsyncThunk(
  'user/register',
  async (arg, {getState, dispatch}) => {
    const state = getState() as {user: UserState};
    if (state.user.error.length === 0) {
      return await registrationModel(
        state.user.firstname,
        state.user.lastname,
        state.user.userName,
        state.user.password,
        state.user.personalNumber,
        state.user.email,
        dispatch
      );
    } else return false;
  }
);

export const {
  setUsername,
  setPassword,
  setFirstname,
  setLastname,
  setEmail,
  setPersonalNumber,
  setPasswordConfirm,
  validateRegistration,
  validateLogin,
  setBackendError,
} = userSlice.actions;

/**
 * Export the reducer function as the default export.
 */
export default userSlice.reducer;
