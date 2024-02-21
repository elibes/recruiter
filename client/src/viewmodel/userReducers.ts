import {PayloadAction} from '@reduxjs/toolkit';
import {
  validateEmail,
  validateFirstname,
  validateLastname,
  validatePassword,
  validatePasswordConfirmation,
  validatePersonalNumber,
  validateUsername,
} from '../util/validation';

export const userNameReducer = (state: any, action: PayloadAction<string>) => {
  state.userName = action.payload;
};
export const passwordReducer = (state: any, action: PayloadAction<string>) => {
  state.password = action.payload;
};
export const passwordConfirmReducer = (
  state: any,
  action: PayloadAction<string>
) => {
  state.passwordConfirm = action.payload;
};
export const firstnameReducer = (state: any, action: PayloadAction<string>) => {
  state.firstname = action.payload;
};
export const lastnameReducer = (state: any, action: PayloadAction<string>) => {
  state.lastname = action.payload;
};
export const emailReducer = (state: any, action: PayloadAction<string>) => {
  state.email = action.payload;
};

export const personalNumberReducer = (
  state: any,
  action: PayloadAction<string>
) => {
  state.personalNumber = action.payload;
};

export const errorReducer = (state: any, action: PayloadAction<string[]>) => {
  state.error = [...state.error, ...action.payload];
};

/**
 * Extra reducer for handling the fulfilled login action.
 * @param {Object} state - The current state.
 * @param {Object} action - The dispatched action.
 * @param {boolean} action.payload.success - The success status of the login operation.
 * @param {string} action.payload.token - The token received upon successful login.
 * @param {string} action.payload.error - The error message, if any.
 */
export const loginReducer = (state: any, action: any) => {
  if (!action.payload) return;
  if (action.payload.success) {
    state.isLoggedIn = true;
    state.resultMsg = [action.payload.data];
  } else {
    state.error = [action.payload.error.message];
  }
};
export const registerReducer = (state: any, action: any) => {
  if (!action.payload) return;
  if (action.payload.success) {
    state.isLoggedIn = true;
    state.resultMsg = [action.payload.data];
  } else {
    state.error = [action.payload.error.message];
  }
};

export const validateLoginReducer = (state: any) => {
  const errorList: string[] = [];
  if (validateUsername(state.userName)) {
    errorList.push(validateUsername(state.userName));
  }
  if (validatePassword(state.password)) {
    errorList.push(validatePassword(state.password));
  }
  state.error = errorList;
};

export const validateRegistrationReducer = (state: any) => {
  const errorList: string[] = [];
  if (validateUsername(state.userName)) {
    errorList.push(validateUsername(state.userName));
  }
  if (validateFirstname(state.firstname)) {
    errorList.push(validateFirstname(state.firstname));
  }
  if (validateLastname(state.lastname)) {
    errorList.push(validateLastname(state.lastname));
  }
  if (validateEmail(state.email)) {
    errorList.push(validateEmail(state.email));
  }
  if (validatePassword(state.password)) {
    errorList.push(validatePassword(state.password));
  }
  if (validatePasswordConfirmation(state.password, state.passwordConfirm)) {
    errorList.push(
      validatePasswordConfirmation(state.password, state.passwordConfirm)
    );
  }
  if (validatePersonalNumber(state.personalNumber)) {
    errorList.push(validatePersonalNumber(state.personalNumber));
  }

  state.error = errorList;
};
