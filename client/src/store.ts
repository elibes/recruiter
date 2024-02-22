import {configureStore} from '@reduxjs/toolkit';
import userReducer from './viewmodel/userSlice';
import applicationListReducer from './viewmodel/applicationListSlice';
import applicationReducer from './viewmodel/applicationSlice';

/**
 * The Redux store of the application.
 *
 * This store is configured with three slices of state: `user`, `applicationList`, and `application`.
 * Each slice is managed by its respective reducer.
 *
 * @type {Store}
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    applicationList: applicationListReducer,
    application: applicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
