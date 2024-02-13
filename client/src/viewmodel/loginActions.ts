import {createAction} from '@reduxjs/toolkit';

export const setUsername = createAction<string>('login/setUsername');
export const setPassword = createAction<string>('login/setPassword');
export const setErrorMessage = createAction<string>('login/setErrorMessage');
export const clearLoginState = createAction('login/clearLoginState');
