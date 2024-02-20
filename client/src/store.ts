import {configureStore} from '@reduxjs/toolkit';
import userReducer from './viewmodel/userSlice';
import applicationReducer from './viewmodel/applicationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
