/**
 * Action type constant for registration-related actions.
 *
 * @constant {string} REGISTRATION_TYPE
 */
export const REGISTRATION_TYPE = 'REGISTRATION_TYPE';

/**
 * Interface defining the shape of the registration state in the Redux store.
 * It includes fields for user input during registration and flags for validation and form submission status.
 *
 * @interface RegistrationState
 */
export interface RegistrationState {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  personalNumber: string;
  email: string;
  passwordConfirm: string;
  resultMsg: string;
  isSubmitDisabled: boolean;
  isFirstNameInvalid: boolean;
  isLastNameInvalid: boolean;
  isUsernameInvalid: boolean;
  isPasswordInvalid: boolean;
  isPersonalNumberInvalid: boolean;
  isEmailInvalid: boolean;
}

/**
 * The initial state for the registration, setting all inputs to empty strings,
 * all validation flags to true, and the submit button disabled by default.
 *
 * @constant {RegistrationState} registrationInit
 */
const registrationInit: RegistrationState = {
  firstName: '',
  lastName: '',
  userName: '',
  password: '',
  personalNumber: '',
  email: '',
  passwordConfirm: '',
  resultMsg: '',
  isSubmitDisabled: true,
  isFirstNameInvalid: true,
  isLastNameInvalid: true,
  isUsernameInvalid: true,
  isPasswordInvalid: true,
  isPersonalNumberInvalid: true,
  isEmailInvalid: true,
};

/**
 * Reducer function for registration-related actions.
 * It updates the registration state in the Redux store based on the dispatched action types and payloads.
 *
 * @function RegistrationReducer
 * @param {RegistrationState} state - The current state of registration.
 * @param {any} action - The action dispatched to this reducer.
 * @returns {RegistrationState} The updated state after applying the action's payload.
 */
export const RegistrationReducer = (state = registrationInit, action: any) => {
  switch (action.type) {
    case REGISTRATION_TYPE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
