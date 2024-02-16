import * as React from 'react';
import '../styles/RegistrationForm.css';
import {useSelector, useDispatch} from 'react-redux';
import InputField from './InputField';
import {AppDispatch, RootState} from '../../store';
import {
  setEmail,
  setFirstname,
  setLastname,
  setPassword,
  setPasswordConfirm,
  setPersonalNumber,
  setUsername,
  validateRegistration,
  register,
} from '../../viewmodel/userSlice';
import Button from './Button';
const RegistrationForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    firstname,
    lastname,
    userName,
    password,
    passwordConfirm,
    personalNumber,
    email,
    resultMsg,
    error,
  } = useSelector((state: RootState) => state.user);

  const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstname(e.target.value));
  };

  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastname(e.target.value));
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPasswordConfirm(e.target.value));
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePersonalNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPersonalNumber(e.target.value));
  };

  const handleRegister = () => {
    dispatch(validateRegistration());
    dispatch(register());
  };

  return (
    <div className="registration-container">
      <div>
        <h2>Registration</h2>
        <div className="reg-inputs">
          <InputField
            label="first name"
            type="text"
            value={firstname}
            onChange={handleFirstnameChange}
            className="form-input"
          />
          <InputField
            label="last name"
            type="text"
            value={lastname}
            onChange={handleLastnameChange}
            className="form-input"
          />
          <InputField
            label="username"
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            className="form-input"
          />
          <InputField
            label="password"
            type="text"
            value={password}
            onChange={handlePasswordChange}
            className="form-input"
          />
          <InputField
            label="repeat password"
            type="text"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            className="form-input"
          />
          <InputField
            label="person number"
            type="text"
            value={personalNumber}
            onChange={handlePersonalNumberChange}
            className="form-input"
          />
          <InputField
            label="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            className="form-input"
          />
        </div>
        <div className="form-buttons">
          <Button
            text="Register"
            onClick={handleRegister}
            className="action-btn"
          />
        </div>
        <span className="result-message">{resultMsg}</span>
        <span className="result-message">{error}</span>
        <div className="registered-user-link">
          Already registered? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
