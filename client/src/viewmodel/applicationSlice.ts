import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getAllCompetencies} from '../model/CompetenceModel';
import {
  applicationValidatorReducer,
  cancelApplicationReducer,
  createNewAvailabilityReducer,
  getCompetenciesReducer,
  setCompetenceReducer,
  setCompetenceYearsReducer,
  setDatesReducer,
  submitApplicationReducer,
} from './applicationReducers';
import {submitApplicationToBackEnd} from '../model/ApplicationModel';

/**
 * This interface represent the slice of state related to a user job application.
 */
interface ApplicationState {
  availability: AvailabilityState[];
  competencies: CompetenceState[];
  errorList: string[];
  resultMsg: string;
}

interface AvailabilityState {
  startDate: string;
  endDate: string;
  key: string;
}
interface CompetenceState {
  competenceId: number;
  competenceName: string;
  hasCompetence: boolean;
  yearsOfExperience: number;
}

/**
 * This constant declares the initial values for ApplicationState.
 */
const initialState: ApplicationState = {
  availability: [
    {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      key: 'range1',
    },
  ],
  competencies: [],
  errorList: [],
  resultMsg: '',
};

/**
 * Creates a redux slice to manage ApplicationState functionality.
 *
 * Reducer functions are responsible for changing state, they are tied to a name here and createSlice
 * automatically generates action creators with names matching the reducer functions. These are then exported
 * as actions which allows for changing state using dispatch.
 *
 * createSlice also uses Immer to wrap the reducers this prevents state mutation, instead converting to immutable updates.
 */
const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    createNewAvailability: createNewAvailabilityReducer,
    setDates: setDatesReducer,
    setCompetence: setCompetenceReducer,
    setCompetenceYears: setCompetenceYearsReducer,
    applicationValidator: applicationValidatorReducer,
    cancelApplication: cancelApplicationReducer,
  },
  extraReducers: builder => {
    builder.addCase(getCompetencies.fulfilled, getCompetenciesReducer);
    builder.addCase(submitApplication.fulfilled, submitApplicationReducer);
  },
});

/**
 * This code defines an asynchronous Redux Thunk action creator for fetching competency names. The promise
 * emits actions when its state changes, which are handled by extraReducers above.
 */
export const getCompetencies = createAsyncThunk(
  'application/getCompetencies',
  async () => {
    return await getAllCompetencies();
  }
);

/**
 * This code defines an asynchronous Redux Thunk action creator for submitting the application to the server. The promise
 * emits actions when its state changes, which are handled by extraReducers above.
 *
 * It looks at the application state and as long as there are currently no errors it will format it and
 * then send it to the back-end server.
 */
export const submitApplication = createAsyncThunk(
  'application/submitApplication',
  async (arg, {getState}) => {
    const state = getState() as {application: ApplicationState};
    if (state.application.errorList.length === 0) {
      const availabilitiesData = [...state.application.availability].map(
        availability => {
          return {
            fromDate: availability.startDate,
            toDate: availability.endDate,
          };
        }
      );

      const competenceData = state.application.competencies.filter(
        competence => {
          return competence.hasCompetence;
        }
      );
      competenceData.map(competence => {
        return {
          competenceId: competence.competenceName,
          yearsOfExperience: competence.yearsOfExperience,
        };
      });

      const data = {
        availabilities: availabilitiesData,
        competencies: competenceData,
      };

      return await submitApplicationToBackEnd(data);
    } else return false;
  }
);

export const {
  createNewAvailability,
  setDates,
  setCompetence,
  setCompetenceYears,
  applicationValidator,
  cancelApplication,
} = applicationSlice.actions;

export {ApplicationState, AvailabilityState, CompetenceState, initialState};
export default applicationSlice.reducer;
