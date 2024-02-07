import React, {FC, useReducer} from 'react';
import RegistrationViewModel from '../../viewmodel/RegistrationViewModel';
import PasswordComparison from '../../util/PasswordComparison';
import '../styles/RegistrationForm.css';

/**
 * RegistrationForm component renders the user registration form interface.
 * It uses the RegistrationViewModel to manage form state and handle changes and submissions.
 * The form includes fields for first name, last name, username, password, personal number, and email.
 * It also integrates the PasswordComparison component to handle password and confirmation input.
 *
 * @component
 * @returns {JSX.Element} The rendered registration form component.
 */
const RegistrationForm: FC = () => {
  const {
    firstName,
    lastName,
    userName,
    password,
    personalNumber,
    email,
    passwordConfirm,
    resultMsg,
    isSubmitDisabled,
    onChangeFirstName,
    onChangeLastName,
    onChangePersonNumber,
    onChangeUsername,
    onChangeEmail,
    onClickRegister,
    dispatch,
  } = RegistrationViewModel();

  return (
    <div className="registration-container">
      <form>
        <h2>Registration</h2>
        <div className="reg-inputs">
          <div>
            <label>first name</label>
            <input type="text" value={firstName} onChange={onChangeFirstName} />
          </div>
          <div>
            <label>last name</label>
            <input type="text" value={lastName} onChange={onChangeLastName} />
          </div>
          <div>
            <label>username</label>
            <input type="text" value={userName} onChange={onChangeUsername} />
          </div>
          <div>
            <PasswordComparison
              dispatch={dispatch}
              password={password}
              passwordConfirm={passwordConfirm}
            />
          </div>
          <div>
            <label>person number</label>
            <input
              type="text"
              value={personalNumber}
              onChange={onChangePersonNumber}
              placeholder="YYYYMMDD-XXXX"
            />
          </div>
          <div>
            <label>email</label>
            <input type="text" value={email} onChange={onChangeEmail} />
          </div>
        </div>
        <div className="form-buttons">
          <div className="form-btn-left">
            <button
              style={{marginLeft: '.5em'}}
              className="action-btn"
              disabled={isSubmitDisabled}
              onClick={onClickRegister}
            >
              Register
            </button>
          </div>
          <span className="result-message">
            <strong>{resultMsg}</strong>
          </span>
        </div>
        <div className="registered-user-link">
          Already registered? <a href="/login">Log in</a>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
