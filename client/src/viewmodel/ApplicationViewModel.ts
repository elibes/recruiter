import {createSlice} from '@reduxjs/toolkit';

interface ApplicationState {
  availability: {fromDate: string; toDate: string}[];
}

const initialState: ApplicationState = {
  availability: [
    {fromDate: new Date().toISOString(), toDate: new Date().toISOString()},
  ],
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    createNewAvailability: state => {
      state.availability.push({
        fromDate: new Date().toISOString(),
        toDate: new Date().toISOString(),
      });
    },
    setDates: (state, action) => {
      const number = 1;
      console.log(action.payload.selection1.startDate);
      const fromDateString = action.payload.selection1.startDate.toISOString();
      const toDateString = action.payload.selection1.endDate.toISOString();
      console.log(fromDateString, toDateString);
      state.availability[number - 1].fromDate = fromDateString;

      state.availability[number - 1].toDate = toDateString;
    },
  },
});

export const {createNewAvailability, setDates} = applicationSlice.actions;
export default applicationSlice.reducer;
