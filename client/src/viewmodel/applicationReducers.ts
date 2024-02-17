import {ApplicationState, initialState} from './applicationSlice';
import {PayloadAction} from '@reduxjs/toolkit';

export const createNewAvailabilityReducer = (state: ApplicationState) => {
  state.availability.push({
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    key: 'range' + (state.availability.length + 1),
  });
};

export interface dateRange {
  startDate: string;
  endDate: string;
  key: string;
}
export const setDatesReducer = (
  state: ApplicationState,
  action: PayloadAction<dateRange>
) => {
  const key = action.payload.key;
  const index = state.availability.findIndex(range => range.key === key);
  state.availability[index].startDate = action.payload.startDate;
  state.availability[index].endDate = action.payload.endDate;
};

export const setCompetenceReducer = (
  state: ApplicationState,
  action: PayloadAction<{competenceId: number}>
) => {
  const index = state.competencies.findIndex(
    competence => competence.competenceId === action.payload.competenceId
  );
  state.competencies[index].hasCompetence =
    !state.competencies[index].hasCompetence;
};

export const setCompetenceYearsReducer = (
  state: ApplicationState,
  action: PayloadAction<{competenceId: number; years: string}>
) => {
  const index = state.competencies.findIndex(
    competence => competence.competenceId === action.payload.competenceId
  );
  state.competencies[index].yearsOfExperience = parseFloat(
    action.payload.years
  );
};

export const submitApplicationReducer = (
  state: ApplicationState,
  action: any
) => {
  console.log(action);
  if (!action.payload) return;
  if (action.payload.success) {
    state.resultMsg = action.payload.data;
  } else {
    state.errorList = [action.payload.error.message];
  }
};

export const applicationValidatorReducer = (state: ApplicationState) => {
  let errorList: string[] = [];
  errorList = state.competencies.reduce((acc, currentValue) => {
    if (currentValue.hasCompetence && !currentValue.yearsOfExperience) {
      acc.push(currentValue.competenceName + ' has no exp,');
    }
    return acc;
  }, errorList);

  errorList = state.availability.reduce((acc, currentValue) => {
    if (new Date(currentValue.endDate) <= new Date(currentValue.startDate)) {
      acc.push('specify at least one availability period');
    }
    return acc;
  }, errorList);
  console.log(errorList);
  state.errorList = errorList;
};

export const getCompetenciesReducer = (
  state: ApplicationState,
  action: any
) => {
  {
    state.competencies = action.payload.competencies.map(
      (competence: {id: any; competenceName: any}) => {
        return {
          competenceId: competence.id,
          competenceName: competence.competenceName,
          hasCompetence: false,
          yearsOfExperience: 0,
        };
      }
    );
  }
};

export const cancelApplicationReducer = (state: ApplicationState) => {
  state.competencies = state.competencies.map((competence: any) => {
    return {
      competenceId: competence.id,
      competenceName: competence.competenceName,
      hasCompetence: false,
      yearsOfExperience: 0,
    };
  });
  state.availability = initialState.availability;
  state.resultMsg = initialState.resultMsg;
  state.errorList = initialState.errorList;
};
