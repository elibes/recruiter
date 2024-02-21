import {setError} from '../viewmodel/userSlice';

/**
 * Enumeration of custom error codes used to handle specific error scenarios.
 */
const ERROR_CODES = {
  CONFLICT_ERROR: 'CONFLICT_ERROR',
  CUSTOM_VALIDATION_ERROR: 'CUSTOM_VALIDATION_ERROR',
  JWT_ERROR: 'JWT_ERROR',
  TOKEN_EXPIRED_ERROR: 'TOKEN_EXPIRED_ERROR',
  CONNECTION_REFUSED_ERROR: 'CONNECTION_REFUSED_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DEFAULT_ERROR: 'DEFAULT_ERROR',
  ROUTE_VALIDATION_ERROR: 'ROUTE_VALIDATION_ERROR',
  MISSING_HEADER_ERROR: 'MISSING_HEADER_ERROR',
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
          dispatch(setError([errorMsg]));
        }
        if (errorData.code === ERROR_CODES.MISSING_HEADER_ERROR) {
          console.error('Missing Header: ', errorMsg);
          alert('The header is missing.');
        }
        break;
      case 401:
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
        if (errorData.code === ERROR_CODES.VALIDATION_ERROR) {
          dispatch(setError([errorMsg]));
        }
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
