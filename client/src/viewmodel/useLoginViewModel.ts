import {useState} from 'react';

const useLoginViewModel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if(!validateForm()) return;
    // TODO: send request to backend to authenticate the user
    console.log('Subitting', {username, password})
    // TODO: on successful login, clear the form or redirect the user
  };

  return{
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};

export default useLoginViewModel;

