import React from 'react';
import InputField from './components/InputField';
import Button from './components/Button';
import RegistrationViewModel from '../viewmodel/RegistrationViewModel';
import './styles/RegistrationView.css';

const RegistrationViewRef = () => {
  const {
    firstName,
    lastName,
    userName,
    password,
    personalNumber,
    email,
    passwordConfirm,
    onChangeFirstName,
    onChangeLastName,
    onChangeUsername,
    onChangePersonNumber,
    onChangeEmail,
    onChangePassword,
    onChangePasswordConfirm,
    resultMsg,
    isSubmitDisabled,
    onClickRegister,
  } = RegistrationViewModel();

  return (
    <div className="registration-container">
      <form onSubmit={e => e.preventDefault()} className="registration-form">
        <InputField
          label="First Name"
          type="text"
          value={firstName}
          onChange={onChangeFirstName}
        />
        <InputField
          label="Last Name"
          type="text"
          value={lastName}
          onChange={onChangeLastName}
        />
        <InputField
          label="Username"
          type="text"
          value={userName}
          onChange={onChangeUsername}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <InputField
          label="Confirm Password"
          type="password"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
        />
        <InputField
          label="Personal Number"
          type="text"
          value={personalNumber}
          onChange={onChangePersonNumber}
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={onChangeEmail}
        />
        {resultMsg && <p className="result-message">{resultMsg}</p>}
        <Button
          text="Register"
          onClick={onClickRegister}
          disabled={isSubmitDisabled}
        />
        <div className="navigation-link">
          Already registered? <a href="/login">Log in</a>
        </div>
      </form>
    </div>
  );
};

export default RegistrationViewRef;
