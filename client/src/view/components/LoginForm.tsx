import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '../styles/LoginForm.css';
import {RootState, AppDispatch} from '../../store';
import {
  setPassword,
  setUsername,
  login,
  validateLogin,
} from '../../viewmodel/userSlice';
import InputField from './InputField';
import Button from './Button';
import {useNavigate} from 'react-router-dom';
import {errorPlacer} from '../../util/error_handler';
import {setErrorList} from '../../viewmodel/applicationSlice';
import {useTranslation} from 'react-i18next';

/**
 * React component which is responsible for rendering a login form and handling user interactions with the form.
 *
 * @returns a JSX element that renders the login form
 */
const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    userName,
    password,
    error,
    resultMsg,
    isLoggedIn,
    userRole,
    backendError,
  } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      switch (userRole) {
        case 'recruiter':
          setTimeout(() => {
            navigate('/recruiter');
          }, 1000);
          break;
        case 'applicant':
          dispatch(setErrorList([]));
          setTimeout(() => {
            navigate('/application');
          }, 500);
          break;
        default:
      }
    }
  }, [isLoggedIn, userRole]);

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

  const {t, i18n} = useTranslation();

  return (
    <div>
      <div className="login-form">
        <div className="form-group">
          <InputField
            className="input"
            label={t('login.username')}
            type="text"
            value={userName}
            onChange={handleUsernameChange}
          />
          <strong>{errorPlacer('userName', backendError)}</strong>
        </div>
        <div className="form-group">
          <InputField
            className="input"
            label={t('login.password')}
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <strong>{errorPlacer('password', backendError)}</strong>
        </div>
        <Button
          text={t('login.login')}
          onClick={handleSubmit}
          className="login-button"
        />
        {error ? <p>{error}</p> : ''}
        <span className="result-message">{resultMsg}</span>
        <div className="registered-user-link">
          {t('login.no-account-question')}
          <a href="/register">{t('login.register')}</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
