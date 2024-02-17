import '../styles/LoginForm.css';

import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import {
  setPassword,
  setUsername,
  login,
  validateLogin,
} from '../../viewmodel/userSlice';
import InputField from './InputField';
import Button from './Button';

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {userName, password, error, resultMsg} = useSelector(
    (state: RootState) => state.user
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const handleSubmit = () => {
    dispatch(validateLogin());
    dispatch(login());
  };

  return (
    <div>
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
        <Button text="Login" onClick={handleSubmit} className="login-button" />
        {error ? <p>{error}</p> : ''}
        <span className="result-message">{resultMsg}</span>
        <div className="registered-user-link">
          Need to register? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
