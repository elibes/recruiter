import {ApplicationState, initialState} from './applicationSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import {validateAvailabilities, validateCompetencies} from '../util/validation';

/**
 * @fileoverview this file contains the reducers for use with the application slice. These function change
 * the relevant parts of the application state in response to a redux action.
 */

/**
 * This interface specifies the expected format of an availability period. It should be the same format as the
 * availability state in the application slice.
 */
export interface dateRange {
  startDate: string;
  endDate: string;
  key: string;
}

/**
 * This reducer adds a new availability period to the state.
 * The period uses the default values of: from and to the current time.
 * @param state The job application state.
 */
export const createNewAvailabilityReducer = (state: ApplicationState) => {
  const defaultPeriod: dateRange = {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    key: 'range' + (state.availability.length + 1),
  };
  state.availability.push(defaultPeriod);
};

/**
 * This reducer takes an action specifying the start- ,end-dates and the key of a period and sets the corresponding
 * state in the application state if it exists, otherwise it throws an error.
 * @param state The job application state.
 * @param action The action, with a payload that is a dateRange
 */
export const setDatesReducer = (
  state: ApplicationState,
  action: PayloadAction<dateRange>
) => {
  const key = action.payload.key;
  const index = state.availability.findIndex(range => range.key === key);
  if (index === -1) {
    throw new Error('Tried to change a period range that does not exist.');
  }
  state.availability[index].startDate = action.payload.startDate;
  state.availability[index].endDate = action.payload.endDate;
};

/**
 * This reducer function flips the hasCompetence of a particular competence (specified by competenceId) to the opposite
 * boolean state.
 * @param state The job application state.
 * @param action The action leading to this reducer, with a competenceId specifying which competence the hasCompetence
 * state should be changed on.
 */
export const setCompetenceReducer = (
  state: ApplicationState,
  action: PayloadAction<{competenceId: number}>
) => {
  const index = state.competencies.findIndex(
    competence => competence.competenceId === action.payload.competenceId
  );
  if (index === -1) {
    throw new Error(
      'Tried to change the has competence state of a non existing competence.'
    );
  }
  state.competencies[index].hasCompetence =
    !state.competencies[index].hasCompetence;
};

/**
 * This reducer changes the year (of experience) state of a specified competence.
 * @param state The job application state.
 * @param action The action leading to this reducer, with a competenceId specifying which competence the years
 * state should be changed on.
 */
export const setCompetenceYearsReducer = (
  state: ApplicationState,
  action: PayloadAction<{competenceId: number; years: string}>
) => {
  const index = state.competencies.findIndex(
    competence => competence.competenceId === action.payload.competenceId
  );
  if (index === -1) {
    throw new Error('Tried to change the years of a non existing competence.');
  }
  state.competencies[index].yearsOfExperience = parseFloat(
    action.payload.years
  );
};

/**
 * This reducer will be async called by a thunk when the promise to submit a job application is fulfilled. It
 * then sets state to either the resultMsg or the error message depending on the success state of the request.
 * @param state The job application state.
 * @param action an action, with payload corresponding to the data returned by the back-end server.
 */
export const submitApplicationReducer = (
  state: ApplicationState,
  action: any
) => {
  if (!action.payload) return;
  if (action.payload.success) {
    state.resultMsg = action.payload.data;
  } else {
    state.errorList = [action.payload.error.message];
  }
};

/**
 * This reducer handles the error state of the job application.
 * It does so by doing basic validation of the state by getting lists of errors message from validation functions
 * that check that competencies and availabilities are on the correct form.
 *
 * @param state The job application state.
 */
export const applicationValidatorReducer = (state: ApplicationState) => {
  let errorList: string[] = [];
  errorList = validateCompetencies(errorList, state.competencies);
  errorList = validateAvailabilities(errorList, state.availability);
  state.errorList = errorList;
};

/**
 * This reducer will be async called by a thunk when the promise to get competence from the server is fulfilled. It
 * then sets state to either the resultMsg or the error message depending on the success state of the request.
 * @param state The job application state.
 * @param action an action, with payload corresponding to the data returned by the back-end server.
 */
export const getCompetenciesReducer = (
  state: ApplicationState,
  action: any
) => {
  if (!action.payload) return;
  if (action.payload.success) {
    state.competencies = action.payload.data[0].competencies.map(
      (competence: {id: any; competenceName: any}) => {
        return {
          competenceId: competence.id,
          competenceName: competence.competenceName,
          hasCompetence: false,
          yearsOfExperience: 0,
        };
      }
    );
  } else {
    state.errorList = [action.payload.error.message];
  }
};

/**
 * This reducer cancels the application by resetting all but the competence names and ids to their default values.
 * @param state The job application state.
 */
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
