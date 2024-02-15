import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface ApplicationState {
  availability: {startDate: string; endDate: string; key: string}[];
  competencies: {
    competenceId: number;
    competenceName: string;
    hasCompetence: boolean;
    yearsOfExperience: number;
  }[];
  errorList: string[];
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
    setCompetence: (state, action) => {
      const index = state.competencies.findIndex(
        competence => competence.competenceId === action.payload.competenceId
      );
      state.competencies[index].hasCompetence =
        !state.competencies[index].hasCompetence;
    },
    setCompetenceYears: (state, action) => {
      console.log(action);
      const index = state.competencies.findIndex(
        competence => competence.competenceId === action.payload.competenceId
      );
      state.competencies[index].yearsOfExperience = parseFloat(
        action.payload.years
      );
    },
    submitApplication: state => {
      if (state.errorList.length !== 0) {
        console.log('i not submit that');
        return;
      }
      const availabilitiesData = [...state.availability].map(availability => {
        return {fromDate: availability.startDate, toDate: availability.endDate};
      });

      const competenceData = state.competencies.filter(competence => {
        return competence.hasCompetence;
      });
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
      console.log('sending...\n', data);
    },
  },
  extraReducers: builder => {
    builder.addCase(getCompetencies.fulfilled, (state, action) => {
      state.competencies = action.payload.competencies.map(competence => {
        return {
          competenceId: competence.id,
          competenceName: competence.competenceName,
          hasCompetence: false,
          yearsOfExperience: 0,
        };
      });
    });
    builder.addCase(applicationValidator.fulfilled, state => {
      let errorList: string[] = [];
      errorList = state.competencies.reduce((acc, currentValue) => {
        if (currentValue.hasCompetence && !currentValue.yearsOfExperience) {
          acc.push(currentValue.competenceName + ' has no exp,');
        }
        return acc;
      }, errorList);

      errorList = state.availability.reduce((acc, currentValue) => {
        if (
          new Date(currentValue.endDate) <= new Date(currentValue.startDate)
        ) {
          acc.push('specify at least one availability period');
        }
        return acc;
      }, errorList);

      state.errorList = errorList;
    });
  },
});

export const getCompetencies = createAsyncThunk(
  'application/getCompetencies',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      competencies: [
        {id: 1, competenceName: 'climbing'},
        {id: 2, competenceName: 'falling'},
      ],
    };
  }
);
export const applicationValidator = createAsyncThunk(
  'application/applicationValidator',
  state => {
    return;
  }
);

export const {
  createNewAvailability,
  setDates,
  setCompetence,
  setCompetenceYears,
  submitApplication,
} = applicationSlice.actions;
export default applicationSlice.reducer;
