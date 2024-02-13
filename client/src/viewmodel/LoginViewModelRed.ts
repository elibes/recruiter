import {useReducer} from "react";
import userReducer from "../util/userReducer";
import {allowSubmit} from "../util/Helper";
import {isPersonNumberValid, PersonNumberTestResult} from "../util/PersonNumberValidator";
import {registrationModel} from "../model/RegistrationModel";

const LoginViewModelRed = () => {
  const [
    {
      userName,
      password,
      resultMsg,
      isSubmitDisabled,
      isUsernameInvalid,
      isPasswordInvalid,
    },
    dispatch,
  ] = useReducer(userReducer, {
    userName: '',
    password: '',
    resultMsg: '',
    isSubmitDisabled: true,
    isUsernameInvalid: true,
    isPasswordInvalid: true,
  });

  const checkFormValidity = () => {
    if (
      !isUsernameInvalid &&
      !isPasswordInvalid &&
    )
      allowSubmit(dispatch, '', false);
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'userName'});
    if (!e.target.value)
      allowSubmit(dispatch, 'User name cannot be empty', true);
    else {
      dispatch({payload: false, type: 'isUsernameInvalid'});
      checkFormValidity();
    }
  };

  const onClickLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await loginModel(
        userName,
        password,
      );
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
    resultMsg,
    isSubmitDisabled,
    isUsernameInvalid,
    isPasswordInvalid,
    onChangeUsername,
    checkFormValidity,
    dispatch,
  };
};

export default LoginViewModelRed;
