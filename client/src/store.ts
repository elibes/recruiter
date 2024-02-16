import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './util/loginSlice';
import userReducer from './viewmodel/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
