import * as React from 'react';
import LoginForm from './components/LoginForm';

/**
 * LoginView component renders the user login form interface.
 * It uses the LoginForm component to render the form and handle submissions.
 *
 * @component
 * @returns {JSX.Element} The rendered login form component.
 */
const LoginView = () => {
  return (
    <>
      <h1>Login Page</h1>
      <LoginForm />
      {/* NavigationButton to go back*/}
    </>
  );
};
export default LoginView;
