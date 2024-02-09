import React, {FC} from 'react';
import {allowSubmit} from './Helper';
import {isPasswordValid, PasswordTestResult} from './PasswordValidator';

/**
 * Props for the PasswordComparison component.
 * @interface
 */
interface PasswordComparisonProps {
  dispatch: React.Dispatch<any>;
  password: string;
  passwordConfirm: string;
  checkFormValidity: () => void;
}

/**
 * Component for comparing password and password confirmation inputs.
 * Validates the password against defined rules and checks if both password fields match.
 *
 * @component
 * @param {PasswordComparisonProps} props - The props for the PasswordComparison component.
 */
const PasswordComparison: FC<PasswordComparisonProps> = ({
  dispatch,
  password,
  passwordConfirm,
  checkFormValidity,
}) => {
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'password'});
    const passwordCheck: PasswordTestResult = isPasswordValid(e.target.value);

    if (!passwordCheck.isValid) {
      allowSubmit(dispatch, passwordCheck.message, true);
      return;
    }
    passwordsSame(passwordConfirm, e.target.value);
  };

  /**
   * Handles changes to the password confirmation input field.
   * Checks if the password and confirmation match.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object for the input change.
   */
  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'passwordConfirm'});
    passwordsSame(password, e.target.value);
  };

  /**
   * Compares the password and password confirmation values.
   * Updates the form submission state based on whether they match.
   *
   * @param {string} passwordVal - The current password value.
   * @param {string} passwordConfirmVal - The current password confirmation value.
   * @returns {boolean} True if the passwords match, false otherwise.
   */
  const passwordsSame = (passwordVal: string, passwordConfirmVal: string) => {
    if (passwordVal !== passwordConfirmVal) {
      allowSubmit(dispatch, 'Passwords do not match', true);
      return false;
    } else {
      dispatch({payload: false, type: 'isPasswordInvalid'});
      checkFormValidity();
      return true;
    }
  };

  return (
    <React.Fragment>
      <div>
        <label>password</label>
        <input type="password" value={password} onChange={onChangePassword} />
      </div>
      <div>
        <label>password confirmation</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
        />
      </div>
    </React.Fragment>
  );
};

export default PasswordComparison;
