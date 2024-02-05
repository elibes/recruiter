import React, {useState} from 'react';
import InputField from './InputField';
import Button from './Button';
import useLoginViewModel from '../../viewmodel/useLoginViewModel';
import '../styles/LoginForm.css';

const LoginForm = () => {
  const {username, setUsername, password, setPassword, error, handleSubmit} =
    useLoginViewModel();

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <p>{error}</p>}
      <div className="form-group">
        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <Button text="Login" onClick={() => {}} className="login-button" />
    </form>
  );
};

export default LoginForm;
