import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoginState {
  username: string;
  password: string;
  userInfo: {userId: string; role: string} | null;
  error: string;
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  username: '',
  password: '',
  userInfo: null,
  error: '',
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginDetails(
      state,
      action: PayloadAction<{username: string; password: string}>
    ) {
      const {username, password} = action.payload;
      state.username = username;
      state.password = password;
    },
    loginSuccess(state, action: PayloadAction<{userId: string; role: string}>) {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      state.error = '';
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.userInfo = null;
      state.isLoggedIn = false;
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {setLoginDetails, loginSuccess, loginFailure, setErrorMessage} =
  loginSlice.actions;
export default loginSlice.reducer;
