import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUsername, setPassword, login} from '../../util/loginSlice';
import {RootState} from '../../store';
import InputField from './InputField';
import Button from './Button';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const {username, password, error} = useSelector(
    (state: RootState) => state.login
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({username, password}));
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {error && <div className="error">{error}</div>}
      <Button text="Login" onClick={handleSubmit} />
    </form>
  );
};

export default LoginForm;
