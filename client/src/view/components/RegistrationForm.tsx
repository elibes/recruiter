import * as React from 'react';
import {FC} from 'react';
import '../styles/RegistrationForm.css';
import {useSelector, useDispatch} from 'react-redux';
import InputField from './InputField';
import PasswordComparison from '../../util/PasswordComparison';

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

/**
 * `RegistrationForm` component renders the user registration form with various input fields and a submit button.
 * It delegates the input handling to the `InputField` component and password validation to the `PasswordComparison` component.
 *
 * @component
 * @param {RegistrationFormProps} props - The props for the `RegistrationForm` component.
 */
const RegistrationForm: FC<RegistrationFormProps> = ({
  onChange,
  onClickRegister,
  checkFormValidity,
}) => {
  const {
    firstName,
    lastName,
    userName,
    password,
    passwordConfirm,
    personalNumber,
    email,
    isSubmitDisabled,
    resultMsg,
  } = useSelector((state: any) => state.users);

  return (
    <div className="registration-container">
      <form>
        <h2>Registration</h2>
        <div className="reg-inputs">
          <InputField
            label="first name"
            type="text"
            value={firstName}
            onChange={e => onChange(e, 'firstName')}
            className="form-input"
          />
          <InputField
            label="last name"
            type="text"
            value={lastName}
            onChange={e => onChange(e, 'lastName')}
            className="form-input"
          />
          <InputField
            label="username"
            type="text"
            value={userName}
            onChange={e => onChange(e, 'username')}
            className="form-input"
          />
          <div>
            <PasswordComparison
              password={password}
              passwordConfirm={passwordConfirm}
              checkFormValidity={checkFormValidity}
            />
          </div>
          <InputField
            label="person number"
            type="text"
            value={personalNumber}
            onChange={e => onChange(e, 'personNumber')}
            className="form-input"
          />
          <InputField
            label="email"
            type="text"
            value={email}
            onChange={e => onChange(e, 'email')}
            className="form-input"
          />
        </div>
        <div className="form-buttons">
          <button
            className="action-btn"
            disabled={isSubmitDisabled}
            onClick={onClickRegister}
          >
            Register
          </button>
          <span className="result-message">{resultMsg}</span>
        </div>
        <div className="registered-user-link">
          Already registered? <a href="/login">Log in</a>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
