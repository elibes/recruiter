import {useReducer} from 'react';
import userReducer from '../util/userReducer';
import {registrationModel} from '../model/RegistrationModel';
import {
  isPersonNumberValid,
  PersonNumberTestResult,
} from '../util/PersonNumberValidator';
import {allowSubmit} from '../util/Helper';

const RegistrationViewModel = () => {
  const [
    {
      firstName,
      lastName,
      email,
      pnr,
      username,
      password,
      passwordConfirm,
      resultMsg,
      isSubmitDisabled,
    },
    dispatch,
  ] = useReducer(userReducer, {
    firstName: '',
    lastName: '',
    email: '',
    pnr: '',
    username: '',
    password: '',
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
    dispatch({payload: e.target.value, type: 'pnr'});
    const pnrCheck: PersonNumberTestResult = isPersonNumberValid(
      e.target.value
    );
    if (!pnrCheck.isValid) {
      allowSubmit(dispatch, pnrCheck.message, true);
      return;
    }
  };
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'username'});
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
      const result = await registrationModel(
        firstName,
        lastName,
        email,
        pnr,
        username,
        password
      );
      console.log('register result', result);
      dispatch({payload: 'Registration successful', type: 'resultMsg'});
    } catch (ex) {
      console.log(ex);
    }
  };

  return {
    firstName,
    lastName,
    email,
    pnr,
    username,
    password,
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
