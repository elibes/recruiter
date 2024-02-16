import * as React from 'react';
import {FC, useReducer} from 'react';
import RegistrationForm from './components/RegistrationForm';

/**
 * Props for the `RegistrationView` component.
 * Includes handlers for input changes, form submission, and form validity checking,
 * which are passed down to the `RegistrationForm` component.
 *
 * @interface RegistrationViewProps
 * @property {Function} onChange - Handler for input field changes, to be passed to the `RegistrationForm`.
 * @property {Function} onClickRegister - Handler for the registration button click event, to be passed to the `RegistrationForm`.
 * @property {Function} checkFormValidity - Function to check the overall form validity, to be passed to the `RegistrationForm`.
 */
interface RegistrationViewProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  onClickRegister: (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => Promise<void>;
  checkFormValidity: () => void;
}

/**
 * `RegistrationView` component acts as a container for the `RegistrationForm`,
 * forwarding the necessary props for handling form interactions.
 * It represents the view layer in the registration feature, abstracting the presentation details
 * from the business logic and state management.
 *
 * @component
 * @param {RegistrationViewProps} props - The props for the `RegistrationView` component.
 */
const RegistrationView: FC<RegistrationViewProps> = ({
  onChange,
  onClickRegister,
  checkFormValidity,
}) => {
  return (
    <div>
      <RegistrationForm
        onChange={onChange}
        onClickRegister={onClickRegister}
        checkFormValidity={checkFormValidity}
      />
    </div>
  );
};

export default RegistrationView;
