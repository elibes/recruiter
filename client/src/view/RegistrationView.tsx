import React, {FC, useReducer} from 'react';
import './RegistrationView.css';
import RegistrationViewModel from '../viewModel/RegistrationViewModel';
import PasswordComparison from '../util/PasswordComparison';

const RegistrationView: FC = () => {
  const {
    firstName,
    lastName,
    email,
    pnr,
    username,
    password,
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
        <div className="brand-logo">AMUSEMENT PARK</div>
        <h3>Sign up</h3>
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
            <label>person number</label>
            <input type="text" value={pnr} onChange={onChangePersonNumber} />
          </div>
          <div>
            <label>username</label>
            <input type="text" value={username} onChange={onChangeUsername} />
          </div>
          <div>
            <label>email</label>
            <input type="text" value={email} onChange={onChangeEmail} />
          </div>
          <div>
            <PasswordComparison
              dispatch={dispatch}
              password={password}
              passwordConfirm={passwordConfirm}
            />
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

export default RegistrationView;
