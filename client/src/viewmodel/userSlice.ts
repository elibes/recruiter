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
} from './userReducers';
import {loginModel} from '../model/loginModel';
import {RootState} from '../store';
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
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, loginReducer)
      .addCase(login.rejected, loginReducer)
      .addCase(register.fulfilled, registerReducer)
      .addCase(register.rejected, registerReducer);
  },
});

export const login = createAsyncThunk(
  'login/login',
  async (arg, {getState}) => {
    const state = getState() as {user: UserState};
    return await loginModel(state.user.userName, state.user.password);
  }
);

export const register = createAsyncThunk(
  'login/login',
  async (arg, {getState}) => {
    const state = getState() as {user: UserState};
    return await registrationModel(
      state.user.firstname,
      state.user.lastname,
      state.user.userName,
      state.user.password,
      state.user.personalNumber,
      state.user.email
    );
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
} = userSlice.actions;

/**
 * Export the reducer function as the default export.
 */
export default userSlice.reducer;
