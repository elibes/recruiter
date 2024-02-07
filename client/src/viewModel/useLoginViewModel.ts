import {useState} from 'react';
import axios from 'axios';

const useLoginViewModel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * The function `validateForm` checks if the username and password fields are filled out.
   * @returns `true` if both `username` and `password` are provided; otherwise, `false` with an error message.
   */
  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  /**
   * This function handles form submission, validate the form, and send a request to authenticate the user.
   * @param event - The event is a React.FormEvent object, representing an event when a form is submitted.
   * It contains information about the event, such as the target element and the event type.
   * It is used to prevent the default form submission behavior and handle the form submission manually.
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('api/login', {username, password});
      // Handle response, e.g., storing auth tokens, redirecting
      console.log('Login successful', response.data);
      // Reset error state
      setError('');
      // Redirect user or update UI accordingly
    } catch (error: any) {
      // Handle error, e.g. show login failure message
      setError('Invalid username or password');
      console.log('Login failed', error.response?.data || error.message);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};

export default useLoginViewModel;
