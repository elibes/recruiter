import {createSlice} from '@reduxjs/toolkit';

interface ApplicationState {
  availability: {startDate: string; endDate: string; key: string}[];
}

const initialState: ApplicationState = {
  availability: [
    {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      key: 'range1',
    },
  ],
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    createNewAvailability: state => {
      state.availability.push({
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        key: 'range' + (state.availability.length + 1),
      });
    },
    setDates: (state, action) => {
      const key = action.payload.key;
      const index = state.availability.findIndex(range => range.key === key);
      state.availability[index].startDate = action.payload.startDate;
      state.availability[index].endDate = action.payload.endDate;
    },
  },
});

export const {createNewAvailability, setDates} = applicationSlice.actions;
export default applicationSlice.reducer;
