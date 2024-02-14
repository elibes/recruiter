import {useReducer} from 'react';
import userReducer from '../util/userReducer';
import {loginModel} from '../model/loginModel';

const loginViewModel = () => {
  const [{userName, password, resultMsg}, dispatch] = useReducer(userReducer, {
    userName: '',
    password: '',
    resultMsg: '',
  });

  /**
   * The function `validateForm` checks if the username and password fields are filled out.
   * @returns `true` if both `username` and `password` are provided; otherwise, `false` with an error message.
   */
  const validateForm = () => {
    if (!userName || !password) {
      dispatch({
        payload: 'Username and password are required',
        type: 'resultMsg',
      });
      return false;
    }
    return true;
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'userName'});
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'password'});
  };

  /**
   * This function handles form submission, validate the form, and send a request to authenticate the user.
   * @param event - The event is a React.FormEvent object, representing an event when a form is submitted.
   * It contains information about the event, such as the target element and the event type.
   * It is used to prevent the default form submission behavior and handle the form submission manually.
   */
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // registration logic
    try {
      const response = await loginModel(userName, password);
      if ('error' in response) {
        console.error(response.error);
      } else {
        dispatch({payload: response.data[0].toString(), type: 'resultMsg'});
        console.log(response); // Successfully registered
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return {
    userName,
    password,
    onChangeUsername,
    onChangePassword,
    handleSubmit,
    resultMsg,
    validateForm,
  };
};

export default loginViewModel;
