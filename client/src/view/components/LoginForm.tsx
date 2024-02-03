import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // add login logic using viewmodel hook
    alert(`Login successful!`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="Login" onClick={handleSubmit} />
    </form>
  );
}

export default LoginForm;
