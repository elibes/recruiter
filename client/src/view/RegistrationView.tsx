import React, {FC, useReducer} from 'react';
import RegistrationForm from './components/RegistrationForm';

/**
 * RegistrationView component renders the user registration form interface.
 * It uses the RegistrationFrom component to render the form and handle submissions.
 *
 * @component
 * @returns {JSX.Element} The rendered registration form component.
 */
const RegistrationView: FC = () => {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationView;
