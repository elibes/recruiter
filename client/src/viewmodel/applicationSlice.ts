import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getAllCompetencies} from '../model/CompetenceModel';
import {
  applicationValidatorReducer,
  createNewAvailabilityReducer,
  getCompetenciesReducer,
  setCompetenceReducer,
  setCompetenceYearsReducer,
  setDatesReducer,
  submitApplicationReducer,
} from './applicationReducers';
import {submitApplicationToBackEnd} from '../model/ApplicationModel';

interface ApplicationState {
  availability: {startDate: string; endDate: string; key: string}[];
  competencies: {
    competenceId: number;
    competenceName: string;
    hasCompetence: boolean;
    yearsOfExperience: number;
  }[];
  errorList: string[];
  resultMsg: string;
}

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

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    createNewAvailability: createNewAvailabilityReducer,
    setDates: setDatesReducer,
    setCompetence: setCompetenceReducer,
    setCompetenceYears: setCompetenceYearsReducer,
    applicationValidator: applicationValidatorReducer,
  },
  extraReducers: builder => {
    builder.addCase(getCompetencies.fulfilled, getCompetenciesReducer);
    builder.addCase(submitApplication.fulfilled, submitApplicationReducer);
  },
});

export const getCompetencies = createAsyncThunk(
  'application/getCompetencies',
  async () => {
    return await getAllCompetencies();
  }
);

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
} = applicationSlice.actions;

export {ApplicationState};
export default applicationSlice.reducer;
