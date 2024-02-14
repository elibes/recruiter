import * as React from 'react';
import {useReducer} from 'react';
import userReducer from '../util/userReducer';
import {loginModel} from '../model/LoginModel';

const LoginViewModel = () => {
  const [{userName, password, resultMsg}, dispatch] = useReducer(userReducer, {
    userName: '',
    password: '',
    resultMsg: '',
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'userName'});
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({payload: e.target.value, type: 'password'});
  };

  const onClickLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await loginModel(userName, password);
      if ('error' in response) {
        console.error(response.error);
      } else {
        dispatch({payload: response.data[0].toString(), type: 'resultMsg'});
        console.log(response);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return {
    userName,
    password,
    resultMsg,
    handlePasswordChange,
    handleUsernameChange,
    dispatch,
    onClickLogin,
  };
};

export default LoginViewModel;
