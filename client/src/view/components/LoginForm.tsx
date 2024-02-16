import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '../styles/LoginForm.css';
import {RootState, AppDispatch} from '../../store';
import {
  setPassword,
  setUsername,
  login,
  validateLogin,
} from '../../viewmodel/userSlice';
import {validateLoginForm} from '../../util/validation';
import InputField from './InputField';
import Button from './Button';

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
  const dispatch = useDispatch<AppDispatch>();
  const {userName, password, error} = useSelector(
    (state: RootState) => state.user
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(validateLogin());
    dispatch(login());
  };

  return (
    <div onSubmit={handleSubmit}>
      <div className="login-form">
        <div className="form-group">
          <InputField
            className="input"
            label="Username"
            type="text"
            value={userName}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <InputField
            className="input"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button
          text="Login"
          onClick={() => dispatch(login())}
          className="login-button"
        />
        {error ? <p>{error}</p> : ''}
        <div className="registered-user-link">
          Need to register? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
