import React, {useState} from 'react';
import InputField from './InputField';
import Button from './Button';
import loginViewModel from '../../viewmodel/LoginViewModel';
import '../styles/LoginForm.css';

/**
 * LoginForm component renders a login form interface.
 * It uses the loginViewModel to manage form state and handle changes and submissions.
 * The form includes fields for username and password.
 * It also includes a submit button.
 *
 * @component
 * @returns {JSX.Element} The rendered login form component.
 */
const LoginForm = () => {
  const {
    userName,
    password,
    onChangeUsername,
    onChangePassword,
    handleSubmit,
    resultMsg,
    validateForm,
  } = loginViewModel();

  return (
    <form className="login-form">
      <div className="form-group">
        <InputField
          label="Username"
          type="text"
          value={userName}
          onChange={onChangeUsername}
        />
      </div>
      <div className="form-group">
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <Button text="Login" onClick={handleSubmit} className="login-button" />
      <div className="registered-user-link">
        Need to registered? <a href="/register">Register</a>
      </div>
      <div>{resultMsg}</div>
    </form>
  );
};

export default LoginForm;
