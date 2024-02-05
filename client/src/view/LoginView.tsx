import React from 'react';
import LoginForm from './components/LoginForm';

/**
 * The LoginView component renders a login page with a heading, a login form, and a navigation button.
 * @returns The LoginView component is returning a JSX element.
 */
const LoginView = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm />
      {/* NavigationButton to go back*/}
    </div>
  );
};
export default LoginView;
