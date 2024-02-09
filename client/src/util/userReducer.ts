/**
 * Reducer function for user-related state updates in a React application.
 * Handles actions to update user information fields and form submission state.
 *
 * @param {Object} state - The current state object of the user data.
 * @param {Object} action - The action object dispatched to the reducer, containing a type and a payload.
 * @returns {Object} The updated state object after applying the action.
 */
const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'firstName':
      return {...state, firstName: action.payload};
    case 'lastName':
      return {...state, lastName: action.payload};
    case 'userName':
      return {...state, userName: action.payload};
    case 'password':
      return {...state, password: action.payload};
    case 'personalNumber':
      return {...state, personalNumber: action.payload};
    case 'email':
      return {...state, email: action.payload};
    case 'passwordConfirm':
      return {...state, passwordConfirm: action.payload};
    case 'resultMsg':
      return {...state, resultMsg: action.payload};
    case 'isSubmitDisabled':
      return {...state, isSubmitDisabled: action.payload};
    case 'isFirstNameInvalid':
      return {...state, isFirstNameInvalid: action.payload};
    case 'isLastNameInvalid':
      return {...state, isLastNameInvalid: action.payload};
    case 'isUsernameInvalid':
      return {...state, isUsernameInvalid: action.payload};
    case 'isPasswordInvalid':
      return {...state, isPasswordInvalid: action.payload};
    case 'isPersonalNumberInvalid':
      return {...state, isPersonalNumberInvalid: action.payload};
    case 'isEmailInvalid':
      return {...state, isEmailInvalid: action.payload};
    default:
      return {...state, resultMsg: 'A failure has occurred.'};
  }
};
export default userReducer;
