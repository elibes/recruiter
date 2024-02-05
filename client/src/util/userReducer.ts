const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'firstName':
      return {...state, firstName: action.payload};
    case 'lastName':
      return {...state, lastName: action.payload};
    case 'email':
      return {...state, email: action.payload};
    case 'pnr':
      return {...state, pnr: action.payload};
    case 'username':
      return {...state, username: action.payload};
    case 'password':
      return {...state, password: action.payload};
    case 'passwordConfirm':
      return {...state, passwordConfirm: action.payload};

    case 'resultMsg':
      return {...state, resultMsg: action.payload};
    case 'isSubmitDisabled':
      return {...state, isSubmitDisabled: action.payload};
    default:
      return {...state, resultMsg: 'A failure has occurred.'};
  }
};
export default userReducer;
