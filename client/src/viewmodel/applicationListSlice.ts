import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getAllApplicationsReducer,
  isLoadedReducer,
} from './applicationListReducers';
import applicationListModel from '../model/applicationListModel';

/**
 * Interface defining the fields of the Application List state.
 * */
export interface ApplicationListState {
  applications: [
    {
      id: number;
      firstName: string;
      lastName: string;
      status: 'accepted' | 'unhandled' | 'rejected';
    },
  ];
  isLoaded: boolean;
  error: string[];
}

/**
 * Initial state for the application list.
 * */
const initialState: ApplicationListState = {
  applications: [
    {
      id: -1,
      firstName: '',
      lastName: '',
      status: 'unhandled',
    },
  ],
  isLoaded: false,
  error: [],
};

/**
 * Defines the name of the application list slice, its initial state, and the reducers that can change the state.
 * */
export const applicationListSlice = createSlice({
  name: 'applicationList',
  initialState,
  reducers: {
    setIsLoaded: isLoadedReducer,
  },
  extraReducers: builder => {
    builder.addCase(loadApplications.fulfilled, getAllApplicationsReducer);
  },
});

/**
 * Used for loading all applications from the model.
 * */
export const loadApplications = createAsyncThunk(
  'applications/getAll',
  async () => {
    return await applicationListModel();
  }
);

export const {setIsLoaded} = applicationListSlice.actions;

export default applicationListSlice.reducer;
