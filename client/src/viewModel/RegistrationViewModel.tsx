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
  });

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'firstName'});
    if (!e.target.value)
      allowSubmit(dispatch, 'First name cannot be empty', true);
    else allowSubmit(dispatch, '', false);
  };
  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'lastName'});
    if (!e.target.value)
      allowSubmit(dispatch, 'Last name cannot be empty', true);
    else allowSubmit(dispatch, '', false);
  };
  const onChangePersonNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'personalNumber'});
    const pnrCheck: PersonNumberTestResult = isPersonNumberValid(
      e.target.value
    );
    if (!pnrCheck.isValid) {
      allowSubmit(dispatch, pnrCheck.message, true);
      return;
    }
  };
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'userName'});
    if (!e.target.value)
      allowSubmit(dispatch, 'Username cannot be empty', true);
    else allowSubmit(dispatch, '', false);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'email'});
    if (!e.target.value) allowSubmit(dispatch, 'Email cannot be empty', true);
    else allowSubmit(dispatch, '', false);
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
        dispatch({payload: 'Registration successful', type: 'resultMsg'});
        console.log(response.message); // Successfully registered
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
    onChangeFirstName,
    onChangeLastName,
    onChangePersonNumber,
    onChangeUsername,
    onChangeEmail,
    onClickRegister,
    dispatch,
  };
};

export default RegistrationViewModel;
