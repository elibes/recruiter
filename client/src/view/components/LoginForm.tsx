import React, {useState} from 'react';
import InputField from './InputField';
import Button from './Button';
import useLoginViewModel from '../../viewmodel/useLoginViewModel';

const LoginForm = () => {
  const {username, setUsername, password, setPassword, error, handleSubmit} =
    useLoginViewModel();

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <InputField
        label="Username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button text="Login" onClick={() => {}} />
    </form>
  );
};

export default LoginForm;
