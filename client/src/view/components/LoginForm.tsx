import React, {useState} from 'react';
import InputField from './InputField';
import Button from './Button';
import useLoginViewModel from '../../viewModel/useLoginViewModel';
import '../styles/LoginForm.css';

/**
 * LoginForm component renders a login form interface.
 * It uses the useLoginViewModel to manage form state and handle changes and submissions.
 * The form includes fields for username and password.
 * It also includes a submit button.
 *
 * @component
 * @returns {JSX.Element} The rendered login form component.
 */
const LoginForm = () => {
  const {username, setUsername, password, setPassword, error, handleSubmit} =
    useLoginViewModel();

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <p>{error}</p>}
      <div className="form-group">
        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <Button text="Login" onClick={() => {}} className="login-button" />
    </form>
  );
};

export default LoginForm;
