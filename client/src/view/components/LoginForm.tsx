import React, {useState} from 'react';
import InputField from './InputField';
import Button from './Button';
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
  return (
    <form className="login-form">
      <div className="form-group">
        <InputField label="Username" type="text" value="" />
      </div>
      <div className="form-group">
        <InputField label="Password" type="password" value="" />
      </div>
      <Button text="Login" className="login-button" />
      <div className="registered-user-link">
        Need to registered? <a href="/register">Register</a>
      </div>
    </form>
  );
};

export default LoginForm;
