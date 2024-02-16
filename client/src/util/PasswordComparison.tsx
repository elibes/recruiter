import * as React from 'react';
import {FC, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {REGISTRATION_TYPE} from './store/RegistrationReducer';

/**
 * Props for the `PasswordComparison` component.
 *
 * @interface
 */
interface PasswordComparisonProps {
  password: string;
  passwordConfirm: string;
  checkFormValidity: () => void;
}

/**
 * `PasswordComparison` component for comparing password and password confirmation fields.
 * This component dispatches actions based on the password and password confirmation inputs and
 * validates if both passwords match. It triggers form validity check when passwords are valid and match.
 *
 * @component
 * @param {PasswordComparisonProps} props - The props for the `PasswordComparison` component.
 * @param {string} props.password - The current value of the password input field.
 * @param {string} props.passwordConfirm - The current value of the password confirmation input field.
 * @param {() => void} props.checkFormValidity - A callback function to check the overall form validity.
 */
const PasswordComparison: FC<PasswordComparisonProps> = ({
  password,
  passwordConfirm,
  checkFormValidity,
}) => {
  const dispatch = useDispatch();

  /**
   * Handles changes to the password input field.
   * Dispatches actions to update the password state and to set a message if the password is empty.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object for the input change.
   */
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    dispatch({type: REGISTRATION_TYPE, payload: {password: newPassword}});
    if (!newPassword) {
      dispatch({
        type: REGISTRATION_TYPE,
        payload: {resultMsg: 'Password cannot be empty'},
      });
    }
  };

  /**
   * Handles changes to the password confirmation input field.
   * Dispatches actions to update the password confirmation state and to set a message if the confirmation is empty.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object for the input change.
   */
  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    dispatch({
      type: REGISTRATION_TYPE,
      payload: {passwordConfirm: newConfirmPassword},
    });
    if (!newConfirmPassword) {
      dispatch({
        type: REGISTRATION_TYPE,
        payload: {resultMsg: 'Password confirmation cannot be empty'},
      });
    }
  };

  useEffect(() => {
    passwordsSame(password, passwordConfirm);
  }, [password, passwordConfirm]);

  /**
   * Compares the password and password confirmation values.
   * Dispatches an action to indicate a mismatch or proceeds with form validity check on match.
   *
   * @param {string} passwordVal - The current password value.
   * @param {string} passwordConfirmVal - The current password confirmation value.
   */
  const passwordsSame = (passwordVal: string, passwordConfirmVal: string) => {
    if (passwordVal !== passwordConfirmVal) {
      dispatch({
        type: REGISTRATION_TYPE,
        payload: {resultMsg: 'Passwords do not match'},
      });
    } else {
      dispatch({
        type: REGISTRATION_TYPE,
        payload: {resultMsg: '', isPasswordInvalid: false},
      });
      checkFormValidity();
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
