import {registrationModel} from '../model/RegistrationModel';
import {REGISTRATION_TYPE} from '../util/store/RegistrationReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../util/store/AppState';
import RegistrationView from '../view/RegistrationView';

/**
 * `RegistrationViewModel` function component manages the registration process.
 * It uses Redux to dispatch actions and maintain state, and it handles form validation,
 * input changes, and the registration submission process.
 *
 * @function
 * @returns A `RegistrationView` component with bound event handlers for form interactions.
 */
const RegistrationViewModel = () => {
  const dispatch = useDispatch();

  /**
   * Selects registration data from the Redux store's state.
   */
  const registrationData = useSelector((state: RootState) => state.users);

  /**
   * Validates the form fields to determine if the submit button should be enabled or disabled.
   * Dispatches an action to update the submit button's state based on form validity.
   */
  const checkFormValidity = () => {
    if (
      registrationData.isFirstNameInvalid === false &&
      registrationData.isLastNameInvalid === false &&
      registrationData.isUsernameInvalid === false &&
      registrationData.isPasswordInvalid === false &&
      registrationData.isPersonalNumberInvalid === false &&
      registrationData.isEmailInvalid === false
    )
      dispatch({type: REGISTRATION_TYPE, payload: {isSubmitDisabled: false}});
  };

  /**
   * Handles changes to input fields in the registration form.
   * Dispatches actions to update field values and their validity in the Redux store.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object for the input change.
   * @param {string} fieldName - The name of the field being changed.
   */
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const fieldValue = e.target.value;
    const isEmpty = fieldValue === '';
    const fieldMappings = {
      firstName: {
        valueKey: 'firstName',
        invalidKey: 'isFirstNameInvalid',
        errorMessage: 'First name cannot be empty',
      },
      lastName: {
        valueKey: 'lastName',
        invalidKey: 'isLastNameInvalid',
        errorMessage: 'Last name cannot be empty',
      },
      username: {
        valueKey: 'userName',
        invalidKey: 'isUsernameInvalid',
        errorMessage: 'User name cannot be empty',
      },
      personNumber: {
        valueKey: 'personalNumber',
        invalidKey: 'isPersonalNumberInvalid',
        errorMessage: 'Person number cannot be empty',
      },
      email: {
        valueKey: 'email',
        invalidKey: 'isEmailInvalid',
        errorMessage: 'Email cannot be empty',
      },
    };

    const handleDispatch = (valueKey, invalidKey, value, isError) => {
      dispatch({type: REGISTRATION_TYPE, payload: {[valueKey]: value}});
      dispatch({type: REGISTRATION_TYPE, payload: {[invalidKey]: isError}});
      if (!isError) checkFormValidity();
    };

    if (isEmpty) {
      const {errorMessage, invalidKey} = fieldMappings[fieldName] || {
        errorMessage: 'Some error occurred!',
        invalidKey: 'genericError',
      };
      dispatch({type: REGISTRATION_TYPE, payload: {resultMsg: errorMessage}});
      if (invalidKey !== 'genericError') {
        dispatch({type: REGISTRATION_TYPE, payload: {[invalidKey]: true}});
      }
      handleDispatch(
        fieldMappings[fieldName].valueKey,
        fieldMappings[fieldName].invalidKey,
        '',
        true
      );
    } else {
      const {valueKey, invalidKey} = fieldMappings[fieldName];
      if (valueKey && invalidKey) {
        handleDispatch(valueKey, invalidKey, fieldValue, false);
      } else {
        dispatch({
          type: REGISTRATION_TYPE,
          payload: {resultMsg: 'Some error occurred!'},
        });
      }
    }
  };

  /**
   * Handles the click event on the register button.
   * Performs the registration logic and updates the Redux store based on the response.
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The event object for the button click.
   */
  const onClickRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // registration logic
    try {
      const response = await registrationModel(
        registrationData.firstName,
        registrationData.lastName,
        registrationData.userName,
        registrationData.password,
        registrationData.personalNumber,
        registrationData.email
      );
      if ('error' in response) {
        console.error(response.error);
      } else {
        dispatch({
          type: REGISTRATION_TYPE,
          payload: {resultMsg: response.data[0].toString()},
        });
        console.log(response); // Successfully registered
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      <RegistrationView
        onChange={onChange}
        onClickRegister={onClickRegister}
        checkFormValidity={checkFormValidity}
      />
    </div>
  );
};

export default RegistrationViewModel;
