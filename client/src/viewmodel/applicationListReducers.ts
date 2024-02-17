import {PayloadAction} from '@reduxjs/toolkit';
import {ApplicationListState} from './applicationListSlice';

/**
 * Reducer for setting the state of isLoaded, in the Application List slice.
 * */
export const isLoadedReducer = (
  state: ApplicationListState,
  action: PayloadAction<boolean>
) => {
  state.isLoaded = action.payload;
};

/**
 * Reducer for setting the state of applications, in the Application List slice. Uses the response
 * from the server after having requested applications. Instead sets error if the response states
 * that the request did not succeed.
 * */
export const getAllApplicationsReducer = (
  state: ApplicationListState,
  action: any
) => {
  if (!action.payload) return;
  if (action.payload.success) {
    state.applications = action.payload.applications;
  } else {
    state.error = [action.payload.error.message];
  }
};
