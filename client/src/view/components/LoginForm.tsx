import React, {FC, useReducer} from 'react';
import RegistrationViewModel from '../../viewmodel/RegistrationViewModel';
import PasswordComparison from '../../util/PasswordComparison';
import '../styles/RegistrationForm.css';
import {allowSubmit} from '../../util/Helper';
import LoginViewModel from '../../viewmodel/LoginViewModel';
import InputField from './InputField';
import Button from './Button';

/**
 * RegistrationForm component renders the user registration form interface.
 * It uses the RegistrationViewModel to manage form state and handle changes and submissions.
 * The form includes fields for first name, last name, username, password, personal number, and email.
 * It also integrates the PasswordComparison component to handle password and confirmation input.
 *
 * @component
 * @returns {JSX.Element} The rendered registration form component.
 */
const LoginForm: FC = () => {
  const {
    userName,
    password,
    resultMsg,
    isSubmitDisabled,
    isUsernameInvalid,
    isPasswordInvalid,
    handlePasswordChange,
    handleUsernameChange,
    checkFormValidity,
    onClickLogin,
    dispatch,
  } = LoginViewModel();

  return (
    <form onSubmit={onClickLogin}>
      <InputField
        label="Username"
        type="text"
        value={userName}
        onChange={handleUsernameChange}
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <div className="result-message">{resultMsg}</div>
      <Button text="Login" onClick={onClickLogin} />
    </form>
  );
};

export default LoginForm;
