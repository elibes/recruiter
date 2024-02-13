import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {login as loginModel} from '../model/LoginModel';

interface LoginState {
  username: string;
  password: string;
  error: string;
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  username: '',
  password: '',
  error: '',
  isLoggedIn: false,
};

export const login = createAsyncThunk(
  'login/login',
  async ({username, password}: {username: string; password: string}) => {
    return await loginModel(username, password);
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const {success, token, error} = action.payload;
        if (success && token) {
          state.isLoggedIn = true;
          state.error = '';
        } else {
          state.error = error || 'Login failed';
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.error = 'Login request failed';
      });
  },
});

export const {setUsername, setPassword, reset} = loginSlice.actions;

export default loginSlice.reducer;
