import {Dispatch} from 'react';

/**
 * Dispatches actions to control the submit button state and to set a result message in the application's state.
 *
 * @param {Dispatch<any>} dispatch - The dispatch function from useReducer or Redux to send actions to the state management store.
 * @param {string} msg - The message to be set in the state, typically used to show success or error messages related to form submission.
 * @param {boolean} setDisabled - A boolean indicating whether the submit button should be disabled (true) or enabled (false).
 */
export const allowSubmit = (
  dispatch: Dispatch<any>,
  msg: string,
  setDisabled: boolean
) => {
  dispatch({type: 'isSubmitDisabled', payload: setDisabled});
  dispatch({payload: msg, type: 'resultMsg'});
};
