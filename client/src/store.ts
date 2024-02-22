import {configureStore} from '@reduxjs/toolkit';
import userReducer from './viewmodel/userSlice';
import applicationListReducer from './viewmodel/applicationListSlice';
import applicationReducer from './viewmodel/applicationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    applicationList: applicationListReducer,
    application: applicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
