import * as React from 'react';
import {useTranslation} from 'react-i18next';
import LoginForm from './components/LoginForm';

/**
 * LoginView component renders the user login form interface.
 * It uses the LoginForm component to render the form and handle submissions.
 *
 * @component
 * @returns {JSX.Element} The rendered login form component.
 */
const LoginView = () => {
  const {t, i18n} = useTranslation();

  return (
    <>
      <h1>{t('login.login-page')}</h1>
      <LoginForm />
      {/* NavigationButton to go back*/}
    </>
  );
};
export default LoginView;
