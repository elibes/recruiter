import {setBackendError} from '../viewmodel/userSlice';
import {setErrorList} from '../viewmodel/applicationSlice';

/**
 * Enumeration of custom error codes used to handle specific error scenarios.
 */
const ERROR_CODES = {
  CONFLICT_ERROR: 'CONFLICT_ERROR',
  CUSTOM_VALIDATION_ERROR: 'CUSTOM_VALIDATION_ERROR',
  JWT_ERROR: 'JWT_ERROR',
  TOKEN_EXPIRED_ERROR: 'TOKEN_EXPIRED_ERROR',
  CONNECTION_REFUSED_ERROR: 'CONNECTION_REFUSED_ERROR',
  DEFAULT_ERROR: 'DEFAULT_ERROR',
  ROUTE_VALIDATION_ERROR: 'ROUTE_VALIDATION_ERROR',
  MISSING_HEADER_ERROR: 'MISSING_HEADER_ERROR',
  INVALID_LOGIN_ERROR: 'INVALID_LOGIN_ERROR',
};

/**
 * Defines the structure for the arguments passed to the error handler function.
 *
 * @typedef {Object} ErrorHandlerArguments
 * @property {Response} response - The response object from a fetch request, containing the error details.
 * @property {Function} [dispatch] - Optional Redux dispatch function to send actions based on the error.
 */
interface ErrorHandlerArguments {
  response: Response;
  dispatch?: any;
}

/**
 * Handles errors based on the HTTP status code and custom error codes defined in `ERROR_CODES`.
 * It processes the response to extract error details and takes appropriate actions like logging,
 * displaying alerts, or dispatching error messages to the Redux store.
 *
 * @param {ErrorHandlerArguments} args - The arguments containing the response and optional dispatch function.
 */
export function handleError({response, dispatch}: ErrorHandlerArguments) {
  response.json().then(error => {
    const errorData = error.error;
    const errorMsg = errorData.message || 'Unknown error occurred';
    switch (response.status) {
      case 400:
        if (errorData.code === ERROR_CODES.CUSTOM_VALIDATION_ERROR) {
          const formattedMessage = generateErrorMessage(errorMsg);
          console.log(formattedMessage);
          dispatch(setBackendError(formattedMessage));
          dispatch(setErrorList(formattedMessage));
        }
        if (errorData.code === ERROR_CODES.MISSING_HEADER_ERROR) {
          console.error('Missing Header: ', errorMsg);
          alert('Your request is missing needed HTTP headers.');
        }
        break;
      case 401:
        if (errorData.code === ERROR_CODES.INVALID_LOGIN_ERROR) {
          console.error(errorMsg);
          alert(
            'Login information does not match an existing account, try again'
          );
        }
        if (errorData.code === ERROR_CODES.JWT_ERROR) {
          console.error('Unauthorized: ', errorMsg);
          alert('You are not authorized. Please log in.');
        }
        if (errorData.code === ERROR_CODES.TOKEN_EXPIRED_ERROR) {
          console.error('Unauthorized: ', errorMsg);
          alert('Your authorization cookie has expired. Please log in.');
        }
        break;
      case 404:
        if (errorData.code === ERROR_CODES.ROUTE_VALIDATION_ERROR) {
          console.log('Route Missing: ', errorMsg);
          alert('That route does not exist');
        }
        break;
      case 409:
        if (errorData.code === ERROR_CODES.CONFLICT_ERROR) {
          console.error('Conflict: ', errorMsg);
          alert('Conflict detected. Please retry.');
        }
        break;
      case 500:
        if (errorData.code === ERROR_CODES.DEFAULT_ERROR) {
          console.error('Server Error', errorMsg);
          alert(
            'An internal server error has occurred. Please try again later.'
          );
        }
        break;
      case 503:
        if (error.code === ERROR_CODES.CONNECTION_REFUSED_ERROR) {
          console.error('Server Unavailable: ', errorMsg);
          alert('Service is currently unavailable. Please try again later.');
        }
        break;
      default:
        console.error('Server Error: ', errorMsg);
        alert('An internal server error has occurred. Please try again later.');
        break;
    }
  });
}

/**
 * This function parses a validation error string from the back end, putting it in a list.
 * @param validationErrors the string of validation errors
 */
const generateErrorMessage = (validationErrors: string) => {
  console.log(validationErrors);
  const toSet: string[] = [];
  const errorStrings = validationErrors.split('::');
  for (const errorString of errorStrings) {
    const [errorFieldName, ...messageParts] = errorString.split(' ');
    const message = messageParts.join(' ');
    toSet.push(errorFieldName + ': ' + message);
  }
  return toSet;
};

/**
 * This function takes a list of errors and retrieves the one matching a string, for placement within a view.
 * @param field the string to match for placement
 * @param errors the list of errors
 */
export const errorPlacer = (field: string, errors: string[]) => {
  for (const errorString of errors) {
    const errorParts = errorString.split(':');
    if (field === errorParts[0]) {
      return errorParts[1];
    }
  }
  return undefined;
};
