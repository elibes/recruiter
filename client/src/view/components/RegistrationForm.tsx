import * as React from 'react';
import '../styles/RegistrationForm.css';
import {useSelector, useDispatch} from 'react-redux';
import InputField from './InputField';
import PasswordComparison from '../../util/PasswordComparison';
import {AppDispatch, RootState} from '../../store';
import {
  login,
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

/**
 * Props for the `RegistrationForm` component.
 * Includes handlers for input changes, form submission, and form validity checking.
 *
 * @interface RegistrationFormProps
 * @property {Function} onChange - Handler for input field changes.
 * @property {Function} onClickRegister - Handler for the registration button click event.
 * @property {Function} checkFormValidity - Function to check the overall form validity.
 */
interface RegistrationFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  onClickRegister: (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => Promise<void>;
  checkFormValidity: () => void;
}

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
            value={userName}
            onChange={handlePasswordChange}
            className="form-input"
          />
          <InputField
            label="repeat password"
            type="text"
            value={userName}
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
          <button className="action-btn" onClick={onClickRegister}>
            Register
          </button>
          <span className="result-message">{resultMsg}</span>
        </div>
        <div className="registered-user-link">
          Already registered? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
