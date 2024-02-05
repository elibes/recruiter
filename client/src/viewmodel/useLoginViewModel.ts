import {useState} from 'react';

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
    if (!validateForm()) return;
    // TODO: send request to backend to authenticate the user
    console.log('Submitting', {username, password});
    // TODO: on successful login, clear the form or redirect the user
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
