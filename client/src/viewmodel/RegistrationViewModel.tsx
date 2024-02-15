import {useReducer} from 'react';
import userReducer from '../util/userReducer';
import {registrationModel} from '../model/RegistrationModel';
import {
  isPersonNumberValid,
  PersonNumberTestResult,
} from '../util/PersonNumberValidator';
import {allowSubmit} from '../util/Helper';

/**
 * A ViewModel hook for managing state and interactions within the RegistrationView component.
 * It uses the `useReducer` hook for state management, with actions dispatched to the `userReducer` for handling.
 * This ViewModel provides handlers for changes in form inputs and the registration submission action, incorporating validation and submission logic.
 *
 * @returns An object containing the current state values, input change handlers, and the registration submission handler.
 */
const RegistrationViewModel = () => {
  const [
    {
      firstName,
      lastName,
      userName,
      password,
      personalNumber,
      email,
      passwordConfirm,
      resultMsg,
      isSubmitDisabled,
      isFirstNameInvalid,
      isLastNameInvalid,
      isUsernameInvalid,
      isPasswordInvalid,
      isPersonalNumberInvalid,
      isEmailInvalid,
    },
    dispatch,
  ] = useReducer(userReducer, {
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
  });

  const checkFormValidity = () => {
    if (
      !isFirstNameInvalid &&
      !isLastNameInvalid &&
      !isUsernameInvalid &&
      !isPasswordInvalid &&
      !isPersonalNumberInvalid &&
      !isEmailInvalid
    )
      allowSubmit(dispatch, '', false);
  };

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'firstName'});
    if (!e.target.value)
      allowSubmit(dispatch, 'First name cannot be empty', true);
    else {
      dispatch({payload: false, type: 'isFirstNameInvalid'});
      checkFormValidity();
    }
  };
  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'lastName'});
    if (!e.target.value)
      allowSubmit(dispatch, 'Last name cannot be empty', true);
    else {
      dispatch({payload: false, type: 'isLastNameInvalid'});
      checkFormValidity();
    }
  };
  const onChangePersonNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'personalNumber'});
    const pnrCheck: PersonNumberTestResult = isPersonNumberValid(
      e.target.value
    );
    if (!pnrCheck.isValid) {
      allowSubmit(dispatch, pnrCheck.message, true);
      return;
    } else {
      dispatch({payload: false, type: 'isPersonalNumberInvalid'});
      checkFormValidity();
    }
  };
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'userName'});
    if (!e.target.value)
      allowSubmit(dispatch, 'User name cannot be empty', true);
    else {
      dispatch({payload: false, type: 'isUsernameInvalid'});
      checkFormValidity();
    }
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'email'});
    if (!e.target.value) allowSubmit(dispatch, 'Email cannot be empty', true);
    else {
      dispatch({payload: false, type: 'isEmailInvalid'});
      checkFormValidity();
    }
  };

  const onClickRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // registration logic
    try {
      const response = await registrationModel(
        firstName,
        lastName,
        userName,
        password,
        personalNumber,
        email
      );
      if ('error' in response) {
        console.error(response.error);
      } else {
        dispatch({payload: response.data[0].toString(), type: 'resultMsg'});
        console.log(response); // Successfully registered
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return {
    firstName,
    lastName,
    userName,
    password,
    personalNumber,
    email,
    passwordConfirm,
    resultMsg,
    isSubmitDisabled,
    isFirstNameInvalid,
    isLastNameInvalid,
    isUsernameInvalid,
    isPasswordInvalid,
    isPersonalNumberInvalid,
    isEmailInvalid,
    onChangeFirstName,
    onChangeLastName,
    onChangePersonNumber,
    onChangeUsername,
    onChangeEmail,
    onClickRegister,
    checkFormValidity,
    dispatch,
  };
};

export default RegistrationViewModel;
