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
          <strong>{errorPlacer('userName', backendError)}</strong>
        </div>
        <div className="form-group">
          <InputField
            className="input"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <strong>{errorPlacer('password', backendError)}</strong>
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
