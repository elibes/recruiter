import {configureStore} from '@reduxjs/toolkit';
import userReducer from './viewmodel/userSlice';
import applicationListReducer from './viewmodel/applicationListSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    applicationList: applicationListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
