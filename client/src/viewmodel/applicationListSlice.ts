import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getAllApplicationsReducer,
  isLoadedReducer,
  sortingReducer,
} from './applicationListReducers';
import applicationListModel from '../model/applicationListModel';

/**
 * Interface defining the fields of the Application List state.
 * @interface
 * */
export interface ApplicationListState {
  applications: [
    {
      userId: number;
      firstName: string;
      lastName: string;
      status: 'accepted' | 'unhandled' | 'rejected';
    },
  ];
  sorting: 'a-z' | 'status';
  isLoaded: boolean;
  error: string[];
}

/**
 * Initial state for the application list.
 * */
const initialState: ApplicationListState = {
  applications: [
    {
      userId: -1,
      firstName: '',
      lastName: '',
      status: 'unhandled',
    },
  ],
  sorting: 'a-z',
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
    setSorting: sortingReducer,
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

export const {setIsLoaded, setSorting} = applicationListSlice.actions;

export default applicationListSlice.reducer;
